import React from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleRight, faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons'

function NextArrow(props) {
    const { onClick } = props;
    return (
      <button
      className="sliderArrow sliderArrow-left"
        onClick={onClick}
      ><FontAwesomeIcon icon={faChevronCircleLeft} /></button>
    );
}
  
function PrevArrow(props) {
    const { onClick } = props;
    return (
        <button
        className="sliderArrow sliderArrow-right"
        onClick={onClick}
        ><FontAwesomeIcon icon={faChevronCircleRight} /></button>
    );
}

function DaysSlider(props) {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 15,
        slidesToScroll: 5,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />
    };
    const {month, year, months, handleSelectDay} = props;
    const daysInMonth = new Date(parseInt(year), parseInt(month) + 1, 0).getDate();
    const daysList = [];
    for (let i=1; i <= daysInMonth; i++) {
        daysList.push(<div onClick={handleSelectDay} data-val={i} key={i}><span>{i}</span><span>{months[month]}</span></div>)
    }
    return (
        <div className="mediaCenter-days">
          <Slider {...settings}>
              {daysList}
          </Slider>
        </div>
    );
}

export default DaysSlider;