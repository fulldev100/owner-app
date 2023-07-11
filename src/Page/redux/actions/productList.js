import {
    productListAction
} from '../../../util/action.js';
import { AlertHelper } from '../../App/AlertHelper';
import { t } from '../../../../locals';

import { PRODUCTGROUP_LIST, LOADING_START_GROUP_TYPE, LOADING_END_GROUP_TYPE } from '../constant/types';

const ProductData = data => ({
    type: PRODUCTGROUP_LIST,
    data,
});

const startLoading = () => ({
    type: LOADING_START_GROUP_TYPE
});

const endLoading = () => ({
    type: LOADING_END_GROUP_TYPE
});

export const fetchProductlist = (data) => dispatch => {
    
    productListAction(data).then(responseJson => {
        if (responseJson.status == 1) {
            dispatch(ProductData(responseJson));
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