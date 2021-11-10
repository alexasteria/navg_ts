import { Alert, MiniInfoCell, Textarea, Div, Cell } from "@vkontakte/vkui";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Icon24Favorite, Icon24FavoriteOutline } from "@vkontakte/icons";

const Confirm: React.FC<{
  action: (message: string, rating: number) => void;
  setAlert: Dispatch<SetStateAction<any>>;
}> = ({ setAlert, action }) => {
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);
  const getStars: () => JSX.Element[] = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(
          <Icon24Favorite
            width={36}
            height={36}
            id={String(i)}
            key={String(i)}
            onClick={() => setRating(i)}
            fill={"ffbb00"}
          />
        );
      } else {
        stars.push(
          <Icon24FavoriteOutline
            width={36}
            height={36}
            id={String(i)}
            key={String(i)}
            onClick={() => setRating(i)}
            fill={"ffbb00"}
          />
        );
      }
    }
    return stars;
  };
  return (
    <Alert
      actions={[
        {
          title: "Завершить",
          autoclose: true,
          mode: "default",
          action: () => action(message, rating),
        },
      ]}
      actionsLayout="horizontal"
      onClose={() => setAlert(null)}
      header="Отзыв о работе"
      text={
        <>
          <MiniInfoCell before="" textWrap="full">
            Что вы думаете о качестве выполненной услуги и мастере?
          </MiniInfoCell>
          <Textarea
            style={{ marginTop: 5 }}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Cell description="Оцените мастера от 1 до 5">
            <Div style={{ display: "flex" }}>{getStars()}</Div>
          </Cell>
        </>
      }
    />
  );
};
export default Confirm;
