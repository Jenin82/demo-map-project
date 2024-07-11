import { Icon } from "leaflet";

// Define custom icons
export const firstPositionIcon = new Icon({
  iconUrl: "/startMarker.svg",
  iconSize: [55, 75],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export const intermediatePositionIcon = new Icon({
  iconUrl: "/middleMarker.svg",
  iconSize: [55, 75],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export const lastPositionIcon = new Icon({
  iconUrl: "/endMarker.svg",
  iconSize: [55, 75],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
