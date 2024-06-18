import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
// import useMarker from "../hooks/useMarkers";
import useGetMarker from "../zustand/useGetMarker";
import toast from "react-hot-toast";

export default function SearchBar() {
  const [searchText, setSearchText] = useState("");
  const { locations, setLocations } = useGetMarker();
  return (
    <div className="flex">
      <input
        placeholder="type crop name"
        className="w-[400px] h-11 rounded-lg bg-transparent border text-white p-1"
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
      />
      <FaSearch
        className="text-4xl  p-1 mt-1 ml-3 opacity-55"
        onClick={async () => {
          const getCropDetails = {
            cropName: searchText,
          };
          const requestOptions = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(getCropDetails),
          };
          const response = await fetch(
            "http://localhost:3000/crop",
            requestOptions
          );
          const responseData = await response.json();
          //   console.log(responseData);

          if (responseData?.message || searchText.length === 0) {
            // toast(responseData.message);
            alert(responseData.message);
            const fetchLocations = async () => {
              try {
                const response = await fetch("http://localhost:3000"); // Adjust the URL as per your backend API endpoint
                if (!response.ok) {
                  throw new Error("Failed to fetch locations");
                }
                const locations = await response.json();
                setLocations(locations);
                console.log("Locations fetched:", locations);
              } catch (error) {
                console.error("Error fetching locations:", error);
                // Handle error if needed
              }
            };

            fetchLocations();
          }
          setLocations(responseData);
          setSearchText("");
        }}
      />
    </div>
  );
}
