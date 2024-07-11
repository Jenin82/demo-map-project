import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import { useMapStore } from "../../services/store";
import { LatLngTuple } from "leaflet";
import {
  firstPositionIcon,
  lastPositionIcon,
  intermediatePositionIcon,
} from "./components/markers";

const Map = () => {
  const { positions, zoom, tileUrl } = useMapStore();

  return (
    <MapContainer
      center={positions[0]}
      zoom={zoom}
      zoomControl={false}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer url={tileUrl} />
      {positions.map((position, idx) => {
        let icon;
        if (idx === 0) {
          icon = firstPositionIcon;
        } else if (idx === positions.length - 1) {
          icon = lastPositionIcon;
        } else {
          icon = intermediatePositionIcon;
        }

        return (
          <Marker key={idx} position={position} icon={icon}>
            <Popup>Marker {idx + 1}</Popup>
          </Marker>
        );
      })}
      <Polyline
        positions={positions}
        pathOptions={{ color: "#23396B", dashArray: "5, 10" }}
      />
      <MapUpdater />
    </MapContainer>
  );
};

const MapUpdater = () => {
  const map = useMap();
  const { positions } = useMapStore();

  useEffect(() => {
    if (positions.length > 0) {
      const bounds = positions.map((position) => [
        position[0],
        position[1],
      ]) as LatLngTuple[];
      map.fitBounds(bounds);
    }
  }, [positions, map]);

  return null;
};

export default Map;
