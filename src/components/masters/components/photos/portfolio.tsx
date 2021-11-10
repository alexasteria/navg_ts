import PhotoGrid from "../profile/components/photo/photos_grid";
import React from "react";
import { PanelHeader, PanelHeaderBack } from "@vkontakte/vkui";
import { goBack } from "../../../../store/route/route_actions";
import { useDispatch } from "react-redux";

const Portfolio = () => {
  const dispatch = useDispatch();
  return (
    <>
      <PanelHeader
        left={<PanelHeaderBack onClick={() => dispatch(goBack())} />}
      >
        Выбор города
      </PanelHeader>
      <PhotoGrid />
    </>
  );
};
export default Portfolio;
