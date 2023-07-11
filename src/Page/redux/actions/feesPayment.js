import { paymentListAction, sendInvoiceMailAction, viewInvoiceAction } from '../../../util/action.js';
import { AlertHelper } from '../../App/AlertHelper';
import { t } from '../../../../locals';

import { INVOICE_SEND, PAYMENT_INVOICE, FEES_PAYMENT_LIST, LOADING_START_FEESPAYMENT, LOADING_END_FEESPAYMENT } from '../constant/types';

const feespaymentData = data => ({
    type: FEES_PAYMENT_LIST,
    data,
});

const paymentInvoice = data => ({
    type: PAYMENT_INVOICE,
    data,
});

const invoicesend = data => ({
    type: INVOICE_SEND,
    data,
});

const startLoading = () => ({
    type: LOADING_START_FEESPAYMENT
});

const endLoading = () => ({
    type: LOADING_END_FEESPAYMENT
});

export const fetchfeespaymentlist = (data) => dispatch => {
    
    paymentListAction(data).then(responseJson => {
        if (responseJson.status == 1) {
            dispatch(feespaymentData(responseJson));
        } else {
            dispatch(endLoading());
            AlertHelper.show('warn', t('Warning'), responseJson.error);
        }
    });

}

export const fetchInvoice = (data) => dispatch => {
    
    viewInvoiceAction(data).then(responseJson => {
        if (responseJson.status == 1) {
            dispatch(paymentInvoice(responseJson));
        } else {
            dispatch(endLoading());
            AlertHelper.show('warn', t('Warning'), responseJson.error);
        }
    });

}


export const sendInvoice = (data) => dispatch => {
    
    sendInvoiceMailAction(data).then(responseJson => {
        if (responseJson.status == 1) {
            dispatch(invoicesend(responseJson));
            dispatch(endLoading());
            AlertHelper.show('success', t("Success"), responseJson.error);
        } else {
            dispatch(endLoading());
            AlertHelper.show('warn', t('Warning'), responseJson.error);
            dispatch(endLoading());
        }
    });

}

export const loadingStart = () => dispatch => {
        dispatch(startLoading());
}

export const loadingEnd = () => dispatch => {
    dispatch(endLoading());
}