import React, { useCallback, useEffect, useState } from "react";
import {
  ConfigProvider,
  Epic,
  Panel,
  Root,
  Tabbar,
  TabbarItem,
  View,
  AppRoot,
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import Icon28More from "@vkontakte/icons/dist/28/more.js";
import Icon28FireOutline from "@vkontakte/icons/dist/28/fire_outline";
import Icon28ServicesOutline from "@vkontakte/icons/dist/28/services_outline";
import { News } from "./components/news";
import { MastersGrid } from "./components/masters";
import { FinderGrid } from "./components/find_models";
import { LkMain } from "./components/lk";
import { useDispatch, useSelector } from "react-redux";
import { Route, Tabs } from "./store/route/route_action_types";
import { RootReducer } from "./store/rootReducer";
import { goBack, navigate } from "./store/route/route_actions";
import {
  auth,
  changeMasterCity,
  changeUserCity,
} from "./store/users/users_actions";
import ChangeCity from "./components/change_city";
import MasterProfile from "./components/masters/components/profile";
import { routeToStr } from "./store/route/route_reducer";
import UserConnect from "./components/lk/components/user_connect";
import MasterConnect from "./components/lk/components/master_connect";
import moment from "moment";
import "moment/locale/ru";
import { TypeNotify } from "./store/ui/ui_action_types";
import { Error, Success, Warning } from "./components/notifications";
import { AnimatePresence, motion } from "framer-motion";
import MyServices from "./components/lk/components/services";
import { LkModal } from "./components/lk/components/modal";
import Portfolio from "./components/masters/components/photos/portfolio";
import Feedback from "./components/masters/components/profile/components/feedback";
import { MastersModal } from "./components/masters/components/mastersModal";
import bridge from "@vkontakte/vk-bridge";
import AddService from "./components/lk/components/services/add_service";
import Moderation from "./components/moderation/main";
import AddressMap from "./components/lk/components/set_address_map";

const tabs: { [k: string]: Tabs } = {
  news: Tabs.NEWS,
  masters: Tabs.MASTERS,
  findmodel: Tabs.FIND_MODELS,
  lk: Tabs.LK,
};

type AppInput = {
  launchParams: Location["search"];
  linkParams: {
    route?: string;
  };
};

const App: React.FC<AppInput> = ({ launchParams, linkParams }) => {
  const [scheme, setScheme] = useState<
    "bright_light" | "client_light" | "client_dark" | "space_gray"
  >("bright_light");
  bridge.subscribe(({ detail }) => {
    if (detail.type === "VKWebAppUpdateConfig") {
      setScheme(detail.data.scheme);
      if (detail.data.scheme === "space_gray")
        bridge.send("VKWebAppSetViewSettings", {
          status_bar_style: "light",
        });
      if (detail.data.scheme === "bright_light")
        bridge.send("VKWebAppSetViewSettings", {
          status_bar_style: "dark",
        });
    }
  });
  moment.locale("ru");
  const dispatch = useDispatch();
  const notification = useSelector(
    (state: RootReducer) => state.uiState.notify
  );
  const epicTabbar = useSelector(
    (state: RootReducer) => state.routeState.epicTabbar
  );
  const newsHistory = useSelector(
    (state: RootReducer) => state.routeState.newsHistory
  );
  const mastersHistory = useSelector(
    (state: RootReducer) => state.routeState.mastersHistory
  );
  const findModelHistory = useSelector(
    (state: RootReducer) => state.routeState.findModelHistory
  );
  const lkHistory = useSelector(
    (state: RootReducer) => state.routeState.lkHistory
  );
  const go = (route: { tab: Tabs; panel?: string; id?: number }) => {
    window.history.pushState(null, "", routeToStr(route));
    dispatch(navigate(route));
  };
  const [lkPopout, setLkPopout] = useState(null);
  const { modal } = LkModal();
  const { mastersModal } = MastersModal();
  const linkPathToRoute = useCallback(() => {
    if (linkParams.route) {
      const path = linkParams.route.slice(1).split("/");
      const route: Route = {
        tab: tabs[path[0]] ? tabs[path[0]] : Tabs.NEWS,
        panel: path[1],
        id: path[2] ? +path[2] : undefined,
      };

      dispatch(navigate(route, launchParams));
      return;
    }
    const path = window.location.pathname.split("/").slice(1, 4);
    const route: Route = {
      tab: tabs[path[0]] ? tabs[path[0]] : Tabs.NEWS,
      panel: path[1],
      id: path[2] ? +path[2] : undefined,
    };
    dispatch(navigate(route, launchParams));
  }, [linkParams, dispatch, launchParams]);
  window.onpopstate = () => {
    linkPathToRoute();
  };
  useEffect(() => {
    linkPathToRoute();
    dispatch(auth(launchParams));
  }, [dispatch, linkPathToRoute, launchParams]);
  const notify = () => {
    if (!notification) return null;
    switch (notification.type) {
      case TypeNotify.ERROR:
        return <Error header={notification.header} text={notification.text} />;
      case TypeNotify.SUCCESS:
        return (
          <Success header={notification.header} text={notification.text} />
        );
      case TypeNotify.WARN:
        return (
          <Warning header={notification.header} text={notification.text} />
        );
    }
  };
  return (
    <ConfigProvider scheme={scheme}>
      <AppRoot>
        <AnimatePresence initial={false} exitBeforeEnter>
          {notification && (
            <motion.div
              initial={{ x: -400 }}
              animate={{ x: 0 }}
              exit={{ x: -400 }}
              style={{
                position: "fixed",
                bottom: 0,
                zIndex: 100,
              }}
            >
              {notify()}
            </motion.div>
          )}
        </AnimatePresence>
        <Epic
          activeStory={epicTabbar}
          tabbar={
            <Tabbar>
              <TabbarItem
                onClick={() => go({ tab: Tabs.NEWS })}
                selected={epicTabbar === Tabs.NEWS}
                data-story="news"
                text="Новости"
              >
                <Icon28FireOutline />
              </TabbarItem>
              <TabbarItem
                onClick={() => go({ tab: Tabs.MASTERS })}
                selected={epicTabbar === Tabs.MASTERS}
                data-story="masters"
                text="Мастера"
              >
                <Icon28ServicesOutline />
              </TabbarItem>
              <TabbarItem
                onClick={() => go({ tab: Tabs.LK })}
                selected={epicTabbar === Tabs.LK}
                data-story="lk"
                text="Профиль"
              >
                <Icon28More />
              </TabbarItem>
            </Tabbar>
          }
        >
          <Root activeView="news" id="news">
            <View
              activePanel={newsHistory[newsHistory.length - 1]}
              history={newsHistory}
              id="news"
            >
              <Panel id="main">
                <News />
              </Panel>
            </View>
          </Root>
          <Root activeView="masters" id="masters">
            <View
              modal={mastersModal}
              popout={null}
              activePanel={mastersHistory[mastersHistory.length - 1]}
              history={mastersHistory}
              id="masters"
              onSwipeBack={() => dispatch(goBack())}
            >
              <Panel id="main">
                <MastersGrid />
              </Panel>
              <Panel id="profile">
                <MasterProfile />
              </Panel>
              <Panel id="changeCity">
                <ChangeCity
                  selectCity={(city, user, launchParams) => {
                    dispatch(changeUserCity(city, user, launchParams));
                    dispatch(goBack());
                  }}
                />
              </Panel>
              <Panel id="masterPortfolio">
                <Portfolio />
              </Panel>
              <Panel id="feedback">
                <Feedback />
              </Panel>
            </View>
          </Root>
          <Root activeView="findmodel" id="findmodel">
            <View
              activePanel={findModelHistory[findModelHistory.length - 1]}
              history={findModelHistory}
              id="findmodel"
              onSwipeBack={() => dispatch(goBack())}
            >
              <Panel id="main">
                <FinderGrid />
              </Panel>
            </View>
          </Root>
          <Root activeView="lk" id="lk">
            <View
              modal={modal}
              popout={lkPopout}
              activePanel={lkHistory[lkHistory.length - 1]}
              history={lkHistory}
              id="lk"
              onSwipeBack={() => dispatch(goBack())}
            >
              <Panel id="main">
                <LkMain />
              </Panel>
              <Panel id="services">
                <MyServices />
              </Panel>
              <Panel id="userConnect">
                <UserConnect alert={setLkPopout} />
              </Panel>
              <Panel id="masterConnect">
                <MasterConnect alert={setLkPopout} />
              </Panel>
              <Panel id="addService">
                <AddService />
              </Panel>
              <Panel id="setAddress">
                <AddressMap />
              </Panel>
              <Panel id="changeCity">
                <ChangeCity
                  selectCity={(city, user, launchParams) => {
                    dispatch(changeMasterCity(city, user, launchParams));
                    dispatch(goBack());
                  }}
                />
              </Panel>
              <Panel id="moderation">
                <Moderation />
              </Panel>
            </View>
          </Root>
        </Epic>
      </AppRoot>
    </ConfigProvider>
  );
};

export default App;
