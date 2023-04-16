import axios from "axios";
import {
  GET_EVENTDETAILS_ERROR,
  GET_EVENTDETAILS_LOADING,
  GET_EVENTDETAILS_SUCCESS,
} from "./eventdetails.type";

// const api = "http://localhost:8080";
const api = "https://takelivecall-api-production.up.railway.app";

export const getEvenDetailstData = (id) => async (dispatch) => {
  dispatch({ type: GET_EVENTDETAILS_LOADING });
  try {
    let res = await axios.get(`${api}/event/${id}`);
    dispatch({ type: GET_EVENTDETAILS_SUCCESS, payload: res.data.data });
    return res.data;
  } catch (er) {
    dispatch({ type: GET_EVENTDETAILS_ERROR, payload: er.message });
    return er.message;
  }
};
