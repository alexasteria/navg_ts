import React from "react";
import { PanelHeader } from "@vkontakte/vkui";
import HeadCity from "../../../../global/head_city";
import ListMasters from "./components/list_masters";
import Categories from "../categories";

const MastersGrid: React.FC = () => {
  return (
    <>
      <PanelHeader>Мастера</PanelHeader>
      <HeadCity />
      <Categories />
      <ListMasters />
    </>
  );
};
export default MastersGrid;
