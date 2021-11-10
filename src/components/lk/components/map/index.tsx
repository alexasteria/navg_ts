import {
  CircleMarker,
  MapContainer,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import React, { useState } from "react";
import { CellButton, Group, Header } from "@vkontakte/vkui";
import bridge from "@vkontakte/vk-bridge";
import { notify } from "../../../../store/ui/ui_actions";
import { TypeNotify } from "../../../../store/ui/ui_action_types";
import { Address } from "../../../../global/types";
import { useDispatch, useSelector } from "react-redux";
import { setAddress } from "../../../../store/users/users_actions";
import { RootReducer } from "../../../../store/rootReducer";

export type MarkerPoint = {
  lat: number;
  long: number;
};

const SetAddressMap: React.FC<{ points?: Address[] }> = ({ points }) => {
  const dispatch = useDispatch();
  const [start, setStart] = useState<MarkerPoint | null>(null);
  // {
  //   lat: 55.75396,
  //       long: 37.620393,
  // }
  const launchParams = useSelector(
    (state: RootReducer) => state.usersState.launchParams
  );
  const city = useSelector(
    (state: RootReducer) => state.usersState.user?.master.city
  );
  const [marker, setMarker] = useState<MarkerPoint | null>(
    points ? { lat: points[0].lat, long: points[0].lon } : null
  );
  const getGeo = async () => {
    const response = await bridge.send("VKWebAppGetGeodata", {});
    if (response.available === 0) {
      notify(
        TypeNotify.WARN,
        "Ошибочка вышла",
        "У приложения ВКонтакте нет доступе к геопозиции"
      );
      return;
    }
    if (response.lat && response.long) {
      setStart({ lat: response.lat, long: response.long });
    }
  };
  function Layer() {
    const map = useMap();
    map.invalidateSize();
    return (
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    );
  }
  function MyComponent() {
    useMapEvents({
      click: (e: any) => {
        const { lat, lng } = e.latlng;
        setMarker({ lat: lat, long: lng });
        const address: Address = {
          id: points ? points[0].id : 999,
          address: "Не указан",
          lat: lat,
          lon: lng,
        };
        dispatch(setAddress(address, !points, launchParams, city?.id));
      },
    });
    return null;
  }
  return (
    <Group header={<Header mode="secondary">Место оказания услуг</Header>}>
      {!start && (
        <CellButton
          description="Необходим доступ к геолокации"
          onClick={getGeo}
        >
          Указать адрес оказания услуг
        </CellButton>
      )}
      <div style={{ height: 200, width: "100%" }}>
        {start && (
          <MapContainer
            // @ts-ignore
            zoom={13}
            zoomControl={false}
            scrollWheelZoom={false}
            style={{
              height: "70vh",
              width: "100%",
              zIndex: 1,
            }}
            center={
              points ? [points[0].lat, points[0].lon] : [start.lat, start.long]
            }
          >
            <Layer />
            <MyComponent />
            {marker && (
              <CircleMarker
                key={marker.lat}
                center={[marker.lat, marker.long]}
              />
            )}
          </MapContainer>
        )}
      </div>
    </Group>
  );
};
export default SetAddressMap;
