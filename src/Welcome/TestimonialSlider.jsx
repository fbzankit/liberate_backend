import React from 'react';
import images from '../Utility/Images';
import Slider from 'react-slick';
const TestimonialSlider = (props) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        slidesToShow: 3,
        cssEase: "linear",
        slidesToScroll: 3,
        dotsClass:"d-none",
        nextArrow: <NextArrow className="slick-next" />,
        prevArrow: <PrevArrow className="slick-prev"  />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow:props.count>2?2:1,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: false,
                }
            },
            {
                breakpoint: 1300,
                settings: {
                    slidesToShow: props.count>3?3:1,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 999,
                settings: {
                    slidesToShow:props.count>2?2:1,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow:props.count>2?2:1,
                    slidesToScroll: 2,
                    initialSlide: 4
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
       
    };
    function NextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <button type="button"
            className={className}
            style={{ ...style, display: "block"}}
            onClick={onClick}
            ><i className="fa fa-angle-right"></i></button>
        );
      }
      
      function PrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <button type="button"
    
            className={className}
            style={{ ...style, display: "block"}}
            onClick={onClick}><i className="fa fa-angle-left"></i></button>
        );
      }
    return (
        <>
         <Slider {...settings}>
            {props.children}    
        </Slider>
        </>
    );
}

export default TestimonialSlider;