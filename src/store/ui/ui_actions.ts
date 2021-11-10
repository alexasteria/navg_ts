import {
  NOTIFY,
  SET_LK_MODAL,
  SET_MASTERS_MODAL,
  TypeNotify,
} from "./ui_action_types";
import { Dispatch } from "redux";

export function notify(type: TypeNotify, header: string, text: string) {
  return async (dispatch: Dispatch) => {
    setTimeout(
      () =>
        dispatch({
          type: NOTIFY,
          payload: null,
        }),
      4000
    );
    return dispatch({
      type: NOTIFY,
      payload: { type: type, header: header, text: text },
    });
  };
}
export function clear_notify() {
  return async (dispatch: Dispatch) => {
    return dispatch({
      type: NOTIFY,
      payload: null,
    });
  };
}
export function setLkModal(modal: string | null) {
  return {
    type: SET_LK_MODAL,
    payload: modal,
  };
}
export function setMastersModal(modal: string | null) {
  return {
    type: SET_MASTERS_MODAL,
    payload: modal,
  };
}
