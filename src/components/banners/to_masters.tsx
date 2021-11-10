import { Banner, Button } from "@vkontakte/vkui";
import { navigate } from "../../store/route/route_actions";
import { Tabs } from "../../store/route/route_action_types";
import React from "react";
import { useDispatch } from "react-redux";

const ToMasters = () => {
  const dispatch = useDispatch();
  return (
    <Banner
      header={
        <span style={{ color: "black" }}>Найти мастера стало проще!</span>
      }
      subheader={
        <span style={{ color: "black" }}>
          Мы находим для Вас <br /> проверенных и надежных <br /> мастеров
          индустрии <br />
          красоты
        </span>
      }
      asideMode="expand"
      mode="image"
      background={
        <div
          style={{
            backgroundColor: "#FFF",
            backgroundImage:
              "url(https://www.sostav.ru/images/news/2018/10/08/ymoqkz6o.jpg)",
            backgroundPosition: "right bottom",
            backgroundSize: 150,
            backgroundRepeat: "no-repeat",
          }}
        />
      }
      actions={
        <Button
          mode="secondary"
          size="s"
          onClick={() => dispatch(navigate({ tab: Tabs.MASTERS }))}
        >
          Посмотреть мастеров
        </Button>
      }
    />
  );
};
export default ToMasters;
