import {
    addmeasurementAction, viewmeasurementAction
} from '../../../util/action.js';
import { AlertHelper } from '../../App/AlertHelper';
import { t } from '../../../../locals';
import { LOADING_START_MEASUREMENT, LOADING_END_MEASUREMENT, MEASUREMENT_LIST } from '../constant/types';

const measurementData = data => ({
    type: MEASUREMENT_LIST,
    data,
});

const startLoading = () => ({
    type: LOADING_START_MEASUREMENT
});

const endLoading = () => ({
    type: LOADING_END_MEASUREMENT
});

export const view_measurement = (data) => dispatch => {

    viewmeasurementAction(data).then(responseJson => {
        if (responseJson.status == 1) {
            dispatch(measurementData(responseJson));
        } else {
            dispatch(endLoading());
            // AlertHelper.show('warn', t('Warning'), responseJson.error);
        }
    });

}

export const add_measurement = (data) => dispatch => {

    addmeasurementAction(data).then(responseJson => {
        if (responseJson.status == 1) {
            AlertHelper.show('success', t("Success"), responseJson.error);
            dispatch(view_measurement(data));
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