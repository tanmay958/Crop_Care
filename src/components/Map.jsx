import { GoogleMap, Marker } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import DiseaseViwer from "./DiseaseViwer";
import useMarker from "../hooks/useMarkers";
// import UploadWidget from "./UploadWidget";
export default function Map(props) {
  const { isLoaded } = props;
  const [markers, setMarkers] = useState([]);
  const [error, setError] = useState(null);
  const [selectedPointer, SetSelectedPointer] = useState(null);
  const { locations } = useMarker();
  useEffect(() => {
    // const fetchLocations = async () => {
    //   try {
    //     const response = await fetch("http://localhost:3000"); // Adjust the URL as per your backend API endpoint
    //     if (!response.ok) {
    //       throw new Error("Failed to fetch locations");
    //     }
    //     const data = await response.json();
    //     setMarkers(data);
    //   } catch (error) {
    //     setError(error.message);
    //   }
    // };

    // fetchLocations();

    setMarkers(locations);
  }, [locations]);

  const containerStyle = {
    width: "100vw",
    height: "830px",
  };

  const center = {
    lat: 22.719568,
    lng: 75.857727,
  };
  return (
    isLoaded && (
      <div className="relative">
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={5}>
          {markers.length &&
            markers.map((ele) => {
              let position = {
                lat: ele.latitude,
                lng: ele.longitude,
              };
              return (
                <Marker
                  position={position}
                  key={ele._id}
                  onClick={() => {
                    SetSelectedPointer(ele);
                  }}
                />
              );
            })}
          {selectedPointer && console.log(selectedPointer)}
          {selectedPointer && (
            <DiseaseViwer setter={SetSelectedPointer} ele={selectedPointer} />
          )}
        </GoogleMap>
      </div>
    )
  );
}
