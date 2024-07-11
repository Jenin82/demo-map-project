import React, { useState } from "react";
import { useMapStore } from "../../../services/store";
import LoadRouteForm from "./loadRouteForm";
import RouteActions from "./routeActions";
import RouteHeader from "./routeHeader";
import RouteSettings from "./routeSettings";
import SaveRouteForm from "./saveRouteForm";

const Route: React.FC = () => {
  const { locations, setLocations } = useMapStore();
  const [threeDots, setThreeDots] = useState(false);
  const [save, setSave] = useState(false);
  const [load, setLoad] = useState(false);
  const [routeName, setRouteName] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleSettings = () => setThreeDots(!threeDots);
  const toggleSave = () => {
    setSave(!save);
    setLoad(false);
  };
  const toggleLoad = () => {
    setLoad(!load);
    setSave(false);
  };

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      const routeDetails = {
        name: routeName,
        locations,
      };
      const savedRoutes = JSON.parse(
        localStorage.getItem("savedRoutes") || "[]"
      );
      savedRoutes.push(routeDetails);
      localStorage.setItem("savedRoutes", JSON.stringify(savedRoutes));
      setLoading(false);
      setSave(false);
      setThreeDots(false);
    }, 2000);
  };

  const loadRoute = (route: {
    name: string;
    locations: { name: string; position: [number, number] }[];
  }) => {
    setLocations(route.locations);
    setLoad(false);
    setThreeDots(false);
  };

  return (
    <div className="h-fit bg-[#131418] text-white flex justify-center flex-col">
      <img src="/notch.svg" alt="notch" className="mb-2 w-auto h-[8px]" />
      {threeDots ? (
        save ? (
          <SaveRouteForm
            routeName={routeName}
            setRouteName={setRouteName}
            handleSave={handleSave}
            toggleSave={toggleSave}
            loading={loading}
          />
        ) : load ? (
          <LoadRouteForm toggleLoad={toggleLoad} loadRoute={loadRoute} />
        ) : (
          <RouteSettings
            toggleSettings={toggleSettings}
            toggleSave={toggleSave}
            toggleLoad={toggleLoad}
          />
        )
      ) : (
        <>
          <RouteHeader locations={locations} toggleSettings={toggleSettings} />
          <RouteActions />
        </>
      )}
    </div>
  );
};

export default Route;
