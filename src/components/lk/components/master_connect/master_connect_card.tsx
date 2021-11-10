import moment from "moment";
import React, { Dispatch, SetStateAction } from "react";
import { ConnectStatus, MasterConnect } from "../../../../global/types";
import { Card, Cell, Header, MiniInfoCell } from "@vkontakte/vkui";
import {
  Icon20CancelCircleFillRed,
  Icon20PhoneCircleFillGreen,
  Icon20RecentCircleFillYellow,
} from "@vkontakte/icons";
import { Icon20CommentOutline } from "@vkontakte/icons";
import Actions from "./actions";

const getMeta = (connect: MasterConnect) => {
  switch (connect.status) {
    case ConnectStatus.ACCEPTED:
      return (
        <MiniInfoCell before={<Icon20RecentCircleFillYellow />}>
          Клиент записан на:{" "}
          {connect.connected_at
            ? moment(connect.connected_at).calendar()
            : "Дата неизвестна"}
        </MiniInfoCell>
      );
    case ConnectStatus.CANCELED_BY_MASTER:
      return (
        <MiniInfoCell before={<Icon20CancelCircleFillRed />} textWrap="full">
          Вы отменили заявку клиента
        </MiniInfoCell>
      );
    case ConnectStatus.CANCELED_BY_TIMEOUT:
      return (
        <MiniInfoCell before={<Icon20CancelCircleFillRed />} textWrap="full">
          Заявка отменена, так как Вы не обработали её за 24 часа
        </MiniInfoCell>
      );
    case ConnectStatus.CANCELED_BY_USER:
      return (
        <MiniInfoCell before={<Icon20CancelCircleFillRed />} textWrap="full">
          Клиент отменил заявку
        </MiniInfoCell>
      );
    case ConnectStatus.FINISHED:
      return (
        <MiniInfoCell before={<Icon20RecentCircleFillYellow />}>
          Клиент был у Вас{" "}
          {connect.connected_at
            ? moment(connect.connected_at).calendar()
            : "Дата неизвестна"}
        </MiniInfoCell>
      );
    case ConnectStatus.HISTORY:
      return null;
    case ConnectStatus.REQUESTED:
      return (
        <Cell
          before={<Icon20PhoneCircleFillGreen />}
          multiline
          description="Необходимо ответить на заявку в течение 24 часов, иначе Ваш профиль будет временно скрыт из поисковой выдачи "
        >
          Новая заявка
        </Cell>
      );
  }
};

const MasterConnectCard: React.FC<{
  connect: MasterConnect;
  deleteConnectionFromGrid: (id: number) => void;
  alert: Dispatch<SetStateAction<any>>;
}> = ({ connect, deleteConnectionFromGrid, alert }) => {
  return (
    <Card mode="shadow" key={connect.id} style={{ marginBottom: 10 }}>
      <Header mode="secondary">Заявка на запись №{connect.id}</Header>
      <Cell multiline>
        <a
          style={{ color: "#818c99" }}
          href={"https://vk.com/id" + connect.vk_user_id}
        >
          {connect.user.first_name} {connect.user.last_name}
        </a>{" "}
        хочет записаться на "{connect.services[0].title}"
      </Cell>
      {connect.comment && (
        <MiniInfoCell before={<Icon20CommentOutline />}>
          {connect.comment}
        </MiniInfoCell>
      )}
      {getMeta(connect)}
      <Actions
        status={connect.status}
        connectId={connect.id}
        deleteConnectionFromGrid={deleteConnectionFromGrid}
        setAlert={alert}
      />
    </Card>
  );
};
export default MasterConnectCard;
