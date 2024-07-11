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
      {positions.map((position, idx) => (
        <Marker key={idx} position={position}>
          <Popup>Marker {idx + 1}</Popup>
        </Marker>
      ))}
      <Polyline
        positions={positions}
        pathOptions={{ color: "blue", dashArray: "5, 10" }}
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
