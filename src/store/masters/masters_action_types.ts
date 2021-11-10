import { Category, User, Skill, Service } from "../../global/types";
export const LOAD_MASTERS = "GRID/LOAD_MASTERS";
export const CHANGE_CATEGORY = "FILTER/CHANGE_CATEGORY";
export const CHANGE_SKILL = "FILTER/CHANGE_SKILL";
export const RESET_MASTERS_LIST = "GRID/RESET_MASTERS_LIST";
export const SET_TARGET_MASTER = "GRID/SET_TARGET_MASTER";
export const SET_SELECT_SERVICE = "GRID/SET_SELECT_SERVICE";

export type MastersState = {
  masters: User[] | null;
  hasMore: boolean;
  targetMaster: User | null;
  selectService: Service | null;
  filter: {
    category: Category | null;
    skill: Skill | null;
  };
};

export interface LoadMasters {
  type: typeof LOAD_MASTERS;
  payload: { items: User[]; hasMore: boolean };
}

export interface ChangeCategory {
  type: typeof CHANGE_CATEGORY;
  payload: Category | null;
}

export interface ChangeSkill {
  type: typeof CHANGE_SKILL;
  payload: Skill | null;
}

export interface ResetMastersList {
  type: typeof RESET_MASTERS_LIST;
}

export interface SetTargetMaster {
  type: typeof SET_TARGET_MASTER;
  payload: User;
}

export interface SetSelectService {
  type: typeof SET_SELECT_SERVICE;
  payload: User;
}

export type MastersActionTypes =
  | LoadMasters
  | ChangeCategory
  | ChangeSkill
  | ResetMastersList
  | SetSelectService
  | SetTargetMaster;
