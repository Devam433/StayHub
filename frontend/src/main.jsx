import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import Home from "./pages/Home.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Profile from "./pages/Profile.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import AddNewStays from "./pages/AddNewStays.jsx";
import ListingDetails from "./pages/ListingDetails.jsx";
import DataContext from "./context/DataContext.jsx";
import EditStay from "./pages/EditStay.jsx";
import Bookings from "./pages/Bookings.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/listings/:id",
    element: <ListingDetails />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/bookings",
    element: <Bookings />
  },
  {
    path: "/profile/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/profile/dashboard/addnewstays",
    element: <AddNewStays />,
  },
  {
    path: "/profile/dashboard/editstay/:id",
    element: <EditStay />
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DataContext>
      <NextUIProvider>
        <RouterProvider router={router} />
      </NextUIProvider>
    </DataContext>
  </StrictMode>
);
