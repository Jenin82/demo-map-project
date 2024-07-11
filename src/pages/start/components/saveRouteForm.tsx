import React from "react";
import { RiArrowLeftSLine } from "react-icons/ri";

interface SaveRouteFormProps {
  routeName: string;
  setRouteName: React.Dispatch<React.SetStateAction<string>>;
  handleSave: () => void;
  toggleSave: () => void;
  loading: boolean;
}

const SaveRouteForm: React.FC<SaveRouteFormProps> = ({
  routeName,
  setRouteName,
  handleSave,
  toggleSave,
  loading,
}) => {
  return (
    <>
      <div className="flex justify-start gap-2 items-center p-4">
        <div
          className="rounded-full bg-white text-black p-3 h-12 w-12 text-2xl flex justify-center items-center cursor-pointer"
          onClick={toggleSave}
        >
          <RiArrowLeftSLine />
        </div>
        <div className="text-2xl font-family-['Helvetica Neue'] text-center font-bold">
          Save route
        </div>
      </div>
      <div className="flex justify-between items-center p-4 flex-col gap-5 text-center">
        <input
          type="text"
          placeholder="Enter route name"
          className="px-8 py-5 w-full rounded-[60px] bg-[#2B2C2FCC] placeholder-[#FFFFFF66] font-bold border-1 border-[#2B2C2FCC] focus:border-[#B97FFF] focus:outline-none text-xl"
          value={routeName}
          onChange={(e) => setRouteName(e.target.value)}
        />
        <div
          className="rounded-full bg-[#B97FFF] text-white py-4 px-9 text-xl font-bold w-full cursor-pointer mb-4 text-center"
          onClick={handleSave}
        >
          {loading ? "Saving..." : "Save"}
        </div>
      </div>
    </>
  );
};

export default SaveRouteForm;
