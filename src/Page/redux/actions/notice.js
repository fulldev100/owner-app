import {
    noticeListAction
} from '../../../util/action.js';
import { AlertHelper } from '../../App/AlertHelper';
import { t } from '../../../../locals';

import { NOTICE_LIST, LOADING_START_NOTICE, LOADING_END_NOTICE } from '../constant/types';

const noticeData = data => ({
    type: NOTICE_LIST,
    data,
});

const startLoading = () => ({
    type: LOADING_START_NOTICE
});

const endLoading = () => ({
    type: LOADING_END_NOTICE
});

export const fetchNoticelist = (data) => dispatch => {

    noticeListAction(data).then(responseJson => {
        if (responseJson.status == 1) {
            dispatch(noticeData(responseJson));
        } else {
            dispatch(endLoading());
            AlertHelper.show('warn', t('Warning'), responseJson.error);
            dispatch(noticeData(responseJson));
        }
    });

}

export const loadingStart = () => dispatch => {
    dispatch(startLoading());
}

export const loadingEnd = () => dispatch => {
    dispatch(endLoading());
}