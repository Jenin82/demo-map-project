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
  return loading ? (
    <div className="flex justify-center items-center p-4">
      <img
        src="https://s3-alpha-sig.figma.com/img/4b09/7928/7883b6f5e9751f73bc5fd621e7001c51?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=kFIlNg~OkS5uOZD9DMpHqTNmiuOXuITYZGth7V6IuStlLt5Xiu0CSYzSmdDcCMIO2ud92ZmD3Z-N5i98eGSwY8Ryb5jzOsIa4t1K20NlA-JgVlnA58mxdVZ-dMehzJByd2fIWF7JbFajSP9Smcwp-uX4MF-9CkpD3DdKXsdtoCcWHiNJ1lsDyFL8lKuoRcCtxkDqY~hSh9rXYnYGyDneXzN~i2x22RW-fW1ONyXo5vaeepgLXiCGmytp3RaSrvx8QbJZoaDNKCxXa13VBWHIJ2sCGd38p8QEYMuKUXeeavqmXmS5Xpn2zL-mBbQYEgg0ZaQUJDBthwrF2chaeSA2jQ__"
        alt="gif"
      />
    </div>
  ) : (
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
          Save
        </div>
      </div>
    </>
  );
};

export default SaveRouteForm;
