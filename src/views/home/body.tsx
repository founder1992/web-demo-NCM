import React from 'react';
import { useEffect, useState, useCallback } from 'react';
import {useMappedState, useDispatch} from '@store';
import useStoreRequest from '@hooks/useStoreRequest'
import SwitchBar from '@components/switchBar'
import HotMusic from '@views/home/hotMusic'

import Board from '@views/home/board'
import Search from '@views/home/search'
import config from '@/config'

/*
    description:  首页内容部分
 */

export default function Body() {
    const [titles, setTitles] = useState(["推荐音乐", "热歌榜", "搜索"]);
    const [current, setCurrent] = useState("推荐音乐");
    const { doRequest } = useStoreRequest();
    const doRequest_newSongs = useStoreRequest().doRequest;
    const dispatch = useDispatch();

    const { hotListLastUpdated, hotLists, newListLastUpdated, newLists } = useMappedState(
        useCallback(
            (state: any) => ({
                hotListLastUpdated: state.songList.lastUpdated_hotLists,
                hotLists: state.songList.hotLists,
                newListLastUpdated: state.songList.lastUpdated_newLists,
                newLists: state.songList.newLists
            }),
            [],
        ),
    );

    const click = (v: string): void => {
      setCurrent(v)
    };

    const getHotSongLists = (): void => {
        if (hotLists.length) return;
        if (hotListLastUpdated && Date.now() - hotListLastUpdated < config.searchLimit * 60 * 1000) return;
        doRequest(
            {
                method: 'get',
                url: 'top/playlist/highquality?limit=6'
            },
            {
                callback: (data: {playlists: any[]}) => dispatch({type: 'get hot lists', hotLists: data.playlists})
            }
        )
    };

    const getNewSongs = (): void => {
        if (newLists.length) return;
        if (newListLastUpdated && Date.now() - newListLastUpdated < config.searchLimit * 60 * 1000) return;
        doRequest_newSongs(
            {
                method: 'get',
                url: 'personalized/newsong'
            },
            {
                callback: (data: {result: any[]}) => dispatch({type: 'get new songs', newLists: data.result})
            }
        )
    };
    
    function getContent(type: string): void {
        type === titles[0] && getHotSongLists();
        type === titles[0] && getNewSongs();
    }

    useEffect((): void => {
        getContent(current);
    }, [current]);

    return (
        <section>
            <SwitchBar key="switch-bar" titles={titles} current={current} click={click} />
            {current === "推荐音乐" && <HotMusic songList={hotLists} newSongs={newLists}/>}
            {current === "热歌榜" && <Board />}
            {current === "搜索" && <Search />}
        </section>
    )
}