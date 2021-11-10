import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootReducer } from "../../../../store/rootReducer";
import {
  Cell,
  Group,
  PanelHeader,
  PanelHeaderBack,
  SimpleCell,
} from "@vkontakte/vkui";
import { goBack, navigate } from "../../../../store/route/route_actions";
import MasterTitle from "./components/title";
import PortfolioSlider from "./components/photo/portfolio_slider";
import Services from "./components/services/services";
import RatingStars from "../grid/components/rating_stars";
import { Tabs } from "../../../../store/route/route_action_types";
import Loader from "../../../../global/loader";
import Map from "./components/map";

const MasterProfile: React.FC = () => {
  const master = useSelector(
    (state: RootReducer) => state.mastersState.targetMaster
  );
  const dispatch = useDispatch();
  if (!master) return <Loader />;
  return (
    <>
      <PanelHeader
        left={<PanelHeaderBack onClick={() => dispatch(goBack())} />}
      >
        О мастере
      </PanelHeader>
      <MasterTitle
        avatarLink={master.avatar_url}
        firstName={master.first_name}
        lastName={master.last_name}
        id={master.master.id}
      />
      <Group>
        <Cell
          expandable
          onClick={() =>
            dispatch(navigate({ tab: Tabs.MASTERS, panel: "feedback" }))
          }
          indicator={master.master.comments_count}
          description={
            <div style={{ display: "flex" }}>
              <div style={{ marginRight: 5 }}>Средний рейтинг</div>
              <RatingStars countStars={master.master.rating} weight={15} />
            </div>
          }
        >
          Отзывы клиентов
        </Cell>
      </Group>
      <PortfolioSlider
        photos={
          master.master.services
            ? master.master.services
                .map((service) =>
                  service.photos !== null ? service.photos : []
                )
                .flat()
            : []
        }
      />
      <SimpleCell
        expandable
        onClick={() =>
          dispatch(navigate({ tab: Tabs.MASTERS, panel: "masterPortfolio" }))
        }
      >
        Посмотреть всё портфолио
      </SimpleCell>
      <Services masterId={master.master.id} services={master.master.services} />
      {master.master.addresses && <Map points={master.master.addresses} />}
    </>
  );
};
export default MasterProfile;
