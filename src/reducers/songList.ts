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
        default:
            return state;
    }
}