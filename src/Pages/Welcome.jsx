import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Redirect, useHistory } from 'react-router';
import Auth from '../Auth/Auth';
import { Link } from 'react-router-dom';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import images from '../Utility/Images';
import TestimonialSlider from '../Welcome/TestimonialSlider';

const Welcome = () => {

    const [width, setWidth] = useState(window.innerWidth);
    const history = useHistory()
    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
    }
    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    if (Auth.getAccessToken()) {
        return (
            <Redirect to={'/home'} />
        );
    }
    document.title = "Welcome";
    const style = { padding: width <= 767 ? '30px' : '0px' };
    return (
        <>
            <Header />
            <main className="landing-page-main">
                <section className="l-banner-sec">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-6 col-md-6 col-lg-6">
                                <div className="banner-left-text">
                                    <h1>Welcome To Liberate Platform</h1>
                                    <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words.</p>
                                    <div className="banner-btns">
                                        <ul className="ul-row">
                                            <li><Link className="btn" to="/login"> Get Started</Link></li>
                                            <li><Link className="btn bdr-btn" to="/contact-us"> Contact Us</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-md-6 col-lg-6">
                                <div className="banner-right-image">
                                    <img src={images.welcome_banner_rit_img} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="practitioner-features-sec">
                    <div className="container">
                        <div className="row flex-row-reverse">
                            <div className="col-sm-6 col-md-7 col-lg-7">
                                <div className="pra-right-content participant-top-sec">
                                    <div className="section-title">
                                        <h2>Participant</h2>
                                        <p>Liberate is designed to help you discover your true self, and transform with the best tribe and community there is to offer. Enjoy a higher form of spirituality remotely from anywhere in the world. Have access to a world of love, Healing, support and guidance in the palm of your hand wherever and whenever you need. </p>
                                        <p>A platform that gets to know you so we can help you on your journey to become the best version of you. Learn more about who you are and what you need. Gain insight into your life from a higher perspective to liberate your mind, body and soul by freeing the most powerful, magical you, that's been waiting to come out. Manifest, work and master the life you’ve always wanted. </p>
                                        <p>Learn, Grow and level up your experience with the best, with a tribe that wants to lift you up, in the comfort of your own space. Create your journey the way you want to on your own time with professional, vetted, talented, passionate practitioners, that are there for you when you need.</p>
                                        <p>Save time and money in the long run with our revolutionary state of the art platform that brings all the education, tools and skills and allows you to connect with the best practitioners in the world without having to adjust your schedule. Check in regularly to receive rewards and discounts making it accessible and enjoyable for everyone.</p>
                                    </div>                                    
                                </div>
                            </div>
                            <div className="col-sm-6 col-md-5 col-lg-5">
                                <div className="pra-left-image">
                                    <figure className="owner-pic">
                                        <img src={images.owner_pic_jpg} alt="" />
                                    </figure>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="practitioner-features-sec participant-features-sec">
                    <div className="container">
                        <div className="row flex-lg-row">
                            <div className="col-sm-6 col-md-7 col-lg-7">
                                <div className="pra-right-content">
                                    <div className="section-title">
                                        <h2>As A Participant</h2>
                                        <p>Join a tribe of like minded incredible people, in a community to help you become the greatest version of yourself while helping others do the same. Controlled and monitored for you by you, our  platform will help step into a powerful space of support and love and start your journey with us today in becoming your highest self. </p>
                                    </div>
                                    <div className="pra-features-list">
                                        <div className="pp-single-bx">
                                            <div className="lft-pp-icon">
                                                <i className="lb lb-host-icon"></i>
                                            </div>
                                            <div className="rit-pp-info">
                                                <div className="first-pp-bx">
                                                    <strong>Work Remotely</strong>
                                                    <span>Work from anywhere in the world. Enjoy more flexibility with your schedule, while doing what you love and sharing your gifts. With this platform you will be able to work with no distractions in the comfort of your own space, with the best technology available to help you transform and create magic without all added extras.</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="pp-single-bx">
                                            <div className="lft-pp-icon">
                                                <i className="lb lb-Payments-icon"></i>
                                            </div>
                                            <div className="rit-pp-info">
                                                <div className="first-pp-bx">
                                                    <strong>Earn Money</strong>
                                                    <span>Grow professionally, personally and financially with our cutting edge platform without compromising your own time and money. We take care of you so you can take care of others, you will have access to a forever growing community of people from all walks of life that just want to change the world.</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="pp-single-bx">
                                            <div className="lft-pp-icon">
                                                <i className="lb lb-share-icon"></i>
                                            </div>
                                            <div className="rit-pp-info">
                                                <div className="first-pp-bx">
                                                    <strong>Share Your Skills</strong>
                                                    <span>Be surrounded by passionate, hardworking, talented individuals, share your skills and develop a repertoire of new skills and tools to evolve and liberate yourself with the support and guidance from an incredible </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="pp-single-bx">
                                            <div className="lft-pp-icon">
                                                <i className="lb lb-time-watch-icon"></i>
                                            </div>
                                            <div className="rit-pp-info">
                                                <div className="first-pp-bx">
                                                    <strong>Save Time</strong>
                                                    <span>Everything is done for you, so no more having multiple programs to schedule with different payments coming out regularly. Everything is available to support your independent practice and growth, have an incredible team at your fingertips with a collection of tools for you to achieve your goals.</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-md-5 col-lg-5">
                                <div className="pra-left-image">
                                    <figure className="owner-pic">
                                        <img src={images.as_a_participant_pic} alt="" />
                                    </figure>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="how-it-work-sec">
                    <div className="container">
                        <div className="section-title">
                            <h2>How To Work</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore ma aliqua.<br /> sed do eiusmod tempor incididunt ut labore et dolore ma aliqua</p>
                        </div>
                        <div className="youtube-video">
                            <iframe width="100%" height="500" src="https://www.youtube.com/embed/ScMzIvxBSi4" frameBorder="0" allowFullScreen></iframe>
                        </div>
                    </div>
                </section>
                <section className="testimonials-area home-testimonials-sec">
                    <div className="container">
                        <div className="p-sec-heading">
                            <div className="section-title">
                                <h2>Testimonials</h2>
                            </div>
                        </div>
                        <div className="testimonials-bx-list">
                            <div className="row testimonails-active slider-lft-rit slick-initialized slick-slider">
                                <TestimonialSlider count={8}>
                                <div className="col-lg-3 mw-100">
                <div className="app-testimonial">
                    <div className="testi-head">
                        <div className="app-testi-review"> <i className="lb lb-quote-icon"></i> </div>
                    </div>
                    <div className="app-testi-content mb-35">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitationeu</p>
                    </div>
                    <div className="testi-avatar app-testi-avatar ml-0">
                        <div className="tavatar-img"> <img src={images.testi_use_img} alt="img" /> </div>
                        <div className="tavatar-info">
                            <h5>Username</h5>
                            <span>Co-Founder & CTO</span> </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-3 mw-100">
                <div className="app-testimonial">
                    <div className="testi-head">
                        <div className="app-testi-review"> <i className="lb lb-quote-icon"></i> </div>
                    </div>
                    <div className="app-testi-content mb-35">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitationeu</p>
                    </div>
                    <div className="testi-avatar app-testi-avatar ml-0">
                        <div className="tavatar-img"> <img src={images.testi_use_img} alt="img" /> </div>
                        <div className="tavatar-info">
                            <h5>Username</h5>
                            <span>Co-Founder & CTO</span> </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-3 mw-100">
                <div className="app-testimonial">
                    <div className="testi-head">
                        <div className="app-testi-review"> <i className="lb lb-quote-icon"></i> </div>
                    </div>
                    <div className="app-testi-content mb-35">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitationeu</p>
                    </div>
                    <div className="testi-avatar app-testi-avatar ml-0">
                        <div className="tavatar-img"> <img src={images.testi_use_img} alt="img" /> </div>
                        <div className="tavatar-info">
                            <h5>Username</h5>
                            <span>Co-Founder & CTO</span> </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-3 mw-100">
                <div className="app-testimonial">
                    <div className="testi-head">
                        <div className="app-testi-review"> <i className="lb lb-quote-icon"></i> </div>
                    </div>
                    <div className="app-testi-content mb-35">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitationeu</p>
                    </div>
                    <div className="testi-avatar app-testi-avatar ml-0">
                        <div className="tavatar-img"> <img src={images.testi_use_img} alt="img" /> </div>
                        <div className="tavatar-info">
                            <h5>Username</h5>
                            <span>Co-Founder & CTO</span> </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-3 mw-100">
                <div className="app-testimonial">
                    <div className="testi-head">
                        <div className="app-testi-review"> <i className="lb lb-quote-icon"></i> </div>
                    </div>
                    <div className="app-testi-content mb-35">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitationeu</p>
                    </div>
                    <div className="testi-avatar app-testi-avatar ml-0">
                        <div className="tavatar-img"> <img src={images.testi_use_img} alt="img" /> </div>
                        <div className="tavatar-info">
                            <h5>Username</h5>
                            <span>Co-Founder & CTO</span> </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-3 mw-100">
                <div className="app-testimonial">
                    <div className="testi-head">
                        <div className="app-testi-review"> <i className="lb lb-quote-icon"></i> </div>
                    </div>
                    <div className="app-testi-content mb-35">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitationeu</p>
                    </div>
                    <div className="testi-avatar app-testi-avatar ml-0">
                        <div className="tavatar-img"> <img src={images.testi_use_img} alt="img" /> </div>
                        <div className="tavatar-info">
                            <h5>Username</h5>
                            <span>Co-Founder & CTO</span> </div>
                    </div>
                </div>
            </div>
                                </TestimonialSlider>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
export default Welcome;
