import {
  CREATE_EVENT_ERROR,
  CREATE_EVENT_LOADING,
  CREATE_EVENT_SUCCESS,
  GET_EVENT_ERROR,
  GET_EVENT_LOADING,
  GET_EVENT_SUCCESS,
} from "./event.types";

const initData = {
  loading: false,
  error: false,
  data: [],
};

export const eventReducer = (state = initData, { type, payload }) => {
  switch (type) {
    case GET_EVENT_LOADING:
      return {
        ...state,
        loading: true,
        error: false,
        data: state.data,
      };
    case GET_EVENT_ERROR:
      return {
        ...state,
        loading: false,
        error: false,
        data: state.data,
      };
    case GET_EVENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: payload,
      };
    case CREATE_EVENT_LOADING:
      return {
        ...state,
        loading: true,
        error: false,
        data: state.data,
      };
    case CREATE_EVENT_ERROR:
      return {
        ...state,
        loading: true,
        error: false,
        data: state.data,
      };
    case CREATE_EVENT_SUCCESS:
      return {
        ...state,
        loading: true,
        error: false,
        data: [...state.data, payload],
      };
    default:
      return { ...state };
  }
};
