import React from 'react'
import NavbarSH from '../components/NavbarSH'
import SearchBar from '../components/SearchBar'
import ListingCard from '../components/ListingCard'
import HomeImage from '../assets/test/home1.avif'

function Home() {
  return (
    <>
    <NavbarSH/>
    <SearchBar/>

    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-8">
        {/* {listings.map((listing, index) => (
          <ListingCard key={index} {...listing} />
        ))} */}
        <ListingCard imageUrl={HomeImage} location='Bamgaon' price='2000' rating='3.5' type='Paying Guest'/>
      <ListingCard imageUrl={HomeImage} location='Bamgaon' price='2000' rating='3.5' type='Paying Guest'/>
      <ListingCard imageUrl={HomeImage} location='Bamgaopn' rice='2000' rating='3.5' type='Paying Guest'/>
      <ListingCard imageUrl={HomeImage} location='Bamgaon' price='2000' rating='3.5' type='Paying Guest'/>
      <ListingCard imageUrl={HomeImage} location='Bamgaon' price='2000' rating='3.5' type='Paying Guest'/>
      <ListingCard imageUrl={HomeImage} location='Bamgaon' price='2000' rating='3.5' type='Paying Guest'/>
      <ListingCard imageUrl={HomeImage} location='Bamgaon' price='2000' rating='3.5' type='Paying Guest'/>
      <ListingCard imageUrl={HomeImage} location='Bamgaon' price='2000' rating='3.5' type='Paying Guest'/>
      <ListingCard imageUrl={HomeImage} location='Bamgaon' price='2000' rating='3.5' type='Paying Guest'/>
      <ListingCard imageUrl={HomeImage} location='Bamgaon' price='2000' rating='3.5' type='Paying Guest'/>
      <ListingCard imageUrl={HomeImage} location='Bamgaon' price='2000' rating='3.5' type='Paying Guest'/>
      </div>
    </div>
    </>
  )
}

export default Home