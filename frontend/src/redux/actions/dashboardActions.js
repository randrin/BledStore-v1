import axios from "axios";
import {
  DASHBOARD_ITEMS_FAIL,
  DASHBOARD_ITEMS_REQUEST,
  DASHBOARD_ITEMS_SUCCESS,
} from "../constants/dashboardConstants";

export const getDashboardItems = () => async (dispatch, getState) => {
  dispatch({
    type: DASHBOARD_ITEMS_REQUEST,
  });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const response = await axios({
      url: "/v1/api/dashboards",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    if (response.statusText !== "OK") {
      dispatch({ type: DASHBOARD_ITEMS_FAIL });
    } else {
      dispatch({
        type: DASHBOARD_ITEMS_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    dispatch({
      type: DASHBOARD_ITEMS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
