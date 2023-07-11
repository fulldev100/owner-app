import { USER_LOGOUT, GET_USER_DETAILS, LOADING_START_SIGNUP, LOADING_END_SIGNUP, MEMBERSHIP_DROPDOWN_LIST, MEMBERSHIP_CLASS_LIST, MEMBERSHIP_DAYS, SIGNUP_SUCCESS } from '../constant/types';

const initialState = {
    loading: false,
    membershipData: [],
    membershipClassData: [],
    membershipDays: [],
    userData: '',
}

export const auth = (state = initialState, action) => {
    switch (action.type) {
        case LOADING_START_SIGNUP:
            return {
                ...state,
                loading: true,
            }
        case LOADING_END_SIGNUP:
            return {
                ...state,
                loading: false,
            }
        case USER_LOGOUT:
            return {
                ...state,
                loading: false,
            }
        case MEMBERSHIP_DROPDOWN_LIST:
            return {
                ...state,
                membershipData: action.data.result,
                loading: false,
            }
        case MEMBERSHIP_CLASS_LIST:
            return {
                ...state,
                membershipClassData: action.data.result,
                loading: false,
            }
        case MEMBERSHIP_DAYS:
            return {
                ...state,
                membershipDays: action.data.membership_days,
                loading: false,
            }
        case SIGNUP_SUCCESS:
            return {
                ...state,
                loading: false,
            }
        case GET_USER_DETAILS:
            return {
                ...state,
                userData: action.data.result,
                loading: false,
            }
        default:
            return state;
    }
}