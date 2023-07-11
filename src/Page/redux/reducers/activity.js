import { ACTIVITY_LIST, LOADING_START_ACTIVITY, LOADING_END_ACTIVITY } from '../constant/types';

const initialState = {
    loading: false,
    activityData:[],
}

export const activity = (state = initialState, action) => {
    switch (action.type) {
        case LOADING_START_ACTIVITY:
            return {
                ...state,
                loading: true,
            }
        case LOADING_END_ACTIVITY:
            return {
                ...state,
                loading: false,
            }
        case ACTIVITY_LIST:
            return {
                ...state,
                activityData:action.data.result,
                loading: false,
            }
        default:
            return state;
    }
}