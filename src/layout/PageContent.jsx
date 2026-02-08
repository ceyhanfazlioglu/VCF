import React from 'react';
import Header from './Header';
import Footer from './Footer';

const PageContent = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PageContent;
