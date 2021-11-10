import { useDispatch, useSelector } from "react-redux";
import { RootReducer } from "../../../../store/rootReducer";
import { useCallback, useEffect, useState } from "react";
import { ConnectStatus, UserConnect } from "../../../../global/types";
import { notify } from "../../../../store/ui/ui_actions";
import { TypeNotify } from "../../../../store/ui/ui_action_types";

const useGetUserConnect: (
  filter: ConnectStatus[]
) => {
  connections: UserConnect[] | null;
  hasMore: boolean;
  loadMore: () => void;
  deleteConnectionFromGrid: (id: number) => void;
  confirmByUser: (
    connectId: number,
    message: string,
    rating: number
  ) => Promise<number>;
} = (filter) => {
  const dispatch = useDispatch();
  const [connections, setConnections] = useState<UserConnect[] | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const stringLaunchParams = useSelector(
    (state: RootReducer) => state.usersState.stringLaunchParams
  );
  const launchParams = useSelector(
    (state: RootReducer) => state.usersState.launchParams
  );
  const getConnects = useCallback(async () => {
    const response = await fetch(
      "https://" +
        process.env.REACT_APP_HOST +
        "/api/v2/connects" +
        stringLaunchParams +
        "&statuses=" +
        filter.join(",") +
        "&limit=10&"
    );
    const res = await response.json();
    if (response.status !== 200) {
      setConnections([]);
      setHasMore(false);
      return;
    }
    setConnections(res.items !== null ? res.items : []);
    setHasMore(res.has_more);
  }, [stringLaunchParams, filter]);
  const loadMore = useCallback(async () => {
    if (!connections) {
      console.log("no connections");
      return;
    }
    const response = await fetch(
      "https://" +
        process.env.REACT_APP_HOST +
        "/api/v2/connects" +
        stringLaunchParams +
        "&statuses=" +
        filter +
        "&limit=10&offset=" +
        connections?.length
    );
    const res = await response.json();
    if (response.status !== 200) {
      return;
    }
    if (res.items === null) {
      return;
    }
    setConnections([...connections, ...res.items]);
    setHasMore(res.has_more);
  }, [connections, filter, stringLaunchParams]);
  const deleteConnectionFromGrid = (id: number) => {
    if (!connections) return;
    const filteredArr = connections.filter((item) => item.id !== id);
    setConnections(filteredArr);
  };
  const confirmByUser = async (
    connectId: number,
    message: string,
    rating: number
  ) => {
    if (message.length < 10 || rating === 0) {
      dispatch(
        notify(
          TypeNotify.WARN,
          "Внимание",
          "Длина отзыва должна быть более 10 символов, а рейтинг больше ноля"
        )
      );
      return 500;
    }
    const response = await fetch(
      `https://${process.env.REACT_APP_HOST}/api/v2/connects/${connectId}/finish`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: message,
          rating: rating,
          vk: launchParams,
        }),
      }
    );
    if (response.status !== 200) {
      dispatch(
        notify(
          TypeNotify.ERROR,
          "Ошибка",
          "При отправке отзыва произошла ошибка"
        )
      );
      return response.status;
    }
    return response.status;
  };
  useEffect(() => {
    getConnects();
  }, [getConnects, filter]);
  return {
    connections,
    hasMore,
    loadMore,
    deleteConnectionFromGrid,
    confirmByUser,
  };
};
export { useGetUserConnect };
