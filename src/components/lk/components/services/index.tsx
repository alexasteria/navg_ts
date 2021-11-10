import { Button, Div, PanelHeader, PanelHeaderBack } from "@vkontakte/vkui";
import { goBack, navigate } from "../../../../store/route/route_actions";
import React from "react";
import { useDispatch } from "react-redux";
import MyServicesList from "./my_services_list";
import { Icon20Add } from "@vkontakte/icons";
import { Tabs } from "../../../../store/route/route_action_types";

const MyServices = () => {
  const dispatch = useDispatch();
  return (
    <>
      <PanelHeader
        left={<PanelHeaderBack onClick={() => dispatch(goBack())} />}
      >
        Мои услуги
      </PanelHeader>
      <Div>
        <Button
          before={<Icon20Add />}
          mode={"outline"}
          onClick={() =>
            dispatch(navigate({ tab: Tabs.LK, panel: "addService" }))
          }
          stretched
        >
          Добавить услугу
        </Button>
      </Div>
      <MyServicesList />
    </>
  );
};
export default MyServices;
