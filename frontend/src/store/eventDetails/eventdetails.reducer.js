import {
  GET_EVENTDETAILS_ERROR,
  GET_EVENTDETAILS_LOADING,
  GET_EVENTDETAILS_SUCCESS,
} from "./eventdetails.type";

const initData = {
  loading: false,
  error: false,
  data: {},
};

export const eventDetailsReducer = (state = initData, { type, payload }) => {
  switch (type) {
    case GET_EVENTDETAILS_LOADING:
      return {
        ...state,
        loading: true,
        error: false,
        data: state.data,
      };
    case GET_EVENTDETAILS_ERROR:
      return {
        ...state,
        loading: false,
        error: false,
        data: state.data,
      };
    case GET_EVENTDETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: payload,
      };

    default:
      return { ...state };
  }
};
