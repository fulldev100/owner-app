import {
    accessRightsAction,
} from '../../../util/action.js';
import { AlertHelper } from '../../App/AlertHelper';
import { t } from '../../../../locals';
import * as SecureStore from 'expo-secure-store';

import { SET_ACCESSRIGHT, LOADING_START_SIDEMENU, LOADING_END_SIDEMENU, SET_STAFF_ACCESSRIGHT } from '../constant/types';

const setMemberAccessright = data => ({
    type: SET_ACCESSRIGHT,
    data,
});

const setStaffAccessright = data => ({
    type: SET_STAFF_ACCESSRIGHT,
    data,
});

const startLoading = () => ({
    type: LOADING_START_SIDEMENU
});

const endLoading = () => ({
    type: LOADING_END_SIDEMENU,
});

const Role = SecureStore.getItemAsync('role_name')

export const fetchAccessright = (data) => dispatch => {

    accessRightsAction(data).then(responseJson => {
        if (responseJson.status == 1) {
            if(Role._W == "staff_member" ){
                dispatch(setStaffAccessright(responseJson));
            }else{
                dispatch(setMemberAccessright(responseJson));
            }
        } else {
            dispatch(endLoading());
            AlertHelper.show('warn', t('Warning'), responseJson.error);
        }
    });
}

export const loadingStart = () => dispatch => {
    dispatch(startLoading());
}