import {
    cancelBookingClassAction,
    classBookingListAction,
    classBooingAction,
    classScheduleDataAction
} from '../../../util/action.js';
import { AlertHelper } from '../../App/AlertHelper';
import { t } from '../../../../locals';

import { BOOKING_LIST, ADD_BOOKING, CANCEL_BOOKING, GET_CLASS_SCHEDULE, LOADING_START_BOOKING, LOADING_END_BOOKING } from '../constant/types';

const myBookingData = data => ({
    type: BOOKING_LIST,
    data,
});

const dataStore = data => ({
    type: ADD_BOOKING,
    data,
});

const deleteBooking = data => ({
    type: CANCEL_BOOKING,
    data,
});

const fetchClassScheduleData = data => ({
    type: GET_CLASS_SCHEDULE,
    data,
});

const startLoading = () => ({
    type: LOADING_START_BOOKING
});

const endLoading = () => ({
    type: LOADING_END_BOOKING,
});

export const fetchBooking = (data) => dispatch => {

    classBookingListAction(data).then(responseJson => {
        if (responseJson.status == 1) {
            dispatch(myBookingData(responseJson));
        } else {
            dispatch(endLoading());
        }
    });
}

export const addBooking = (data) => dispatch => {

    classBooingAction(data).then(responseJson => {
        if (responseJson.status == 1) {
            AlertHelper.show('success', t("Success"), responseJson.error);
            dispatch(fetchClassSchedule(data));
            dispatch(fetchBooking(data));
        } else {
            dispatch(endLoading());
            AlertHelper.show('warn', t('Warning'), responseJson.error);
        }
    });

}

export const cancelBooking = (data) => dispatch => {
    dispatch(deleteBooking(data));
    cancelBookingClassAction(data).then(responseJson => {
        if (responseJson.status == 1) {
            dispatch(fetchClassSchedule(data));
            AlertHelper.show('success', t("Success"), responseJson.error);
            dispatch(endLoading());
        } else {
            dispatch(endLoading());
            AlertHelper.show('warn', t('Warning'), responseJson.error);
        }
    });
}

export const fetchClassSchedule = (data) => dispatch => {

    return classScheduleDataAction(data).then(responseJson => {
        if (responseJson.status == 1) {
            dispatch(fetchClassScheduleData(responseJson));
        } else {
            dispatch(endLoading());
            AlertHelper.show('warn', t('Warning'), responseJson.error);
        }
    });
}

export const loadingStart = () => dispatch => {
    dispatch(startLoading());
}