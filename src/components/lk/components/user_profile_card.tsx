import {
  Avatar,
  Button,
  Gradient,
  Group,
  MiniInfoCell,
  Text,
  Title,
  Tooltip,
} from "@vkontakte/vkui";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootReducer } from "../../../store/rootReducer";
import { UseChangeProfileMaster } from "./use_change_profile_master";
import RatingStars from "../../masters/components/grid/components/rating_stars";
import bridge from "@vkontakte/vk-bridge";
import { notify } from "../../../store/ui/ui_actions";
import { TypeNotify } from "../../../store/ui/ui_action_types";

const UserProfileCard = () => {
  const dispatch = useDispatch();
  const [tooltip, setTooltip] = useState(false);
  const selfUser = useSelector((state: RootReducer) => state.usersState.user);
  const { registrationMaster } = UseChangeProfileMaster();
  const registration = useCallback(async () => {
    const access = await getAccess();
    if (!access) {
      dispatch(
        notify(
          TypeNotify.ERROR,
          "Ошибка",
          "Для регистрации мастером необходимо предоставить доступ на получение сообщений, иначе Вы не узнаете о записи нового клиента"
        )
      );
      return;
    }
    registrationMaster();
  }, [dispatch, registrationMaster]);
  const getAccess = async () => {
    const response = await bridge.send("VKWebAppAllowMessagesFromGroup", {
      group_id: 193179174,
      key: "dBuBKe1kFcdemzB",
    });
    if (!response.result) return false;
    return response.result;
  };
  if (!selfUser) return <div>No user data</div>;
  const getStatus = (status: string) => {
    switch (status) {
      case "moderation":
        return (
          <Tooltip
            text="Ваш профиль проверяется на ошибки и будет доступен к просмотру клиентам в течении 24 часов"
            isShown={tooltip}
            onClose={() => setTooltip(false)}
            cornerOffset={-6}
          >
            <MiniInfoCell before="Статус:" onClick={() => setTooltip(true)}>
              На модерации
            </MiniInfoCell>
          </Tooltip>
        );
      case "active":
        return (
          <Tooltip
            text="Ваш профиль виден и доступен к просмотру для клиентов"
            isShown={tooltip}
            onClose={() => setTooltip(false)}
            cornerOffset={-6}
          >
            <MiniInfoCell before="Статус:" onClick={() => setTooltip(true)}>
              Активен
            </MiniInfoCell>
          </Tooltip>
        );
      case "archive":
        return (
          <Tooltip
            text="Ваш профиль скрыт от общего просмотра"
            isShown={tooltip}
            onClose={() => setTooltip(false)}
            cornerOffset={-6}
          >
            <MiniInfoCell before="Статус:" onClick={() => setTooltip(true)}>
              Профиль скрыт
            </MiniInfoCell>
          </Tooltip>
        );
      case "fixing":
        return (
          <Tooltip
            text="При модерации в Вашем профиле обнаружены ошибки"
            isShown={tooltip}
            onClose={() => setTooltip(false)}
            cornerOffset={-6}
          >
            <MiniInfoCell before="Статус:" onClick={() => setTooltip(true)}>
              Исправление ошибок
            </MiniInfoCell>
          </Tooltip>
        );
      default:
        return null;
    }
  };
  return (
    <Group separator={"hide"}>
      <Gradient
        style={{
          margin: "-7px -7px 0 -7px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: 32,
        }}
      >
        <Avatar size={96} src={selfUser.avatar_url} />
        <Title
          style={{ marginBottom: 8, marginTop: 20 }}
          level="2"
          weight="medium"
        >
          {selfUser.first_name + ` ` + selfUser.last_name}
        </Title>
        <Text
          weight={"regular"}
          style={{ marginBottom: 24, color: "var(--text_secondary)" }}
        >
          {selfUser.master ? "Частный мастер" : "Пользователь"}
        </Text>
        {!selfUser.master && (
          <Button size="m" mode="secondary" onClick={registration}>
            Зарегистрироваться как мастер
          </Button>
        )}
        {selfUser.master && (
          <>
            <RatingStars countStars={selfUser.master.rating} />
            {getStatus(selfUser.master.status)}
          </>
        )}
      </Gradient>
    </Group>
  );
};
export default UserProfileCard;
