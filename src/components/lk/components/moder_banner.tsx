import React from "react";
import { Avatar, Banner, Button, Cell, Div } from "@vkontakte/vkui";
import { useDispatch, useSelector } from "react-redux";
import { RootReducer } from "../../../store/rootReducer";
import { navigate } from "../../../store/route/route_actions";
import { Tabs } from "../../../store/route/route_action_types";
import { UseChangeProfileMaster } from "./use_change_profile_master";

const ModerBanner = () => {
  const dispatch = useDispatch();
  const master = useSelector(
    (state: RootReducer) => state.usersState.user?.master
  );
  if (!master) return <div>Ошибка</div>;
  const warningGradient = "linear-gradient(90deg, #ffb73d 0%, #ffa000 100%)";
  const { retryModeration } = UseChangeProfileMaster();
  const retry = () => {
    retryModeration();
  };
  if (master.city === null)
    return (
      <Banner
        before={
          <Avatar size={28} style={{ backgroundImage: warningGradient }}>
            <span style={{ color: "#fff" }}>!</span>
          </Avatar>
        }
        header="Внимание"
        subheader={
          <Div>
            Для прохождения модерации необходимо указать в каком городе Вы
            оказываете услуги
          </Div>
        }
        actions={
          <Button
            mode="tertiary"
            onClick={() =>
              dispatch(navigate({ tab: Tabs.LK, panel: "changeCity" }))
            }
          >
            Указать город
          </Button>
        }
      />
    );
  if (master.services === null)
    return (
      <Banner
        before={
          <Avatar size={28} style={{ backgroundImage: warningGradient }}>
            <span style={{ color: "#fff" }}>!</span>
          </Avatar>
        }
        header="Внимание"
        subheader={
          <Div>
            Для прохождения модерации необходимо создать как минимум одну
            услугу, которую Вы оказываете
          </Div>
        }
        actions={
          <Button
            mode="tertiary"
            onClick={() =>
              dispatch(navigate({ tab: Tabs.LK, panel: "services" }))
            }
          >
            Добавить услугу
          </Button>
        }
      />
    );
  if (master.status === "fixing")
    return (
      <Banner
        before={
          <Avatar size={28} style={{ backgroundImage: warningGradient }}>
            <span style={{ color: "#fff" }}>!</span>
          </Avatar>
        }
        header="Обнаружены проблемы:"
        subheader={
          <Cell
            description="После устранения замечаний нажмите на кнопку ниже, для проведения повторной модерации"
            multiline
          >
            {master.moderator_message}
          </Cell>
        }
        actions={
          <Button mode="outline" onClick={retry}>
            Замечания устранены
          </Button>
        }
      />
    );
  return null;
};
export default ModerBanner;
