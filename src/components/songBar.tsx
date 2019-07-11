import React from 'react';

/*
    description:  歌曲条
 */

export interface ISongBarProps {
    name: string,
    authors: string[],
    album: string,
    exclusive: boolean
}

export default function SongBar(props: { data: ISongBarProps, key: string, index: number }) {
    const { data , key , index } = props;
    const { name, authors, album, exclusive } = data;
    return (
        <div key={key} className="component-bar__song--sample-container border--solid--1px--gray">
            <div className="component-bar__song--sample--info">
                <div className="component-bar__song--sample--name">
                    {name}
                </div>
                <div className="component-bar__song--sample--authors">
                    {exclusive && <i className="icon--exclusive" />}
                    {authors.join(' / ')}
                    {" - "}
                    {album}
                </div>
            </div>
            <div className="component-bar__song--sample--start">
                <span />
            </div>
        </div>
    )
}