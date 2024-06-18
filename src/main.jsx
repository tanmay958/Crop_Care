// import React from 'react'
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Map from "./components/Map.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MapRender from "./components/MapRender.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/map",
    element: <MapRender />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  
  <RouterProvider router={router} />
);
// // ReactDOM.createRoot(document.getElementById('root')).render(
// //   <React.StrictMode>
//     <App />
// //   </React.StrictMode>,
// // )
