import React from 'react';
import { Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ListingCard = ({ 
  id,
  imageUrl, 
  location, 
  rating, 
  price, 
  type, 
  availability 
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/listings/${id}`);
  };

  const handleHeartClick = (e) => {
    e.stopPropagation(); // Prevent navigation when clicking the heart
    // Handle favoriting logic here
  };

  return (
    <div 
      className="w-full bg-white rounded-xl shadow-md overflow-hidden relative cursor-pointer hover:shadow-lg transition-shadow"
      onClick={handleClick}
    >
      <button 
        className="absolute top-3 right-3 z-10 bg-white/70 rounded-full p-2"
        onClick={handleHeartClick}
      >
        <Heart className="text-gray-700 hover:text-red-500" size={20} />
      </button>
      <div className="aspect-[4/3] w-full">
        <img 
          src={imageUrl || "/api/placeholder/350/240"} 
          alt={location} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold text-gray-800">{location}</h3>
          <div className="flex items-center">
            <span className="text-yellow-500 mr-1">★</span>
            <span className="text-gray-600">{rating || '4.8'}</span>
          </div>
        </div>
        <div className="text-sm text-gray-500 mb-2">
          {type || 'Entire place'}
        </div>
        <div className="flex justify-between items-center">
          <div className="text-gray-800">
            <span className="font-bold">${price}</span>
            <span className="text-gray-500 ml-1">/month</span>
          </div>
          {availability && (
            <div className="text-xs text-green-600">
              {availability}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListingCard;