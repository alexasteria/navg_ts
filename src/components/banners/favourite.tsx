import { Banner, Button } from "@vkontakte/vkui";
import React from "react";
import bridge from "@vkontakte/vk-bridge";
import { useSelector } from "react-redux";
import { RootReducer } from "../../store/rootReducer";

const addToFavApp = () => {
  bridge.send("VKWebAppAddToFavorites", {});
};

const Favourite = () => {
  const isFav = useSelector(
    (state: RootReducer) => state.usersState.launchParams.vk_is_favorite
  );
  return !isFav ? (
    <Banner
      header="Мы избранные"
      subheader="Добавьте Навигатор красоты в список избранных приложений. Мы всего в одном клике от вас."
      actions={<Button onClick={() => addToFavApp}>Добавить</Button>}
    />
  ) : null;
};
export default Favourite;
