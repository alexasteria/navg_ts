import { Dispatch } from "redux";
import {
  ADD_NEW_SERVICE,
  AUTH,
  CHANGE_MASTER_CITY,
  CHANGE_USER_CITY,
  CHANGE_VISIBLE,
  DELETE_SERVICE,
  SAVE_LAUNCH_PARAMS,
  SET_MASTER_ADDRESS,
  SET_NOTIFICATION_STATUS,
  UPDATE_SERVICE,
} from "./users_action_types";
import { Address, City, Service, User } from "../../global/types";
import { RESET_MASTERS_LIST } from "../masters/masters_action_types";

export function auth(stringLaunchParams: Location["search"]) {
  return async (dispatch: Dispatch) => {
    dispatch(
      dispatch({ type: SAVE_LAUNCH_PARAMS, payload: stringLaunchParams })
    );
    const response = await fetch(
      "https://" +
        process.env.REACT_APP_HOST +
        "/api/v2/profile" +
        stringLaunchParams
    );
    const res = await response.json();
    if (response.status !== 200) {
      console.log(res.messages[0]);
      return;
    }
    dispatch({ type: AUTH, payload: res });
  };
}
export function changeUserCity(
  city: City,
  user: User,
  launchParams: { [k: string]: string }
) {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: CHANGE_USER_CITY,
      payload: city,
    });
    dispatch({
      type: RESET_MASTERS_LIST,
    });
    const response = await fetch(
      "https://" + process.env.REACT_APP_HOST + "/api/v2/profile",
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          avatar_url: user.avatar_url,
          city_id: city.id,
          first_name: user.first_name,
          last_name: user.last_name,
          sex: user.sex,
          vk: launchParams,
        }),
      }
    );
    const res = await response.json();
    if (response.status !== 200) {
      console.log(res.messages[0]);
      return;
    }
  };
}
export function changeVisible(
  user: User,
  launchParams: { [k: string]: string }
) {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: CHANGE_VISIBLE,
      payload: !user.master.is_visible,
    });
    const response = await fetch(
      "https://" + process.env.REACT_APP_HOST + "/api/v2/masters",
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          city_id: user.master.city ? user.master.city.id : null,
          is_visible: !user.master.is_visible,
          vk: launchParams,
        }),
      }
    );
    const res = await response.json();
    if (response.status !== 200) {
      console.log(res.messages[0]);
      return;
    }
  };
}
export function changeMasterCity(
  city: City,
  user: User,
  launchParams: { [k: string]: string }
) {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: CHANGE_MASTER_CITY,
      payload: city,
    });
    const response = await fetch(
      "https://" + process.env.REACT_APP_HOST + "/api/v2/masters",
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          city_id: city.id,
          is_visible: user.master.is_visible,
          vk: launchParams,
        }),
      }
    );
    const res = await response.json();
    if (response.status !== 200) {
      console.log(res.messages[0]);
      return;
    }
  };
}
export function setNotificationStatus(status: Boolean) {
  return {
    type: SET_NOTIFICATION_STATUS,
    payload: status,
  };
}
export function addNewsService(service: Service) {
  return {
    type: ADD_NEW_SERVICE,
    payload: service,
  };
}
export function updateService(service: Service) {
  return {
    type: UPDATE_SERVICE,
    payload: service,
  };
}
export function deleteService(service: Service) {
  return {
    type: DELETE_SERVICE,
    payload: service,
  };
}
export function setAddress(
  address: Address,
  newPoint: boolean,
  launchParams: { [k: string]: string },
  cityId?: number
) {
  if (!cityId) return;
  return async (dispatch: Dispatch) => {
    const response = await fetch(
      "https://" + process.env.REACT_APP_HOST + "/api/v2/masters/address",
      {
        method: newPoint ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...address,
          city_id: cityId,
          vk: launchParams,
        }),
      }
    );
    const res = await response.json();
    if (response.status !== 200) {
      console.log(res);
      return;
    }
    dispatch({
      type: SET_MASTER_ADDRESS,
      payload: newPoint ? res : address,
    });
  };
}
