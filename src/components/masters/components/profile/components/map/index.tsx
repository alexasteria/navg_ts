import {
  CircleMarker,
  MapContainer,
  Polyline,
  TileLayer,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import React, { useEffect, useMemo, useState } from "react";
import { Cell, CellButton, Group, Header } from "@vkontakte/vkui";
import bridge from "@vkontakte/vk-bridge";
import { notify } from "../../../../../../store/ui/ui_actions";
import { TypeNotify } from "../../../../../../store/ui/ui_action_types";
import { Address } from "../../../../../../global/types";

export type MarkerPoint = {
  lat: number;
  long: number;
};
const deg2rad = (deg: number) => {
  return deg * (Math.PI / 180);
};
const getDistanceFromLatLonInKm = (start: MarkerPoint, end: MarkerPoint) => {
  let R = 6371; // Radius of the earth in km
  let dLat = deg2rad(end.lat - start.lat); // deg2rad below
  let dLon = deg2rad(end.long - start.long);
  let a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(start.lat)) *
      Math.cos(deg2rad(end.lat)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  // Distance in km
  return R * c;
};
const Map: React.FC<{ points: Address[] }> = ({ points }) => {
  const [start, setStart] = useState<MarkerPoint | null>(null);
  const end: MarkerPoint = {
    lat: points[0].lat,
    long: points[0].lon,
  };
  const [distance, setDistance] = useState<number | null>(null);
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
  const markers = useMemo(() => {
    return [start, end];
  }, [start, end]);
  useEffect(() => {
    if (!start || !end) return;
    const dist = getDistanceFromLatLonInKm(start, end);
    setDistance(dist);
  }, [start, end]);
  function Line() {
    const map = useMap();
    if (!start) {
      return null;
    }
    const outerBounds = [
      [start.lat, start.long],
      [end.lat, end.long],
    ];
    map.fitBounds(outerBounds);
    return (
      <Polyline
        positions={[
          [start.lat, start.long],
          [end.lat, end.long],
        ]}
      />
    );
  }
  function Layer() {
    const map = useMap();
    map.invalidateSize();
    return (
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    );
  }
  if (!end) return null;
  return (
    <Group header={<Header mode="secondary">Место оказания услуг</Header>}>
      <Cell>
        {!distance ? (
          <CellButton
            description="Необходим доступ к геолокации"
            onClick={getGeo}
          >
            Как далеко от меня?
          </CellButton>
        ) : (
          `${distance.toFixed(2)} км от Вас`
        )}
      </Cell>
      <div style={{ height: 200, width: "100%" }}>
        <MapContainer
          // @ts-ignore
          zoom={13}
          zoomControl={false}
          scrollWheelZoom={false}
          style={{
            height: "100%",
            width: "100%",
            zIndex: 1,
          }}
          center={end ? [end.lat, end.long] : [55.75396, 37.620393]}
        >
          <Layer />
          {markers.map(
            (marker) =>
              marker && (
                <CircleMarker
                  key={marker.lat}
                  center={[marker.lat, marker.long]}
                />
              )
          )}
          <Line />
        </MapContainer>
      </div>
    </Group>
  );
};
export default Map;
