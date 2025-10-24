import React from 'react';
import HeroBanner from './HeroBanner';
import FeaturedPackages from './FeaturedPackages';
import LocalGuides from './LocalGuides';
import SustainableTravel from './SustainableTravel';
import SeasonalSpecials from './SeasonalSpecials';
import TravelersJournal from './TravelersJournal';
import Offers from './Offers';
import SpinWheel from './SpinWheel';
import SubscribeSection from './SubscribeSection';

const Home = () => {
    return (
        <div>
             <HeroBanner></HeroBanner>
             <FeaturedPackages></FeaturedPackages>
             <SpinWheel></SpinWheel>
             <LocalGuides></LocalGuides>
             <SustainableTravel></SustainableTravel>
             <SeasonalSpecials></SeasonalSpecials> 
             <TravelersJournal></TravelersJournal>
             <SubscribeSection></SubscribeSection>
        </div>
    );
};

export default Home;