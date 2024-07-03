import React from 'react';
import images from '../../../Utility/Images';
import TestimonialSlider from '../../../Welcome/TestimonialSlider';
import { profileAvatar } from '../../../Utility/Utility';
const Testimonials = ({data,getAllReviews}) => {
    return (
        <>
            <section className="testimonials-area">
                <div className="container">
                    <div className="p-sec-heading">
                        <div className="row">
                            <div className="col-12">
                                <div className="section-title">
                                    <h2>Testimonials</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="testimonials-bx-list">
                    <div className="row testimonails-active slider-lft-rit slick-initialized slick-slider">
                        <TestimonialSlider count={parseInt(data?.length)}>
                        {data?.map((res,i)=>
                        <div className="col-lg-3 mw-100">
                                <div className="app-testimonial">
                                    <div className="testi-head">
                                        <div className="app-testi-review"> <i className="lb lb-quote-icon"></i> </div>
                                    </div>
                                    <div className="app-testi-content mb-35">
                                        <p>{res?.comment}</p>
                                    </div>
                                    <div className="testi-avatar app-testi-avatar ml-0">
                                        <div className="tavatar-img"> <img src={profileAvatar(res?.user?.image,res?.user?.social_image)} alt="img" /> </div>
                                        <div className="tavatar-info">
                                            <h5>{res?.user?.name}</h5>
                                            <div className="rating-star">
                                                                    <ul className="ul-row">
                                                                        <li><img src={res?.rating>0?images.star_rating:images.un_rating_img} alt="" /></li>
                                                                        <li><img src={res?.rating>1?images.star_rating:images.un_rating_img} alt="" /></li>
                                                                        <li><img src={res?.rating>2?images.star_rating:images.un_rating_img} alt="" /></li>
                                                                        <li><img src={res?.rating>3?images.star_rating:images.un_rating_img} alt="" /></li>
                                                                        <li><img src={res?.rating>4?images.star_rating:images.un_rating_img} alt="" /></li>
                                                                    </ul>
                                                </div>
                                            {/* <span>Co-Founder & CTO</span> */}
                                        </div>
                                    </div>
                                </div>
                            </div>)}
                        </TestimonialSlider>
                    </div>
                    </div>
                </div>
            </section>
        </>
    );
}


export default React.memo(Testimonials);