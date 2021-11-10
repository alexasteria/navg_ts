import React from "react";
import FeedbackList from "./feedback";
import { PanelHeader, PanelHeaderBack } from "@vkontakte/vkui";
import { goBack } from "../../../../../../store/route/route_actions";
import { useDispatch } from "react-redux";

const Feedback = () => {
  const dispatch = useDispatch();
  return (
    <>
      <PanelHeader
        left={<PanelHeaderBack onClick={() => dispatch(goBack())} />}
      >
        Отзывы
      </PanelHeader>
      <FeedbackList />
    </>
  );
};
export default Feedback;
