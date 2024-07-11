import { create } from "zustand";

interface MapType {
  locations: { name: string; position: [number, number] }[];
  zoom: number;
  tileUrl: string;
  setLocations: (
    locations: { name: string; position: [number, number] }[]
  ) => void;
  setZoom: (zoom: number) => void;
  setTileUrl: (tileUrl: string) => void;
  screen: number;
  isAddLocationModalOpen: boolean;
  suggestions: { formatted: string; geometry: { lat: number; lng: number } }[];
  inputSelected: number;
}

export const useMapStore = create<MapType>((set) => ({
  locations: [
    { name: "Location 1", position: [10.153292084669795, 76.39352723326559] },
    { name: "Location 2", position: [25.25690664824555, 55.3643392541232] },
  ],
  zoom: 3,
  tileUrl:
    "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}",
  setLocations: (locations) => set({ locations }),
  setZoom: (zoom) => set({ zoom }),
  setTileUrl: (tileUrl) => set({ tileUrl }),
  screen: 0,
  isAddLocationModalOpen: false,
  suggestions: [],
  inputSelected: 1,
}));
  