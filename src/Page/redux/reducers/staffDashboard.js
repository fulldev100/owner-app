import { STAFF_CLASS_LIST, STAFF_RESERVATION_LIST, STAFF_MEMBERSHIP_LIST, STAFF_GROUP_LIST, LOADING_START_STAFF_DASHBOARD, LOADING_END_STAFF_DASHBOARD, STAFF_ACTIVITY_LIST } from '../constant/types';

const initialState = {
    loading: false,
    activityData: [],
    groupData: [],
    membershipData: [],
    reservationData: [],
    ClassData: [],
}

export const staffDashboard = (state = initialState, action) => {
    switch (action.type) {
        case LOADING_START_STAFF_DASHBOARD:
            return {
                ...state,
                loading: true,
            }
        case LOADING_END_STAFF_DASHBOARD:
            return {
                ...state,
                loading: false,
            }
        case STAFF_ACTIVITY_LIST:
            return {
                ...state,
                activityData: action.data.result,
                loading: false,
            }
        case STAFF_GROUP_LIST:
            return {
                ...state,
                groupData: action.data.result,
                loading: false,
            }
        case STAFF_MEMBERSHIP_LIST:
            return {
                ...state,
                membershipData: action.data.result,
                loading: false,
            }
        case STAFF_RESERVATION_LIST:
            return {
                ...state,
                reservationData: action.data.result,
                loading: false,
            }
        case STAFF_CLASS_LIST:
            return {
                ...state,
                ClassData: action.data.result,
                loading: false,
            }
        default:
            return state;
    }
}