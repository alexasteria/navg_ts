export const GO_BACK = "ROUTE/GO_BACK";
export const CHANGE_TABBAR = "ROUTE/CHANGE_TABBAR";
export const GO_FORWARD = "ROUTE/GO_FORWARD";
export const NAVIGATE = "ROUTE/NAVIGATE";

export enum Tabs {
  NEWS = "news",
  MASTERS = "masters",
  FIND_MODELS = "findmodel",
  LK = "lk",
}

export type Route = {
  tab: Tabs;
  panel?: string;
  id?: number;
};

export type RouteState = {
  epicTabbar: Tabs;
  newsHistory: string[];
  mastersHistory: string[];
  findModelHistory: string[];
  lkHistory: string[];
  props: number | null;
};
export interface GoBack {
  type: typeof GO_BACK;
}
export interface GoForward {
  type: typeof GO_FORWARD;
  payload: string;
}
export interface ChangeTabbar {
  type: typeof CHANGE_TABBAR;
  payload: Tabs;
}

export interface Navigate {
  type: typeof NAVIGATE;
  payload: Route;
}

export type RouteActionTypes = GoBack | ChangeTabbar | GoForward | Navigate;
