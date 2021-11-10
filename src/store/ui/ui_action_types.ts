export const NOTIFY = "UI/NOTIFY";
export const SET_LK_MODAL = "UI/SET_LK_MODAL";
export const SET_MASTERS_MODAL = "UI/SET_MASTERS_MODAL";
export type UiState = {
  notify: Not | null;
  mastersPopout: string | null;
  lkModal: string | null;
  mastersModal: string | null;
};

export enum TypeNotify {
  WARN,
  SUCCESS,
  ERROR,
}

export type Not = {
  type: TypeNotify;
  header: string;
  text: string;
};

export interface Notify {
  type: typeof NOTIFY;
  payload: Not;
}

export interface setLkModal {
  type: typeof SET_LK_MODAL;
  payload: string | null;
}

export interface setMastersModal {
  type: typeof SET_MASTERS_MODAL;
  payload: string | null;
}

export type UiActionTypes = Notify | setLkModal | setMastersModal;
