import { Avatar, Banner } from "@vkontakte/vkui";
import { Icon28CheckCircleFillYellow } from "@vkontakte/icons";
import React from "react";

const Warning: React.FC<{ header: string; text: string }> = ({
  header,
  text,
}) => {
  return (
    <Banner
      before={
        <Avatar size={36}>
          <Icon28CheckCircleFillYellow />
        </Avatar>
      }
      header={header}
      subheader={text}
    />
  );
};
export default Warning;
