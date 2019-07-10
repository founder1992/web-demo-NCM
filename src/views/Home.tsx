import React, { useCallback, useEffect, useState } from 'react';
import {useMappedState, useDispatch} from '@store';
import useStateRequest from '@hooks/useStateRequest'
import useStoreRequest from '@hooks/useStoreRequest'

import Header from '@components/header'

export default function Home() {
    let someValue: string = "this is a string!";

    let strLength: number = (someValue as string).length;

    const {lastUpdated, todos} = useMappedState(
        useCallback(
            (state: any) => ({
                lastUpdated: state.add.lastUpdated,
                todos: state.add.todos,
            }),
            [],
        ),
    );

    const [skip, setSkip] = useState(0);

    const dispatch = useDispatch();

    const { data, isLoading, isError, doFetch } : { data: any, isLoading: boolean, isError: boolean, doFetch: any} = useStateRequest();

    const { doRequest } = useStoreRequest();


    const addStateData = (skip = 0) => {
        doFetch({
            method: 'get',
            url: 'accounts/getUser',
            params: {
                access_token: 'WycMrJ0FPgfgXKdijV6GVP5cdOpCTKaaMB5iIOHEsNntAAKaGy3DEjz1ebgoVwob',
                filter: {
                    "limit": 1,
                    "skip": skip
                }
            }
        });
    };

    const addStoreData = () => {
        doRequest(
            {
                method: 'get',
                url: 'accounts/me?access_token=WycMrJ0FPgfgXKdijV6GVP5cdOpCTKaaMB5iIOHEsNntAAKaGy3DEjz1ebgoVwob'
            },
            {
                callback: (data: {username: string}) => dispatch({type: 'add todo', todo: data.username})
            }
        )
    };

    useEffect(() => {
        // addStateData();
        // addStoreData()
    }, []);

    return (
        <div>
            <Header />

            <button id="test" onClick={addStoreData}>async add store Data</button>
            <button onClick={() => {addStateData(skip); setSkip(skip + 1)}}>async add state Data</button>
        </div>
    );
}