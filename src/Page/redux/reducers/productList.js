import { PRODUCTGROUP_LIST, LOADING_START_GROUP_TYPE, LOADING_END_GROUP_TYPE } from '../constant/types';

const initialState = {
    loading: false,
    ProductData:[],
    ViewProductData:[],
    ProductName:'',
    ProductMessage:''
}

export const productList = (state = initialState, action) => {
    switch (action.type) {
        case LOADING_START_GROUP_TYPE:
            return {
                ...state,
                loading: true,
            }
        case LOADING_END_GROUP_TYPE:
            return {
                ...state,
                loading: false,
            }
        case PRODUCTGROUP_LIST:
            return {
                ...state,
                ProductData:action.data.result,
                loading: false,
            }
        default:
            return state;
    }
}