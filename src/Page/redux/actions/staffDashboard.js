import {
    activityListAction, classListAction, groupListAction, memberShipListAction, reservationListAction
} from '../../../util/action.js';
import { AlertHelper } from '../../App/AlertHelper';
import { t } from '../../../../locals';

import { STAFF_CLASS_LIST, STAFF_ACTIVITY_LIST, STAFF_RESERVATION_LIST, STAFF_MEMBERSHIP_LIST, STAFF_GROUP_LIST, LOADING_START_STAFF_DASHBOARD, LOADING_END_STAFF_DASHBOARD } from '../constant/types';

const activityData = data => ({
    type: STAFF_ACTIVITY_LIST,
    data
});

const GroupData = data => ({
    type: STAFF_GROUP_LIST,
    data
});

const MembershipData = data => ({
    type: STAFF_MEMBERSHIP_LIST,
    data
});

const ReservationData = data => ({
    type: STAFF_RESERVATION_LIST,
    data
});

const ClassData = data => ({
    type: STAFF_CLASS_LIST,
    data
});

const startLoading = () => ({
    type: LOADING_START_STAFF_DASHBOARD
});

const endLoading = () => ({
    type: LOADING_END_STAFF_DASHBOARD
});

export const fetchActivitylist = (data) => dispatch => {
    
    activityListAction(data).then(responseJson => {
        if (responseJson.status == 1) {
            dispatch(activityData(responseJson));
        } else {
            dispatch(endLoading());
        }
    });

}

export const fetchGrouplist = (data) => dispatch => {
    
    groupListAction(data).then(responseJson => {
        if (responseJson.status == 1) {
            dispatch(GroupData(responseJson));
        } else {
            dispatch(endLoading());
        }
    });

}

export const fetchMembershiplist = (data) => dispatch => {
    
    memberShipListAction(data).then(responseJson => {
        if (responseJson.status == 1) {
            dispatch(MembershipData(responseJson));
        } else {
            dispatch(endLoading());
        }
    });

}

export const fetchReservationList = (data) => dispatch => {
    
    reservationListAction(data).then(responseJson => {
        if (responseJson.status == 1) {
            dispatch(ReservationData(responseJson));
        } else {
            dispatch(endLoading());
        }
    });

}

export const fetchClassList = (data) => dispatch => {
    
    classListAction(data).then(responseJson => {
        if (responseJson.status == 1) {
            dispatch(ClassData(responseJson));
        } else {
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