import { useJsApiLoader } from "@react-google-maps/api";
import Map from "./Map";
import { useState } from "react";
import Navbar from "./Navbar";
export default function MapRender() {
  const { isLoaded } = useJsApiLoader({
    id: "",
    googleMapsApiKey: "AIzaSyBX3JcRU1sEUNosB7Rwxs04sFFbfA3yc0w",
  });

  return (
    // <div>
    <div className="grid grid-cols-12 bg-[#171E25]   ">
      <Navbar isMap={true} />
      <Map isLoaded={isLoaded} />
      {/* <h1>{isLoaded}</h1> */}
    </div>
    // </div>
  );
}
