import { Group, Header } from "@vkontakte/vkui";
import React from "react";
import { User } from "../../../../../../global/types";
import ServiceCard from "./service_card";

const Services: React.FC<{
  services: User["master"]["services"];
  masterId: number;
}> = ({ services, masterId }) => {
  if (!services) return null;
  return (
    <Group
      separator="hide"
      header={<Header mode="secondary">Запись к мастеру</Header>}
      description={
        "Выберите необходимую процедуру и нажмите на кнопку записи к мастеру. Мастер свяжется с Вами."
      }
    >
      {services.map((service) => (
        <ServiceCard masterId={masterId} service={service} key={service.id} />
      ))}
    </Group>
  );
};
export default Services;
