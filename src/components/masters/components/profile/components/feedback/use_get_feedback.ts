import { useEffect, useState } from "react";
import { notify } from "../../../../../../store/ui/ui_actions";
import { TypeNotify } from "../../../../../../store/ui/ui_action_types";
import { useDispatch, useSelector } from "react-redux";
import { Feedback } from "../../../../../../global/types";
import { RootReducer } from "../../../../../../store/rootReducer";

const useGetFeedback = (masterId?: number) => {
  const dispatch = useDispatch();
  const stringLaunchParams = useSelector(
    (state: RootReducer) => state.usersState.stringLaunchParams
  );
  const [feedBack, setFeedback] = useState<Feedback[] | null>(null);
  useEffect(() => {
    if (!masterId) return;
    const getFeedback = async () => {
      const response = await fetch(
        "https://" +
          process.env.REACT_APP_HOST +
          "/api/v2/masters/" +
          masterId +
          "/feedback" +
          stringLaunchParams
      );
      if (response.status !== 200)
        dispatch(
          notify(
            TypeNotify.ERROR,
            "Ошибка",
            "Возникла непредвиденная ошибка при загрузке отзывов"
          )
        );
      const feeds = await response.json();
      if (feeds.items) {
        setFeedback(feeds.items);
        return;
      }
      setFeedback([]);
    };
    getFeedback();
  }, [dispatch, masterId, stringLaunchParams]);
  return {
    feedBack,
  };
};
export { useGetFeedback };
