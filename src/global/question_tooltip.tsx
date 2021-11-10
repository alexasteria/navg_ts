import { Icon20QuestionCircleFillGreen } from "@vkontakte/icons";
import { Tooltip } from "@vkontakte/vkui";
import React, { useState } from "react";

const QuestionTooltip: React.FC<{ align?: "left" | "right"; text: string }> = ({
  align,
  text,
}) => {
  const [visible, setVisible] = useState(false);
  return (
    <Tooltip
      alignX={align}
      isShown={visible}
      onClose={() => setVisible(false)}
      text={text}
    >
      <Icon20QuestionCircleFillGreen onClick={() => setVisible(true)} />
    </Tooltip>
  );
};
export default QuestionTooltip;
