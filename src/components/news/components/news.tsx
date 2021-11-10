import React from "react";
import {
  Avatar,
  Group,
  PanelHeader,
  Placeholder,
  Title,
} from "@vkontakte/vkui";
import { connect } from "react-redux";
import { RootReducer } from "../../../store/rootReducer";
import { User } from "../../../global/types";
import Favourite from "../../banners/favourite";
import ToMasters from "../../banners/to_masters";
import Meta from "../../banners/meta";

type UserInput = {
  user: User | null;
};

const News: React.FC<UserInput> = ({ user }) => {
  if (!user) return null;
  return (
    <>
      <PanelHeader>Новости</PanelHeader>
      <Group>
        <Placeholder
          icon={
            <Avatar
              size={80}
              src="https://sun9-5.userapi.com/impg/NRpTtoDOf-Qxm0tdWzOEVLX8WfUbbSBZq4iOzg/CncQao7CTOI.jpg?size=576x576&quality=96&proxy=1&sign=c57f9797464562390838bc55d428795d&type=album"
            />
          }
        >
          <div>
            <Title level="1" weight="bold" style={{ marginBottom: 16 }}>
              Навигатор красоты
            </Title>
          </div>
        </Placeholder>
        <Meta />
        <ToMasters />
        <Favourite />
      </Group>
    </>
  );
};
const mapStateToProps = (state: RootReducer) => {
  return {
    user: state.usersState.user,
  };
};
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(News);
