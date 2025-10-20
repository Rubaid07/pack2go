import React from 'react';
import HeroBanner from './HeroBanner';
import FeaturedPackages from './FeaturedPackages';
import LocalGuides from './LocalGuides';
import SustainableTravel from './SustainableTravel';
import SeasonalSpecials from './SeasonalSpecials';
import TravelersJournal from './TravelersJournal';
import Offers from './Offers';

const Home = () => {
    return (
        <div>
             <HeroBanner></HeroBanner>
             <FeaturedPackages></FeaturedPackages>
             <LocalGuides></LocalGuides>
             <SustainableTravel></SustainableTravel>
             <Offers></Offers>
             <TravelersJournal></TravelersJournal>
             <SeasonalSpecials></SeasonalSpecials> 
        </div>
    );
};

export default Home;