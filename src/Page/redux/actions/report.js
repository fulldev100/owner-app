import { dashboardReportAction, feeReportAction, incomeReportAction, membershipReportAction, sellReportAction, staffAttendanceAction } from '../../../util/action.js';
import { AlertHelper } from '../../App/AlertHelper';
import { t } from '../../../../locals';

import { FESS_PAYMENT_REPORT, INCOME_PAYMENT_REPORT, LOADING_END_REPORT_DASHBOARD, LOADING_START_REPORT_DASHBOARD, MEMBERSHIP_REPORT, MEMBER_ATTENDANCE_REPORT, SELL_PRODUCT_REPORT, STAFF_ATTENDANCE_REPORT } from '../constant/types';

const memberAttendanceData = data => ({
    type: MEMBER_ATTENDANCE_REPORT,
    data
});

const staffAttendanceData = data => ({
    type: STAFF_ATTENDANCE_REPORT,
    data
});

const feesPaymentData = data => ({
    type: FESS_PAYMENT_REPORT,
    data
});

const incomepaymentData = data => ({
    type: INCOME_PAYMENT_REPORT,
    data
});

const sellproductData = data => ({
    type: SELL_PRODUCT_REPORT,
    data
});

const membershipData = data => ({
    type: MEMBERSHIP_REPORT,
    data
});

const startLoading = () => ({
    type: LOADING_START_REPORT_DASHBOARD
});

const endLoading = () => ({
    type: LOADING_END_REPORT_DASHBOARD
});

export const fetchmemberAttendance = (data) => dispatch => {
    
    dashboardReportAction(data).then(responseJson => {
        if (responseJson.status == 1) {
            dispatch(memberAttendanceData(responseJson));
        } else {
            dispatch(endLoading());
        }
    });

}

export const fetchstaffAttendance = (data) => dispatch => {
    
    staffAttendanceAction(data).then(responseJson => {
        if (responseJson.status == 1) {
            dispatch(staffAttendanceData(responseJson));
        } else {
            dispatch(endLoading());
        }
    });

}

export const fetchfeesPayment = (data) => dispatch => {
    
    feeReportAction(data).then(responseJson => {
        if (responseJson.status == 1) {
            dispatch(feesPaymentData(responseJson));
        } else {
            dispatch(endLoading());
        }
    });

}

export const fetchincomePayment = (data) => dispatch => {
    
    incomeReportAction(data).then(responseJson => {
        if (responseJson.status == 1) {
            dispatch(incomepaymentData(responseJson));
        } else {
            dispatch(endLoading());
        }
    });

}

export const fetchsellproduct = (data) => dispatch => {
    
    sellReportAction(data).then(responseJson => {
        if (responseJson.status == 1) {
            dispatch(sellproductData(responseJson));
        } else {
            dispatch(endLoading());
        }
    });

}

export const fetchmembership = (data) => dispatch => {
    
    membershipReportAction(data).then(responseJson => {
        if (responseJson.status == 1) {
            dispatch(membershipData(responseJson));
        } else {
            dispatch(endLoading());
        }
    });

}

export const loadingStart = () => dispatch => {
        dispatch(startLoading());
}

export const loadingEnd = () => dispatch => {
    dispatch(endLoading());
}