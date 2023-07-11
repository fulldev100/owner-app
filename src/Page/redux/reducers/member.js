import { LOADING_START_MEMBER, LOADING_END_MEMBER, ALL_CLASS_LIST, ATTENDANCE_DATA } from '../constant/types';

const initialState = {
    loading: false,
    allClassList: [],
    attendanceData: [],
}

export const member = (state = initialState, action) => {
    switch (action.type) {
        case LOADING_START_MEMBER:
            return {
                ...state,
                loading: true,
            }
        case LOADING_END_MEMBER:
            return {
                ...state,
                loading: false,
            }
        case ALL_CLASS_LIST:
            return {
                ...state,
                allClassList: action.data.result,
                loading: false,
            }
        case ATTENDANCE_DATA:
            return {
                ...state,
                attendanceData: action.data.result,
                loading: false,
            }
        default:
            return state;
    }
}