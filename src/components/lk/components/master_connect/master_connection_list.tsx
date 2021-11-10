import React, { Dispatch, SetStateAction } from "react";
import { Div, Spinner } from "@vkontakte/vkui";
import Loader from "../../../../global/loader";
import { useGetMasterConnect } from "./use_get_master_connect";
import ConnectionNotFound from "../user_connect/connection_not_found";
import MasterConnectCard from "./master_connect_card";
import { ConnectStatus } from "../../../../global/types";
import InfiniteScroll from "react-infinite-scroller";

const MasterConnectionList: React.FC<{
  filter: ConnectStatus[];
  alert: Dispatch<SetStateAction<any>>;
}> = ({ filter, alert }) => {
  const {
    connections,
    hasMore,
    loadMore,
    deleteConnectionFromGrid,
  } = useGetMasterConnect(filter);
  if (!connections) return <Loader />;
  if (connections.length === 0) return <ConnectionNotFound />;
  return (
    <Div>
      <InfiniteScroll
        pageStart={0}
        loadMore={loadMore}
        hasMore={hasMore}
        loader={<Spinner />}
      >
        {connections.map((connect) => (
          <MasterConnectCard
            connect={connect}
            key={connect.id}
            deleteConnectionFromGrid={deleteConnectionFromGrid}
            alert={alert}
          />
        ))}
      </InfiniteScroll>
    </Div>
  );
};
export default MasterConnectionList;
