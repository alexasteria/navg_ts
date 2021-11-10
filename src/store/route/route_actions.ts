import {
  CHANGE_TABBAR,
  GO_BACK,
  GO_FORWARD,
  NAVIGATE,
  Route,
  Tabs,
} from "./route_action_types";
import { SET_TARGET_MASTER } from "../masters/masters_action_types";
import { Dispatch } from "redux";

export function goBack() {
  return {
    type: GO_BACK,
  };
}
export function goForward(panel: string) {
  return {
    type: GO_FORWARD,
    payload: panel,
  };
}
export function changeTabbar(tab: Tabs) {
  return {
    type: CHANGE_TABBAR,
    payload: tab,
  };
}
export function navigate(route: Route, stringParams?: string) {
  return async (dispatch: Dispatch) => {
    if (route.panel === "profile") {
      const { id } = route;
      if (!id) return;
      const response = await fetch(
        "https://" +
          process.env.REACT_APP_HOST +
          "/api/v2/masters/" +
          id +
          stringParams
      );
      const master = await response.json();
      if (response.status === 200) {
        dispatch({ type: SET_TARGET_MASTER, payload: master });
      }
    }
    dispatch({ type: NAVIGATE, payload: route });
  };
}
