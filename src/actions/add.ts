export interface IState {
    lastUpdated: number;
    todos: string[];
}

export type Action =
    | {
    type: 'add todo';
    todo: string;
}
    | {
    type: 'delete todo';
    index: number;
};

export const INITIAL_STATE: IState = {
    lastUpdated: 0,
    todos: [
        'Init Store Data'
    ],
};