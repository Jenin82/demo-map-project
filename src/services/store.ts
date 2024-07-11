import { create } from "zustand";

interface MapType {
  positions: [number, number][];
  zoom: number;
  tileUrl: string;
  setPositions: (positions: [number, number][]) => void;
  setZoom: (zoom: number) => void;
  setTileUrl: (tileUrl: string) => void;
  screen: number
  isAddLocationModalOpen: boolean
  suggestions: { formatted: string; geometry: { lat: number; lng: number } }[];
  inputSelected: number
}

export const useMapStore = create<MapType>((set) => ({
  positions: [
    [10.153292084669795, 76.39352723326559],
    [25.25690664824555, 55.3643392541232],
  ],
  zoom: 1,
  tileUrl:
    "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}",
  setPositions: (positions) => set({ positions }),
  setZoom: (zoom) => set({ zoom }),
  setTileUrl: (tileUrl) => set({ tileUrl }),
  screen: 0,
  isAddLocationModalOpen: false,
  suggestions: [],
  inputSelected: 1
}));


// tile2 =  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"