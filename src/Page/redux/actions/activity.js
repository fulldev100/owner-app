import {
    activityListAction, activityVideoAction
} from '../../../util/action.js';
import { AlertHelper } from '../../App/AlertHelper';
import { t } from '../../../../locals';

import { ACTIVITY_LIST, LOADING_START_ACTIVITY, LOADING_END_ACTIVITY } from '../constant/types';

const activityData = data => ({
    type: ACTIVITY_LIST,
    data,
});

const startLoading = () => ({
    type: LOADING_START_ACTIVITY
});

const endLoading = () => ({
    type: LOADING_END_ACTIVITY
});

export const fetchActivitylist = (data) => dispatch => {
    
    activityListAction(data).then(responseJson => {
        if (responseJson.status == 1) {
            dispatch(activityData(responseJson));
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