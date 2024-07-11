import React from "react";
import { RiArrowLeftSLine } from "react-icons/ri";

interface DeleteRouteFormProps {
  toggleDelete: () => void;
  deleteRoute: () => void;
}

const DeleteRouteForm: React.FC<DeleteRouteFormProps> = ({
  toggleDelete,
  deleteRoute,
}) => {
  return (
    <>
      <div className="flex justify-start gap-4 items-center p-4">
        <div
          className="rounded-full bg-white text-black p-3 h-12 w-12 text-2xl flex justify-center items-center cursor-pointer"
          onClick={toggleDelete}
        >
          <RiArrowLeftSLine />
        </div>
        <div className="text-2xl font-family-['Helvetica Neue'] text-center font-bold">
          Delete route
        </div>
      </div>
      <div className="flex justify-center items-center p-4 flex-col gap-5 text-center w-full">
        <div className="uppercase text-3xl font-thin">Are you sure?</div>
        <div
          className="rounded-full bg-[#EB4E4E] text-black py-4 px-9 text-xl font-bold cursor-pointer w-full mb-4"
          onClick={deleteRoute}
        >
          Delete
        </div>
      </div>
    </>
  );
};

export default DeleteRouteForm;
