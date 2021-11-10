import {
  Avatar,
  Card,
  MiniInfoCell,
  PanelHeader,
  RichCell,
  Div,
  Button,
  PanelHeaderBack,
} from "@vkontakte/vkui";
import React from "react";
import { useGetModeration } from "./use_get_moderation";
import { useDispatch, useSelector } from "react-redux";
import { RootReducer } from "../../store/rootReducer";
import RatingStars from "../masters/components/grid/components/rating_stars";
import PortfolioSlider from "../masters/components/profile/components/photo/portfolio_slider";
import Services from "../masters/components/profile/components/services/services";
import { goBack } from "../../store/route/route_actions";

const Moderation = () => {
  const dispatch = useDispatch();
  const launchParams = useSelector(
    (state: RootReducer) => state.usersState.launchParams
  );
  const { masters, approve } = useGetModeration();
  if (launchParams.vk_user_id !== "199500866") return null;
  return (
    <>
      <PanelHeader
        left={<PanelHeaderBack onClick={() => dispatch(goBack())} />}
      >
        Модерация
      </PanelHeader>
      {masters.map((m) => (
        <Card mode="shadow" key={m.master.id}>
          <RichCell
            style={{ borderRadius: "10px 10px 10px 10px" }}
            onClick={() => null}
            bottom={
              <MiniInfoCell
                before={<RatingStars countStars={m.master.rating} />}
                style={{ padding: 0, margin: 0 }}
              />
            }
            before={<Avatar src={m.avatar_url} size={56} />}
          >
            {m.first_name} {m.last_name}
          </RichCell>
          <PortfolioSlider
            photos={
              m.master.services
                ? m.master.services
                    .map((service) =>
                      service.photos !== null ? service.photos : []
                    )
                    .flat()
                : []
            }
          />
          <Services masterId={m.master.id} services={m.master.services} />
          <Div style={{ display: "flex" }}>
            <Button stretched mode="destructive">
              Отклонить
            </Button>
            <Button stretched onClick={() => approve(m.master.id)}>
              Одобрить
            </Button>
          </Div>
        </Card>
      ))}
    </>
  );
};
export default Moderation;
