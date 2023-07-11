import { BOOKING_LIST, ADD_BOOKING, CANCEL_BOOKING, GET_CLASS_SCHEDULE, LOADING_START_BOOKING, LOADING_END_BOOKING } from '../constant/types';

const initialState = {
    loading: false,
    bookingData: [],
    classSchedule: {},
    bookedClass: '',
    totalClass: '',
    Classlimit: '',
}

export const booking = (state = initialState, action) => {
    switch (action.type) {
        case LOADING_START_BOOKING:
            return {
                ...state,
                loading: true,
            }
        case LOADING_END_BOOKING:
            return {
                ...state,
                loading: false,
            }
        case BOOKING_LIST:
            return {
                ...state,
                bookingData: action.data.result,
                bookedClass: action.data.booked_class,
                totalClass: action.data.total_class,
                Classlimit: action.data.membership_class_limit,
                loading: false,
            }
        case CANCEL_BOOKING:
            return {
                ...state,
                bookingData: state.bookingData.filter(({ booking_id }) => booking_id !== action.data.booking_id),
                bookedClass: state.bookedClass - 1,
                loading: false,
            }
        case GET_CLASS_SCHEDULE:
            return {
                ...state,
                classSchedule: action.data.result,
                loading: false,
            }
        default:
            return state;
    }
}