import { Div, Group, Header, HorizontalScroll } from "@vkontakte/vkui";
import React from "react";
import { UseGetCategories } from "./use_get_cetegories";
import { Icon16Cancel } from "@vkontakte/icons";
import { useDispatch, useSelector } from "react-redux";
import { RootReducer } from "../../../store/rootReducer";
import {
  changeCategory,
  changeSkill,
} from "../../../store/masters/masters_actions";

const Categories: React.FC = () => {
  const { categories } = UseGetCategories();
  const dispatch = useDispatch();
  const filter = useSelector((state: RootReducer) => state.mastersState.filter);
  const city = useSelector((state: RootReducer) =>
    state.usersState.user ? state.usersState.user.city : null
  );
  if (!categories || !city) return null;
  if (!filter.category && !filter.skill)
    return (
      <Div>
        <HorizontalScroll>
          <div style={{ display: "flex" }}>
            {categories.map((item) => (
              <div
                key={item.id}
                style={{
                  marginRight: 4,
                  background:
                    "linear-gradient(0.6turn, rgb(255 255 255), #d0eef3)",
                  border: "1px solid #c6c6c6",
                  borderRadius: 6,
                  padding: 10,
                  fontSize: 16,
                  textAlign: "center",
                  color: "#144067",
                }}
              >
                <div
                  style={{ whiteSpace: "nowrap" }}
                  onClick={() => {
                    dispatch(changeCategory(item));
                  }}
                >
                  {item.name}
                </div>
              </div>
            ))}
          </div>
        </HorizontalScroll>
      </Div>
    );
  return (
    <Group
      header={
        <Header mode="secondary">
          <div style={{ display: "flex" }}>
            {filter.category && (
              <div
                onClick={() => dispatch(changeCategory(null))}
                style={{ display: "flex", marginRight: 10 }}
              >
                {filter.category.name}
                <Icon16Cancel />
              </div>
            )}
            {filter.skill && (
              <div
                style={{ display: "flex" }}
                onClick={() => dispatch(changeSkill(null))}
              >
                {filter.skill.name}
                <Icon16Cancel />
              </div>
            )}
          </div>
        </Header>
      }
    >
      {!filter.skill && (
        <Div>
          <HorizontalScroll>
            <div style={{ display: "flex" }}>
              {filter.category?.skills?.map((item) => (
                <div
                  key={item.id}
                  onClick={() => dispatch(changeSkill(item))}
                  style={{
                    marginRight: 4,
                    background:
                      "linear-gradient(0.5turn, rgb(255 255 255), #d0eef3)",
                    border: "1px solid #c6c6c6",
                    borderRadius: 6,
                    padding: 8,
                    fontSize: 16,
                    textAlign: "center",
                    color: "#144067",
                  }}
                >
                  <div style={{ whiteSpace: "nowrap" }}>{item.name}</div>
                </div>
              ))}
            </div>
          </HorizontalScroll>
        </Div>
      )}
    </Group>
  );
};
export default Categories;
