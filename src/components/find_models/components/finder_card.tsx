import React from "react";
import {
  Avatar,
  Card,
  CardGrid,
  RichCell,
  SimpleCell,
  Cell,
} from "@vkontakte/vkui";
import { Icon24MoneyCircle } from "@vkontakte/icons";

const FinderCard: React.FC<{ key: number }> = ({ key }) => {
  const images = [
    "https://pp.userapi.com/c841034/v841034569/3b8c1/pt3sOw_qhfg.jpg",
    "https://pp.userapi.com/c841034/v841034569/3b8c1/pt3sOw_qhfg.jpg",
    "https://pp.userapi.com/c841034/v841034569/3b8c1/pt3sOw_qhfg.jpg",
  ];
  return (
    <CardGrid key={key} size={"l"}>
      <Card>
        <RichCell
          disabled
          before={
            <Avatar
              size={56}
              src="https://pp.userapi.com/c841034/v841034569/3b8c1/pt3sOw_qhfg.jpg"
            />
          }
          caption="12.01.2020"
        >
          Тестовый мастер
        </RichCell>
        <Cell multiline>Описание</Cell>
        <CardGrid size={"s"} style={{ marginBottom: 10 }}>
          {images.map((image, i) => {
            return (
              <Card
                style={{ padding: 2, borderRadius: 13, margin: 0 }}
                mode="shadow"
                key={i}
              >
                <div
                  style={{
                    borderRadius: 13,
                    height: 96,
                    backgroundImage: "url(" + image + ")",
                    backgroundSize: "cover",
                  }}
                />
              </Card>
            );
          })}
        </CardGrid>
        <SimpleCell before={<Icon24MoneyCircle width={15} height={15} />}>
          Скидка 50%
        </SimpleCell>
        <SimpleCell onClick={() => console.log()} expandable>
          Записаться
        </SimpleCell>
      </Card>
    </CardGrid>
  );
};
export default FinderCard;
