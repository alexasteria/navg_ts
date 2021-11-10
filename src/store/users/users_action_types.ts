import { Address, City, Service, User } from "../../global/types";
export const AUTH = "USER/AUTH";
export const CHANGE_USER_CITY = "USER/CHANGE_USER_CITY";
export const CHANGE_MASTER_CITY = "USER/CHANGE_MASTER_CITY";
export const SAVE_LAUNCH_PARAMS = "USER/SAVE_LAUNCH_PARAMS";
export const SET_NOTIFICATION_STATUS = "USER/SET_NOTIFICATION_STATUS";
export const ADD_NEW_SERVICE = "USER/ADD_NEW_SERVICE";
export const UPDATE_SERVICE = "USER/UPDATE_SERVICE";
export const DELETE_SERVICE = "USER/DELETE_SERVICE";
export const SET_MASTER_ADDRESS = "USER/SET_MASTER_ADDRESS";
export const CHANGE_VISIBLE = "USER/CHANGE_VISIBLE";

export type UsersState = {
  user: User | null;
  launchParams: { [k: string]: string };
  stringLaunchParams: string;
  notifications: boolean;
};

export interface Auth {
  type: typeof AUTH;
  payload: User;
}

export interface ChangeUserCity {
  type: typeof CHANGE_USER_CITY;
  payload: City;
}

export interface ChangeMasterCity {
  type: typeof CHANGE_MASTER_CITY;
  payload: City;
}

export interface ChangeVisible {
  type: typeof CHANGE_VISIBLE;
  payload: Boolean;
}

export interface SaveLaunchParams {
  type: typeof SAVE_LAUNCH_PARAMS;
  payload: Location["search"];
}

export interface SetNotificationsStatus {
  type: typeof SET_NOTIFICATION_STATUS;
  payload: Boolean;
}

export interface AddNewService {
  type: typeof ADD_NEW_SERVICE;
  payload: Service;
}

export interface UpdateService {
  type: typeof UPDATE_SERVICE;
  payload: Service;
}

export interface DeleteService {
  type: typeof DELETE_SERVICE;
  payload: Service;
}

export interface SetAddress {
  type: typeof SET_MASTER_ADDRESS;
  payload: Address;
}

export type UsersActionTypes =
  | Auth
  | ChangeUserCity
  | SaveLaunchParams
  | SetNotificationsStatus
  | AddNewService
  | UpdateService
  | ChangeMasterCity
  | DeleteService
  | ChangeVisible
  | SetAddress;
