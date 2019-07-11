export interface IState {
    lastUpdated_hotLists: number;
    lastUpdated_newLists: number;
    hotLists: any[];
    newLists: any[];
}

export type Action =
    | {
    type: 'get hot lists';
    hotLists: any[];
}   | {
    type: 'get new songs';
    newLists: any[];
}
;

export const INITIAL_STATE: IState = {
    lastUpdated_hotLists: 0,
    lastUpdated_newLists: 0,
    hotLists: [],
    newLists: []
};