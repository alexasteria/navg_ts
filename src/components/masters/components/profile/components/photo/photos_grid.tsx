import { Card, CardGrid, Placeholder } from "@vkontakte/vkui";
import React from "react";
import { Icon56GalleryOutline } from "@vkontakte/icons";
import { useSelector } from "react-redux";
import { RootReducer } from "../../../../../../store/rootReducer";
import bridge from "@vkontakte/vk-bridge";

const PhotoGrid = () => {
  const master = useSelector(
    (state: RootReducer) => state.mastersState.targetMaster
  );
  if (!master) return <div>Ошибка</div>;
  const images = master.master.services
    ? master.master.services
        .map((service) => (service.photos !== null ? service.photos : []))
        .flat()
    : [];
  if (images.length === 0)
    return (
      <Placeholder icon={<Icon56GalleryOutline />} header="Нет фотографий" />
    );
  const photosLinkArr = images.map((image) => image.url);
  const openShowImages = (index: number) => {
    bridge.send("VKWebAppShowImages", {
      images: photosLinkArr || [],
      start_index: index,
    });
  };
  return (
    <CardGrid size="s">
      {photosLinkArr.map((link, index) => {
        return (
          <Card
            style={{ padding: 2, borderRadius: 13, margin: 0 }}
            mode="shadow"
            key={index}
            onClick={() => openShowImages(index)}
          >
            <div
              style={{
                height: 96,
                backgroundImage: "url(" + link + ")",
                backgroundSize: "cover",
                backgroundPosition: "center 35%",
                backgroundRepeat: "no-repeat",
                borderRadius: 13,
              }}
            />
          </Card>
        );
      })}
    </CardGrid>
  );
};
export default PhotoGrid;
