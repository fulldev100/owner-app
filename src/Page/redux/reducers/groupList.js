import { GROUP_LIST, LOADING_START_GROUP_TYPE, LOADING_END_GROUP_TYPE } from '../constant/types';

const initialState = {
    loading: false,
    GroupData:[],
    ViewGroupData:[],
    GroupName:'',
    GroupMessage:''
}

export const groupList = (state = initialState, action) => {
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
        case GROUP_LIST:
            return {
                ...state,
                GroupData:action.data.result,
                loading: false,
            }
        default:
            return state;
    }
}