import React from "react";
import { Footer, PanelHeader } from "@vkontakte/vkui";
import HeadCity from "../../../global/head_city";
import FinderCard from "./finder_card";
const FinderGrid = () => {
  const arr = [1, 2, 3, 4, 5];
  return (
    <>
      <PanelHeader>Ищу модель</PanelHeader>
      <HeadCity />
      {arr.map((item) => (
        <FinderCard key={item} />
      ))}
      <Footer />
    </>
  );
};
export default FinderGrid;
