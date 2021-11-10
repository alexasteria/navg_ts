import React from "react";
import { Icon24Favorite, Icon24FavoriteOutline } from "@vkontakte/icons";

const getStars: (countStars: number, weight?: number) => JSX.Element[] = (
  countStars,
  weight
) => {
  let arrStart = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= countStars) {
      arrStart.push(
        <Icon24Favorite
          key={i}
          width={weight || 22}
          height={weight || 22}
          fill={"ffbb00"}
        />
      );
    } else {
      arrStart.push(
        <Icon24FavoriteOutline
          key={i}
          width={weight || 22}
          height={weight || 22}
          fill={"ffbb00"}
        />
      );
    }
  }
  return arrStart;
};

const RatingStars: React.FC<{ countStars: number; weight?: number }> = ({
  countStars,
  weight,
}) => {
  return (
    <div style={{ display: "inline-flex" }}>{getStars(countStars, weight)}</div>
  );
};
export default RatingStars;
