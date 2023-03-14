import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider  } from "react-router-dom";

import Header from "./Pages/Header";
import ErrorPage from "./Pages/ErrorPage";
import Citylist from "./Pages/Citylist";
import Bucketlist from "./Pages/Bucketlist";
import ContactUs from "./Pages/ContactUs";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Citylist />,
      },
      {
        path: "/bucketlist",
        element: <Bucketlist />,
      },
      {
        path: "/contactus",
        element: <ContactUs />,
      },
    ]
  },
]);
  
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
