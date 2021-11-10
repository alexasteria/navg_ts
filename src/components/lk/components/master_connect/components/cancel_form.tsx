import { Alert } from "@vkontakte/vkui";
import React, { Dispatch, SetStateAction } from "react";

const CancelForm: React.FC<{
  action: () => void;
  setAlert: Dispatch<SetStateAction<any>>;
}> = ({ action, setAlert }) => {
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
          action: action,
        },
      ]}
      actionsLayout="horizontal"
      onClose={() => setAlert(null)}
      header="Отмена записи"
      text="Вы уверены, что хотите отменить запись клиента?"
    />
  );
};
export default CancelForm;
