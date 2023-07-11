import {
  dashboardReportAction,
  dashboardReportWaistAction,
  dashboardReportThighAction,
  dashboardReportArmsAction,
  dashboardReportHeightAction,
  dashboardReportChestAction,
  dashboardReportFatAction,
} from "../../../util/action.js";
import { AlertHelper } from "../../App/AlertHelper";
import { t } from "../../../../locals";

import {
  LOADING_START_DASHBOARD,
  LOADING_END_DASHBOARD,
  WEIGHT_DATA,
  WAIST_DATA,
  THIGH_DATA,
  ARMS_DATA,
  HEIGHT_DATA,
  CHEST_DATA,
  FAT_DATA,
} from "../constant/types";

const setWeightData = (data) => ({
  type: WEIGHT_DATA,
  data,
});

const setWaistData = (data) => ({
  type: WAIST_DATA,
  data,
});

const setThighData = (data) => ({
  type: THIGH_DATA,
  data,
});

const setArmsData = (data) => ({
  type: ARMS_DATA,
  data,
});

const setHeightData = (data) => ({
  type: HEIGHT_DATA,
  data,
});

const setChestData = (data) => ({
  type: CHEST_DATA,
  data,
});

const setFatData = (data) => ({
  type: FAT_DATA,
  data,
});

const startLoading = () => ({
  type: LOADING_START_DASHBOARD,
});

const endLoading = () => ({
  type: LOADING_END_DASHBOARD,
});

export const fetchWeightData = (data) => (dispatch) => {
  return dashboardReportAction(data)
    .then((responseJson) => {
      if (responseJson.status == 1) {
        dispatch(setWeightData(responseJson));
      } else {
        dispatch(endLoading());
        AlertHelper.show("warn", t("Warning"), responseJson.error);
      }
    });
};

export const fetchWaistData = (data) => (dispatch) => {
  return dashboardReportWaistAction(data)
    .then((responseJson) => {
      if (responseJson.status == 1) {
        dispatch(setWaistData(responseJson));
      } else {
        dispatch(endLoading());
        // AlertHelper.show("warn", t("Warning"), responseJson.error);
      }
    });
};

export const fetchThighData = (data) => (dispatch) => {
  return dashboardReportThighAction(data)
    .then((responseJson) => {
      if (responseJson.status == 1) {
        dispatch(setThighData(responseJson));
      } else {
        dispatch(endLoading());
        // AlertHelper.show("warn", t("Warning"), responseJson.error);
      }
    });
};

export const fetchArmsData = (data) => (dispatch) => {
  return dashboardReportArmsAction(data)
    .then((responseJson) => {
      if (responseJson.status == 1) {
        dispatch(setArmsData(responseJson));
      } else {
        dispatch(endLoading());
        // AlertHelper.show("warn", t("Warning"), responseJson.error);
      }
    });
};

export const fetchHeightData = (data) => (dispatch) => {
  return dashboardReportHeightAction(data)
    .then((responseJson) => {
      if (responseJson.status == 1) {
        dispatch(setHeightData(responseJson));
      } else {
        dispatch(endLoading());
        // AlertHelper.show("warn", t("Warning"), responseJson.error);
      }
    });
};

export const fetchChestData = (data) => (dispatch) => {
  return dashboardReportChestAction(data)
    .then((responseJson) => {
      if (responseJson.status == 1) {
        dispatch(setChestData(responseJson));
      } else {
        dispatch(endLoading());
        // AlertHelper.show("warn", t("Warning"), responseJson.error);
      }
    });
};

export const fetchFatData = (data) => (dispatch) => {
  return dashboardReportFatAction(data)
    .then((responseJson) => {
      if (responseJson.status == 1) {
        dispatch(setFatData(responseJson));
      } else {
        dispatch(endLoading());
        // AlertHelper.show("warn", t("Warning"), responseJson.error);
      }
    });
};

export const loadingStart = () => (dispatch) => {
  dispatch(startLoading());
};
