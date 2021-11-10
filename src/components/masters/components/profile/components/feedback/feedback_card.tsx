import { Avatar, Cell, Group, Separator } from "@vkontakte/vkui";
import RatingStars from "../../../grid/components/rating_stars";
import React from "react";
import { Feedback } from "../../../../../../global/types";
import moment from "moment";

const FeedbackCard: React.FC<{ comment: Feedback }> = ({ comment }) => {
  return (
    <Group key={comment.id} separator={"hide"}>
      <Cell
        description={moment(comment.created_at).calendar()}
        before={<Avatar size={40} src={comment.user.avatar_url} />}
      >
        {comment.user.first_name + " " + comment.user.last_name}
      </Cell>
      <Cell multiline>{comment.message}</Cell>
      {comment.connection.rating && (
        <Cell
          indicator={<RatingStars countStars={comment.connection.rating} />}
        >
          Оценка
        </Cell>
      )}
      <Separator />
    </Group>
  );
};
export default FeedbackCard;
