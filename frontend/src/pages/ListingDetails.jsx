import React from 'react';
import { Heart, Share, MapPin, Star } from 'lucide-react';

const ListingDetails = ({ id }) => {
  // Mock data for demonstration
  const listing = {
    id,
    title: "Luxury Beach Villa",
    location: "Malibu, California",
    images: [
      "/api/placeholder/800/500",
      "/api/placeholder/800/500",
      "/api/placeholder/800/500"
    ],
    price: 299,
    rating: 4.9,
    reviews: 128,
    type: "Entire villa",
    beds: 4,
    baths: 3,
    guests: 8,
    amenities: [
      "Beach access",
      "Pool",
      "WiFi",
      "Kitchen",
      "Free parking",
      "Air conditioning"
    ],
    description: "Stunning beachfront villa with panoramic ocean views. Perfect for family gatherings or special occasions. Direct beach access and private pool.",
    host: {
      name: "Sarah",
      joinedDate: "2020",
      responseRate: "100%",
      responseTime: "within an hour"
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">{listing.title}</h1>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Star className="w-4 h-4" />
            <span>{listing.rating}</span>
            <span>·</span>
            <span>{listing.reviews} reviews</span>
            <span>·</span>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              {listing.location}
            </div>
          </div>
          <div className="flex space-x-4">
            <button className="flex items-center px-4 py-2 border rounded-lg hover:bg-gray-50">
              <Share className="w-4 h-4 mr-2" />
              Share
            </button>
            <button className="flex items-center px-4 py-2 border rounded-lg hover:bg-gray-50">
              <Heart className="w-4 h-4 mr-2" />
              Save
            </button>
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <img 
          src={listing.images[0]} 
          alt={listing.title}
          className="w-full h-[400px] object-cover rounded-l-xl"
        />
        <div className="grid grid-cols-2 gap-4">
          {listing.images.slice(1, 5).map((image, index) => (
            <img 
              key={index}
              src={image}
              alt={`${listing.title} ${index + 2}`}
              className="w-full h-[195px] object-cover last:rounded-tr-xl"
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-3 gap-8">
        {/* Left Column - Details */}
        <div className="col-span-2">
          <div className="border-b pb-6 mb-6">
            <h2 className="text-xl font-semibold mb-2">
              {listing.type} hosted by {listing.host.name}
            </h2>
            <div className="flex space-x-4 text-gray-600">
              <span>{listing.guests} guests</span>
              <span>·</span>
              <span>{listing.beds} bedrooms</span>
              <span>·</span>
              <span>{listing.baths} bathrooms</span>
            </div>
          </div>

          <div className="border-b pb-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">About this place</h3>
            <p className="text-gray-600">{listing.description}</p>
          </div>

          <div className="border-b pb-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">What this place offers</h3>
            <div className="grid grid-cols-2 gap-4">
              {listing.amenities.map((amenity, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <span className="px-2 py-1 bg-gray-100 rounded-full text-sm">
                    {amenity}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Booking Card */}
        <div className="relative">
          <div className="sticky top-8 bg-white border rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <span className="text-2xl font-bold">${listing.price}</span>
              <span className="text-gray-600">night</span>
            </div>
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
              Reserve
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetails;