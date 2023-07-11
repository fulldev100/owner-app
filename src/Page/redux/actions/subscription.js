import {
    subscriptionHistoryAction,
} from '../../../util/action.js';
import { AlertHelper } from '../../App/AlertHelper';
import { t } from '../../../../locals';

import { SUBSCRIPTION_LIST, LOADING_START_SUBSCRIPTION, LOADING_END_SUBSCRIPTION } from '../constant/types';

const subscriptionData = data => ({
    type: SUBSCRIPTION_LIST,
    data,
});

const startLoading = () => ({
    type: LOADING_START_SUBSCRIPTION
});

const endLoading = () => ({
    type: LOADING_END_SUBSCRIPTION
});

export const fetchSubscriptionlist = (data) => dispatch => {
    
    subscriptionHistoryAction(data).then(responseJson => {
        if (responseJson.status == 1) {
            dispatch(subscriptionData(responseJson));
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