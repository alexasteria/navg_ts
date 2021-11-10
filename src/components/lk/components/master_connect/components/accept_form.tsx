import React, {Dispatch, SetStateAction, useState} from "react";
import { Alert, FormItem, Input } from "@vkontakte/vkui";

const AcceptForm: React.FC<{
  action: (d: any, t: any) => void;
  setAlert: Dispatch<SetStateAction<any>>;
}> = ({ action, setAlert }) => {
  const [date, setDate] = useState<null | string>(null);
  const [time, setTime] = useState<null | string>(null);
  return (
    <Alert
      actions={[
        {
          title: "Отмена",
          autoclose: true,
          mode: "cancel",
        },
        {
          title: "Подтверждаю",
          mode: "default",
          action: () => action(date, time),
        },
      ]}
      actionsLayout="horizontal"
      onClose={() => setAlert(null)}
      header="Подтверждение записи"
      text={
        <>
          Укажите, на какое время Вы записали клиента.
          <FormItem top="Выберите дату" status={date ? "valid" : "error"}>
            <Input
              type="date"
              onChange={(e) => {
                setDate(e.target.value);
              }}
            />
          </FormItem>
          <FormItem top="Выберите время" status={time ? "valid" : "error"}>
            <Input type="time" onChange={(e) => setTime(e.target.value)} />
          </FormItem>
        </>
      }
    />
  );
};
export default AcceptForm;
