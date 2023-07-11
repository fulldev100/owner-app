import { MEMBERSHIP_LIST, LOADING_START_MEMBERSHIP_TYPE, LOADING_END_MEMBERSHIP_TYPE } from '../constant/types';

const initialState = {
    loading: false,
    MemberShipData:[]
}

export const membershipType = (state = initialState, action) => {
    switch (action.type) {
        case LOADING_START_MEMBERSHIP_TYPE:
            return {
                ...state,
                loading: true,
            }
        case LOADING_END_MEMBERSHIP_TYPE:
            return {
                ...state,
                loading: false,
            }
        case MEMBERSHIP_LIST:
            return {
                ...state,
                MemberShipData:action.data.result,
                loading: false,
            }
        default:
            return state;
    }
}