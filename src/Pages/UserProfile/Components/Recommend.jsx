import React from 'react';
import { Link } from 'react-router-dom';
import images from '../../../Utility/Images';
import EventCards from '../../Home/Components/Cards/EventCards';
import TestimonialSlider from '../../../Welcome/TestimonialSlider';

const Recommend = () => {
    return (
    <>
    <section className="recommended-area">
                                           
                                                <div className="p-sec-heading">
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <div className="section-title">
                                                                <h2>Recommended</h2>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="recommended-pra-list">
                                                    <div className="row project-active slider-lft-rit slick-initialized slick-slider">
                                                    <TestimonialSlider count={8}>
                                                        <EventCards  id={1} practitionerId={1} isFav={1} name={"Test deepak 1"} aboutMe={"N/A"} services={[]} image={images.profileAvatar}/>   
                                                        <EventCards  id={1} practitionerId={1} isFav={1} name={"Test deepak 2"} aboutMe={"N/A"} services={[]} image={images.profileAvatar}/>   
                                                        <EventCards  id={1} practitionerId={1} isFav={1} name={"Test deepak 3"} aboutMe={"N/A"} services={[]} image={images.profileAvatar}/> 
                                                    </TestimonialSlider> 
                                                    </div>
                                                </div>
                                           
                                        </section>
    </>
    );
}


export default Recommend;