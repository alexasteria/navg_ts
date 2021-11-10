import { combineReducers } from "redux";
import { mastersReducer } from "./masters/masters_reducer";
import { MastersState } from "./masters/masters_action_types";
import { usersReducer } from "./users/users_reducer";
import { UsersState } from "./users/users_action_types";
import { RouteState } from "./route/route_action_types";
import { routeReducer } from "./route/route_reducer";
import { uiReducer } from "./ui/ui_reduces";
import { UiState } from "./ui/ui_action_types";

export type RootReducer = {
  mastersState: MastersState;
  usersState: UsersState;
  routeState: RouteState;
  uiState: UiState;
};

export const rootReducer = combineReducers({
  mastersState: mastersReducer,
  usersState: usersReducer,
  routeState: routeReducer,
  uiState: uiReducer,
});
