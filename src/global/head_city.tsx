import React from "react";
import { MiniInfoCell, Subhead } from "@vkontakte/vkui";
import { Icon20PlaceOutline } from "@vkontakte/icons";
import { useDispatch, useSelector } from "react-redux";
import { RootReducer } from "../store/rootReducer";
import { goForward } from "../store/route/route_actions";

const HeadCity: React.FC = () => {
  const city = useSelector((state: RootReducer) => state.usersState.user?.city);
  const dispatch = useDispatch();
  return (
    <MiniInfoCell
      style={{ marginTop: 5 }}
      after={
        <Subhead
          onClick={() => dispatch(goForward("changeCity"))}
          weight="regular"
          style={{ color: "#3f8ae0" }}
        >
          Изменить
        </Subhead>
      }
      before={<Icon20PlaceOutline width={15} height={15} />}
    >
      <Subhead weight="regular">{city ? city.name : "Не выбран"}</Subhead>
    </MiniInfoCell>
  );
};
export default HeadCity;
