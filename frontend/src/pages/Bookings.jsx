import React, { useContext, useState, useEffect } from "react";
import { dataContext } from "../context/DataContext";
import axios from "axios";
import { Button } from "@nextui-org/react";
import NavbarSH from "../components/NavbarSH";

function Bookings() {
  const { data, currentUserData } = useContext(dataContext);

  const [dashboardData, setDashboardData] = useState();
  const [currentlyBookedStay, setcurrentlyBookedStay] = useState();

  async function fetchTanentDashboard() {
    const token = localStorage.getItem("token");
    // const data = {ownerId:token.id}
    console.log(token);
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/dashboard/tanent",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log(response);
      setDashboardData(response.data);
      setcurrentlyBookedStay(response.data.currentlyBookedStay);
    } catch (error) {
      console.log("Unable to fetch owner dashboard data");
    }
  }

  useEffect(() => {
    fetchTanentDashboard();
  }, []);

  async function handleUnbook() {
    try {
      const response = await axios.patch(
        `http://localhost:3000/api/v1/book/un-book-stay/:${currentlyBookedStay[0]}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data) {
        console.log("UnBooking success", response);
      }
    } catch (error) {
      console.log("error to book stay", error);
    }
  }

  return (
    <>
    <NavbarSH/>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-8">
          <div className="w-full bg-white rounded-xl shadow-md overflow-hidden relative cursor-pointer hover:shadow-lg transition-shadow">
            <button className="absolute top-3 right-3 z-10 bg-white/70 rounded-full p-2"></button>
            <div className="aspect-[4/3] w-full">
              <img
                src={
                  currentlyBookedStay?.stayDetails?.images[0] ||
                  "/api/placeholder/350/240"
                }
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-gray-800">
                  {currentlyBookedStay?.stayDetails?.address?.village}
                </h3>
              </div>
              {/* <div className="text-sm text-gray-500 mb-2">
                {currentlyBookedStay?.stayDetails?.category || "Entire place"}
              </div> */}
              <div className="flex justify-between items-center">
                <div className="text-gray-800">
                  <Button onPress={handleUnbook}>Unbook</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Bookings;
