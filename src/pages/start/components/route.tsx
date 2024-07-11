import { FaPlus } from "react-icons/fa6";
import { HiDotsVertical } from "react-icons/hi";

const Route = () => {
  return (
    <div className="h-fit bg-[#131418] text-white">
      <div className="flex justify-between items-center p-4">
        <div className="rounded-full bg-[#2B2C2FB2] p-3 h-10 w-10">
          <HiDotsVertical />
        </div>
        <div>
            <div>{}</div>
        </div>
        <div className="rounded-full bg-[#2B2C2FB2] p-3 h-10 w-10">
          <FaPlus />
        </div>
      </div>
    </div>
  );
}

export default Route