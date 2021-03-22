import {
  DASHBOARD_ITEMS_FAIL,
  DASHBOARD_ITEMS_REQUEST,
  DASHBOARD_ITEMS_RESET,
  DASHBOARD_ITEMS_SUCCESS,
} from "../constants/dashboardConstants";

export const dashboardItemsReducer = (state = { items: [] }, action) => {
  switch (action.type) {
    case DASHBOARD_ITEMS_REQUEST:
      return { loading: true };
    case DASHBOARD_ITEMS_SUCCESS:
      return { loading: false, items: action.payload };
    case DASHBOARD_ITEMS_FAIL:
      return { loading: false, items: action.payload };
    case DASHBOARD_ITEMS_RESET:
      return {};
    default:
      return state;
  }
};
