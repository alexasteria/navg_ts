import { Category, User, Skill, Service } from "../../global/types";
import {
  CHANGE_CATEGORY,
  CHANGE_SKILL,
  LOAD_MASTERS,
  MastersState,
  RESET_MASTERS_LIST,
  SET_SELECT_SERVICE,
  SET_TARGET_MASTER,
} from "./masters_action_types";
import { Dispatch } from "redux";

const getSkills = (filter: MastersState["filter"]) => {
  if (!filter.skill) {
    if (!filter.category || !filter.category.skills) {
      return "&skills=1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40";
    }
    const skillIds = filter.category.skills.map((skill) => skill.id);
    return "&skills=" + skillIds.join(",");
  }
  return "&skills=" + filter.skill.id;
};

export function changeCategory(category: Category | null) {
  return {
    type: CHANGE_CATEGORY,
    payload: category,
  };
}

export function changeSkill(skill: Skill | null) {
  return {
    type: CHANGE_SKILL,
    payload: skill,
  };
}

export function loadMasters(
  filter: MastersState["filter"],
  stringParams: string,
  offset: number,
  cityId?: number
) {
  return async (dispatch: Dispatch) => {
    if (!cityId) {
      return;
    }
    const response = await fetch(
      "https://" +
        process.env.REACT_APP_HOST +
        "/api/v2/masters?city_id=" +
        cityId +
        getSkills(filter) +
        "&offset=" +
        offset +
        "&" +
        stringParams.slice(1)
    );
    const res = await response.json();
    if (response.status !== 200) {
      console.log(res);
      return;
    }
    if (res.items === null) {
      return dispatch({
        type: LOAD_MASTERS,
        payload: { items: [], hasMore: false },
      });
    }
    return dispatch({
      type: LOAD_MASTERS,
      payload: { items: res.items, hasMore: res.has_more },
    });
  };
}

export function resetMastersList() {
  return {
    type: RESET_MASTERS_LIST,
  };
}

export function setTargetMaster(master: User) {
  return {
    type: SET_TARGET_MASTER,
    payload: master,
  };
}

export function setSelectService(service: Service) {
  return {
    type: SET_SELECT_SERVICE,
    payload: service,
  };
}

export function getMaster(id: number) {
  return async (dispatch: Dispatch) => {
    const response = await fetch(
      "https://" +
        process.env.REACT_APP_HOST +
        "/api/v2/masters/" +
        id +
        "?sign="
    );
    const master = await response.json();
    dispatch({ type: SET_TARGET_MASTER, payload: master });
  };
}
