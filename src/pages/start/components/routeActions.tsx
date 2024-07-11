import React from "react";
import { GoArrowRight } from "react-icons/go";

const RouteActions: React.FC = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="rounded-full bg-white text-black p-5 text-xl font-bold flex justify-between flex-nowrap items-center w-96 mb-5 mt-3 cursor-pointer">
        <div>Create video</div>
        <GoArrowRight />
      </div>
    </div>
  );
};

export default RouteActions;
