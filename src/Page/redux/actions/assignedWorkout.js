import { viewAssignWorkoutAction } from "../../../util/action.js";
import { AlertHelper } from "../../App/AlertHelper";
import { t } from "../../../../locals";

import {
  LOADING_START_ASSIGNED_WORKOUT,
  LOADING_END_ASSIGNED_WORKOUT,
  ASSIGNED_WORKOUT_LIST,
  WORKOUT_DATA,
} from "../constant/types";

const setAssignedWorkoutList = (data) => ({
  type: ASSIGNED_WORKOUT_LIST,
  data,
});

const setWorkoutData = (data) => ({
  type: WORKOUT_DATA,
  data,
});

const startLoading = () => ({
  type: LOADING_START_ASSIGNED_WORKOUT,
});

const endLoading = () => ({
  type: LOADING_END_ASSIGNED_WORKOUT,
});

export const fetchAssignedWorkoutList = (data) => (dispatch) => {
  return viewAssignWorkoutAction(data).then((responseJson) => {
    if (responseJson.status == 1) {
      dispatch(setAssignedWorkoutList(responseJson));
    } else {
      dispatch(endLoading());
      AlertHelper.show("warn", t("Warning"), responseJson.error);
    }
  });
};

export const fetchWorkoutData = (data) => (dispatch) => {
  classListAction(data).then((responseJson) => {
    if (responseJson.status == 1) {
      dispatch(setWorkoutData(responseJson));
    } else {
      dispatch(endLoading());
      AlertHelper.show("warn", t("Warning"), responseJson.error);
    }
  });
};

export const loadingStart = () => (dispatch) => {
  dispatch(startLoading());
};
