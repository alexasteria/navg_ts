import {
  NOTIFY,
  SET_LK_MODAL,
  SET_MASTERS_MODAL,
  UiActionTypes,
  UiState,
} from "./ui_action_types";

const initialState: UiState = {
  notify: null,
  mastersPopout: null,
  lkModal: "",
  mastersModal: "",
};
export const uiReducer = (state = initialState, action: UiActionTypes) => {
  switch (action.type) {
    case NOTIFY:
      return { ...state, notify: action.payload };
    case SET_LK_MODAL:
      return { ...state, lkModal: action.payload };
    case SET_MASTERS_MODAL:
      return { ...state, mastersModal: action.payload };
    default:
      return state;
  }
};
