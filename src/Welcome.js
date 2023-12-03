import React, { useEffect, useState } from 'react';
import './Welcome.scss';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import imageData from "./welcome_image";
import { Carousel } from "react-responsive-carousel";
import { useNavigate } from 'react-router-dom';
import {Image} from 'react-native';

const renderSlides = imageData.map(image => (
    <div key={image.alt}>
      <img src={image.url} alt={image.alt} />
  </div>
));

function Welcome() {
    const [currentIndex, setCurrentIndex] = useState();
    function handleChange(index) {
        setCurrentIndex(index);
    }
    return (
      <div className="Welcome">
        <h1 class="title-text">Factdect</h1>
        <div class="outer-boundary">
            <Carousel
            showArrows={false}
            autoPlay={false}
            infiniteLoop={true}
            showThumbs={false}
            selectedItem={imageData[currentIndex]}
            onChange={handleChange} >
            {renderSlides}
            </Carousel>
        </div>
        
      </div>
    );
  }
  
  export default Welcome;
  