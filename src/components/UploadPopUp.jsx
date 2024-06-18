import React, { useState } from "react";
import { useRef, useEffect } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { FaLocationCrosshairs } from "react-icons/fa6";
function getCurrentLocation() {
  if (navigator.geolocation) {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coordinates = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          resolve(coordinates);
        },
        (error) => {
          reject(error);
        }
      );
    });
  } else {
    throw new Error("Geolocation is not supported by your browser");
  }
}

// Example usage:
getCurrentLocation()
  .then((coordinates) => {
    console.log("Latitude:", coordinates.latitude);
    console.log("Longitude:", coordinates.longitude);
  })
  .catch((error) => {
    console.error("Error getting current location:", error.message);
  });

export default function UploadPopUp(props) {
  const { setter } = props;
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  //   const [popUp, SetPopUp] = useState(false);
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [cropname, setCropName] = useState("");
  const [disease, setDisease] = useState("");
  const [uploaded, setUploaded] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
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
          setUploaded(true);

          setImageUrl(result.info.secure_url);

          //   const requestOptions = {
          //     method: "POST",
          //     headers: {
          //       "Content-Type": "application/json",
          //     },
          //     body: JSON.stringify(postData),
          //   };
          //   console.log(postData);

          //   const response = await fetch("http://localhost:3000", requestOptions);
          //   const responseData = await response.json();
          //   console.log(responseData);
        }
      }
    );
  }, []);
  async function submitHandler() {
    const postData = {
      imageUrl: imageUrl,
      latitude: Number(latitude),
      longitude: Number(longitude),
      location: "India",
      cropName: cropname,
      disease,
    };
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    };
    const response = await fetch("http://localhost:3000", requestOptions);
    const responseData = await response.json();
    setter(false);
  }
  return (
    <div className="absolute text-white    z-20 top-[250px] left-1/3 w-[700px] h-[550px] rounded-xl  bg-zinc-800">
      <h1 className="ml-72 pt-4  w-fit text-3xl tracking-wide font-medium">
        Crop Details
      </h1>
      <div className="ml-32 pt-6">
        <h1 className="pb-3 text-2xl tracking-wide ">crop name</h1>
        <input
          placeholder="enter crop name"
          className="bg-transparent border p-2 rounded-lg w-[450px] h-12 mb-4"
          value={cropname}
          onChange={(e) => {
            setCropName(e.target.value);
          }}
        />
        <div>
          <h1 className="pb-3 text-2xl tracking-wide">disease descripiton</h1>
          <input
            placeholder="descripiton"
            className="bg-transparent border p-2 rounded-lg w-[450px] h-12 mb-4"
            value={disease}
            onChange={(e) => {
              setDisease(e.target.value);
            }}
          />
        </div>
        <div className="flex gap-2">
          <div>
            <h1 className="pb-3 text-2xl tracking-wide">latitude</h1>
            <input
              placeholder="enter latitude"
              className="bg-transparent border p-2 rounded-lg w-[220px] h-12 mb-4"
              value={latitude}
              onChange={(e) => {
                setLatitude(e.target.value);
              }}
            />
          </div>
          <div>
            <h1 className="pb-3 text-2xl tracking-wide">longitude</h1>
            <input
              placeholder="enter longitude"
              value={longitude}
              onChange={(e) => {
                setLongitude(e.target.value);
              }}
              className="bg-transparent border p-2 rounded-lg w-[220px] h-12 mb-4"
            />
          </div>
        </div>
        <div
          className="text-blue-400 flex gap-2  hover:cursor-pointer"
          onClick={() => {
            getCurrentLocation()
              .then((coordinates) => {
                // console.log("Latitude:", coordinates.latitude);
                // console.log("Longitude:", coordinates.longitude);
                setLatitude(coordinates.latitude);
                setLongitude(coordinates.longitude);
              })
              .catch((error) => {
                console.error("Error getting current location:", error.message);
              });
          }}
        >
          <FaLocationCrosshairs className="mt-1 " />
          <div>use current location</div>
        </div>
        <div className="flex " onClick={() => widgetRef.current.open()}>
          <button>
            <FaCloudUploadAlt className="text-2xl" />
          </button>
          <h1 className="ml-2 font-medium tracking-wide">upload image</h1>
        </div>
        <button
          className=" text-xl font-semibold tracking-wide border w-[450px] p-4 bg-white text-black rounded-3xl mt-4 hover:cursor-pointer hover:bg-black hover:border-2 hover:p-4 hover:text-white"
          onClick={() => {
            submitHandler();
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
