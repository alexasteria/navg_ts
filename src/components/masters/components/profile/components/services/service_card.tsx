import { Card, CardGrid, Cell, CellButton, Separator } from "@vkontakte/vkui";
import { Icon16Down, Icon24Phone } from "@vkontakte/icons";
import React, { useState } from "react";
import { Service } from "../../../../../../global/types";
import { motion } from "framer-motion";
import PhotoScroll from "../photo/photo_scroll";
import { setMastersModal } from "../../../../../../store/ui/ui_actions";
import { useDispatch } from "react-redux";
import { setSelectService } from "../../../../../../store/masters/masters_actions";

const variants = {
  rotate: { rotate: [0, 180], transition: { duration: 0.3 } },
  empty: {},
};
const variantsHeight = {
  full: { height: "100%", transition: { duration: 0.3 } },
  empty: { height: "0px", transition: { duration: 0.3 } },
};
const ServiceCard: React.FC<{ service: Service; masterId: number }> = ({
  service,
  masterId,
}) => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const callToService = (service: Service) => {
    dispatch(setSelectService(service));
    dispatch(setMastersModal("connect"));
  };
  return (
    <CardGrid key={service.id} size="l">
      <Card>
        <Cell
          description={
            service.cost > 0
              ? "От " + service.cost / 100 + " руб."
              : "Стоимость не указана"
          }
          after={
            <motion.div variants={variants} animate={show ? "rotate" : "empty"}>
              <Icon16Down />
            </motion.div>
          }
          onClick={() => setShow(!show)}
          multiline={show}
        >
          {service.title}
        </Cell>
        <motion.div
          initial={{ height: "0px" }}
          variants={variantsHeight}
          animate={show ? "full" : "empty"}
          style={{ overflow: "hidden" }}
        >
          <Cell description="Краткое описание процедуры" multiline>
            {service.description}
          </Cell>
          <PhotoScroll photos={service.photos} />
          <CellButton
            before={
              <motion.div
                initial={{ rotate: 0 }}
                animate={{
                  rotate: [
                    10,
                    -10,
                    10,
                    -10,
                    10,
                    -10,
                    10,
                    -10,
                    10,
                    -10,
                    10,
                    -10,
                    10,
                    -10,
                  ],
                }}
                transition={{ duration: 1 }}
              >
                <Icon24Phone />
              </motion.div>
            }
            onClick={() => callToService(service)}
          >
            Записаться
          </CellButton>
        </motion.div>
        <Separator />
      </Card>
    </CardGrid>
  );
};
export default ServiceCard;
