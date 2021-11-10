import { Alert, Button, Div } from "@vkontakte/vkui";
import React, { Dispatch, SetStateAction } from "react";
import { ConnectStatus } from "../../../../global/types";
import { useConnection } from "./useConnection";
import moment from "moment";
import { useDispatch } from "react-redux";
import { notify } from "../../../../store/ui/ui_actions";
import { TypeNotify } from "../../../../store/ui/ui_action_types";
import AcceptForm from "./components/accept_form";
import CancelForm from "./components/cancel_form";

const Actions: React.FC<{
  status: ConnectStatus;
  connectId: number;
  deleteConnectionFromGrid: (id: number) => void;
  setAlert: Dispatch<SetStateAction<any>>;
}> = ({ status, connectId, deleteConnectionFromGrid, setAlert }) => {
  const { cancelByMaster, acceptByMaster } = useConnection();
  const dispatch = useDispatch();
  const accept = async (d: any, t: any) => {
    if (!t || !d) {
      dispatch(
        notify(TypeNotify.ERROR, "Ошибка", "Укажите дату и время записи")
      );
      return;
    }
    const status = await acceptByMaster(
      connectId,
      moment(`${d} ${t}`).format()
    );
    if (status === 200) {
      deleteConnectionFromGrid(connectId);
      setAlert(null);
    }
  };
  const cancel = () => {
    deleteConnectionFromGrid(connectId);
    cancelByMaster(connectId);
  };
  switch (status) {
    case ConnectStatus.ACCEPTED:
      return (
        <Div style={{ display: "flex" }}>
          <Button
            size="l"
            stretched
            mode="secondary"
            onClick={() => {
              setAlert(
                <Alert
                  actions={[
                    {
                      title: "Нет",
                      autoclose: true,
                      mode: "cancel",
                    },
                    {
                      title: "Да, отменяем",
                      autoclose: true,
                      mode: "destructive",
                      action: () => {
                        deleteConnectionFromGrid(connectId);
                        cancelByMaster(connectId);
                      },
                    },
                  ]}
                  actionsLayout="horizontal"
                  onClose={() => setAlert(null)}
                  header="Отмена записи"
                  text="Вы уверены, что хотите отменить запись клиента?"
                />
              );
            }}
          >
            Отменить
          </Button>
        </Div>
      );
    case ConnectStatus.CANCELED_BY_MASTER:
      return null;
    case ConnectStatus.CANCELED_BY_USER:
      return null;
    case ConnectStatus.FINISHED:
      return null;
    case ConnectStatus.HISTORY:
      return null;
    case ConnectStatus.CANCELED_BY_TIMEOUT:
      return null;
    case ConnectStatus.REQUESTED:
      return (
        <Div style={{ display: "flex" }}>
          <Button
            size="l"
            stretched
            style={{ marginRight: 8 }}
            onClick={() => {
              setAlert(<AcceptForm action={accept} setAlert={setAlert} />);
            }}
          >
            Принять
          </Button>
          <Button
            size="l"
            stretched
            mode="secondary"
            onClick={() => {
              setAlert(<CancelForm action={cancel} setAlert={setAlert} />);
            }}
          >
            Отклонить
          </Button>
        </Div>
      );
  }
};
export default Actions;
