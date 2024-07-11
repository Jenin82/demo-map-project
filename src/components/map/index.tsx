import React, { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useMapStore } from "../../services/store";
import { LatLngTuple } from "leaflet";
import {
  firstPositionIcon,
  lastPositionIcon,
  intermediatePositionIcon,
} from "./components/markers";

interface Location {
  name: string;
  position: [number, number];
}

const DEFAULT_LOCATIONS: Location[] = [
  { name: "Location 1", position: [10.153292084669795, 76.39352723326559] },
  { name: "Location 2", position: [25.25690664824555, 55.3643392541232] },
];

const Map: React.FC = () => {
  const { locations, zoom, tileUrl } = useMapStore();

  // Use default locations if the array is empty
  const effectiveLocations: Location[] =
    locations.length > 0 ? locations : DEFAULT_LOCATIONS;

  return (
    <MapContainer
      center={effectiveLocations[0].position}
      zoom={zoom}
      zoomControl={false}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer url={tileUrl} />
      {effectiveLocations.map((location, idx) => {
        let icon;
        if (idx === 0) {
          icon = firstPositionIcon;
        } else if (idx === effectiveLocations.length - 1) {
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
        positions={effectiveLocations.map((location) => location.position)}
        pathOptions={{ color: "#23396B", dashArray: "5, 10" }}
      />
      <MapUpdater locations={effectiveLocations} />
    </MapContainer>
  );
};

interface MapUpdaterProps {
  locations: Location[];
}

const MapUpdater: React.FC<MapUpdaterProps> = ({ locations }) => {
  const map = useMap();

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
