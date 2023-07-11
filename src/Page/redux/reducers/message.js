import { LOADING_START_MESSAGE, LOADING_END_MESSAGE, SENT_MESSAGE_LIST, MEMBER_AND_STAFF_LIST, SENT_VIEW_MESSAGE_LIST } from '../constant/types';

const initialState = {
    loading: false,
    sentData:[],
    staffData:[],
    ViewData:[],
}

export const message = (state = initialState, action) => {
    switch (action.type) {
        case LOADING_START_MESSAGE:
            return {
                ...state,
                loading: true,
            }
        case LOADING_END_MESSAGE:
            return {
                ...state,
                loading: false,
            }
        case SENT_MESSAGE_LIST:
            return {
                ...state,
                sentData:action.data.result,
                loading: false,
            }
        case MEMBER_AND_STAFF_LIST:
            return {
                ...state,
                staffData:action.data.Member_Staff_Member,
                loading: false,
            }
        case SENT_VIEW_MESSAGE_LIST:
            return {
                ...state,
                ViewData:action.data.result,
                loading: false,
            }
        default:
            return state;
    }
}