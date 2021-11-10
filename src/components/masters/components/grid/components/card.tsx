import { Avatar, MiniInfoCell, Card, RichCell } from "@vkontakte/vkui";
import RatingStars from "./rating_stars";
import React from "react";
import { User, Skill } from "../../../../../global/types";
import { Tabs } from "../../../../../store/route/route_action_types";
import { navigate } from "../../../../../store/route/route_actions";
import { useDispatch, useSelector } from "react-redux";
import { changeSkill } from "../../../../../store/masters/masters_actions";
import PortfolioSlider from "../../profile/components/photo/portfolio_slider";
import { RootReducer } from "../../../../../store/rootReducer";

type InputCard = {
  masterProfile: User;
};

const MasterCard: React.FC<InputCard> = ({ masterProfile }) => {
  const { master } = masterProfile;
  const stringParams = useSelector(
    (state: RootReducer) => state.usersState.stringLaunchParams
  );
  const dispatch = useDispatch();
  if (!master) return <div>This user is not a master</div>;
  const getSkills = (skills: Skill[] | null) => {
    if (!skills) return null;
    return skills.map((skill) => {
      return skill.id !== 0 ? (
        <span
          style={{ color: "#2295f1" }}
          onClick={() => {
            dispatch(changeSkill(skill));
          }}
          key={skill.id}
        >
          #{skill.name}{" "}
        </span>
      ) : null;
    });
  };
  return (
    <Card mode="shadow" key={masterProfile.id}>
      <RichCell
        style={{ borderRadius: "10px 10px 10px 10px" }}
        onClick={() =>
          dispatch(
            navigate(
              {
                tab: Tabs.MASTERS,
                panel: "profile",
                id: master.id,
              },
              stringParams
            )
          )
        }
        bottom={
          <MiniInfoCell
            before={<RatingStars countStars={master.rating} />}
            style={{ padding: 0, margin: 0 }}
          />
        }
        before={<Avatar src={masterProfile.avatar_url} size={56} />}
      >
        {masterProfile.first_name} {masterProfile.last_name}
      </RichCell>
      <PortfolioSlider
        photos={
          masterProfile.master.services
            ? masterProfile.master.services
                .map((service) =>
                  service.photos !== null ? service.photos : []
                )
                .flat()
                .slice(0, 3)
            : []
        }
      />
      <MiniInfoCell before="" textWrap={"full"}>
        {getSkills(master.skills)}
      </MiniInfoCell>
    </Card>
  );
};

export default MasterCard;
