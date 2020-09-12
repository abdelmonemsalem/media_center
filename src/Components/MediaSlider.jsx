import React from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faChevronLeft, faCalendarAlt, faEye } from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom'

function NextArrow(props) {
    const { onClick } = props;
    return (
      <button
        className="sliderArrow sliderArrow-left"
        onClick={onClick}
      ><FontAwesomeIcon icon={faChevronLeft} /></button>
    );
}
  
function PrevArrow(props) {
    const { onClick } = props;
    return (
        <button
        className="sliderArrow sliderArrow-right"
        onClick={onClick}
        ><FontAwesomeIcon icon={faChevronRight} /></button>
    );
}

function trimLongText(text, wordLength) {
    var shortTxt;
    if (text.length > wordLength) {
        shortTxt = text.substring(0, wordLength) + " ...";
    } else {shortTxt = text};
    return shortTxt;
}

function MediaSlider(props) {
    const mediaSlider = props.filterdData.map(item =>
        <figure key={item._id} id={item._id} className="mediaCenter-items">
            <img src={item.imgUrl} alt="Media Img" />
            <span className="mediaSlider-date"><FontAwesomeIcon icon={faCalendarAlt} /> {item.date}</span>
            <span className={`mediaSlider-type ${item.type}`}>{item.type}</span>
            <figcaption>
            <h3>{item.title}</h3>
            <p>{trimLongText(item.description, 70)}</p>
            <Link to={"/ViewMediaItem/" + item._id}>See More <FontAwesomeIcon icon={faEye} /></Link>
            </figcaption>
        </figure>
    )
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />
    };
    return (
        <div className="mediaCenter-slider">
          <Slider {...settings}>
              {mediaSlider}
          </Slider>
        </div>
    );
}

export default MediaSlider;