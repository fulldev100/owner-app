import {
    memberShipListAction,
} from '../../../util/action.js';
import { AlertHelper } from '../../App/AlertHelper';
import { t } from '../../../../locals';

import { MEMBERSHIP_LIST, LOADING_START_MEMBERSHIP_TYPE, LOADING_END_MEMBERSHIP_TYPE } from '../constant/types';

const membershipData = data => ({
    type: MEMBERSHIP_LIST,
    data,
});

const startLoading = () => ({
    type: LOADING_START_MEMBERSHIP_TYPE
});

const endLoading = () => ({
    type: LOADING_END_MEMBERSHIP_TYPE
});

export const fetchMembershiplist = (data) => dispatch => {
    
    memberShipListAction(data).then(responseJson => {
        if (responseJson.status == 1) {
            dispatch(membershipData(responseJson));
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