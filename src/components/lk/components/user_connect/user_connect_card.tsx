import moment from "moment";
import React, { Dispatch, SetStateAction } from "react";
import { ConnectStatus, UserConnect } from "../../../../global/types";
import { Button, Card, Cell, Header, MiniInfoCell, Div } from "@vkontakte/vkui";
import { Icon20RecentCircleFillYellow } from "@vkontakte/icons";
import { useDispatch } from "react-redux";
import { Tabs } from "../../../../store/route/route_action_types";
import { navigate } from "../../../../store/route/route_actions";
import UserConnectActions from "./user_connect_actions";
import { Icon20CalendarCircleFillRed } from "@vkontakte/icons";
import { Icon20CancelCircleFillRed } from "@vkontakte/icons";
import Confirm from "./components/confirm";

const UserConnectCard: React.FC<{
  connect: UserConnect;
  setAlert: Dispatch<SetStateAction<any>>;
  deleteConnectionFromGrid: (id: number) => void;
  confirmByUser: (
    connectId: number,
    message: string,
    rating: number
  ) => Promise<number>;
}> = ({ connect, setAlert, deleteConnectionFromGrid, confirmByUser }) => {
  const dispatch = useDispatch();
  const confirm = async (message: string, rating: number) => {
    const status = await confirmByUser(connect.id, message, rating);
    if (status === 200) {
      setAlert(null);
      deleteConnectionFromGrid(connect.id);
    }
  };
  const getMeta = (connect: UserConnect) => {
    switch (connect.status) {
      case ConnectStatus.ACCEPTED:
        return (
          <>
            <MiniInfoCell
              before={<Icon20RecentCircleFillYellow />}
              textWrap="full"
            >
              Вы записаны на:{" "}
              {connect.connected_at
                ? moment(connect.connected_at).calendar()
                : "Дата неизвестна"}
            </MiniInfoCell>
            {moment() > moment(connect.connected_at) && (
              <Cell
                multiline
                description="Назначеное время прошло. Пожалуйста, оставьте отзыв о мастере и помогите другим пользователям не ошибиться в выборе."
              >
                <Div>
                  <Button
                    stretched
                    size="l"
                    mode="secondary"
                    type="submit"
                    onClick={() => {
                      setAlert(
                        <Confirm action={confirm} setAlert={setAlert} />
                      );
                    }}
                  >
                    Оставить отзыв
                  </Button>
                </Div>
              </Cell>
            )}
          </>
        );
      case ConnectStatus.CANCELED_BY_MASTER:
        return (
          <MiniInfoCell before={<Icon20CancelCircleFillRed />} textWrap="full">
            Заявка отменена мастером.
          </MiniInfoCell>
        );
      case ConnectStatus.CANCELED_BY_USER:
        return (
          <MiniInfoCell before={<Icon20CancelCircleFillRed />} textWrap="full">
            Вы отменили заявку.
          </MiniInfoCell>
        );
      case ConnectStatus.CANCELED_BY_TIMEOUT:
        return (
          <MiniInfoCell before={<Icon20CancelCircleFillRed />} textWrap="full">
            Заявка отменена автоматически, так как мастер не обработал её за 24
            часа.
          </MiniInfoCell>
        );
      case ConnectStatus.FINISHED:
        return (
          <MiniInfoCell before={<Icon20RecentCircleFillYellow />}>
            {connect.connected_at
              ? moment(connect.connected_at).calendar()
              : "Дата неизвестна"}
          </MiniInfoCell>
        );
      case ConnectStatus.HISTORY:
        return null;
      case ConnectStatus.REQUESTED:
        return (
          <MiniInfoCell
            before={<Icon20CalendarCircleFillRed />}
            textWrap="full"
          >
            Заявка отправлена. Ожидайте, мастер свяжется с Вами и запишет на
            определённое время.
          </MiniInfoCell>
        );
    }
  };
  return (
    <Card mode="shadow" key={connect.id} style={{ marginBottom: 10 }}>
      <Header mode="secondary">Заявка на запись №{connect.id}</Header>
      <Cell multiline>
        Вы подали заявку на запись к мастеру{" "}
        <span
          style={{ color: "#3e93d0" }}
          onClick={() =>
            dispatch(
              navigate({
                tab: Tabs.MASTERS,
                panel: "profile",
                id: connect.master_profile.master.id,
              })
            )
          }
        >
          {connect.master_profile.first_name +
            " " +
            connect.master_profile.last_name}
        </span>{" "}
        на процедуру {connect.services[0].title}
      </Cell>
      {getMeta(connect)}
      <UserConnectActions
        connectId={connect.id}
        status={connect.status}
        setAlert={setAlert}
        deleteConnectionFromGrid={deleteConnectionFromGrid}
      />
    </Card>
  );
};
export default UserConnectCard;
