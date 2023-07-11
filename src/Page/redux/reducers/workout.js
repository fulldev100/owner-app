import {
  LOADING_START_WORKOUT,
  LOADING_END_WORKOUT,
  WORKOUT_DATES_LIST,
  WORKOUT_DETAILS,
  PREVIEW_WORKOUT,
  MAKE_WORKOUT_EMPTY,
  MAKE_PREVIEW_WORKOUT_EMPTY,
} from "../constant/types";

const initialState = {
  loading: false,
  workoutDatesList: [],
  singleWorkout: [],
  previewWorkoutData: [],
};

export const workout = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_START_WORKOUT:
      return {
        ...state,
        loading: true,
      };
    case LOADING_END_WORKOUT:
      return {
        ...state,
        loading: false,
      };
    case WORKOUT_DATES_LIST:
      return {
        ...state,
        workoutDatesList: action.data.result,
        loading: false,
      };
    case WORKOUT_DETAILS:
      return {
        ...state,
        singleWorkout: action.data.result,
        loading: false,
      };

    case MAKE_WORKOUT_EMPTY:
      return {
        ...state,
        singleWorkout: [],
        loading: false,
      };
    case PREVIEW_WORKOUT:
      return {
        ...state,
        previewWorkoutData: action.data.result,
        loading: false,
      };
    case MAKE_PREVIEW_WORKOUT_EMPTY:
      return {
        ...state,
        previewWorkoutData: [],
        loading: false,
      };
    default:
      return state;
  }
};
