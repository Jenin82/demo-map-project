import React from "react";
import { IoClose } from "react-icons/io5";

interface RouteSettingsProps {
  toggleSettings: () => void;
  toggleSave: () => void;
  toggleLoad: () => void;
}

const RouteSettings: React.FC<RouteSettingsProps> = ({
  toggleSettings,
  toggleSave,
  toggleLoad,
}) => {
  return (
    <>
      <div className="flex justify-start gap-2 items-center p-4">
        <div
          className="rounded-full bg-white text-black p-3 h-12 w-12 text-xl flex justify-center items-center cursor-pointer"
          onClick={toggleSettings}
        >
          <IoClose />
        </div>
        <div className="text-2xl font-family-['Helvetica Neue'] text-center font-bold">
          Route settings
        </div>
      </div>
      <div className="flex justify-between items-center p-4 w-full mb-3">
        <div className="rounded-[60px] bg-[#EB4E4E] text-black py-5 px-9 text-xl font-bold flex justify-between flex-nowrap items-center cursor-pointer">
          Delete
        </div>
        <div
          className="rounded-full bg-[#2B2C2FCC] text-white py-5 px-9 text-xl font-bold flex justify-between flex-nowrap items-center cursor-pointer"
          onClick={toggleSave}
        >
          Save
        </div>
        <div
          className="rounded-full bg-[#2B2C2FCC] text-white py-5 px-9 text-xl font-bold flex justify-between flex-nowrap items-center cursor-pointer"
          onClick={toggleLoad}
        >
          Load
        </div>
      </div>
    </>
  );
};

export default RouteSettings;
