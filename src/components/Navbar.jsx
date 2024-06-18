import logo from "../assets/logo.png";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import UploadPopUp from "./UploadPopUp";
import SearchBar from "./SearchBar";

// Example usage:

export default function Navbar(props) {
  const { isMap } = props;
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const [popUp, SetPopUp] = useState(false);
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dyzkerewp",
        uploadPreset: "b56ziwby",
      },
      async function (error, result) {
        if (!error && result && result.event === "success") {
          // Image uploaded successfully
          console.log("Public URL:", result.info.secure_url);
          const { latitude, longitude } = getRandomLatLongIndia();
          const postData = {
            imageUrl: result.info.secure_url,
            latitude: latitude,
            longitude: longitude,
            location: "India",
          };

          const requestOptions = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(postData),
          };
          console.log(postData);

          const response = await fetch("http://localhost:3000", requestOptions);
          const responseData = await response.json();
        }
      }
    );
  }, []);
  return (
    <div className="col-span-12 h-fit  min-h-24 text-white   shadow-2xl   ">
      <div className="grid grid-cols-12  pt-4 ">
        <div className="col-start-1 col-span-3 px-8">
          <div className="flex">
            <img src={logo} width={100} height={100} className="opacity-55" />
            <p className="text-4xl tracking-wider font-bold mt-1 absolute ml-16 opacity-65">
              Crop Care
            </p>
          </div>
        </div>
        <div className="col-start-6 col-span-3  pt-4">
          <div className="flex gap-10 space-x-10 text-2xl font-normal opacity-40  ">
            <Link to="/">
              <h1 className="hover:opacity-55 hover:underline">Home</h1>
            </Link>
            <Link to="/map">
              <h1 className="hover:opacity-55 hover:underline">Map</h1>
            </Link>

            <h1 className="hover:opacity-55 hover:underline">About</h1>
          </div>
        </div>
        {popUp && <UploadPopUp setter={SetPopUp} />}
        <div className="col-start-9 pt-4 flex  gap-4 opacity-55 hover:cursor-pointer col-span-4 justify-between">
          <SearchBar />
          <div
            className="flex  w-fit mr-3  gap-1 "
            onClick={() => SetPopUp(true)}
          >
            {isMap && <IoCloudUploadOutline className="text-white text-4xl" />}
            {isMap && (
              <span className="pt-1 text-lg font-medium">Upload Image</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
