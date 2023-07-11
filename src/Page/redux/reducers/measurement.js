import { ADD_MEASUREMENT, LOADING_START_MEASUREMENT, LOADING_END_MEASUREMENT, MEASUREMENT_LIST } from '../constant/types';

const initialState = {
    loading: false,
    measurementList:[]
}

export const measurement = (state = initialState, action) => {
    switch (action.type) {
        case LOADING_START_MEASUREMENT:
            return {
                ...state,
                loading: true,
            }
        case LOADING_END_MEASUREMENT:
            return {
                ...state,
                loading: false,
            }
        case ADD_MEASUREMENT:
            return {
                ...state,
            }
        case MEASUREMENT_LIST:
            return {
                ...state,
                measurementList:action.data.result,
                loading: false,
            }
        default:
            return state;
    }
}