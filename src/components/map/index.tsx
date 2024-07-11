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
  const { locations, zoom, tileUrl } = useMapStore();

  return (
    <MapContainer
      center={locations[0].position}
      zoom={zoom}
      zoomControl={false}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer url={tileUrl} />
      {locations.map((location, idx) => {
        let icon;
        if (idx === 0) {
          icon = firstPositionIcon;
        } else if (idx === locations.length - 1) {
          icon = lastPositionIcon;
        } else {
          icon = intermediatePositionIcon;
        }

        return (
          <Marker key={idx} position={location.position} icon={icon}>
            <Popup>{location.name}</Popup>
          </Marker>
        );
      })}
      <Polyline
        positions={locations.map((location) => location.position)}
        pathOptions={{ color: "#23396B", dashArray: "5, 10" }}
      />
      <MapUpdater />
    </MapContainer>
  );
};

const MapUpdater = () => {
  const map = useMap();
  const { locations } = useMapStore();

  useEffect(() => {
    if (locations.length > 0) {
      const bounds = locations.map(
        (location) => location.position
      ) as LatLngTuple[];
      map.fitBounds(bounds);
    }
  }, [locations, map]);

  return null;
};

export default Map;
