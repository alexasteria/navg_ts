import {
  Button,
  Card,
  Cell,
  CustomSelect,
  Div,
  FormItem,
  Input,
  Textarea,
} from "@vkontakte/vkui";
import React, { useState } from "react";
import { useUploadPhotos } from "./use_upload_photo";
import PhotoScroll from "../../../masters/components/profile/components/photo/photo_scroll";
import { Service } from "../../../../global/types";
import { UseGetCategories } from "../../../masters/components/use_get_cetegories";
import { notify } from "../../../../store/ui/ui_actions";
import { TypeNotify } from "../../../../store/ui/ui_action_types";
import { useDispatch } from "react-redux";

const valid = (value: string, len: number) => {
  if (value.length > len) return "error";
  return "default";
};

const ServiceCard: React.FC<{
  service: Service;
}> = ({ service }) => {
  const dispatch = useDispatch();
  const { skills } = UseGetCategories();
  const { cost, id, title, description, photos } = service;
  const [edit, setEdit] = useState(false);
  const [newTitle, setTitle] = useState(title);
  const [newDescription, setDescription] = useState(description);
  const [newCost, setCost] = useState(cost ? String(cost / 100) : "");
  const [selectSkills, setSkills] = useState<string>(
    service.skills ? String(service.skills[0].id) : ""
  );
  const { uploadPhoto, delPhoto, saveChanges, delService } = useUploadPhotos();
  const addPhotoFunc: (files: FileList | null) => void = (files) => {
    if (!files) return null;
    uploadPhoto(files, service);
  };
  const delPhotoFunc: (id: number) => void = (id) => {
    if (!id) return null;
    delPhoto(id, service);
  };
  const save = () => {
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
    if (newTitle.length === 0 || newTitle.length > 50) {
      dispatch(
        notify(
          TypeNotify.WARN,
          "Внимание",
          "Название услуги должно содержать от 1 до 50 символов"
        )
      );
      return;
    }
    if (newDescription.length === 0 || newDescription.length > 1000) {
      dispatch(
        notify(
          TypeNotify.WARN,
          "Внимание",
          "Описание услуги должно содержать от 1 до 1000 символов"
        )
      );
      return;
    }
    if (newCost.length === 0 || newCost.length > 7) {
      dispatch(
        notify(
          TypeNotify.WARN,
          "Внимание",
          "Стоимость услуги должна содержать от 1 до 7 символов"
        )
      );
      return;
    }
    saveChanges(
      newTitle,
      newDescription,
      Number(newCost),
      service,
      selectSkills
    );
    setEdit(!edit);
  };
  const skillsProps = {
    value: selectSkills,
    options: skills.map((s) => {
      return { value: String(s.id), label: s.name };
    }),
  };
  if (edit)
    return (
      <Card mode="shadow" key={id}>
        <Cell multiline>
          <FormItem
            top="Вид работ"
            bottom="Рекомментуем указывать вид работ для каждой услуги, чтобы клиентам было проще Вас найти"
          >
            <CustomSelect
              placeholder="Не выбрано"
              {...skillsProps}
              onChange={(option) => setSkills(String(option.target.value))}
            />
          </FormItem>
          <FormItem top="Название процедуры" status={valid(newTitle, 50)}>
            <Input
              value={newTitle}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormItem>
          <FormItem top="Краткое описание процедуры">
            <Textarea
              value={newDescription}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormItem>
          <FormItem top="Минимальная цена за работу">
            <Input
              type="number"
              value={newCost}
              onChange={(e) => setCost(e.target.value)}
            />
          </FormItem>
          <PhotoScroll
            photos={photos}
            withAdd
            addFunc={(files) => addPhotoFunc(files)}
            delFunc={delPhotoFunc}
            editMode={true}
          />
          <Div style={{ display: "flex" }}>
            <Button size="l" stretched onClick={save} mode="secondary">
              Сохранить
            </Button>
          </Div>
        </Cell>
      </Card>
    );
  return (
    <Card mode="shadow" key={id}>
      <Cell multiline>
        <Cell description="Название процедуры">{title}</Cell>
        <Cell description="Краткое описание процедуры" multiline>
          {description}
        </Cell>
        <Cell description="Минимальная цена за работу">{cost / 100}</Cell>
        <PhotoScroll
          photos={photos}
          withAdd
          addFunc={(files) => addPhotoFunc(files)}
        />
        <Div style={{ display: "flex" }}>
          <Button
            stretched
            style={{ marginRight: 8 }}
            onClick={() => delService(service)}
            size="l"
            mode="destructive"
          >
            Удалить
          </Button>
          <Button
            size="l"
            stretched
            onClick={() => setEdit(!edit)}
            mode="secondary"
          >
            Редактировать
          </Button>
        </Div>
      </Cell>
    </Card>
  );
};
export default ServiceCard;
