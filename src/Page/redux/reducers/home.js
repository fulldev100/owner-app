import { MY_HOME, LOADING_START_NUTRITION, LOADING_END_NUTRITION } from '../constant/types';

const initialState = {
    loading: false,
    homeData:[],
}

export const home = (state = initialState, action) => {
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
        case MY_HOME:
            return {
                ...state,
                homeData:action.data.result,
                loading: false,
            }
        default:
            return state;
    }
}