import {
    nutritionlistAction,
    historylistAction
} from '../../../util/action.js';
import { AlertHelper } from '../../App/AlertHelper';
import { t } from '../../../../locals';

import { NUTRITION_LIST, HISTORY_LIST, LOADING_START_NUTRITION, LOADING_END_NUTRITION } from '../constant/types';

const nutritionData = data => ({
    type: NUTRITION_LIST,
    data,
});

const historyData = data => ({
    type: HISTORY_LIST,
    data,
});

const startLoading = () => ({
    type: LOADING_START_NUTRITION
});

const endLoading = () => ({
    type: LOADING_END_NUTRITION
});

export const fetchNutritionlist = (data) => dispatch => {

    nutritionlistAction(data).then(responseJson => {
        if (responseJson.status == 1) {
            dispatch(nutritionData(responseJson));
        } else {
            dispatch(endLoading());
            AlertHelper.show('warn', t('Warning'), responseJson.error);
        }
    });
}

export const fetchHistorylist = (data) => dispatch => {

    historylistAction(data).then(responseJson => {
        if (responseJson.status == 1) {
            console.log(responseJson)
            dispatch(historyData(responseJson));
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