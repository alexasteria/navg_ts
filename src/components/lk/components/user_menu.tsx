import { Cell, Group, Header, List, Switch } from "@vkontakte/vkui";
import { Icon24UserOutgoing } from "@vkontakte/icons";
import { navigate } from "../../../store/route/route_actions";
import { Tabs } from "../../../store/route/route_action_types";
import React from "react";
import { Icon24Notification } from "@vkontakte/icons";
import { useDispatch, useSelector } from "react-redux";
import bridge from "@vkontakte/vk-bridge";
import { RootReducer } from "../../../store/rootReducer";
import { setNotificationStatus } from "../../../store/users/users_actions";

const UserMenu = () => {
  const notificationStatus = useSelector(
    (state: RootReducer) => state.usersState.notifications
  );
  const dispatch = useDispatch();
  const notifyFromVk = async () => {
    if (notificationStatus) {
      const response = await bridge.send("VKWebAppDenyNotifications");
      if (response.result) {
        dispatch(setNotificationStatus(false));
      }
    } else {
      const response = await bridge.send("VKWebAppAllowNotifications");
      if (response.result) {
        dispatch(setNotificationStatus(true));
      }
    }
  };
  return (
    <Group
      header={<Header mode="secondary">Меню пользователя</Header>}
      separator={"hide"}
    >
      <List>
        <Cell
          before={<Icon24Notification />}
          after={
            <Switch
              name={"notify"}
              onChange={notifyFromVk}
              checked={notificationStatus}
            />
          }
          description="PUSH-уведомления о изменении статусов ваших заявок на оказание услуг"
          multiline
        >
          Уведомления о записях
        </Cell>
        <Cell
          expandable
          description="Ваши записи к мастерам"
          before={<Icon24UserOutgoing />}
          onClick={() =>
            dispatch(navigate({ tab: Tabs.LK, panel: "userConnect" }))
          }
        >
          Исходящие заявки
        </Cell>
      </List>
    </Group>
  );
};
export default UserMenu;
