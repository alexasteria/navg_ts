import { Card, CardScroll, File, Group, MiniInfoCell } from "@vkontakte/vkui";
import React from "react";
import { Service } from "../../../../../../global/types";
import bridge from "@vkontakte/vk-bridge";
import { Icon24Add, Icon56GalleryOutline } from "@vkontakte/icons";
import { Icon24DeleteOutline } from "@vkontakte/icons";

const PhotoScroll: React.FC<{
  photos: Service["photos"];
  withAdd?: boolean;
  addFunc?: (files: FileList | null) => void;
  delFunc?: (id: number) => void;
  editMode?: boolean;
}> = ({ photos, withAdd, addFunc, editMode, delFunc }) => {
  const photosLinkArr = photos?.map((photo) => photo.url);
  const openShowImages = (index: number) => {
    bridge.send("VKWebAppShowImages", {
      images: photosLinkArr || [],
      start_index: index,
    });
  };
  return (
    <Group description="Фотографии">
      <CardScroll size="s">
        {!editMode && withAdd && addFunc && (
          <File
            controlSize="m"
            onChange={(e) => addFunc(e.target.files || null)}
            id="input"
            mode="outline"
          >
            <Icon24Add />
          </File>
        )}
        {photos ? (
          photos.map((photo, index) => {
            return (
              <Card
                style={{ padding: 2, borderRadius: 13, margin: 0 }}
                mode="shadow"
                key={photo.id}
                onClick={() =>
                  editMode
                    ? delFunc && delFunc(photo.id)
                    : openShowImages(index)
                }
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
                {editMode ? (
                  <MiniInfoCell before={<Icon24DeleteOutline height={20} />}>
                    Удалить
                  </MiniInfoCell>
                ) : null}
              </Card>
            );
          })
        ) : (
          <div style={{ margin: "auto", color: "#c6c6c6" }}>
            <Icon56GalleryOutline fill="#c6c6c6" style={{ margin: "auto" }} />
            Нет фото
          </div>
        )}
      </CardScroll>
    </Group>
  );
};
export default PhotoScroll;
