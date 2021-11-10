import React from "react";
import { Cell, PanelHeader, PanelHeaderBack } from "@vkontakte/vkui";
import { goBack, navigate } from "../../../store/route/route_actions";
import { useDispatch, useSelector } from "react-redux";
import SetAddressMap from "./map";
import { Icon24Place } from "@vkontakte/icons";
import { Tabs } from "../../../store/route/route_action_types";
import { RootReducer } from "../../../store/rootReducer";

const AddressMap = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootReducer) => state.usersState.user);
  return (
    <>
      <PanelHeader
        left={<PanelHeaderBack onClick={() => dispatch(goBack())} />}
      >
        Адрес
      </PanelHeader>
      <Cell
        before={<Icon24Place />}
        expandable
        indicator={user?.master.city ? user.master.city.name : "Не указан"}
        onClick={() =>
          dispatch(navigate({ tab: Tabs.LK, panel: "changeCity" }))
        }
      >
        Город
      </Cell>
      <SetAddressMap points={user?.master.addresses} />
    </>
  );
};
export default AddressMap;
