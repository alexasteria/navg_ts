import { Avatar, Banner } from "@vkontakte/vkui";
import { Icon28CancelCircleFillRed } from "@vkontakte/icons";
import React from "react";

const Error: React.FC<{ header: string; text: string }> = ({
  header,
  text,
}) => {
  return (
    <Banner
      before={
        <Avatar size={36}>
          <Icon28CancelCircleFillRed />
        </Avatar>
      }
      header={header}
      subheader={text}
    />
  );
};
export default Error;
