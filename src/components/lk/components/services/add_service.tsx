import {
  Button,
  CustomSelect,
  FormItem,
  Input,
  Div,
  PanelHeader,
  PanelHeaderBack,
  Textarea,
  Placeholder,
  Header,
  Cell,
} from "@vkontakte/vkui";
import { goBack } from "../../../../store/route/route_actions";
import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { UseGetCategories } from "../../../masters/components/use_get_cetegories";
import { UseChangeProfileMaster } from "../use_change_profile_master";
import { notify } from "../../../../store/ui/ui_actions";
import { TypeNotify } from "../../../../store/ui/ui_action_types";
import { Icon56ArticleOutline } from "@vkontakte/icons";
import QuestionTooltip from "../../../../global/question_tooltip";

const AddService = () => {
  const { skills } = UseGetCategories();
  const { addService } = UseChangeProfileMaster();
  const dispatch = useDispatch();
  const [prodName, setProdName] = useState<string>("");
  const [prodDescription, setProdDescription] = useState<string>("");
  const [prodCost, setProdCost] = useState<string>("");
  const [selectSkills, setSkills] = useState<string>("");
  const skillsProps = {
    value: selectSkills,
    options: skills.map((s) => {
      return { value: String(s.id), label: s.name };
    }),
  };
  const validator: (
    value: string,
    max: number
  ) => { status: "default" | "error" | "valid"; bottom: string } = useCallback(
    (value, max) => {
      if (!value || value.length === 0)
        return { status: "default", bottom: `Максимум ${max} символов` };
      if (value.length > max)
        return { status: "error", bottom: `${value.length} / ${max}` };
      return { status: "valid", bottom: `${value.length} / ${max}` };
    },
    []
  );
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
    dispatch(goBack());
    setProdName("");
    setProdDescription("");
    setProdCost("");
  };
  return (
    <>
      <PanelHeader
        left={<PanelHeaderBack onClick={() => dispatch(goBack())} />}
      >
        Создание услуги
      </PanelHeader>
      <Placeholder
        icon={<Icon56ArticleOutline />}
        header="Добавьте сервис или процедуру, которую вы выполняете"
      >
        Фотографии к услуге можно добавить после ее сохранения
      </Placeholder>
      <FormItem
        top={
          <Cell
            after={
              <QuestionTooltip
                align="right"
                text="Хештег призван помочь клиентам найти мастера нужного вида услуг. Указав категорию Маникюр, вы автоматически будете попадать в список мастеров по хештегу #маникюр. Пожалуйста, убедитесь, что категория соответствует услуге: клиент, который ищет маникюр, не заинтересуется наращиванием ресниц."
              />
            }
          >
            <Header mode="secondary">Выберите вид работ</Header>
          </Cell>
        }
      >
        <CustomSelect
          placeholder="Не выбрано"
          {...skillsProps}
          onChange={(option) => setSkills(String(option.target.value))}
        />
      </FormItem>
      <FormItem
        status={validator(prodName, 50).status}
        bottom={validator(prodName, 50).bottom}
        top={
          <Cell
            after={
              <QuestionTooltip
                align="right"
                text="Название должно быть кратким, лаконичным и четко описывать услугу, которую Вы выполняете; это - первое, что увидят Ваши клиенты."
              />
            }
          >
            <Header mode="secondary">Название процедуры</Header>
          </Cell>
        }
      >
        <Input
          name="editProdTitle"
          onChange={(event) => setProdName(event.target.value)}
          value={prodName}
        />
      </FormItem>
      <FormItem
        status={validator(prodDescription, 500).status}
        bottom={validator(prodDescription, 500).bottom}
        top={
          <Cell
            after={
              <QuestionTooltip
                align="right"
                text="Укажите: для каких целей предназначена данная процедура, как и с помощью каких материалов Вы её выполняете или любую информацию об услуги, которая может помочь клиенту сделать выбор в пользу Вас."
              />
            }
          >
            <Header mode="secondary">Описание процедуры</Header>
          </Cell>
        }
      >
        <Textarea
          name="editProdBody"
          onChange={(event) => setProdDescription(event.target.value)}
          value={prodDescription}
        />
      </FormItem>
      <FormItem
        status={validator(String(prodCost), 7).status}
        bottom={validator(String(prodCost), 7).bottom}
        top={
          <Cell
            after={
              <QuestionTooltip
                align="right"
                text="Указывайте базовую (минимальную) стоимость работы."
              />
            }
          >
            <Header mode="secondary">Минимальная цена за работу</Header>
          </Cell>
        }
      >
        <Input
          name="editProdPrice"
          type="number"
          onChange={(event) => setProdCost(String(event.target.value))}
          value={prodCost}
        />
      </FormItem>
      <Div>
        <Button
          stretched
          size="l"
          mode="primary"
          type="submit"
          onClick={saveService}
        >
          Сохранить
        </Button>
      </Div>
    </>
  );
};
export default AddService;
