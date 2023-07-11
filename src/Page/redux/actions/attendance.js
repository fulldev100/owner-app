import {
    memberClassAction, memberNameAction, takeAttendanceAction
} from '../../../util/action.js';
import { AlertHelper } from '../../App/AlertHelper';
import { t } from '../../../../locals';

import { MEMBER_CLASS_LIST, MEMBER_DATA_LIST, LOADING_START_ATTENDANCE, LOADING_END_ATTENDANCE } from '../constant/types';

const memberClassData = data => ({
    type: MEMBER_CLASS_LIST,
    data,
});

const memberData = data => ({
    type: MEMBER_DATA_LIST,
    data,
});

const startLoading = () => ({
    type: LOADING_START_ATTENDANCE
});

const endLoading = () => ({
    type: LOADING_END_ATTENDANCE
});

export const fetchMemberClasslist = (data) => dispatch => {

    memberClassAction(data).then(responseJson => {
        if (responseJson.status == 1) {
            dispatch(memberClassData(responseJson));
        } else {
            dispatch(endLoading());
            AlertHelper.show('warn', t('Warning'), responseJson.error);
        }
    });

}

export const takeMemberAttendance = (data) => dispatch => {
    takeAttendanceAction(data).then(responseJson => {
        if (responseJson.status == 1) {
            AlertHelper.show('success', t("Success"), responseJson.error);
            dispatch(endLoading());
        } else {
            dispatch(endLoading());
            AlertHelper.show('warn', t('Warning'), responseJson.error);
        }
    });
}

export const memberDataList = (data) => dispatch => {
    memberNameAction(data).then(responseJson => {
        if (responseJson.status == 1) {
            dispatch(memberData(responseJson));
        } else {
            dispatch(endLoading());
            AlertHelper.show('warn', t('Warning'), responseJson.error);
        }
    });
}

export const loadingStart = () => dispatch => {
    dispatch(startLoading());
}

export const loadingEnd = () => dispatch => {
    dispatch(endLoading());
}