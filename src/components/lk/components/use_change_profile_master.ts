import { useDispatch, useSelector } from "react-redux";
import { notify } from "../../../store/ui/ui_actions";
import { TypeNotify } from "../../../store/ui/ui_action_types";
import { RootReducer } from "../../../store/rootReducer";
import { addNewsService } from "../../../store/users/users_actions";
import { AUTH } from "../../../store/users/users_action_types";

const UseChangeProfileMaster: () => {
  addService: (
    prodName: string,
    prodDescription: string,
    prodCost: string,
    selectSkills: string
  ) => void;
  registrationMaster: () => void;
  retryModeration: () => void;
} = () => {
  const dispatch = useDispatch();
  const launchParams = useSelector(
    (state: RootReducer) => state.usersState.launchParams
  );
  const user = useSelector((state: RootReducer) => state.usersState.user);
  const retryModeration = async () => {
    const response = await fetch(
      "https://" + process.env.REACT_APP_HOST + "/api/v2/masters/retry",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vk: launchParams }),
      }
    );
    if (response.status !== 200) {
      dispatch(notify(TypeNotify.ERROR, "Ошибка", "Что-то пошло не так"));
      return;
    }
    if (!user?.master) return;
    const newUser = {
      ...user,
      master: {
        ...user.master,
        status: "moderation",
      },
    };
    dispatch({ type: AUTH, payload: newUser });
  };
  const registrationMaster = async () => {
    const response = await fetch(
      "https://" + process.env.REACT_APP_HOST + "/api/v2/masters",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vk: launchParams }),
      }
    );
    if (response.status !== 200) {
      dispatch(
        notify(
          TypeNotify.ERROR,
          "Ошибка",
          "Возникла непредвиденная ошибка при регистрации"
        )
      );
      return;
    }
    const res = await response.json();
    dispatch({ type: AUTH, payload: res });
  };
  const addService: (
    prodName: string,
    prodDescription: string,
    prodCost: string,
    selectSkills: string
  ) => void = async (prodName, prodDescription, prodCost, selectSkills) => {
    const response = await fetch(
      "https://" + process.env.REACT_APP_HOST + "/api/v2/services",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cost: Number(prodCost),
          description: prodDescription,
          skills: [Number(selectSkills)],
          title: prodName,
          vk: launchParams,
        }),
      }
    );
    if (response.status !== 200) {
      dispatch(
        notify(
          TypeNotify.ERROR,
          "Ошибка",
          "Возникла непредвиденная ошибка при добавлении сервиса"
        )
      );
      return;
    }
    const newService = await response.json();
    dispatch(addNewsService(newService));
  };
  return {
    addService,
    registrationMaster,
    retryModeration,
  };
};
export { UseChangeProfileMaster };
