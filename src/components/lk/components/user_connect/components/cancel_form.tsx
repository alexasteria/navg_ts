import { Alert, Textarea } from "@vkontakte/vkui";
import React, { Dispatch, SetStateAction, useState } from "react";

const UserCancelForm: React.FC<{
  action: (message: string) => void;
  setAlert: Dispatch<SetStateAction<any>>;
}> = ({ setAlert, action }) => {
  const [message, setMessage] = useState("");
  return (
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
          action: () => action(message),
        },
      ]}
      actionsLayout="horizontal"
      onClose={() => setAlert(null)}
      header="Отмена записи"
      text={
        <>
          Вы уверены, что хотите отменить запись? Расскажите о причинах.
          <Textarea
            style={{ marginTop: 5 }}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </>
      }
    />
  );
};
export default UserCancelForm;
