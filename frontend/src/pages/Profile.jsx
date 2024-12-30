import React, { useContext } from "react";
import NavbarSH from "../components/NavbarSH";
import ProfileImage from "../assets/test/profile.png";
import { Button } from "@nextui-org/react";
import { UserRoundPen } from "lucide-react";
import { NavLink } from "react-router-dom";
import { dataContext } from "../context/DataContext";

function Profile() {

  const { currentUserData } = useContext(dataContext);
  console.log(currentUserData);
  
  return (
    <>
      <NavbarSH />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
        {/* Card container */}
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg">
          <div className="p-8">
            {/* Header Section */}
            <div className="flex flex-col items-center mb-8">
              <div className="bg-blue-400 rounded-full p-4 mb-6">
                {/* <User className="w-20 h-20 text-white" /> */}
                <img src={ProfileImage} className="w-20" />
              </div>
            </div>

            {/* Profile Information */}
            <div className="space-y-6">
              {/* Name Section */}
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {currentUserData?.userName}
                </h2>
                <div className="h-1 w-20 bg-blue-600 mx-auto mt-2"></div>
              </div>

              {/* Contact Information */}
              <div className="flex items-center justify-center space-x-2 text-gray-600">
                  <div className="bg-blue-50 rounded-lg p-4 flex-1 max-w-xs">
                    <p className="text-sm text-gray-500 mb-1">Role</p>
                    <p className="font-medium">{currentUserData?.role}</p>
                  </div>
                </div>

              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-2 text-gray-600">
                  <div className="bg-blue-50 rounded-lg p-4 flex-1 max-w-xs">
                    <p className="text-sm text-gray-500 mb-1">Phone</p>
                    <p className="font-medium">{currentUserData?.phoneNumber}</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Dashboard link */}
            <div className="bg-slate-200 px-2 py-5 rounded-xl h-28 flex flex-col justify-around items-center">
              <Button color="primary" endContent={<UserRoundPen />}>
                <NavLink to="/profile/dashboard">Access Dashboard</NavLink>
              </Button>
              <p className="text-gray-500 text-xs">You are a landlord! Right</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
