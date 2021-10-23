import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
// import { Helmet, HelmetProvider } from 'react-helmet-async';
import './Template.scss';

const TemplatePage = ({ ...props }) => {
  
  return (
    <>
     {/* <HelmetProvider> */}
       {/* <Helmet> */}
        <title>Template</title>
        <meta
          name="keywords"
          content="Content"
        />
        <meta
          name="description"
          content="Description"
        />
      {/* </Helmet> */}
      <div className="template">
        
        <div className="template__content">
          
        </div>
      </div>
    {/* </HelmetProvider> */}
    </>
  );
};

export default LandingPage;
