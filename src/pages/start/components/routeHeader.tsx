import React from "react";
import { HiDotsVertical } from "react-icons/hi";
import { FaPlus } from "react-icons/fa6";
import { useMapStore } from "../../../services/store";
import AddIntermediateLocation from "./addIntermediateLocation";

interface RouteHeaderProps {
  locations: { name: string; position: [number, number] }[];
  toggleSettings: () => void;
}

const RouteHeader: React.FC<RouteHeaderProps> = ({
  locations,
  toggleSettings,
}) => {
  const { isIntrmediateLocationModalOpen } = useMapStore();
  const getFirstPart = (name: string) => {
    return name.split(/[, ]/)[0]; // Split by comma or space and take the first part
  };

  return (
    <div className="flex justify-between items-center p-4">
      <div
        className="rounded-full bg-[#2B2C2FB2] p-3 h-12 w-12 text-xl flex justify-center items-center cursor-pointer"
        onClick={toggleSettings}
      >
        <HiDotsVertical />
      </div>
      <div>
        <div className="text-2xl font-family-['Helvetica Neue'] text-center font-bold">
          {getFirstPart(locations[0].name)} -{" "}
          {getFirstPart(locations[locations.length - 1].name)}
        </div>
        <div className="text-lg text-center text-gray-400">
          {locations.length} Points
        </div>
      </div>
      <div
        className="rounded-full bg-[#2B2C2FB2] p-3 h-12 w-12 text-xl flex justify-center items-center"
        onClick={() => {
          useMapStore.setState({
            isIntrmediateLocationModalOpen: !isIntrmediateLocationModalOpen,
          });
        }}
      >
        <FaPlus />
      </div>
      <AddIntermediateLocation
        isOpen={isIntrmediateLocationModalOpen}
        onClose={() => {
          useMapStore.setState({ isIntrmediateLocationModalOpen: false });
        }}
      />
    </div>
  );
};

export default RouteHeader;
