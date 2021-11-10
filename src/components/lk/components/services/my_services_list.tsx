import React from "react";
import { CardGrid, Placeholder } from "@vkontakte/vkui";
import { useSelector } from "react-redux";
import { RootReducer } from "../../../../store/rootReducer";
import ServiceCard from "./service_card";
import { Icon56WriteOutline } from "@vkontakte/icons";

const MyServicesList = () => {
  const services = useSelector(
    (state: RootReducer) => state.usersState.user?.master.services
  );
  if (!services)
    return (
      <Placeholder icon={<Icon56WriteOutline />}>
        Вы ещё не добавили ни одной услуги
      </Placeholder>
    );
  return (
    <CardGrid size="l">
      {services.map((service) => (
        <ServiceCard service={service} key={service.id} />
      ))}
    </CardGrid>
  );
};
export default MyServicesList;
