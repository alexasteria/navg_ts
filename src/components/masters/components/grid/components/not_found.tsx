import { Button, Placeholder } from "@vkontakte/vkui";
import { Icon56UsersOutline } from "@vkontakte/icons";
import React from "react";
import bridge from "@vkontakte/vk-bridge";

const NotFound = () => {
  const share = () => {
    bridge.send("VKWebAppShare", {
      link: "https://m.vk.com/app7170938",
    });
  };
  return (
    <Placeholder
      icon={<Icon56UsersOutline />}
      header="Не расстраивайтесь"
      action={
        <Button onClick={share} size="l">
          Поделиться
        </Button>
      }
    >
      В данный момент у нас нет данных о специалистах этого профиля в Вашем
      городе. Мы расширяем базу мастеров, и скоро предложения появятся.
      Поделитесь приложением с мастерами, которых Вы знаете.
    </Placeholder>
  );
};
export default NotFound;
