// import React, { useEffect, useState } from "react";
// import useGetMarker from "../zustand/useGetMarker";

// export default function useMarker() {
//   const { locations, setLocations } = useGetMarker();
//   const [data, setData] = useState([]);
//   useEffect(() => {
//     const fetchLocations = async () => {
//       try {
//         const response = await fetch("http://localhost:3000"); // Adjust the URL as per your backend API endpoint
//         if (!response.ok) {
//           throw new Error("Failed to fetch locations");
//         }
//         const temp = await response.json();
//         setData(temp);
//         setLocations(data);
//         console.log("from context", locations);
//       } catch (error) {
//         //   setError(error.message);
//       }
//     };

//     fetchLocations();
//   }, [setLocations]);
//   return { locations, setLocations };
// }

import React, { useEffect } from "react";
import useGetMarker from "../zustand/useGetMarker";

export default function useMarker() {
  const { setLocations, locations } = useGetMarker();

  useEffect(() => {
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
  }, [setLocations]);

  return { setLocations, locations };
}
