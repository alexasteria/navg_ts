import { Avatar, Banner } from "@vkontakte/vkui";
import { Icon28CheckCircleFill } from "@vkontakte/icons";
import React from "react";

const Success: React.FC<{ header: string; text: string }> = ({
  header,
  text,
}) => {
  return (
    <Banner
      before={
        <Avatar size={36}>
          <Icon28CheckCircleFill />
        </Avatar>
      }
      header={header}
      subheader={text}
    />
  );
};
export default Success;
