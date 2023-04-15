import axios from "axios";
import {
  GET_EVENT_ERROR,
  GET_EVENT_LOADING,
  GET_EVENT_SUCCESS,
} from "./event.types";

const api = "http://localhost:8080";

export const getEventData = () => async (dispatch) => {
  dispatch({ type: GET_EVENT_LOADING });
  try {
    let res = await axios.get(`${api}/event`);
    dispatch({ type: GET_EVENT_SUCCESS, payload: res.data.data });
  } catch (er) {
    dispatch({ type: GET_EVENT_ERROR, payload: er.message });
    return er.message;
  }
};
