import {
    inboxmessagelistAction, replymessageListAction, sendreplyMessageAction
} from '../../../util/action.js';
import { AlertHelper } from '../../App/AlertHelper';
import { t } from '../../../../locals';

import { INBOX_MESSAGE_LIST, INBOX_VIEW_MESSAGE_LIST, LOADING_START_INBOX_MESSAGE, LOADING_END_INBOX_MESSAGE } from '../constant/types';

const inboxMessageData = data => ({
    type: INBOX_MESSAGE_LIST,
    data,
});

const inboxViewMessageData = data => ({
    type: INBOX_VIEW_MESSAGE_LIST,
    data,
});

const startLoading = () => ({
    type: LOADING_START_INBOX_MESSAGE
});

const endLoading = () => ({
    type: LOADING_END_INBOX_MESSAGE
});

// inbox message action

export const fetchInboxmessagelist = (data) => dispatch => {
    
    inboxmessagelistAction(data).then(responseJson => {
        if (responseJson.status == 1) {
            dispatch(inboxMessageData(responseJson));
        } else {
            dispatch(endLoading());
            AlertHelper.show('warn', t('Warning'), responseJson.error);
        }
    });

}

export const fetchInboxviewmessagelist = (data) => dispatch => {
    
    replymessageListAction(data).then(responseJson => {
        if (responseJson.status == 1) {
            dispatch(inboxViewMessageData(responseJson));
        } else {
            dispatch(endLoading());
            AlertHelper.show('warn', t('Warning'), responseJson.error);
        }
    });

}

export const inboxMessagesend = (data) => dispatch => {
    
    sendreplyMessageAction(data).then(responseJson => {
        if (responseJson.status == 1) {
            dispatch(fetchInboxviewmessagelist(data));
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