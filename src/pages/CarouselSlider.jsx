import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import slide1 from '../slide1.jpg'
import slide2 from '../slide2.png'
import slide3 from '../slide3.png'

const CarouselSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // Enable automatic slideshow
    autoplaySpeed: 2000,
    arrows: false,
    draggable: true,
    fade: true,
  };
  const imageStyle = {
    height: '300px',
    width: '100%',
    objectFit: 'cover',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    marginBottom: '10px',
    cursor: 'pointer',
    transition: 'all 0.5s',
    
    
  };

  return (
    <Slider {...settings}>
      <div>
        
        <img src={slide1} alt="Slide 1"style={imageStyle} />
      </div>
      <div>
        <img src= {slide2} alt="Slide 2" style={imageStyle}/>
      </div>
      <div>
        <img src= {slide3} alt="Slide 3"style={imageStyle} />
      </div>
      
    </Slider>
  );
};

export default CarouselSlider;
