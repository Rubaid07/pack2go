import React from 'react';
import HeroBanner from './HeroBanner';
import FeaturedPackages from './FeaturedPackages';

const Home = () => {
    return (
        <div>
             <HeroBanner></HeroBanner>
             <FeaturedPackages></FeaturedPackages>
        </div>
    );
};

export default Home;