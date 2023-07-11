import { PRODUCT_LIST, LOADING_START_NUTRITION, LOADING_END_NUTRITION } from '../constant/types';

const initialState = {
    loading: false,
    productData:[],
}

export const product = (state = initialState, action) => {
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
        case PRODUCT_LIST:
            return {
                ...state,
                productData:action.data.result,
                loading: false,
            }
        default:
            return state;
    }
}