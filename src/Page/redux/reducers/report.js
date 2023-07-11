import { SELL_PRODUCT_REPORT, INCOME_PAYMENT_REPORT, FESS_PAYMENT_REPORT, STAFF_ATTENDANCE_REPORT, LOADING_START_REPORT_DASHBOARD, LOADING_END_REPORT_DASHBOARD, MEMBER_ATTENDANCE_REPORT, MEMBERSHIP_REPORT } from '../constant/types';

const initialState = {
    loading: false,
    memberAttendanceData: [],
    staffAttendanceData: [],
    feesPaymentData: [],
    incomePaymentData: [],
    sellProductData: [],
    membershipData: [],
}

export const report = (state = initialState, action) => {
    switch (action.type) {
        case LOADING_START_REPORT_DASHBOARD:
            return {
                ...state,
                loading: true,
            }
        case LOADING_END_REPORT_DASHBOARD:
            return {
                ...state,
                loading: false,
            }
        case MEMBER_ATTENDANCE_REPORT:
            return {
                ...state,
                memberAttendanceData: action.data.result,
                loading: false,
            }
        case STAFF_ATTENDANCE_REPORT:
            return {
                ...state,
                staffAttendanceData: action.data.result,
                loading: false,
            }
        case FESS_PAYMENT_REPORT:
            return {
                ...state,
                feesPaymentData: action.data.result,
                loading: false,
            }
        case INCOME_PAYMENT_REPORT:
            return {
                ...state,
                incomePaymentData: action.data.result,
                loading: false,
            }
        case SELL_PRODUCT_REPORT:
            return {
                ...state,
                sellProductData: action.data.result,
                loading: false,
            }
        case MEMBERSHIP_REPORT:
            return {
                ...state,
                membershipData: action.data.result,
                loading: false,
            }
        default:
            return state;
    }
}