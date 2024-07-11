import { create } from "zustand";

interface MapType {
  positions: [number, number][];
  zoom: number;
  tileUrl: string;
  setPositions: (positions: [number, number][]) => void;
  setZoom: (zoom: number) => void;
  setTileUrl: (tileUrl: string) => void;
}

export const useMapStore = create<MapType>((set) => ({
  positions: [
    [51.505, -0.09],
    [51.52, -0.12],
  ],
  zoom: 1,
  tileUrl:
    "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}",
  setPositions: (positions) => set({ positions }),
  setZoom: (zoom) => set({ zoom }),
  setTileUrl: (tileUrl) => set({ tileUrl }),
}));


// tile2 =  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"