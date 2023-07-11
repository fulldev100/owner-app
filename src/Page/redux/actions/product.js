import {
    productlistAction
} from '../../../util/action.js';
import { AlertHelper } from '../../App/AlertHelper';
import { t } from '../../../../locals';

import { PRODUCT_LIST, LOADING_START_NUTRITION, LOADING_END_NUTRITION } from '../constant/types';

const productData = data => ({
    type: PRODUCT_LIST,
    data,
});

const startLoading = () => ({
    type: LOADING_START_NUTRITION
});

const endLoading = () => ({
    type: LOADING_END_NUTRITION
});

export const fetchProductlist = (data) => dispatch => {

    productlistAction(data).then(responseJson => {
        if (responseJson.status == 1) {
          //  console.log(responseJson);
            dispatch(productData(responseJson));
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