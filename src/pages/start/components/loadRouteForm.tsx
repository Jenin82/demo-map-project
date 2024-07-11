import React, { useState, useEffect } from "react";
import { MdDone } from "react-icons/md";
import { RiArrowLeftSLine } from "react-icons/ri";

interface LoadRouteFormProps {
  toggleLoad: () => void;
  loadRoute: (route: {
    name: string;
    locations: { name: string; position: [number, number] }[];
  }) => void;
}

const LoadRouteForm: React.FC<LoadRouteFormProps> = ({
  toggleLoad,
  loadRoute,
}) => {
  const [savedRoutes, setSavedRoutes] = useState<
    {
      name: string;
      locations: { name: string; position: [number, number] }[];
    }[]
  >([]);
  const [selectedRouteIndex, setSelectedRouteIndex] = useState<number | null>(
    null
  );

  useEffect(() => {
    const routes = localStorage.getItem("savedRoutes");
    if (routes) {
      setSavedRoutes(JSON.parse(routes));
    }
  }, []);

  const handleRouteSelect = (index: number) => {
    setSelectedRouteIndex(index);
  };

  const handleLoadRoute = () => {
    if (selectedRouteIndex !== null) {
      loadRoute(savedRoutes[selectedRouteIndex]);
    }
  };

  return (
    <>
      <div className="flex justify-start gap-4 items-center p-4">
        <div
          className="rounded-full bg-white text-black p-3 h-12 w-12 text-2xl flex justify-center items-center cursor-pointer"
          onClick={toggleLoad}
        >
          <RiArrowLeftSLine />
        </div>
        <div className="text-2xl font-family-['Helvetica Neue'] text-center font-bold">
          Load route
        </div>
      </div>
      <div className="flex justify-between items-center p-4 flex-col gap-5 text-center w-full">
        {savedRoutes.length > 0 ? (
          <>
            {savedRoutes.map((route, index) => (
              <div
                key={index}
                className="rounded-full bg-[#2B2C2FCC] text-white py-4 px-9 text-xl font-bold w-full cursor-pointer text-center flex justify-between items-center"
                onClick={() => handleRouteSelect(index)}
              >
                <div>{route.name}</div>
                <div
                  className={`rounded-full border-4 border-black cursor-pointer h-[30px] w-[30px] text-[#B97FFF] flex justify-center items-center ${
                    selectedRouteIndex === index ? "bg-black" : ""
                  }`}
                >
                  {selectedRouteIndex === index && <MdDone />}
                </div>
              </div>
            ))}
            <div
              className="rounded-full bg-[#B97FFF] text-white py-4 px-9 text-xl font-bold w-full cursor-pointer mb-4 text-center"
              onClick={handleLoadRoute}
            >
              Load
            </div>
          </>
        ) : (
          <div className="text-lg text-gray-400">No saved routes found</div>
        )}
      </div>
    </>
  );
};

export default LoadRouteForm;
