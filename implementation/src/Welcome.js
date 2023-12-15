import './Welcome.scss';
import React, { useEffect, useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import imageData from "./welcome_image";
import { Carousel } from "react-responsive-carousel";
import { useNavigate } from 'react-router-dom';

const renderSlides = imageData.map(image => (
    <div key={image.alt}>
      <img src={image.url} alt={image.alt} />
  </div>
));

function Welcome() {
    const [currentIndex, setCurrentIndex] = useState();
    const navigate = useNavigate();
    function handleChange(index) {
        setCurrentIndex(index);
    }
    const goRank = e => {
        navigate('/rank');
    };
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
        <button class="Button" onClick={goRank}>
            <div class="button-text">
                START
            </div>
        </button>
      </div>
    );
  }
  
  export default Welcome;
  