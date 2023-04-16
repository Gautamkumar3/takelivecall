import axios from "axios";
import {
  CREATE_EVENT_ERROR,
  CREATE_EVENT_LOADING,
  CREATE_EVENT_SUCCESS,
  GET_EVENT_ERROR,
  GET_EVENT_LOADING,
  GET_EVENT_SUCCESS,
  GET_SEARCH_EVENT_ERROR,
  GET_SEARCH_EVENT_LOADING,
  GET_SEARCH_EVENT_SUCCESS,
} from "./event.types";

// const api = "http://localhost:8080";
const api = "https://takelivecall-api-production.up.railway.app";
const user_data = JSON.parse(localStorage.getItem("user_data"));

export const getEventData = () => async (dispatch) => {
  dispatch({ type: GET_EVENT_LOADING });
  try {
    let res = await axios.get(`${api}/event`);
    dispatch({ type: GET_EVENT_SUCCESS, payload: res.data.data });
    return res.data;
  } catch (er) {
    dispatch({ type: GET_EVENT_ERROR, payload: er.message });
    return er.message;
  }
};

export const createEventData = (data) => async (dispatch) => {
  dispatch({ type: CREATE_EVENT_LOADING });
  try {
    let res = await axios.post(`${api}/event/create`, data, {
      headers: { token: user_data.token },
    });
    dispatch({ type: CREATE_EVENT_SUCCESS, payload: res.data.data });
    return res.data;
  } catch (er) {
    dispatch({ type: CREATE_EVENT_ERROR, payload: er.message });
    return er.message;
  }
};

export const getSearchedEventData = (query) => async (dispatch) => {
  dispatch({ type: GET_SEARCH_EVENT_LOADING });
  try {
    let res = await axios.get(`${api}/event/search?q=${query}`);
    dispatch({ type: GET_SEARCH_EVENT_SUCCESS, payload: res.data.data });
    return res.data;
  } catch (er) {
    dispatch({ type: GET_SEARCH_EVENT_ERROR, payload: er.message });
    return er.message;
  }
};
