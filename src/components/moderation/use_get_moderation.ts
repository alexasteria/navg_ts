import { useCallback, useEffect, useState } from "react";
import { User } from "../../global/types";
import { useDispatch, useSelector } from "react-redux";
import { RootReducer } from "../../store/rootReducer";
import { notify } from "../../store/ui/ui_actions";
import { TypeNotify } from "../../store/ui/ui_action_types";

const useGetModeration = () => {
  const dispatch = useDispatch();
  const [masters, setMasters] = useState<User[]>([]);
  const stringLaunchParams = useSelector(
    (state: RootReducer) => state.usersState.stringLaunchParams
  );
  const launchParams = useSelector(
    (state: RootReducer) => state.usersState.launchParams
  );
  const getMasters = useCallback(async () => {
    const response = await fetch(
      "https://" +
        process.env.REACT_APP_HOST +
        "/api/v2/moderators/masters" +
        stringLaunchParams
    );
    if (response.status !== 200) {
      dispatch(notify(TypeNotify.ERROR, "Ошибка", "Вам сюда нельзя"));
      return;
    }
    const res = await response.json();
    setMasters(res.items !== null ? res.items : []);
  }, [stringLaunchParams, dispatch]);
  useEffect(() => {
    getMasters();
  }, [getMasters]);
  const approve = useCallback(
    async (id: number) => {
      const response = await fetch(
        "https://" +
          process.env.REACT_APP_HOST +
          "/api/v2/moderators/masters/" +
          id +
          "/approve",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            vk: launchParams,
          }),
        }
      );
      if (response.status !== 200) {
        dispatch(notify(TypeNotify.ERROR, "Ошибка", "Ну какая-то ошибка :("));
        return;
      }
      getMasters();
    },
    [getMasters, dispatch, launchParams]
  );
  return {
    masters,
    approve,
  };
};
export { useGetModeration };
