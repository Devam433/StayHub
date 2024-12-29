import React, { useEffect, useState } from "react";
import { Home, PlusCircle, Edit, Trash } from "lucide-react";
import { Button } from "@nextui-org/react";
import { NavLink } from "react-router-dom";
import imageUrl from "../assets/test/home1.avif";
import axios from "axios"

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState();
  const [allStays,setAllStays] = useState([]);
  const [currentlyAvailableStays,setCurrentlyAvailableStays] = useState([]);
  const [currentlyBookedStays,,setcurrentlyBookedStays] = useState([]);
  console.log(allStays)
  const [error,setError] = useState(false);

  const handleDelete = (id) => {
    setListings(listings.filter((listing) => listing.id !== id));
  };

  useEffect(()=>{
    const fetchOwnerDashboard = async() => {
      setError(false);
      const token = localStorage.getItem('token');
      // const data = {ownerId:token.id}
      console.log(token)
      try {
        const response = await axios.get('http://localhost:3000/api/v1/dashboard/owner',{
          headers:{
            Authorization: 'Bearer ' + token
          }
        })
        console.log(response);
        setDashboardData(response.data);
        setAllStays(response.data.allStays);
        setCurrentlyAvailableStays(response.data.currentlyAvailableStays)
        setcurrentlyBookedStays(response.data.currentlyBookedStays)
      } catch (error) {
        console.log('Unable to fetch owner dashboard data')
        setError(true);
      }
    } 
    fetchOwnerDashboard();
  },[])

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-[18%] bg-gray-200 h-screen p-5">
        <nav>
          <ul className="space-y-4">
            <li>
              <NavLink to="/">
                <Home className="inline mr-2" />
                Home
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="w-3/4 p-5">
        <header className="mb-5">
          <h1 className="text-2xl font-bold">Welcome, John!</h1>
        </header>

        {/* Add New Listing */}
        <NavLink to="/profile/dashboard/addnewstays">
          <Button color="primary" className="mb-5">
            <PlusCircle className="inline mr-2" /> Add New Stays
          </Button>
        </NavLink>

        {/* Listings */}
        <section>
          <h2 className="text-xl font-semibold mb-3">My Stays</h2>
          <div className="space-y-4">
            {allStays?.map((stay) => (
              <div
                key={stay}
                className="border p-4 rounded shadow flex flex-row justify-start items-end"
              >
                <div className="h-56 mr-4">
                  <img
                    src={stay?.stayDetails?.images[0] || "/api/placeholder/350/240"}
                    alt={'stayImage'}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <span>
                  <h3 className="text-lg font-semibold">{stay?.stayDetails?.category + 'Stay'}</h3>
                  <p>Type: {stay?.stayDetails?.category || "N/A"}</p>
                  <p>Location: {stay?.stayDetails?.address.village || "N/A"}</p>
                  <p>Price: {stay?.stayDetails?.rent || "N/A"}</p>
                  <div className="mt-2">
                    <Button color="secondary" className="mr-2">
                      <Edit className="inline mr-1" /> Edit
                    </Button>
                    <Button
                      color="danger"
                      onClick={() => handleDelete()}
                    >
                      <Trash className="inline mr-1" /> Delete
                    </Button>
                  </div>
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
