import {
    composeMessageAction,
    getallMemberAndStaffAction,
    replymessageListAction,
    sendreplyMessageAction,
    sentmessagelistAction
} from '../../../util/action.js';
import { AlertHelper } from '../../App/AlertHelper';
import { t } from '../../../../locals';

import { SENT_MESSAGE_LIST, SENT_VIEW_MESSAGE_LIST, MEMBER_AND_STAFF_LIST, LOADING_START_MESSAGE, LOADING_END_MESSAGE } from '../constant/types';

const sentMessageData = data => ({
    type: SENT_MESSAGE_LIST,
    data,
});

const memberStaffList = data => ({
    type: MEMBER_AND_STAFF_LIST,
    data,
});

const sentViewMessageData = data => ({
    type: SENT_VIEW_MESSAGE_LIST,
    data,
});

const startLoading = () => ({
    type: LOADING_START_MESSAGE
});

const endLoading = () => ({
    type: LOADING_END_MESSAGE
});

// compose message action 

export const fetchMemberAndStaffAction = (data) => dispatch => {

    getallMemberAndStaffAction(data).then(responseJson => {
        if (responseJson.status == 1) {
            dispatch(memberStaffList(responseJson));
        } else {
            dispatch(endLoading());
            AlertHelper.show('warn', t('Warning'), responseJson.error);
        }
    });

}

export const composeMessagesend = (data) => dispatch => {

    composeMessageAction(data).then(responseJson => {
        if (responseJson.status == 1) {
            AlertHelper.show('success', t("Success"), responseJson.error);
            dispatch(fetchSentmessagelist(data));
        } else {
            dispatch(endLoading());
            AlertHelper.show('warn', t('Warning'), responseJson.error);
        }
    });

}
// sent message action 

export const fetchSentmessagelist = (data) => dispatch => {

    sentmessagelistAction(data).then(responseJson => {
        if (responseJson.status == 1) {
            dispatch(sentMessageData(responseJson));
        } else {
            dispatch(endLoading());
            // AlertHelper.show('warn', t('Warning'), responseJson.error);
        }
    });

}

export const fetchSentviewmessagelist = (data) => dispatch => {
    
    replymessageListAction(data).then(responseJson => {
        if (responseJson.status == 1) {
            dispatch(sentViewMessageData(responseJson));
        } else {
            dispatch(endLoading());
            AlertHelper.show('warn', t('Warning'), responseJson.error);
        }
    });

}

export const sentMessagesend = (data) => dispatch => {
    
    sendreplyMessageAction(data).then(responseJson => {
        if (responseJson.status == 1) {
            dispatch(fetchSentviewmessagelist(data));
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