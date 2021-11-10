import { Placeholder } from "@vkontakte/vkui";
import { Icon56UsersOutline } from "@vkontakte/icons";
import React from "react";

const NotCity = () => {
  return (
    <Placeholder icon={<Icon56UsersOutline />}>
      Необходимо указать город для осуществления поиска.
    </Placeholder>
  );
};
export default NotCity;
