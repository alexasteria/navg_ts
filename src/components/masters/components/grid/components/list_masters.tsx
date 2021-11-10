import { CardGrid, Footer, Spinner } from "@vkontakte/vkui";
import MasterCard from "./card";
import React, { useEffect } from "react";
import NotFound from "./not_found";
import Loader from "../../../../../global/loader";
import { useDispatch, useSelector } from "react-redux";
import { RootReducer } from "../../../../../store/rootReducer";
import NotCity from "./not_city";
import { loadMasters } from "../../../../../store/masters/masters_actions";
import InfiniteScroll from "react-infinite-scroller";

const ListMasters: React.FC = () => {
  const dispatch = useDispatch();
  const masters = useSelector(
    (state: RootReducer) => state.mastersState.masters
  );
  const hasMore = useSelector(
    (state: RootReducer) => state.mastersState.hasMore
  );
  const filter = useSelector((state: RootReducer) => state.mastersState.filter);
  const city = useSelector((state: RootReducer) => state.usersState.user?.city);
  const stringParams = useSelector(
    (state: RootReducer) => state.usersState.stringLaunchParams
  );
  useEffect(() => {
    if (masters === null)
      dispatch(loadMasters(filter, stringParams, 0, city?.id));
  }, [masters, city, dispatch, filter, stringParams]);
  if (!city || city.name === "") return <NotCity />;
  if (!masters) return <Loader />;
  if (masters.length === 0) return <NotFound />;
  return (
    <>
      <CardGrid size={"l"}>
        <InfiniteScroll
          style={{ width: "100%" }}
          pageStart={0}
          loadMore={() =>
            dispatch(
              loadMasters(filter, stringParams, masters?.length, city?.id)
            )
          }
          hasMore={hasMore}
          loader={<Spinner key={1} />}
        >
          {masters.map(
            (master) =>
              master.master && (
                <MasterCard masterProfile={master} key={master.master.id} />
              )
          )}
        </InfiniteScroll>
      </CardGrid>
      <Footer>На этом все. Мастеров всего - {masters.length}.</Footer>
    </>
  );
};

export default ListMasters;
