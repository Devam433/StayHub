import React, { useState } from "react";
import { Home, PlusCircle, Edit, Trash } from "lucide-react";
import { Button } from "@nextui-org/react";
import { NavLink } from "react-router-dom";
import imageUrl from "../assets/test/home1.avif";

const Dashboard = () => {
  const [listings, setListings] = useState([
    {
      id: 1,
      title: "Sunny PG",
      type: "PG",
      location: "Downtown",
      price: "₹5000/month",
    },
  ]);

  const handleDelete = (id) => {
    setListings(listings.filter((listing) => listing.id !== id));
  };

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
            {listings.map((listing) => (
              <div
                key={listing.id}
                className="border p-4 rounded shadow flex flex-row justify-start items-end"
              >
                <div className="h-56 mr-4">
                  <img
                    src={imageUrl || "/api/placeholder/350/240"}
                    alt={location}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <span>
                  <h3 className="text-lg font-semibold">{listing.title}</h3>
                  <p>Type: {listing.type}</p>
                  <p>Location: {listing.location}</p>
                  <p>Price: {listing.price}</p>
                  <div className="mt-2">
                    <Button color="secondary" className="mr-2">
                      <Edit className="inline mr-1" /> Edit
                    </Button>
                    <Button
                      color="danger"
                      onClick={() => handleDelete(listing.id)}
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
