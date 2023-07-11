import { HISTORY_LIST, LOADING_START_NUTRITION, LOADING_END_NUTRITION } from '../constant/types';

const initialState = {
    loading: false,
    historyData:[],
}

export const history = (state = initialState, action) => {
    switch (action.type) {
        case LOADING_START_NUTRITION:
            return {
                ...state,
                loading: true,
            }
        case LOADING_END_NUTRITION:
            return {
                ...state,
                loading: false,
            }
        case HISTORY_LIST:
            return {
                ...state,
                historyData:action.data.result,
                loading: false,
            }
        default:
            return state;
    }
}