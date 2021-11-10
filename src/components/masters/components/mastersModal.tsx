import {
  Button,
  FormItem,
  ModalCard,
  ModalRoot,
  Textarea,
} from "@vkontakte/vkui";
import React, { useState } from "react";
import { Icon56MoneyTransferOutline } from "@vkontakte/icons";
import { useDispatch, useSelector } from "react-redux";
import { RootReducer } from "../../../store/rootReducer";
import { setMastersModal } from "../../../store/ui/ui_actions";
import { useConnect } from "./profile/components/use_connect";
const MastersModal = () => {
  const modal = useSelector((state: RootReducer) => state.uiState.mastersModal);
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const selectService = useSelector(
    (state: RootReducer) => state.mastersState.selectService
  );
  const masterId = useSelector(
    (state: RootReducer) => state.mastersState.targetMaster?.master.id
  );
  const { connectTo } = useConnect();
  const mastersModal = (
    <ModalRoot
      activeModal={modal}
      onClose={() => dispatch(setMastersModal(null))}
    >
      <ModalCard
        id={"connect"}
        onClose={() => dispatch(setMastersModal(null))}
        icon={<Icon56MoneyTransferOutline />}
        header={
          <div>
            Запись на услугу
            <br /> «{selectService?.title}»
          </div>
        }
        subheader="Укажите любую важную информацию для мастера или Ваш номер телефона для связи, либо задайте интересующие вопросы"
        actions={
          <Button
            size="l"
            mode="primary"
            type="submit"
            onClick={() => {
              connectTo(message, masterId, selectService?.id);
              dispatch(setMastersModal(null));
            }}
          >
            Отправить
          </Button>
        }
      >
        <FormItem top="Информация для мастера">
          <Textarea
            name="message"
            onChange={(event) => setMessage(event.target.value)}
            value={message}
          />
        </FormItem>
      </ModalCard>
    </ModalRoot>
  );
  return { mastersModal };
};
export { MastersModal };
