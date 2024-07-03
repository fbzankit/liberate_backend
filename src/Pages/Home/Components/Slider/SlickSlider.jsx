import React from 'react';
import Slider from 'react-slick';
import { useContext } from 'react';
import Context from '../../Context/Context';
import GlobalContext from '../../../../Global/GlobalContext';
const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 8,
    cssEase: "linear",
    slidesToScroll: 8,
    dotsClass:"d-none",
    nextArrow: <NextArrow className="slick-next" />,
    prevArrow: <PrevArrow className="slick-prev"  />,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 6,
                slidesToScroll: 6,
                infinite: true,
                dots: false,
            }
        },
        {
            breakpoint: 1300,
            settings: {
                slidesToShow: 7,
                slidesToScroll: 1,
                infinite: true,
                dots: true
            }
        },
        {
            breakpoint: 999,
            settings: {
                slidesToShow: 5,
                slidesToScroll: 5,
                infinite: true,
                dots: true
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
                initialSlide: 4
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 3,
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
const SlickSlider = () => {
 const [state,dispatch]=   useContext(Context);
 const [globalState,globalDispatch]=useContext(GlobalContext);
 const handleCategory=(id)=>{
    let ids= [...state.category,id];
    dispatch({type:'category',payload:{Type:'category',category:ids}})
 }
 
    return (
        <>
            <div className="cat-list-box">
                <Slider {...settings}>
                    {globalState.categories.map((res,i)=><div key={i} className="pl-2 pr-2" onClick={(e)=>handleCategory(res.id)}>
                        <div className={`single-cat-bx ${state?.category?.find((r)=>r.id===res.id?'active':'')}`}>
                            <a href={void (0)} className="single-services">
                                <div className="services-icon mb-20"> <i className="lb lb-host-icon"></i> </div>
                                <div className="services-content">
                                    <h4>{res.name}</h4>
                                </div>
                            </a>
                        </div>
                    </div>)}
                </Slider>
            </div>
        </>
    );
}
export default SlickSlider;
