import {
  LOADING_START_ASSIGNED_WORKOUT,
  LOADING_END_ASSIGNED_WORKOUT,
  ASSIGNED_WORKOUT_LIST,
  WORKOUT_DATA,
} from "../constant/types";

const initialState = {
  loading: false,
  assignedWorkoutList: [],
  workoutData: [],
};

export const assignedWorkout = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_START_ASSIGNED_WORKOUT:
      return {
        ...state,
        loading: true,
      };
    case LOADING_END_ASSIGNED_WORKOUT:
      return {
        ...state,
        loading: false,
      };
    case ASSIGNED_WORKOUT_LIST:
      return {
        ...state,
        assignedWorkoutList: action.data.result,
        loading: false,
      };
    case WORKOUT_DATA:
      return {
        ...state,
        workoutData: action.data.result,
        loading: false,
      };
    default:
      return state;
  }
};
