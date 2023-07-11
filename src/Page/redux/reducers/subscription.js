import { SUBSCRIPTION_LIST, LOADING_START_SUBSCRIPTION, LOADING_END_SUBSCRIPTION } from '../constant/types';

const initialState = {
    loading: false,
    subscriptionData:[]
}

export const subscription = (state = initialState, action) => {
    switch (action.type) {
        case LOADING_START_SUBSCRIPTION:
            return {
                ...state,
                loading: true,
            }
        case LOADING_END_SUBSCRIPTION:
            return {
                ...state,
                loading: false,
            }
        case SUBSCRIPTION_LIST:
            return {
                ...state,
                subscriptionData:action.data.result,
                loading: false,
            }
        default:
            return state;
    }
}