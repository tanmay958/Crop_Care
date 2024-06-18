import React from "react";
import { MdOutlineCancel } from "react-icons/md";
export default function DiseaseViwer(props) {
  const { setter, ele } = props;
  return (
    <div className="absolute left-1 top-1 text-red-600 text-lg  h-full w-[450px] rounded-2xl bg-zinc-800 grid grid-cols-12 grid-rows-12 gap-y-0">
      {/* <div className="col-start-11 pl-9 pt-1 opacity-50">
        <MdOutlineCancel className="text-white text-4xl" />
      </div>
      <h1 className="col-start-1">{ele.imageUrl}</h1> */}
      <img
        src={ele.imageUrl}
        className="w-[440px] h-[380px] col-span-12 pt-2 pl-2 pr-1 row-span-6  border-slate-200 rounded-3xl mt-5 "
      />
      <div
        className="col-start-11  col-span-2 hover:cursor-pointer "
        onClick={() => setter(null)}
      >
        <div className="flex gap-2">
          <MdOutlineCancel className="mt-2" />
          <h1>close</h1>
        </div>
      </div>
      <div className="ml-3 col-span-12 h-fit  text-white">
        CropName : {ele.cropName}
      </div>
      <div className="ml-3 col-span-12 h-fit  text-white">
        descripiton : {ele.disease}
      </div>
    </div>
  );
}
