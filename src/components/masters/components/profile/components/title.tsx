import {
  Avatar,
  Button,
  Gradient,
  Group,
  Div,
  Text,
  Title,
} from "@vkontakte/vkui";
import React from "react";
import { User } from "../../../../../global/types";
import { Icon20ShareOutline } from "@vkontakte/icons";
import bridge from "@vkontakte/vk-bridge";

type MasterTitleInput = {
  avatarLink: User["avatar_url"];
  firstName: User["first_name"];
  lastName: User["last_name"];
  id: number;
};

const MasterTitle: React.FC<MasterTitleInput> = ({
  avatarLink,
  firstName,
  lastName,
  id,
}) => {
  const share = () => {
    bridge.send("VKWebAppShare", {
      link: "https://vk.com/app7170938#route=/masters/profile/" + id,
    });
  };
  return (
    <Group separator={"hide"}>
      <Gradient
        style={{
          margin: "-7px -7px 0 -7px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: 25,
        }}
      >
        <Avatar size={96} src={avatarLink} />
        <Title
          style={{ marginBottom: 8, marginTop: 20 }}
          level="2"
          weight="medium"
        >
          {firstName + ` ` + lastName}
        </Title>
        <Text
          weight={"regular"}
          style={{ marginBottom: 24, color: "var(--text_secondary)" }}
        >
          {"Частный мастер"}
        </Text>
        <Div>
          <Button before={<Icon20ShareOutline />} onClick={share}>
            Поделиться
          </Button>
        </Div>
      </Gradient>
    </Group>
  );
};
export default MasterTitle;
