import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { useMapStore } from "../../../services/store";
import styles from "../index.module.css";

const DEFAULT_TILE_URL =
  "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}";

const MapTileSelector = () => {
  const { tileUrl, setTileUrl } = useMapStore();
  const [selectedTileUrl, setSelectedTileUrl] = useState(tileUrl);
  const [previewTileUrl, setPreviewTileUrl] = useState(tileUrl);

  useEffect(() => {
    setSelectedTileUrl(tileUrl);
  }, [tileUrl]);

  const handleTileSelect = (url: string) => {
    setPreviewTileUrl(url);
  };

  const handleApply = () => {
    setTileUrl(previewTileUrl);
  };

  const handleCancel = () => {
    setPreviewTileUrl(selectedTileUrl);
    useMapStore.setState({ screen: 1 });
  };

  return (
    <div className="flex justify-center items-center flex-col bg-[#131418F5]">
      <div className="flex justify-center items-center gap-4 p-4">
        <img src="/mapTile.svg" alt="icon" />
        <div className="text-2xl text-white font-bold">Map style</div>
      </div>
      <div className="flex justify-center items-center gap-4 p-4">
        <div
          className="cursor-pointer"
          onClick={() => handleTileSelect(DEFAULT_TILE_URL)}
        >
          <img
            src="/tile1.png"
            alt="Tile 1"
            className={`${styles.focusableImage} ${
              previewTileUrl === DEFAULT_TILE_URL ? styles.focused : ""
            }`}
            tabIndex={0}
          />
          <div className="text-[#FFFFFF99] font-semibold text-center mt-2">
            Classic
          </div>
        </div>
        <div
          className="cursor-pointer"
          onClick={() =>
            handleTileSelect(
              "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            )
          }
        >
          <img
            src="/tile2.png"
            alt="Tile 2"
            className={`${styles.focusableImage} ${
              previewTileUrl ===
              "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                ? styles.focused
                : ""
            }`}
            tabIndex={0}
          />
          <div className="text-[#FFFFFF99] font-semibold text-center mt-2">
            Blueprint
          </div>
        </div>
        <div
          className="cursor-pointer"
          onClick={() =>
            handleTileSelect(
              "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}.png"
            )
          }
        >
          <img
            src="/tile3.png"
            alt="Tile 3"
            className={`${styles.focusableImage} ${
              previewTileUrl ===
              "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}.png"
                ? styles.focused
                : ""
            }`}
            tabIndex={0}
          />
          <div className="text-[#FFFFFF99] font-semibold text-center mt-2">
            Night
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-2 items-center p-4 w-[92%] mb-4">
        <div
          className="rounded-full bg-[#2B2C2F] text-white px-5 h-14 w-14 flex justify-center items-center cursor-pointer"
          onClick={handleCancel}
        >
          <IoClose />
        </div>
        <div
          className="rounded-full bg-[#B97FFF] text-white py-3 px-9 text-xl font-bold w-full cursor-pointer text-center"
          onClick={handleApply}
        >
          Apply
        </div>
      </div>
    </div>
  );
};

export default MapTileSelector;
