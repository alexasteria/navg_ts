import {
  CHANGE_CATEGORY,
  CHANGE_SKILL,
  LOAD_MASTERS,
  MastersActionTypes,
  MastersState,
  RESET_MASTERS_LIST,
  SET_SELECT_SERVICE,
  SET_TARGET_MASTER,
} from "./masters_action_types";

const initialState: MastersState = {
  masters: null,
  hasMore: false,
  targetMaster: null,
  selectService: null,
  filter: {
    category: null,
    skill: null,
  },
};

export const mastersReducer = (
  state = initialState,
  action: MastersActionTypes
) => {
  switch (action.type) {
    case LOAD_MASTERS:
      if (state.masters === null) {
        return {
          ...state,
          masters: [...action.payload.items],
          hasMore: action.payload.hasMore,
        };
      } else {
        return {
          ...state,
          masters: [...state.masters, ...action.payload.items],
          hasMore: action.payload.hasMore,
        };
      }
    case CHANGE_CATEGORY:
      return {
        ...state,
        filter: {
          category: action.payload,
          skill: action.payload === null ? null : state.filter.skill,
        },
        masters: null,
      };
    case CHANGE_SKILL:
      const skArr = state.filter.category?.skills.map((s) => s.id);
      return {
        ...state,
        filter: {
          ...state.filter,
          category:
            (!action.payload && state.filter.category) ||
            (skArr && action.payload && skArr.includes(action.payload.id))
              ? { ...state.filter.category }
              : null,
          skill: action.payload,
        },
        masters: null,
      };
    case RESET_MASTERS_LIST:
      return { ...state, masters: null };
    case SET_TARGET_MASTER:
      return { ...state, targetMaster: action.payload };
    case SET_SELECT_SERVICE:
      return { ...state, selectService: action.payload };
    default:
      return state;
  }
};
