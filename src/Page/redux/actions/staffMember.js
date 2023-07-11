import {
    staffMemberListAction,
} from '../../../util/action.js';
import { AlertHelper } from '../../App/AlertHelper';
import { t } from '../../../../locals';

import { STAFFMEMBER_LIST, LOADING_START_STAFF, LOADING_END_STAFF } from '../constant/types';

const staffMemberData = data => ({
    type: STAFFMEMBER_LIST,
    data,
});

const startLoading = () => ({
    type: LOADING_START_STAFF
});

const endLoading = () => ({
    type: LOADING_END_STAFF
});

export const fetchStaffmemberlist = (data) => dispatch => {
    
    staffMemberListAction(data).then(responseJson => {
        if (responseJson.status == 1) {
            dispatch(staffMemberData(responseJson));
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