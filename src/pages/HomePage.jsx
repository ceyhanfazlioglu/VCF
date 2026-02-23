import React from 'react';
import HeroCarousel from '../sections/HeroCarousel';
import EditorsPick from '../sections/EditorsPick';
import TopCategories from '../sections/TopCategories';
import BestsellerProducts from '../sections/BestsellerProducts';
import VitaClassic from '../sections/VitaClassic';
import NeuralUniverse from '../sections/NeuralUniverse';
import FeaturedPosts from '../sections/FeaturedPosts';

const HomePage = () => {
  return (
    <>
      <HeroCarousel />
      
      <EditorsPick />
      
      {/* Top Categories Section */}
      <TopCategories />
      
      <BestsellerProducts />
      <VitaClassic />
      <NeuralUniverse />
      <FeaturedPosts />
    </>
  );
};

export default HomePage;