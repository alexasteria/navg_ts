import {
  Button,
  CustomSelect,
  FormItem,
  Input,
  ModalCard,
  ModalRoot,
  Textarea,
} from "@vkontakte/vkui";
import React, { useState } from "react";
import { Icon56MoneyTransferOutline } from "@vkontakte/icons";
import { useDispatch, useSelector } from "react-redux";
import { RootReducer } from "../../../store/rootReducer";
import { notify, setLkModal } from "../../../store/ui/ui_actions";
import { UseChangeProfileMaster } from "./use_change_profile_master";
import { TypeNotify } from "../../../store/ui/ui_action_types";
import { UseGetCategories } from "../../masters/components/use_get_cetegories";

const LkModal = () => {
  const { skills } = UseGetCategories();
  const { addService } = UseChangeProfileMaster();
  const lkModal = useSelector((state: RootReducer) => state.uiState.lkModal);
  const [prodName, setProdName] = useState<string>("");
  const [prodDescription, setProdDescription] = useState<string>("");
  const [prodCost, setProdCost] = useState<string>("");
  const [selectSkills, setSkills] = useState<string>("");
  const dispatch = useDispatch();
  const skillsProps = {
    value: selectSkills,
    options: skills.map((s) => {
      return { value: String(s.id), label: s.name };
    }),
  };
  const saveService = () => {
    if (selectSkills.length === 0) {
      dispatch(
        notify(
          TypeNotify.WARN,
          "Внимание",
          "Вы не указали тип оказываемой услуги"
        )
      );
      return;
    }
    if (prodName.length === 0 || prodName.length > 50) {
      dispatch(
        notify(
          TypeNotify.WARN,
          "Внимание",
          "Название услуги должно содержать от 1 до 50 символов"
        )
      );
      return;
    }
    if (prodDescription.length === 0 || prodDescription.length > 1000) {
      dispatch(
        notify(
          TypeNotify.WARN,
          "Внимание",
          "Описание услуги должно содержать от 1 до 1000 символов"
        )
      );
      return;
    }
    if (prodCost.length === 0 || prodCost.length > 7) {
      dispatch(
        notify(
          TypeNotify.WARN,
          "Внимание",
          "Стоимость услуги должна содержать от 1 до 7 символов"
        )
      );
      return;
    }
    addService(
      prodName,
      prodDescription,
      String(+prodCost * 100),
      selectSkills
    );
    dispatch(setLkModal(null));
    setProdName("");
    setProdDescription("");
    setProdCost("");
  };
  const modal = (
    <ModalRoot activeModal={lkModal} onClose={() => dispatch(setLkModal(null))}>
      <ModalCard
        id={"add_service"}
        onClose={() => dispatch(setLkModal(null))}
        icon={<Icon56MoneyTransferOutline />}
        header="Добавьте сервис или процедуру, которую вы выполняете"
        subheader="Фотографии к услуге можно добавить после ее сохранения"
        actions={
          <Button size="l" mode="primary" type="submit" onClick={saveService}>
            Сохранить
          </Button>
        }
      >
        <FormItem top="Выберите вид работ">
          <CustomSelect
            placeholder="Не выбрано"
            {...skillsProps}
            onChange={(option) => setSkills(String(option.target.value))}
          />
        </FormItem>
        <FormItem top="Название процедуры">
          <Input
            name="editProdTitle"
            onChange={(event) => setProdName(event.target.value)}
            value={prodName}
          />
        </FormItem>
        <FormItem top="Краткое описание процедуры">
          <Textarea
            name="editProdBody"
            onChange={(event) => setProdDescription(event.target.value)}
            value={prodDescription}
          />
        </FormItem>
        <FormItem top="Минимальная цена за работу">
          <Input
            name="editProdPrice"
            type="number"
            onChange={(event) => setProdCost(String(event.target.value))}
            value={prodCost}
          />
        </FormItem>
      </ModalCard>
    </ModalRoot>
  );
  return { modal };
};
export { LkModal };
