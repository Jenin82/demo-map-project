import { GoArrowRight } from "react-icons/go";
import { useMapStore } from "../../../services/store";

const Initial = () => {
  const { isAddLocationModalOpen } = useMapStore();

  return (
    <div className="flex flex-col justify-center items-center bg-gradient-to-b from-transparent to-[#0e1a28e8]">
      <img src="/startImage.png" alt="start end icon" />
      <div className="font-helvetica text-3xl font-bold leading-[29.3px] text-center text-white">
        Add locations to start
      </div>
      <div className="text-white font-helvetica opacity-60 text-lg text-center">
        Hold on map or click add locations
      </div>
      <div
        className="rounded-full bg-white text-black p-5 text-xl font-bold flex justify-between flex-nowrap items-center w-96 mb-8 mt-6 cursor-pointer"
        onClick={() => {
          useMapStore.setState({ isAddLocationModalOpen: !isAddLocationModalOpen });
        }}
      >
        <div>Add locations</div>
        <GoArrowRight />
      </div>
    </div>
  );
};

export default Initial;
