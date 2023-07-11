import {
  LOADING_START_CLASS_SCHEDULE,
  LOADING_END_CLASS_SCHEDULE,
  CLASS_SCHEDULE_LIST,
  CLASS_LIST,
} from "../constant/types";

const initialState = {
  loading: false,
  classScheduleData: [],
  classData: [],
};

export const classSchedule = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_START_CLASS_SCHEDULE:
      return {
        ...state,
        loading: true,
      };
    case LOADING_END_CLASS_SCHEDULE:
      return {
        ...state,
        loading: false,
      };
    case CLASS_SCHEDULE_LIST:
      return {
        ...state,
        classScheduleData: action.data.result,
        loading: false,
      };
    case CLASS_LIST:
      return {
        ...state,
        classData: action.data.result,
        loading: false,
      };
    default:
      return state;
  }
};
