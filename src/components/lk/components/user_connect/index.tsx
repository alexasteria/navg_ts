import {
  HorizontalScroll,
  PanelHeader,
  PanelHeaderBack,
  Tabs,
  TabsItem,
} from "@vkontakte/vkui";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useDispatch } from "react-redux";
import { goBack } from "../../../../store/route/route_actions";
import UserConnectionList from "./user_connection_list";
import { ConnectStatus } from "../../../../global/types";

const UserConnect: React.FC<{ alert: Dispatch<SetStateAction<any>> }> = ({
  alert,
}) => {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState<ConnectStatus[]>([
    ConnectStatus.ACCEPTED,
  ]);
  return (
    <>
      <PanelHeader
        left={<PanelHeaderBack onClick={() => dispatch(goBack())} />}
      >
        Исходящие заявки
      </PanelHeader>
      <HorizontalScroll>
        <Tabs>
          <TabsItem
            onClick={() => setFilter([ConnectStatus.ACCEPTED])}
            selected={filter.includes(ConnectStatus.ACCEPTED)}
          >
            Принятые
          </TabsItem>
          <TabsItem
            onClick={() => setFilter([ConnectStatus.REQUESTED])}
            selected={filter.includes(ConnectStatus.REQUESTED)}
          >
            Новые
          </TabsItem>
          <TabsItem
            onClick={() =>
              setFilter([
                ConnectStatus.CANCELED_BY_MASTER,
                ConnectStatus.CANCELED_BY_USER,
                ConnectStatus.CANCELED_BY_TIMEOUT,
              ])
            }
            selected={filter.includes(ConnectStatus.CANCELED_BY_MASTER)}
          >
            Отменено
          </TabsItem>
          <TabsItem
            onClick={() => setFilter([ConnectStatus.FINISHED])}
            selected={filter.includes(ConnectStatus.FINISHED)}
          >
            Завершенные
          </TabsItem>
        </Tabs>
      </HorizontalScroll>
      <UserConnectionList filter={filter} alert={alert} />
    </>
  );
};
export default UserConnect;
