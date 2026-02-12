import React from 'react';
import HeroCarousel from '../sections/HeroCarousel';
import EditorsPick from '../sections/EditorsPick';
import BestsellerProducts from '../sections/BestsellerProducts';
import VitaClassic from '../sections/VitaClassic';
import NeuralUniverse from '../sections/NeuralUniverse';
import FeaturedPosts from '../sections/FeaturedPosts';

const HomePage = () => {
  return (
    <>
      {/* Hero - Full Width, No Container */}
      <HeroCarousel />
      
      {/* Rest of sections */}
      <EditorsPick />
      <BestsellerProducts />
      <VitaClassic />
      <NeuralUniverse />
      <FeaturedPosts />
    </>
  );
};

export default HomePage;