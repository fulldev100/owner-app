import { STAFFMEMBER_LIST, LOADING_START_STAFF, LOADING_END_STAFF } from '../constant/types';

const initialState = {
    loading: false,
    staffMemberData:[]
}

export const staffMember = (state = initialState, action) => {
    switch (action.type) {
        case LOADING_START_STAFF:
            return {
                ...state,
                loading: true,
            }
        case LOADING_END_STAFF:
            return {
                ...state,
                loading: false,
            }
        case STAFFMEMBER_LIST:
            return {
                ...state,
                staffMemberData:action.data.result,
                loading: false,
            }
        default:
            return state;
    }
}