import UserConnectCard from "./user_connect_card";
import React, { Dispatch, SetStateAction } from "react";
import { Div, Spinner } from "@vkontakte/vkui";
import { useGetUserConnect } from "./use_get_user_connect";
import Loader from "../../../../global/loader";
import ConnectionNotFound from "./connection_not_found";
import { ConnectStatus } from "../../../../global/types";
import InfiniteScroll from "react-infinite-scroller";

const UserConnectionList: React.FC<{
  filter: ConnectStatus[];
  alert: Dispatch<SetStateAction<any>>;
}> = ({ filter, alert }) => {
  const {
    connections,
    loadMore,
    hasMore,
    deleteConnectionFromGrid,
    confirmByUser,
  } = useGetUserConnect(filter);
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
          <UserConnectCard
            connect={connect}
            key={connect.id}
            setAlert={alert}
            deleteConnectionFromGrid={deleteConnectionFromGrid}
            confirmByUser={confirmByUser}
          />
        ))}
      </InfiniteScroll>
    </Div>
  );
};
export default UserConnectionList;
