import { useSelector } from "react-redux";
import { RootReducer } from "../../../../../../store/rootReducer";
import React from "react";
import { useGetFeedback } from "./use_get_feedback";
import Loader from "../../../../../../global/loader";
import FeedbackCard from "./feedback_card";
import { Placeholder } from "@vkontakte/vkui";
import { Icon56UsersOutline } from "@vkontakte/icons";

const FeedbackList = () => {
  const masterId = useSelector(
    (state: RootReducer) => state.mastersState.targetMaster?.master.id
  );
  const { feedBack } = useGetFeedback(masterId);
  if (!masterId) return <div>Нет информации о мастере</div>;
  if (!feedBack) return <Loader />;
  if (feedBack.length === 0)
    return (
      <Placeholder icon={<Icon56UsersOutline />} header="Ничего нет">
        Пользователи еще не оставляли отзывы об этом мастере
      </Placeholder>
    );
  return (
    <>
      {feedBack.map((comment) => (
        <FeedbackCard comment={comment} />
      ))}
    </>
  );
};
export default FeedbackList;
