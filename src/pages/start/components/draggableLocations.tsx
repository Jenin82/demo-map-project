import React, { useState, useEffect } from "react";
import { useMapStore } from "../../../services/store";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { IoReorderFour } from "react-icons/io5";

interface Location {
  name: string;
  position: [number, number];
}

interface DraggableItem {
  index: number;
  id: string;
  type: string;
}

const DraggableLocations: React.FC = () => {
  const { locations, setLocations } = useMapStore();
  const [localLocations, setLocalLocations] = useState<Location[]>([]);

  useEffect(() => {
    setLocalLocations(locations);
  }, [locations]);

  const moveLocation = (dragIndex: number, hoverIndex: number) => {
    const draggedLocation = localLocations[dragIndex];
    const updatedLocations = [...localLocations];
    updatedLocations.splice(dragIndex, 1);
    updatedLocations.splice(hoverIndex, 0, draggedLocation);
    setLocalLocations(updatedLocations);
    setLocations(updatedLocations);
  };

  const renderLocation = (location: Location, index: number) => {
    return (
      <DraggableLocation
        key={location.name}
        index={index}
        location={location}
        moveLocation={moveLocation}
        isStart={index === 0} 
        isEnd={index === localLocations.length - 1}
      />
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col items-center bg-[#131418F5] p-4 w-full h-[40vh]">
        <div className="w-full">
          {localLocations.map((location, index) =>
            renderLocation(location, index)
          )}
        </div>
      </div>
    </DndProvider>
  );
};

interface DraggableLocationProps {
  location: Location;
  index: number;
  moveLocation: (dragIndex: number, hoverIndex: number) => void;
  isStart: boolean;
  isEnd: boolean;
}

const DraggableLocation: React.FC<DraggableLocationProps> = ({
  location,
  index,
  moveLocation,
  isStart,
  isEnd,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [, drop] = useDrop({
    accept: "location",
    hover(item: DraggableItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset?.y! - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY! < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY! > hoverMiddleY) {
        return;
      }
      moveLocation(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "location",
    item: { id: location.name, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  const getFirstPart = (name: string) => {
    return name.split(/[, ]/)[0]; // Split by comma or space and take the first part
  };

  return (
    <div
      ref={ref}
      className={`flex justify-between items-center gap-4`}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      onClick={() => {
        useMapStore.setState({ isAddLocationModalOpen: true });
      }}
    >
      <div className="text-white bg-[#2B2C2F] py-4 px-6 my-2 rounded-full text-xl font-bold w-full flex gap-3">
        {isStart && <img src="/startMarker.svg" alt="Start" width={24} />}
        {isEnd && <img src="/endMarker.svg" alt="End" width={24} />}
        {!isStart && !isEnd && (
          <img src="/middleMarker.svg" alt="Intermediate" width={24} />
        )}
        {getFirstPart(location.name)}
      </div>
      <div className="cursor-pointer text-white">
        <IoReorderFour />
      </div>
    </div>
  );
};

export default DraggableLocations;
