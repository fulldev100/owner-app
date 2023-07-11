import {
  classListAction,
  viewMemberAttendanceListAction,
} from "../../../util/action.js";
import { AlertHelper } from "../../App/AlertHelper";
import { t } from "../../../../locals";

import {
  LOADING_START_MEMBER,
  LOADING_END_MEMBER,
  ALL_CLASS_LIST,
  ATTENDANCE_DATA,
} from "../constant/types";

const setClassData = (data) => ({
  type: ALL_CLASS_LIST,
  data,
});

const setAttendanceData = (data) => ({
  type: ATTENDANCE_DATA,
  data,
});

const startLoading = () => ({
  type: LOADING_START_MEMBER,
});

const endLoading = () => ({
  type: LOADING_END_MEMBER,
});

export const fetchAllClass = (data) => (dispatch) => {
    classListAction(data).then((responseJson) => {
    if (responseJson.status == 1) {
      dispatch(setClassData(responseJson));
    } else {
      dispatch(endLoading());
      AlertHelper.show("warn", t("Warning"), responseJson.error);
    }
  });
};

export const fetchMemberAttendace = (data) => (dispatch) => {
    viewMemberAttendanceListAction(data).then((responseJson) => {
    if (responseJson.status == 1) {
      dispatch(setAttendanceData(data));
    } else {
      dispatch(endLoading());
      AlertHelper.show("warn", t("Warning"), responseJson.error);
    }
  });
};

export const loadingStart = () => (dispatch) => {
  dispatch(startLoading());
};
