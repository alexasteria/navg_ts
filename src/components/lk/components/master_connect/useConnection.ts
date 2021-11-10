import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootReducer } from "../../../../store/rootReducer";
import { notify } from "../../../../store/ui/ui_actions";
import { TypeNotify } from "../../../../store/ui/ui_action_types";

const useConnection: () => {
  cancelByMaster: (id: number) => void;
  acceptByMaster: (id: number, date: string) => Promise<number | string>;
  cancelByUser: (id: number, message: string) => void;
} = () => {
  const dispatch = useDispatch();
  const launchParams = useSelector(
    (state: RootReducer) => state.usersState.launchParams
  );
  const cancelByMaster = useCallback(
    async (connect_id) => {
      const response = await fetch(
        "https://" +
          process.env.REACT_APP_HOST +
          "/api/v2/masters/connects/cancel",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            connect_id: connect_id,
            vk: launchParams,
          }),
        }
      );
      if (response.status !== 200) {
        return;
      }
    },
    [launchParams]
  );
  const cancelByUser = useCallback(
    async (connect_id, message) => {
      const response = await fetch(
        `https://${process.env.REACT_APP_HOST}/api/v2/connects/${connect_id}/cancel`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: message,
            vk: launchParams,
          }),
        }
      );
      if (response.status !== 200) {
        return;
      }
    },
    [launchParams]
  );
  const acceptByMaster = useCallback(
    async (connect_id, date) => {
      const response = await fetch(
        "https://" +
          process.env.REACT_APP_HOST +
          "/api/v2/masters/connects/accept",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            connect_id: connect_id,
            connected_at: date,
            vk: launchParams,
          }),
        }
      );
      if (response.status !== 200) {
        dispatch(
          notify(
            TypeNotify.ERROR,
            "Ошибка",
            "Время записи должно быть больше текущего"
          )
        );
      }
      return response.status;
    },
    [launchParams, dispatch]
  );
  return {
    cancelByMaster,
    acceptByMaster,
    cancelByUser,
  };
};
export { useConnection };
