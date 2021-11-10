import { Card, CardScroll, Group, Header, Placeholder } from "@vkontakte/vkui";
import React, { useMemo } from "react";
import { Icon56GalleryOutline } from "@vkontakte/icons";
import { Photo } from "../../../../../../global/types";
import bridge from "@vkontakte/vk-bridge";

const PortfolioSlider: React.FC<{ photos: Photo[] }> = ({ photos }) => {
  const photosLinkArr = useMemo(() => {
    return photos.map((image) => image.url);
  }, [photos]);
  if (photos.length === 0)
    return (
      <Placeholder icon={<Icon56GalleryOutline />}>Нет фотографий</Placeholder>
    );
  const openShowImages = (index: number) => {
    bridge.send("VKWebAppShowImages", {
      images: photosLinkArr || [],
      start_index: index,
    });
  };
  return (
    <Group
      header={<Header mode="secondary">Выполненые работы мастера</Header>}
      separator="hide"
    >
      <CardScroll size="s">
        {photos.map((photo, index) => {
          if (!photo) return null;
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
                  backgroundImage: "url(" + photo.url + ")",
                  backgroundSize: "cover",
                  backgroundPosition: "center 35%",
                  backgroundRepeat: "no-repeat",
                  borderRadius: 13,
                }}
              />
            </Card>
          );
        })}
      </CardScroll>
    </Group>
  );
};
export default PortfolioSlider;
