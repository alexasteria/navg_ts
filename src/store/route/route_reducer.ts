import {
  CHANGE_TABBAR,
  GO_BACK,
  GO_FORWARD,
  NAVIGATE,
  Route,
  RouteActionTypes,
  RouteState,
  Tabs,
} from "./route_action_types";
import bridge from "@vkontakte/vk-bridge";

const initialState: RouteState = {
  epicTabbar: Tabs.NEWS,
  newsHistory: ["main"],
  mastersHistory: ["main"],
  findModelHistory: ["main"],
  lkHistory: ["main"],
  props: null,
};
const getHistory = (state: RouteState) => {
  switch (state.epicTabbar) {
    case "news":
      return { hist: [...state.newsHistory], name: "newsHistory" };
    case "masters":
      return { hist: [...state.mastersHistory], name: "mastersHistory" };
    case "findmodel":
      return { hist: [...state.findModelHistory], name: "findModelHistory" };
    case "lk":
      return { hist: [...state.lkHistory], name: "lkHistory" };
    default:
      return { hist: [...state.newsHistory], name: "newsHistory" };
  }
};

const getHistOnTab = (val: string, state: RouteState) => {
  switch (val) {
    case "news":
      return { hist: [...state.newsHistory], name: "newsHistory" };
    case "masters":
      return { hist: [...state.mastersHistory], name: "mastersHistory" };
    case "findmodel":
      return { hist: [...state.findModelHistory], name: "findModelHistory" };
    case "lk":
      return { hist: [...state.lkHistory], name: "lkHistory" };
    default:
      return { hist: [...state.newsHistory], name: "newsHistory" };
  }
};

export const routeToStr = (route: Route) => {
  const getId = () => {
    return route.id ? "/" + String(route.id) : "";
  };
  const getPanel = () => {
    return route.panel ? "/" + String(route.panel) : "";
  };
  return "/" + route.tab + getPanel() + getId();
};
export const routeReducer = (
  state = initialState,
  action: RouteActionTypes
) => {
  switch (action.type) {
    case GO_BACK:
      const history_back = getHistory(state);
      if (!history_back) return state;
      const activePanel = history_back.hist[history_back.hist.length - 1];
      if (activePanel === "main") {
        bridge.send("VKWebAppDisableSwipeBack");
      }
      history_back.hist.pop();
      window.history.pushState(
        null,
        "",
        "/" +
          state.epicTabbar +
          "/" +
          history_back.hist[history_back.hist.length - 1]
      );
      return {
        ...state,
        [history_back.name]:
          history_back.hist.length > 0 ? history_back.hist : ["main"],
      };
    case GO_FORWARD:
      const history_forward = getHistory(state);
      if (!history_forward) return state;
      history_forward.hist.push(action.payload);
      return {
        ...state,
        [history_forward.name]: history_forward.hist,
      };
    case CHANGE_TABBAR:
      return { ...state, epicTabbar: action.payload };
    case NAVIGATE:
      const hist = getHistOnTab(action.payload.tab, state);
      if (action.payload.panel) {
        hist.hist.push(action.payload.panel);
      }
      return {
        ...state,
        epicTabbar: action.payload.tab,
        [hist.name]: hist.hist,
      };
    default:
      return state;
  }
};
