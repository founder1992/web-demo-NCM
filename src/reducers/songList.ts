import {Action, IState, INITIAL_STATE} from '@actions/songList';

export default function reducer(state: IState = INITIAL_STATE, action: Action) {
    switch (action.type) {
        case 'get hot lists': {
            return {
                ...state,
                lastUpdated_hotLists: Date.now(),
                hotLists: action.hotLists,
            };
        }
        case 'get new songs': {
            return {
                ...state,
                lastUpdated_newLists: Date.now(),
                newLists: action.newLists,
            };
        }
        case 'get board songs': {
            return {
                ...state,
                lastUpdated_boardSongs: {...state.lastUpdated_boardSongs, [action.idx]: Date.now()},
                boardSongs: {...state.boardSongs, [action.idx]: action.boardSongs},
            };
        }
        default:
            return state;
    }
}