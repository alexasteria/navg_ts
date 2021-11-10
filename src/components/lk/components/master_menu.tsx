import {
  Button,
  Cell,
  Group,
  Header,
  List,
  Div,
  Switch,
} from "@vkontakte/vkui";
import {
  Icon24UserIncoming,
  Icon24Hide,
  Icon24ShareOutline,
  Icon24StoryOutline,
  Icon24Services,
} from "@vkontakte/icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { navigate } from "../../../store/route/route_actions";
import { Tabs } from "../../../store/route/route_action_types";
import { User } from "../../../global/types";
import { Icon24Place } from "@vkontakte/icons";
import { RootReducer } from "../../../store/rootReducer";
import bridge from "@vkontakte/vk-bridge";
import { changeVisible } from "../../../store/users/users_actions";

const MasterMenu: React.FC<{ city: User["city"] }> = ({ city }) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootReducer) => state.usersState.user);
  const launchParams = useSelector(
    (state: RootReducer) => state.usersState.launchParams
  );
  if (!user?.master) return null;
  const wallPost = () => {
    const link = "https://m.vk.com/app7170938";
    let prodsArr = user.master.services?.map((prod) => {
      return "&#9989;" + prod.title + "\n";
    });
    if (!prodsArr) return;
    let prods = prodsArr.join("");
    bridge.send("VKWebAppShowWallPostBox", {
      attachments: link + "#route=/masters/profile/" + user.master.id,
      message:
        "&#128522; Приглашаю записаться на: \n" +
        prods +
        "по специальным условиям в приложении Навигатор красоты. \n",
      owner_id: Number(launchParams.vk_id),
      copyright: link,
    });
  };
  const storiesPost = () => {
    bridge.send("VKWebAppShowStoryBox", {
      background_type: "image",
      url:
        "https://sun9-76.userapi.com/9CA7Ap-SWJm-bdeu9OWh1iXJP5BkaSbtx3zfKA/jcRS6sqPaP0.jpg",
      locked: true,
      attachment: {
        text: "view",
        type: "url",
        url:
          "https://vk.com/app7170938#route=/masters/profile/" + user.master.id,
      },
      stickers: [
        {
          sticker_type: "renderable",
          sticker: {
            transform: {
              relation_width: 0.9,
              translation_y: 0.25,
            },
            can_delete: false,
            content_type: "image",
            url:
              "https://sun9-11.userapi.com/W7ljJxZlpaMD9EPafPeujRRV61xv7evo4P3DrA/f1HJkZgc7W0.jpg",
            clickable_zones: [
              {
                action_type: "link",
                action: {
                  link:
                    "https://vk.com/app7170938/masters/profile/" +
                    user.master.id,
                  tooltip_text_key: "tooltip_open_page",
                },
                clickable_area: [
                  {
                    x: 0,
                    y: 0,
                  },
                  {
                    x: 884,
                    y: 0,
                  },
                  {
                    x: 884,
                    y: 196,
                  },
                  {
                    x: 0,
                    y: 196,
                  },
                ],
              },
            ],
          },
        },
      ],
    });
  };
  return (
    <>
      <Group header={<Header mode="secondary">Меню мастера</Header>}>
        <List>
          <Cell
            before={<Icon24Place />}
            expandable
            indicator={city ? city.name : "Не указан"}
            onClick={() =>
              dispatch(navigate({ tab: Tabs.LK, panel: "setAddress" }))
            }
          >
            Место работы
          </Cell>
          <Cell
            expandable
            description="Управление записями клиентов"
            before={<Icon24UserIncoming />}
            onClick={() =>
              dispatch(navigate({ tab: Tabs.LK, panel: "masterConnect" }))
            }
          >
            Входящие заявки
          </Cell>
          <Cell
            expandable
            description="Создание и редактирование"
            before={<Icon24Services />}
            onClick={() =>
              dispatch(navigate({ tab: Tabs.LK, panel: "services" }))
            }
          >
            Мои услуги
          </Cell>
        </List>
      </Group>
      {user.master.services && user.master.services.length > 1 && (
        <Group header={<Header mode="secondary">Хотите больше заявок?</Header>}>
          <Div style={{ display: "flex" }}>
            <Button
              before={<Icon24ShareOutline />}
              size="m"
              stretched
              mode="primary"
              style={{ marginRight: 8 }}
              onClick={wallPost}
            >
              На стену
            </Button>
            <Button
              before={<Icon24StoryOutline />}
              size="m"
              stretched
              mode="primary"
              onClick={storiesPost}
            >
              В историю
            </Button>
          </Div>
        </Group>
      )}
      <Cell
        before={<Icon24Hide />}
        after={
          <Switch
            name={"notify"}
            onChange={() => dispatch(changeVisible(user, launchParams))}
            checked={!user.master.is_visible}
          />
        }
        description="Если вы временно не оказываете услуги - можете скрыть свой профиль из поисковой выдачи"
        multiline
      >
        Скрыть в поиске
      </Cell>
    </>
  );
};
export default MasterMenu;
