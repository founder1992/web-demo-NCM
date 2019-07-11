import React from 'react';
import { useEffect } from 'react';
import useStateRequest from '@hooks/useStateRequest'
import SongBlock, {SongBlockType, ISongBlockProps} from '@components/songBlock'

/*
    description:  首页引导下载头部
 */

export default function Header() {
    const { data, doFetch } : { data: any, isLoading: boolean, isError: boolean, doFetch: any} = useStateRequest();
    const { playlist } = data;
    const title = playlist && playlist.name;
    const songs = playlist && playlist.tracks && playlist.tracks.slice(0, 4) || [];
    const standardSongs = songs.map((v: any) => {return {
        type: "small", name: v.name,
        picUrl: v.al.picUrl,
        author: v.ar[0].name
    }});

    const getSongs = (type: number) => {
        doFetch({
            method: 'get',
            url: `top/list?idx=${type}`
        });
    };

    useEffect(() => {
        getSongs(1)
    }, []);

    return (
        <header>
            <div className="header">
                <div className="header-logo">
                    <img src={require('@img/header_logo_3x.png')} />
                </div>
                <div className="header-content">
                    <div className="header-content__description--middle">
                        {title}
                    </div>
                    <div className="header-content_songs--small">
                        {standardSongs.map((v: ISongBlockProps) => {
                            return <SongBlock key={v.type + v.name + v.author} data={v} />
                        })}
                    </div>
                </div>
                <button className="header-button_download--white">下载APP</button>
            </div>
        </header>
    )
}