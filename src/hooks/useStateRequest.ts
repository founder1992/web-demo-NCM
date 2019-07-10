import {useCallback, useEffect, useState} from 'react';
import axios from 'axios'
axios.defaults.baseURL = process.env.BASEURL;

const useStateRequest = () => {
    interface IFilter {
        url?: string;
        method?: string;
    }

    const [data, setData] = useState({});
    const [filter, setFilter] : [IFilter, any] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        if (filter.url) {
            const fetchData = async () => {
                setIsError(false);
                setIsLoading(true);

                try {
                    // @ts-ignore
                    const result = await axios(filter);

                    setData(result.data);
                } catch (error) {
                    setIsError(true);
                }

                setIsLoading(false);
            };

            fetchData();
        }
    }, [filter]);

    const doFetch = (filter: object) => {
        setFilter(filter);
    };

    return { data, isLoading, isError, doFetch };
};

export default useStateRequest
