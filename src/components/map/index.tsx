import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

const positions: [number, number][] = [
  [51.505, -0.09],
  [51.70, -0.1],
  [51.52, -0.12],
];

const Map = () => {
  return (
    <MapContainer
      center={positions[0]}
      zoom={13}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        attribution="Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ"
        url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
        maxZoom={16}
      />
      {positions.map((position, idx) => (
        <Marker key={idx} position={position}>
          <Popup>Marker {idx + 1}</Popup>
        </Marker>
      ))}
      <Polyline
        positions={positions}
        pathOptions={{ color: "blue", dashArray: "5, 10" }}
      />
    </MapContainer>
  );
};

export default Map;
