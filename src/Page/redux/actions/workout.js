import {
  listWorkoutLogAction,
  addWorkoutLogAction,
  workoutdateArrayAction,
  viewWorkoutLogAction
} from "../../../util/action.js";
import { AlertHelper } from "../../App/AlertHelper";
import { t } from "../../../../locals";

import {
  LOADING_START_WORKOUT,
  LOADING_END_WORKOUT,
  WORKOUT_DATES_LIST,
  WORKOUT_DETAILS,
  PREVIEW_WORKOUT,
  MAKE_WORKOUT_EMPTY,
  MAKE_PREVIEW_WORKOUT_EMPTY
} from "../constant/types";

const setWorkoutDates = (data) => ({
  type: WORKOUT_DATES_LIST,
  data,
});

const setSingleWorkoutDetails = (data) => ({
  type: WORKOUT_DETAILS,
  data,
});

const setSingleWorkoutEmpty = () => ({
  type: MAKE_WORKOUT_EMPTY,
});

const setPreviewWorkoutData = (data) => ({
  type: PREVIEW_WORKOUT,
  data,
});

const setPreviewWorkoutEmpty = () => ({
  type: MAKE_PREVIEW_WORKOUT_EMPTY,
});

const startLoading = () => ({
  type: LOADING_START_WORKOUT,
});

const endLoading = () => ({
  type: LOADING_END_WORKOUT,
});

export const fetchWorkoutDates = (data) => (dispatch) => {
  workoutdateArrayAction(data).then((responseJson) => {
    if (responseJson.status == 1) {
      dispatch(setWorkoutDates(responseJson));
    } else {
      dispatch(endLoading());
      AlertHelper.show("warn", t("Warning"), responseJson.error);
    }
  });
};

export const fetchWorkoutDetails = (data) => (dispatch) => {
  listWorkoutLogAction(data).then((responseJson) => {
    if (responseJson.status == 1) {
      dispatch(setSingleWorkoutDetails(responseJson));
    } else {
      dispatch(setSingleWorkoutEmpty());
      dispatch(endLoading());
      AlertHelper.show("warn", t("Warning"), responseJson.error);
    }
  });
};

export const addWorkout = (data) => (dispatch) => {
  addWorkoutLogAction(data).then((responseJson) => {
    if (responseJson.status == 1) {
      //   dispatch(setSingleWorkoutDetails(responseJson));
      dispatch(setSingleWorkoutEmpty());
      AlertHelper.show("success", t("Success"), responseJson.error);
    } else {
      dispatch(endLoading());
      dispatch(setSingleWorkoutEmpty());
      AlertHelper.show("warn", t("Warning"), responseJson.error);
    }
  });
};

export const fetchPreviewWorkout = (data) => (dispatch) => {
  viewWorkoutLogAction(data).then((responseJson) => {
    if (responseJson.status == 1) {
      dispatch(setPreviewWorkoutData(responseJson));
    } else {
      dispatch(setPreviewWorkoutEmpty());
      dispatch(endLoading());
      AlertHelper.show("warn", t("Warning"), responseJson.error);
    }
  });
};

export const makeAddWorkoutEmpty = () => (dispatch) => {
  dispatch(setSingleWorkoutEmpty());
};

export const makeViewWorkoutEmpty = () => (dispatch) => {
  dispatch(setPreviewWorkoutEmpty());
};

export const loadingStart = () => (dispatch) => {
  dispatch(startLoading());
};
