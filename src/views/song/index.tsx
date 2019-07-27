import React, { useState, useEffect } from 'react';
import useStateRequest, {IUseStateReturn} from '@hooks/useStateRequest'
import Lyric from '@views/song/lyric'


const Song = function () {
    const { data, isLoading, isError, doFetch } : IUseStateReturn= useStateRequest();
    const song = data && data.songs && data.songs[0] || {};
    const backImg = song.al && song.al.picUrl;
    const style = backImg && {backgroundImage: `url(${backImg})`};
    const songName = song.name;
    const songFrom = song.alia && song.alia[0];
    const singer = song.ar && song.ar[0] && song.ar[0].name;

    const [rotateStart, setRotateStart] = useState(false);
    const [continueRotate, setContinueRotate] = useState(0);
    const songAudio: any = React.createRef();

    /*
        rotate function start
     */
    const rotateRef: any = React.createRef();
    let rotate = continueRotate;

    const rotateFn = () => {
        if (rotateStart) {
            if (rotateRef.current && rotateRef.current.style) {
                rotateRef.current.style.transform = `rotate(${rotate}deg)`
            }
            rotate = rotate + 0.2
        }
        window.requestAnimationFrame(rotateFn);
    };
    window.requestAnimationFrame(rotateFn);
    /*
        rotate function end
    */

    /*
        get song start
     */
    let id = "";
    try {
        id = location.search.split("id=")[1].split("&")[0];
    }catch (e) {}

    const getSongs: (id: string) => void = (id) => {
        doFetch({
            method: 'get',
            url: `song/detail?ids=${id}`
        });
    };

    useEffect((): void => {
        getSongs(id);
    }, [id]);

    /*
        get song end
    */

    const btnClick = () => {
        setContinueRotate(rotate);
        setRotateStart(!rotateStart);
        if (songAudio.current.paused) {
            songAudio.current.play();
            return
        }
        songAudio.current.pause();
    };

    return (
        <React.Fragment>
            <div style={style} className="song-background__cover">
                <div className="song-background__cover--mask" />
            </div>
            <div className="song__cover-container">
                <div className="song__cover--record-wrap">
                    <div className="song--record--image__cover">
                        <div onClick={btnClick} className="song--record--image__margin">
                            <div ref={rotateRef} className="song--record--image__rotate">
                                <img src={backImg}/>
                            </div>
                            {!rotateStart && (
                                <div className="song--record--play-btn">
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <Lyric id={id} start={rotateStart} songName={songName} songFrom={songFrom} singer={singer}/>
                <audio ref={songAudio} src={`https://music.163.com/song/media/outer/url?id=${id}.mp3`}>
                </audio>
                <div className="song--bottom--download-btn">
                    查看完整歌词 >
                </div>
                <div className="song--bottom--up-icon">
                    <i></i>
                </div>
            </div>
            <div className="song--bottom--download-btn--two">
                <span>打 开</span>
                <span>下 载</span>
            </div>
        </React.Fragment>
    );
};

export default Song