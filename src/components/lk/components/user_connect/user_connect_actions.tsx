import { Button, Div } from "@vkontakte/vkui";
import React, { Dispatch, SetStateAction } from "react";
import { ConnectStatus } from "../../../../global/types";
import { useConnection } from "../master_connect/useConnection";
import UserCancelForm from "./components/cancel_form";

const UserConnectActions: React.FC<{
  connectId: number;
  status: ConnectStatus;
  setAlert: Dispatch<SetStateAction<any>>;
  deleteConnectionFromGrid: (id: number) => void;
}> = ({ connectId, status, setAlert, deleteConnectionFromGrid }) => {
  const { cancelByUser } = useConnection();
  const userCancel = (message: string) => {
    deleteConnectionFromGrid(connectId);
    cancelByUser(connectId, message);
  };
  switch (status) {
    case ConnectStatus.ACCEPTED:
      return null;
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
            mode="secondary"
            onClick={() => {
              setAlert(
                <UserCancelForm action={userCancel} setAlert={setAlert} />
              );
            }}
          >
            Отменить запись
          </Button>
        </Div>
      );
  }
};
export default UserConnectActions;
