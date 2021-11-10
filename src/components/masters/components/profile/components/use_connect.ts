import { useDispatch, useSelector } from "react-redux";
import { RootReducer } from "../../../../../store/rootReducer";
import { clear_notify, notify } from "../../../../../store/ui/ui_actions";
import { TypeNotify } from "../../../../../store/ui/ui_action_types";

const useConnect = () => {
  const dispatch = useDispatch();
  const sendNotify: (type: TypeNotify, header: string, text: string) => void = (
    type,
    header,
    text
  ) => {
    setTimeout(() => dispatch(clear_notify()), 5000);
    dispatch(notify(type, header, text));
  };
  const launchParams = useSelector(
    (state: RootReducer) => state.usersState.launchParams
  );
  const connectTo = async (
    message: string,
    masterId?: number,
    serviceId?: number
  ) => {
    if (!masterId || !serviceId) return;
    const request = {
      comment: message,
      services: [serviceId],
      vk: launchParams,
    };
    const response = await fetch(
      "https://" +
        process.env.REACT_APP_HOST +
        "/api/v2/masters/" +
        masterId +
        "/connect",
      {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(request), //
      }
    );
    const res = await response.json();
    if (response.status === 200) {
      sendNotify(
        TypeNotify.SUCCESS,
        "Успешно",
        "Мы отправили заявку мастеру и скоро он свяжется с Вами"
      );
      return;
    }
    if (response.status === 400) {
      sendNotify(
        TypeNotify.WARN,
        "Ошибочка вышла",
        "Вы не можете записываться к одному и тому же мастеру несколько раз за день"
      );
      return;
    }
    if (response.status === 405) {
      sendNotify(
        TypeNotify.WARN,
        "Ошибочка вышла",
        "Вы не можете записываться к себе"
      );
    }
    return res;
  };
  return {
    connectTo,
  };
};

export { useConnect };
