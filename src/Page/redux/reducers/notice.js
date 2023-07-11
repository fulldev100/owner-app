import { NOTICE_LIST, LOADING_START_NOTICE, LOADING_END_NOTICE } from '../constant/types';

const initialState = {
    loading: false,
    noticeData:[],
}

export const notice = (state = initialState, action) => {
    switch (action.type) {
        case LOADING_START_NOTICE:
            return {
                ...state,
                loading: true,
            }
        case LOADING_END_NOTICE:
            return {
                ...state,
                loading: false,
            }
        case NOTICE_LIST:
            return {
                ...state,
                noticeData:action.data.result,
                loading: false,
            }
        default:
            return state;
    }
}