import {
    classSchedultListAction,
    classListAction
} from '../../../util/action.js';
import { AlertHelper } from '../../App/AlertHelper';
import { t } from '../../../../locals';

import {
    LOADING_START_CLASS_SCHEDULE,
    LOADING_END_CLASS_SCHEDULE,
    CLASS_SCHEDULE_LIST,
    CLASS_LIST,
  } from "../constant/types";

const setClassSchedule = data => ({
    type: CLASS_SCHEDULE_LIST,
    data,
});

const setClass = data => ({
    type: CLASS_LIST,
    data,
});

const startLoading = () => ({
    type: LOADING_START_CLASS_SCHEDULE
});

const endLoading = () => ({
    type: LOADING_END_CLASS_SCHEDULE,
  });

export const fetchClassSchedule = (data) => dispatch => {
    
    return classSchedultListAction(data).then(responseJson => {
        if (responseJson.status == 1) {
            dispatch(setClassSchedule(responseJson));
        } else {
            dispatch(endLoading());
            AlertHelper.show('warn', t('Warning'), responseJson.error);
        }
    });
}

export const fetchClass = (data) => dispatch => {
    
    classListAction(data).then(responseJson => {
        if (responseJson.status == 1) {
            dispatch(setClass(responseJson));
        } else {
            dispatch(endLoading());
            AlertHelper.show('warn', t('Warning'), responseJson.error);
        }
    });
}

export const loadingStart = () => dispatch => {
        dispatch(startLoading());
}