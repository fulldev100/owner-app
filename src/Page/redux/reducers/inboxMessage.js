import { INBOX_MESSAGE_LIST, LOADING_START_INBOX_MESSAGE, LOADING_END_INBOX_MESSAGE, INBOX_VIEW_MESSAGE_LIST } from '../constant/types';

const initialState = {
    loading: false,
    inboxData: [],
    inboxViewData: [],
}

export const inboxMessage = (state = initialState, action) => {
    switch (action.type) {
        case LOADING_START_INBOX_MESSAGE:
            return {
                ...state,
                loading: true,
            }
        case LOADING_END_INBOX_MESSAGE:
            return {
                ...state,
                loading: false,
            }
        case INBOX_MESSAGE_LIST:
            return {
                ...state,
                inboxData: action.data.result,
                loading: false,
            }
        case INBOX_VIEW_MESSAGE_LIST:
            return {
                ...state,
                inboxViewData: action.data.result,
                loading: false,
            }
        default:
            return state;
    }
}