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

const initialState = {
  loading: false,
  weightData: [],
  weightLabel: "",
  weightUnit: "",
  waistData: "",
  waistLabel: "",
  waistUnit: "",
  thighData: "",
  thighLabel: "",
  thighUnit: "",
  armsData: "",
  armsLabel: "",
  armsUnit: "",
  heightData: "",
  heightLabel: "",
  heightUnit: "",
  chestData: "",
  chestLabel: "",
  chestUnit: "",
  fatData: "",
  fatLabel: "",
  fatUnit: "",
};

export const dashboard = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_START_DASHBOARD:
      return {
        ...state,
        loading: true,
      };
    case LOADING_END_DASHBOARD:
      return {
        ...state,
        loading: false,
      };
    case WEIGHT_DATA:
      return {
        ...state,
        weightData: action.data.result.value,
        weightLabel: action.data.result.date,
        weightUnit: action.data.result.measurment_unit,
      };
    case WAIST_DATA:
      return {
        ...state,
        waistData: action.data.result.value,
        waistLabel: action.data.result.date,
        waistUnit: action.data.result.measurment_unit,
      };
    case THIGH_DATA:
      return {
        ...state,
        thighData: action.data.result.value,
        thighLabel: action.data.result.date,
        thighUnit: action.data.result.measurment_unit,
      };
    case ARMS_DATA:
      return {
        ...state,
        armsData: action.data.result.value,
        armsLabel: action.data.result.date,
        armsUnit: action.data.result.measurment_unit,
      };
    case HEIGHT_DATA:
      return {
        ...state,
        heightData: action.data.result.value,
        heightLabel: action.data.result.date,
        heightUnit: action.data.result.measurment_unit,
      };
    case CHEST_DATA:
      return {
        ...state,
        chestData: action.data.result.value,
        chestLabel: action.data.result.date,
        chestUnit: action.data.result.measurment_unit,
      };
    case FAT_DATA:
      return {
        ...state,
        fatData: action.data.result.value,
        fatLabel: action.data.result.date,
        fatUnit: action.data.result.measurment_unit,
        loading: false,
      };
    default:
      return state;
  }
};
