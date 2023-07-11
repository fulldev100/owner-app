import { FEES_PAYMENT_LIST, LOADING_START_FEESPAYMENT, LOADING_END_FEESPAYMENT, PAYMENT_INVOICE, INVOICE_SEND } from '../constant/types';

const initialState = {
    loading: false,
    feesPaymentData:[],
    Invoice:'',
}

export const feesPayment = (state = initialState, action) => {
    switch (action.type) {
        case LOADING_START_FEESPAYMENT:
            return {
                ...state,
                loading: true,
            }
        case LOADING_END_FEESPAYMENT:
            return {
                ...state,
                loading: false,
            }
        case FEES_PAYMENT_LIST:
            return {
                ...state,
                feesPaymentData:action.data.result,
                loading: false,
            }
        case PAYMENT_INVOICE:
            return {
                ...state,
                Invoice:action.data.resource,
                loading: false,
            }
        case INVOICE_SEND:
            return {
                ...state,
                loading: false,
            }
        default:
            return state;
    }
}