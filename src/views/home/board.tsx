import React from 'react';
import { useEffect, useCallback } from 'react';
import useStoreRequest from "@hooks/useStoreRequest";
import {useDispatch, useMappedState} from "@store";
import config from "@/config";
import SongBar, { ISongBarProps, SongBarType } from "@components/songBar";

/*
    description:  首页热歌榜
 */

export default function Board() {
    const idx = 1;
    const { doRequest } = useStoreRequest();
    const dispatch = useDispatch();

    const { lastUpdated_boardSongs, boardSongs } = useMappedState(
        useCallback(
            (state: any) => ({
                lastUpdated_boardSongs: state.songList.lastUpdated_boardSongs,
                boardSongs: state.songList.boardSongs
            }),
            [],
        ),
    );

    const board  = boardSongs[idx];
    const title = board && board.playlist && board.playlist.name;
    const songs = board && board.playlist.tracks && board.playlist.tracks.slice(0, 20) || [];

    const standardSongs = songs.map((v: any): ISongBarProps => {return {
        name: v.name,
        authors: v.ar.map((v: any) => v.name),
        album: v.al.name,
        exclusive: v.no <= 1
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

    return (
        <div className="body-content__board">
            <div className="body-content__board--top">
                <div className="body-content__board--top__title">
                    <div />
                    <div>更新日期： 07月11日</div>
                </div>
            </div>
            <React.Fragment>
                {standardSongs.map((v: ISongBarProps, index: number) => {
                    return <SongBar key={v.album + v.name} data={v} index={index} type={SongBarType.I} />
                })}
            </React.Fragment>
            <div className="body-content__board--footer">
                查看完整榜单 >
            </div>
        </div>
    )
}