import { NUTRITION_LIST, LOADING_START_NUTRITION, LOADING_END_NUTRITION } from '../constant/types';

const initialState = {
    loading: false,
    nutritionData:[],
}

export const nutrition = (state = initialState, action) => {
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
        case NUTRITION_LIST:
            return {
                ...state,
                nutritionData:action.data.result,
                loading: false,
            }
        default:
            return state;
    }
}