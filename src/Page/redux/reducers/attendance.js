import { MEMBER_CLASS_LIST, LOADING_START_ATTENDANCE, LOADING_END_ATTENDANCE, MEMBER_DATA_LIST } from '../constant/types';

const initialState = {
    loading: false,
    memberClassData:[],
    memberData:[],
}

export const attendance = (state = initialState, action) => {
    switch (action.type) {
        case LOADING_START_ATTENDANCE:
            return {
                ...state,
                loading: true,
            }
        case LOADING_END_ATTENDANCE:
            return {
                ...state,
                loading: false,
            }
        case MEMBER_CLASS_LIST:
            return {
                ...state,
                memberClassData:action.data.result,
                loading: false,
            }
        case MEMBER_DATA_LIST:
            return {
                ...state,
                memberData:action.data.result,
                loading: false,
            }
        default:
            return state;
    }
}