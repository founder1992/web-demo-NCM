import React from 'react';

/*
    description:  歌曲块
 */

export enum SongBlockType {
    S = "small",
    C = "common",
}

export interface SongBlockProps {
    type: SongBlockType,
    name?: string,
    picUrl: string,
    author?: string,
    description?: string,
    lName?: number
}

export default function SongBlock(props: { data: SongBlockProps, key: string }) {
    const { type, name, picUrl, author, description, lName } = props.data;
    return (
        <div className="block-container__song--small">
            <img className="block-container__song--small-img" src={picUrl} />
            <div>{name}</div>
            <div>{author}</div>
        </div>
    )
}