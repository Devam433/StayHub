import React, { useContext, useEffect, useState } from 'react'
import NavbarSH from '../components/NavbarSH'
import SearchBar from '../components/SearchBar'
import ListingCard from '../components/ListingCard'
import HomeImage from '../assets/test/home1.avif'
import axios from 'axios'
import { dataContext } from '../context/DataContext'

function Home() {

  const { data, setData } = useContext(dataContext);

  // const [data, setData] = useState();

  async function fetchStays() {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/public/getAllSatys');
      console.log(response)
      setData(response.data);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchStays();
  }, []);

  return (
    <>
    <NavbarSH/>
    <SearchBar/>

    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-8">
        {data?.map((val) => (
          <ListingCard id={val._id} location={val.stayDetails.address.village} rating={4.5} price={val.stayDetails.rent} type={val.stayDetails.category} availability={val.canSelect} imageUrl={val.stayDetails.images[0]}/>
        ))}
      </div>
    </div>
    </>
  )
}

export default Home