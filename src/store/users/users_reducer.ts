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
  UsersActionTypes,
  UsersState,
} from "./users_action_types";

const initialState: UsersState = {
  user: null,
  launchParams: {
    vk_user_id: "17588892",
    vk_ref: "other",
    vk_platform: "mobile_web",
    vk_language: "ru",
    vk_is_favorite: "0",
    vk_is_app_user: "1",
    vk_are_notifications_enabled: "0",
    vk_app_id: "7170938",
    vk_access_token_settings: "photos",
    sign: "rSVegjbvysVHTF8yP4L9q2crnFrUOw9Z6Mq9SYsGFUo",
  },
  notifications: false,
  stringLaunchParams: "?vk_user_id=17588892",
};
export const usersReducer = (
  state = initialState,
  action: UsersActionTypes
) => {
  switch (action.type) {
    case AUTH:
      return { ...state, user: action.payload };
    case CHANGE_USER_CITY:
      return { ...state, user: { ...state.user, city: action.payload } };
    case CHANGE_MASTER_CITY:
      return {
        ...state,
        user: {
          ...state.user,
          master: { ...state.user?.master, city: action.payload },
        },
      };
    case SAVE_LAUNCH_PARAMS:
      let launchParams = action.payload
        .replace("?", "")
        .split("&")
        .reduce(function (p: { [k: string]: string }, e) {
          let a = e.split("=");
          p[decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
          return p;
        }, {});
      return {
        ...state,
        launchParams: launchParams,
        stringLaunchParams: action.payload,
        notifications: Boolean(+launchParams.vk_are_notifications_enabled),
      };
    case SET_NOTIFICATION_STATUS:
      return { ...state, notifications: action.payload };
    case ADD_NEW_SERVICE:
      if (state.user?.master.services) {
        return {
          ...state,
          user: {
            ...state.user,
            master: {
              ...state.user?.master,
              services: [action.payload].concat(state.user.master.services),
            },
          },
        };
      } else {
        return {
          ...state,
          user: {
            ...state.user,
            master: {
              ...state.user?.master,
              services: [action.payload],
            },
          },
        };
      }
    case UPDATE_SERVICE:
      let services = state.user?.master.services;
      if (!services) return state;
      const newServices = services.map((item) => {
        if (item.id === action.payload.id) {
          return action.payload;
        }
        return item;
      });
      return {
        ...state,
        user: {
          ...state.user,
          master: {
            ...state.user!.master,
            services: newServices,
          },
        },
      };
    case DELETE_SERVICE:
      let sArr = state.user?.master.services;
      if (!sArr) return state;
      const newSArr = sArr.filter((item) => item.id !== action.payload.id);
      return {
        ...state,
        user: {
          ...state.user,
          master: {
            ...state.user!.master,
            services: newSArr,
          },
        },
      };
    case CHANGE_VISIBLE:
      return {
        ...state,
        user: {
          ...state.user,
          master: {
            ...state.user!.master,
            is_visible: action.payload,
          },
        },
      };
    case SET_MASTER_ADDRESS:
      return {
        ...state,
        user: {
          ...state.user,
          master: {
            ...state.user!.master,
            addresses: [action.payload],
          },
        },
      };
    default:
      return state;
  }
};
