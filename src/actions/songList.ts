export interface IState {
    lastUpdated_hotLists: number;
    lastUpdated_newLists: number;
    lastUpdated_boardSongs: any;
    hotLists: any[];
    newLists: any[];
    boardSongs: any
}

export type Action =
    {
    type: 'get hot lists';
    hotLists: any[];
}   | {
    type: 'get new songs';
    newLists: any[];
}   | {
    type: 'get board songs';
    idx: number;
    boardSongs: any;
}
;

export const INITIAL_STATE: IState = {
    lastUpdated_hotLists: 0,
    lastUpdated_newLists: 0,
    lastUpdated_boardSongs: {},
    hotLists: [],
    newLists: [],
    boardSongs: {}
};