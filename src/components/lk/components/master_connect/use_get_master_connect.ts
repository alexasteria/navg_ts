import { useSelector } from "react-redux";
import { RootReducer } from "../../../../store/rootReducer";
import { useCallback, useEffect, useState } from "react";
import { ConnectStatus, MasterConnect } from "../../../../global/types";

const useGetMasterConnect: (
  filter?: ConnectStatus[]
) => {
  connections: MasterConnect[] | null;
  hasMore: boolean;
  loadMore: () => void;
  deleteConnectionFromGrid: (id: number) => void;
} = (filter) => {
  const [connections, setConnections] = useState<MasterConnect[] | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const stringLaunchParams = useSelector(
    (state: RootReducer) => state.usersState.stringLaunchParams
  );
  const getConnects = useCallback(async () => {
    if (!filter) return;
    const response = await fetch(
      "https://" +
        process.env.REACT_APP_HOST +
        "/api/v2/masters/connects" +
        stringLaunchParams +
        "&statuses=" +
        filter.join(",") +
        "&limit=10&"
    );
    const res = await response.json();
    if (response.status !== 200) {
      return;
    }
    if (res.items === null) {
      setConnections([]);
      return;
    }
    setConnections(res.items);
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
        "/api/v2/masters/connects" +
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
  useEffect(() => {
    getConnects();
  }, [getConnects]);
  return {
    connections,
    hasMore,
    loadMore,
    deleteConnectionFromGrid,
  };
};
export { useGetMasterConnect };
