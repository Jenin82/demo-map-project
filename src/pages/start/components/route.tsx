import React, { useState } from "react";
import { useMapStore } from "../../../services/store";
import DeleteRouteForm from "./deleteRouteForm";
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
  const [deleteRouteForm, setDeleteRouteForm] = useState(false);
  const [routeName, setRouteName] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleSettings = () => {
    if (locations.length > 0) {
      setThreeDots(!threeDots);
    } else {
      useMapStore.setState({ screen: 0 });
      setThreeDots(false);
    }
  };
  const toggleSave = () => {
    setSave(!save);
    setLoad(false);
    setDeleteRouteForm(false);
  };
  const toggleLoad = () => {
    setLoad(!load);
    setSave(false);
    setDeleteRouteForm(false);
  };
  const toggleDelete = () => {
    setDeleteRouteForm(!deleteRouteForm);
    setSave(false);
    setLoad(false);
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

  const deleteRoute = () => {
    const savedRoutes = JSON.parse(localStorage.getItem("savedRoutes") || "[]");
    const currentRouteIndex = savedRoutes.findIndex(
      (route: {
        name: string;
        locations: { name: string; position: [number, number] }[];
      }) => JSON.stringify(route.locations) === JSON.stringify(locations)
    );

    if (currentRouteIndex !== -1) {
      savedRoutes.splice(currentRouteIndex, 1);
      localStorage.setItem("savedRoutes", JSON.stringify(savedRoutes));
      setLocations([]); // Clear the current route
    } else {
      setLocations([]); // Clear the positions if no current route is loaded
      useMapStore.setState({ screen: 0 });
    }
    setDeleteRouteForm(false);
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
        ) : deleteRouteForm ? (
          <DeleteRouteForm
            toggleDelete={toggleDelete}
            deleteRoute={deleteRoute}
          />
        ) : (
          <RouteSettings
            toggleSettings={toggleSettings}
            toggleSave={toggleSave}
            toggleLoad={toggleLoad}
            toggleDelete={toggleDelete}
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
