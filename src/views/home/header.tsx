import React from 'react';
import { useEffect, useState, useCallback } from 'react';
import useStoreRequest from '@hooks/useStoreRequest'
import {useMappedState, useDispatch} from '@store';
import SongBlock, { SongBlockType, ISongBlockProps } from '@components/songBlock'
import config from "@/config";

/*
    description:  首页引导下载头部
 */

const Header = React.memo(function (props: {toggled: boolean; init: boolean, rh: any}) {
    const idx = 3;
    const { toggled, init, rh } = props;
    const headerClass = "header" + (toggled ? " header--toggled" : (!init && " header--toggled--back" || ""));

    const { doRequest } = useStoreRequest();
    const dispatch = useDispatch();

    const { lastUpdated_boardSongs, boardSongs } = useMappedState(
        useCallback(
            (state: any) => ({
                lastUpdated_boardSongs: state.songList.lastUpdated_boardSongs,
                boardSongs: state.songList.boardSongs
            }),
            [idx],
        ),
    );

    const board  = boardSongs[idx];
    const title = board && board.playlist && board.playlist.name;
    const songs = board && board.playlist.tracks && board.playlist.tracks.slice(0, 4) || [];

    const standardSongs = songs.map((v: any): ISongBlockProps => {return {
        type: SongBlockType.S, name: v.name,
        picUrl: v.al.picUrl,
        author: v.ar[0].name,
        id: v.id
    }});

    const getSongs = (type: number): void => {
        if (standardSongs.length) return;
        if (standardSongs.length && lastUpdated_boardSongs[idx] && Date.now() - lastUpdated_boardSongs[idx] < config.searchLimit * 60 * 1000) return;
        doRequest(
            {
                method: 'get',
                url: `top/list?idx=${type}`
            },
            {
                callback: (data: {playlist: any[]}) => dispatch({type: 'get board songs', boardSongs: data, idx: type})
            }
        )
    };

    useEffect(() => {
        getSongs(idx)
    }, []);

    const handleClick = (id: string | undefined) => {
        rh.push(`/song?id=${id}`)
    };

    return (
        <header>
            <div className={headerClass}>
                <div className={toggled ? "header__element--toggled" : (!init && " header__element--toggled--back" || "")}>
                    <div className="header-logo">
                        <img src={require('@img/header_logo_3x.png')} />
                    </div>
                    <div className="header-content">
                        <div className="header-content__description--middle">
                            {title}
                        </div>
                        <div className="header-content_songs--small">
                            {standardSongs.map((v: ISongBlockProps) => {
                                return (
                                    <div key={v.type + v.name + v.author} onClick={() => handleClick(v.id)}>
                                        <SongBlock key={v.type + v.name + v.author} data={v} />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <button className="header-button_download--white">下载APP</button>
                </div>
                {toggled && (
                    <div className="header-content--toggled">
                        <div className="header-logo--toggled">
                            <img src={require('@img/header_logo_3x.png')} />
                        </div>
                        <div className="header-button_download--white--toggled">
                            下载APP
                        </div>
                    </div>
                )}
            </div>
            {toggled && <div className="header-stuff" />}
        </header>
    )
}
);

export default Header