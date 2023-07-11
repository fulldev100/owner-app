import {
  signupAction,
  loginAction,
  membershipAction,
  classAction,
  membershipDaysAction,
  singleMemberAction,
  updateMemberprofileAction,
  userLogoutAction,
} from "../../../util/action.js";
import { AlertHelper } from "../../App/AlertHelper";
import { t } from "../../../../locals";
import * as SecureStore from "expo-secure-store";

import {
  LOADING_START_SIGNUP,
  LOADING_END_SIGNUP,
  MEMBERSHIP_DROPDOWN_LIST,
  MEMBERSHIP_CLASS_LIST,
  MEMBERSHIP_DAYS,
  SIGNUP_SUCCESS,
  GET_USER_DETAILS,
  USER_LOGOUT,
} from "../constant/types";

const signupData = (data) => ({
  type: SIGNUP_SUCCESS,
  data,
});

const userLogout = (data) => ({
  type: USER_LOGOUT,
  data,
});

const userDetails = (data) => ({
  type: GET_USER_DETAILS,
  data,
});

const setMembershipList = (data) => ({
  type: MEMBERSHIP_DROPDOWN_LIST,
  data,
});

const setMembershipClassList = (data) => ({
  type: MEMBERSHIP_CLASS_LIST,
  data,
});

const setMembershipDays = (data) => ({
  type: MEMBERSHIP_DAYS,
  data,
});

const startLoading = () => ({
  type: LOADING_START_SIGNUP,
});

const endLoading = () => ({
  type: LOADING_END_SIGNUP,
});

export const Logoutmember = (data, navigate) => (dispatch) => {
  navigate("Auth");
  dispatch(userLogout(data));
  return userLogoutAction(data).then((responseJson) => {
    if (responseJson.status == 1) {
    } else {
      dispatch(endLoading());
      AlertHelper.show("warn", t("Warning"), responseJson.error);
    }
  });
};

export const fetchUserdetails = (data) => (dispatch) => {
  return singleMemberAction(data).then((responseJson) => {
    if (responseJson.status == 1) {
      dispatch(userDetails(responseJson));
    } else {
      dispatch(endLoading());
      AlertHelper.show("warn", t("Warning"), responseJson.error);
    }
  });
};

export const updateUserdetails = (data) => (dispatch) => {
  return updateMemberprofileAction(data).then((responseJson) => {
    if (responseJson.status == 1) {
      AlertHelper.show("success", t("Success"), responseJson.error);
      dispatch(fetchUserdetails(data));
    } else {
      dispatch(endLoading());
      AlertHelper.show("warn", t("Warning"), responseJson.error);
    }
  });
};

export const fetchMembershipList = () => (dispatch) => {
  return membershipAction().then((responseJson) => {
    if (responseJson.status == 1) {
      dispatch(setMembershipList(responseJson));
    } else {
      dispatch(endLoading());
      AlertHelper.show("warn", t("Warning"), responseJson.error);
    }
  });
};

export const fetchMembershipClassList = (data) => (dispatch) => {
  return classAction(data).then((responseJson) => {
    if (responseJson.status == 1) {
      dispatch(setMembershipClassList(responseJson));
      dispatch(fetchMembershipDays(data));
    } else {
      dispatch(setMembershipClassList(responseJson));
      dispatch(endLoading());
    }
  });
};

export const fetchMembershipDays = (data) => (dispatch) => {
  return membershipDaysAction(data).then((responseJson) => {
    if (responseJson.status == 1) {
      dispatch(setMembershipDays(responseJson.result[0]));
    } else {
      dispatch(endLoading());
      AlertHelper.show("warn", t("Warning"), responseJson.error);
    }
  });
};

export const signUp = (data, navigate) => (dispatch) => {
  signupAction(data).then((responseJson) => {
    if (responseJson.status == 1) {
      SecureStore.setItemAsync("email", data.email);
      dispatch(signupData(responseJson));
      navigate("LoginPage");
      AlertHelper.show("success", t("Success"), responseJson.error);
    } else {
      dispatch(endLoading());
      AlertHelper.show("warn", t("Warning"), responseJson.error);
    }
  });
};

export const login = (data, navigate) => (dispatch) => {
  loginAction(data).then((responseJson) => {
    if (responseJson.status == 1) {
      SecureStore.setItemAsync(
        "access_token",
        responseJson.result.access_token
      );
      SecureStore.setItemAsync("role_name", responseJson.result.role_name);
      SecureStore.setItemAsync("id", JSON.stringify(responseJson.result.id));
      navigate(responseJson.result.role_name == "member" ? "myHome" : "staffDashboard");
    } else {
      dispatch(endLoading());
      navigate("Auth");
      AlertHelper.show("error", t("Error"), responseJson.error);
    }
  });
};

export const loadingStart = () => (dispatch) => {
  dispatch(startLoading());
};
