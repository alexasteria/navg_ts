import bridge from "@vkontakte/vk-bridge";
import { useDispatch, useSelector } from "react-redux";
import { RootReducer } from "../../../../store/rootReducer";
import { notify } from "../../../../store/ui/ui_actions";
import { TypeNotify } from "../../../../store/ui/ui_action_types";
import { Service } from "../../../../global/types";
import {
  deleteService,
  updateService,
} from "../../../../store/users/users_actions";

const useUploadPhotos: () => {
  uploadPhoto: (files: FileList | null, service: Service) => Promise<any>;
  delPhoto: (id: number, service: Service) => void;
  saveChanges: (
    title: string,
    description: string,
    cost: number,
    service: Service,
    selectSkills: string
  ) => void;
  delService: (service: Service) => void;
} = () => {
  const dispatch = useDispatch();
  const launchParams = useSelector(
    (state: RootReducer) => state.usersState.launchParams
  );
  const stringLaunchParams = useSelector(
    (state: RootReducer) => state.usersState.stringLaunchParams
  );
  const user = useSelector((state: RootReducer) => state.usersState.user);
  const saveChanges = async (
    title: string,
    description: string,
    cost: number,
    service: Service,
    selectSkills: string
  ) => {
    const result = await fetch(
      "https://" +
        process.env.REACT_APP_HOST +
        "/api/v2/masters/services/" +
        service.id,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cost: cost * 100,
          description: description,
          skills: [+selectSkills],
          title: title,
          vk: launchParams,
        }),
      }
    );
    if (result.status !== 200) {
      dispatch(
        notify(TypeNotify.ERROR, "Ошибка", "Ошибка при сохранении изменений")
      );
      return;
    }
    const changedService = {
      ...service,
      title: title,
      description: description,
      cost: cost * 100,
      skill: selectSkills ? [selectSkills] : selectSkills,
    };
    dispatch(updateService(changedService));
  };
  const delService = async (service: Service) => {
    const result = await fetch(
      "https://" +
        process.env.REACT_APP_HOST +
        "/api/v2/masters/services/" +
        service.id +
        stringLaunchParams,
      { method: "DELETE" }
    );
    if (result.status !== 200) {
      dispatch(
        notify(TypeNotify.ERROR, "Ошибка", "Ошибка при удалении сервиса")
      );
      return;
    }
    dispatch(deleteService(service));
  };
  const delPhoto = async (id: number, service: Service) => {
    const result = await fetch(
      "https://" +
        process.env.REACT_APP_HOST +
        "/api/v2/masters/photos/" +
        id +
        stringLaunchParams,
      { method: "DELETE" }
    );
    if (result.status !== 200) {
      dispatch(notify(TypeNotify.ERROR, "Ошибка", "Ошибка при далении фото"));
      return;
    }
    if (!service.photos) return;
    const pArr = service.photos.filter((p) => p.id !== id);
    const changedService = {
      ...service,
      photos: pArr.length > 0 ? pArr : null,
    };
    dispatch(updateService(changedService));
  };
  const getToken: () => Promise<string> = async () => {
    const result = await bridge.send("VKWebAppGetAuthToken", {
      app_id: 7170938,
      scope: "photos",
    });
    return result.access_token;
  };
  const getAlbum: (token: string) => Promise<null | number> = async (token) => {
    const result = await bridge.send("VKWebAppCallAPIMethod", {
      method: "photos.getAlbums",
      params: {
        owner_id: launchParams.vk_user_id,
        v: "5.103",
        access_token: token,
      },
    });
    let album_id = 0;
    let res = result.response;
    if (result.response.error) {
      dispatch(
        notify(
          TypeNotify.ERROR,
          "Ошибка",
          "Пожалуйста, сообщите нам об ошибке #" +
            result.response.error.error_code
        )
      );
    }
    res.items.forEach((album: { title: string; id: number }) => {
      if (album.title === "Навигатор красоты") {
        album_id = album.id;
      }
    });
    if (album_id !== 0) return album_id;
    const new_album_id: number = await create_album(token);
    return new_album_id;
  };
  const create_album = async (token: string) => {
    const result = await bridge.send("VKWebAppCallAPIMethod", {
      method: "photos.createAlbum",
      params: { title: "Навигатор красоты", v: "5.103", access_token: token },
    });
    if (result.response.status !== 200) return null;
    const res = await result.response.json();
    return res.id;
  };
  const getUploadServer: (
    token: string,
    album_id: number
  ) => Promise<string> = async (token: string, album_id: number) => {
    const result = await bridge.send("VKWebAppCallAPIMethod", {
      method: "photos.getUploadServer",
      params: { album_id: album_id, v: "5.103", access_token: token },
    });
    return result.response.upload_url;
  };
  const uploadPhoto = async (files: FileList | null, service: Service) => {
    if (!files) {
      dispatch(
        notify(TypeNotify.ERROR, "Ошибка", "Отсутствует фото для загрузки")
      );
      return;
    }
    if (!user) {
      dispatch(
        notify(
          TypeNotify.ERROR,
          "Ошибка",
          "Нет информации о текущем пользователе"
        )
      );
      return;
    }
    const token = await getToken();
    if (!token) {
      dispatch(
        notify(TypeNotify.ERROR, "Ошибка", "Не получен токен пользователя")
      );
      return;
    }
    const album_id = await getAlbum(token);
    if (!album_id) {
      dispatch(
        notify(
          TypeNotify.ERROR,
          "Ошибка",
          "Не получен идентификатор фото альбома"
        )
      );
      return;
    }
    const upload_server = await getUploadServer(token, album_id);
    if (!upload_server) {
      dispatch(
        notify(
          TypeNotify.ERROR,
          "Ошибка",
          "Не получен сервер для загрузки фотографии"
        )
      );
      return;
    }
    const formData = new FormData();
    const file = files[0];
    if (file.size > 5242880) {
      dispatch(
        notify(TypeNotify.ERROR, "Ошибка", "Максимальный размер файла 5мб")
      );
      return;
    }
    if (!file.type.match("image.*")) {
      dispatch(
        notify(
          TypeNotify.ERROR,
          "Ошибка",
          "Допустимо загружать только фотографии"
        )
      );
      return;
    }
    formData.append("photo", file, Date.now() + ".jpg");
    formData.append("url", upload_server);
    formData.append("vk", stringLaunchParams.substr(1));
    const upload: {
      server: number;
      photos_list: string;
      aid: number;
      hash: string;
    } = await uploadToServer(formData);
    const photo_url: string = await savePhoto(upload, token);
    const result = await uploadToService(photo_url, service);
    return result;
  };
  const savePhoto = async (
    upload: {
      server: number;
      photos_list: string;
      aid: number;
      hash: string;
    },
    token: string
  ) => {
    if (!user) return;
    let caption = `Мастер: ${user.first_name} ${user.last_name}
            Еще больше проверенных мастеров в нашем приложении: https://vk.com/app7170938`;
    const result = await bridge.send("VKWebAppCallAPIMethod", {
      method: "photos.save",
      params: {
        server: upload.server,
        v: "5.103",
        photos_list: upload.photos_list,
        album_id: upload.aid,
        hash: upload.hash,
        caption: caption,
        access_token: token,
      },
    });
    if (!result.response) {
      dispatch(
        notify(TypeNotify.ERROR, "Ошибка", "Ошибка при сохранении файла")
      );
      return;
    }
    return result.response[0].sizes[4].url;
  };
  const uploadToServer: (
    formData: FormData
  ) => Promise<{
    server: number;
    photos_list: string;
    aid: number;
    hash: string;
  }> = async (formData) => {
    const result = await fetch(
      "https://" + process.env.REACT_APP_HOST + "/api/v2/masters/photos/upload",
      {
        method: "POST",
        body: formData,
      }
    );
    if (result.status !== 200) {
      dispatch(notify(TypeNotify.ERROR, "Ошибка", "Ошибка при загрузке файла"));
      return;
    }
    const res = result.json();
    return res;
  };
  const uploadToService = async (photo_url: string, service: Service) => {
    const response = await fetch(
      "https://" + process.env.REACT_APP_HOST + "/api/v2/masters/photos",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: service.id,
          url: photo_url,
          vk: launchParams,
        }),
      }
    );
    if (response.status !== 200) {
      dispatch(notify(TypeNotify.ERROR, "Ошибка", "Ошибка при загрузке файла"));
      return;
    }
    const res = await response.json();
    const changedService = service;
    if (!changedService.photos) changedService.photos = [];
    changedService.photos.push(res);
    dispatch(updateService(changedService));
    dispatch(notify(TypeNotify.SUCCESS, "Выполнено", "Фото успешно загружено"));
  };
  return {
    uploadPhoto,
    delPhoto,
    saveChanges,
    delService,
  };
};
export { useUploadPhotos };
