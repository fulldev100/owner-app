import { SET_ACCESSRIGHT, LOADING_START_SIDEMENU, LOADING_END_SIDEMENU, SET_STAFF_ACCESSRIGHT } from '../constant/types';

const initialState = {
    loading: false,
    staffView: 0,
    membershipView: 0,
    groupView: 0,
    memberView: 0,
    activityView: 0,
    scheduleView: 0,
    assignworkoutView: 0,
    nutritionView: 0,
    workoutView: 0,
    paymentView: 0,
    messageView: 0,
    noticeView: 0,
    accountView: 0,
    subscriptionView: 0,
    attendanceView: 0,
    accountantView: 0,
    productView: 0,
    storeView: 0,
    reservationView: 0,
}

export const sidebarMenu = (state = initialState, action) => {

    switch (action.type) {
        case LOADING_START_SIDEMENU:
            return {
                ...state,
                loading: true,
            }
        case LOADING_END_SIDEMENU:
            return {
                ...state,
                loading: false,
            }
        case SET_ACCESSRIGHT:
            return {
                ...state,
                staffView: action.data.result[0].view,
                membershipView: action.data.result[1].view,
                groupView: action.data.result[2].view,
                memberView: action.data.result[3].view,
                activityView: action.data.result[4].view,
                scheduleView: action.data.result[5].view,
                assignworkoutView: action.data.result[7].view,
                nutritionView: action.data.result[8].view,
                workoutView: action.data.result[9].view,
                paymentView: action.data.result[11].view,
                messageView: action.data.result[17].view,
                noticeView: action.data.result[18].view,
                accountView: action.data.result[20].view,
                subscriptionView: action.data.result[21].view,
                loading: false,
            }
        case SET_STAFF_ACCESSRIGHT:
            return {
                ...state,
                staffView: action.data.result[0].view,
                membershipView: action.data.result[1].view,
                groupView: action.data.result[2].view,
                memberView: action.data.result[3].view,
                activityView: action.data.result[4].view,
                scheduleView: action.data.result[5].view,
                attendanceView: action.data.result[7].view,
                assignworkoutView: action.data.result[8].view,
                nutritionView: action.data.result[9].view,
                workoutView: action.data.result[10].view,
                accountantView: action.data.result[11].view,
                productView: action.data.result[15].view,
                storeView: action.data.result[16].view,
                messageView: action.data.result[18].view,
                noticeView: action.data.result[19].view,
                reservationView: action.data.result[20].view,
                accountView: action.data.result[22].view,
                subscriptionView: action.data.result[25].view,
                loading: false,
            }
        default:
            return state;
    }
}