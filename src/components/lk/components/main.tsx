import React from "react";
import { Div, Button, PanelHeader, Separator } from "@vkontakte/vkui";
import ModerBanner from "./moder_banner";
import UserProfileCard from "./user_profile_card";
import UserMenu from "./user_menu";
import MasterMenu from "./master_menu";
import { useDispatch, useSelector } from "react-redux";
import { RootReducer } from "../../../store/rootReducer";
import Favourite from "../../banners/favourite";
import { navigate } from "../../../store/route/route_actions";
import { Tabs } from "../../../store/route/route_action_types";

const LkMain = () => {
  const dispatch = useDispatch();
  const selfUser = useSelector((state: RootReducer) => state.usersState.user);
  const launchParams = useSelector(
    (state: RootReducer) => state.usersState.launchParams
  );
  if (!selfUser) return null;
  const { master } = selfUser;
  return (
    <>
      <PanelHeader>Профиль</PanelHeader>
      {master && master.status && master.status !== "active" && <ModerBanner />}
      <UserProfileCard />
      <UserMenu />
      <Favourite />
      <Separator style={{ margin: "12px 0" }} />
      {master && <MasterMenu city={master.city} />}
      {launchParams.vk_user_id === "199500866" && (
        <Div>
          <Button
            onClick={() =>
              dispatch(navigate({ tab: Tabs.LK, panel: "moderation" }))
            }
          >
            Модерация
          </Button>
        </Div>
      )}
    </>
  );
};
export default LkMain;
