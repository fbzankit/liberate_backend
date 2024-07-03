import React from 'react';
import Header from '../Pages/Header/Header';
import Footer from '../Pages/Footer/Footer';
import images from '../Utility/Images';
import TestimonialSlider from './TestimonialSlider';

const AboutUs = () => {

    
    return (
        <>
            <Header />
            <main class="landing-page-main">
                <section class="inner-p-banner-sec">
                    <div class="container">
                        <div class="inner-banner-text">
                            <h1>About Us</h1>
                            <p>Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do Eiusmod Tempor Incididunt Ut Labore Et Dolore Ma Aliqua.</p>
                        </div>
                    </div>
                </section>
                <section class="practitioner-features-sec about-us-page-sec">
                    <div class="container">
                        <div class="welcome-to-liberate">
                            <div class="row">
                                <div class="col-sm-6 col-md-5 col-lg-5">
                                    <div class="pra-left-image">
                                        <figure class="owner-pic">
                                            <img src={images.owner_pic_jpg} alt="" />
                                        </figure>
                                    </div>
                                </div>
                                <div class="col-sm-6 col-md-7 col-lg-7">
                                    <div class="pra-right-content">
                                        <div class="section-title">
                                            <h2>Welcome To Liberate!</h2>
                                        </div>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore ma aliqua. sed do eiusmod tempor incididunt ut labore et dolore ma aliqua</p>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore ma aliqua. sed do eiusmod tempor incididunt ut labore et dolore ma aliqua</p>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore ma aliqua. sed do eiusmod tempor incididunt ut labore et dolore ma aliqua</p>
                                        <p>Far more than a center, we are a movement to liberate yourself to become the true you. We are a community of heart-centered practitioners, meaningful tools, and educational content that assists individuals just like you in pivoting and navigating the crossroads and obstacles of life.
For over a decade we have been committed to serving our tribe, helping people from all walks of life step into their truth and gain control and freedom over their life. You too are more powerful beyond your wildest imaginings.</p>

                                        <div class="liberate-yourself">
                                            <span>Join our tribe,</span>
                                            <strong>Liberate Yourself!</strong>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div class="meet-the-founder">
                            <div class="section-title">
                                <h2>Meet the Founder</h2>
                            </div>
                            <p>CRISTINA DAM is a healer, motivator and leader with a longing desire to cultivate positive change in the world by holding a creative and healing space for transformation.
             Cristina melds her experience from earning two Master’s degrees in educational foundations and psychology with a wide range of healing therapies as an energy healer, channel, NLP trainer, hypnotherapist and addiction treatment specialist to produce companies, content and projects to serve and uplift humanity.
             In addition to supporting the transformation of numerous clients, she has created a program to work with acclimating parolees back in to society, founded a substance abuse prevention program for inner city youth, started a travel and social networking company, Xplorer, and started the non-profit, Motivate Humanity.
Expanding her uniting vision to an ever broader audience, she is forming her own production company, Liberate Productions, and writing her forthcoming book, LiberateYourself. Imagination and the possibilities are endless as Cristina strives to make the world a better place.</p>

                        </div>
                        <div class="testimonials-bx-list">
                            <div class="row testimonails-active slider-lft-rit slick-initialized slick-slider">
                                <TestimonialSlider count={8}>
                                <div class="col-lg-3 mw-100">
                                    <div class="app-testimonial">
                                        <figure><img src={images.founder_img1} alt="" /></figure>
                                    </div>
                                </div>
                                <div class="col-lg-3 mw-100">
                                    <div class="app-testimonial">
                                        <figure><img src={images.founder_img2} alt="" /></figure>
                                    </div>
                                </div>
                                <div class="col-lg-3 mw-100">
                                    <div class="app-testimonial">
                                        <figure><img src={images.founder_img3} alt="" /></figure>
                                    </div>
                                </div>
                                <div class="col-lg-3 mw-100">
                                    <div class="app-testimonial">
                                        <figure><img src={images.founder_img4} alt="" /></figure>
                                    </div>
                                </div>
                                <div class="col-lg-3 mw-100">
                                    <div class="app-testimonial">
                                        <figure><img src={images.founder_img1} alt="" /></figure>
                                    </div>
                                </div>
                                <div class="col-lg-3 mw-100">
                                    <div class="app-testimonial">
                                        <figure><img src={images.founder_img2} alt="" /></figure>
                                    </div>
                                </div>
                                <div class="col-lg-3 mw-100">
                                    <div class="app-testimonial">
                                        <figure><img src={images.founder_img1} alt="" /></figure>
                                    </div>
                                </div>
                                <div class="col-lg-3 mw-100">
                                    <div class="app-testimonial">
                                        <figure><img src={images.founder_img2} alt="" /></figure>
                                    </div>
                                </div>
                                <div class="col-lg-3 mw-100">
                                    <div class="app-testimonial">
                                        <figure><img src={images.founder_img3} alt="" /></figure>
                                    </div>
                                </div>
                                <div class="col-lg-3 mw-100">
                                    <div class="app-testimonial">
                                        <figure><img src={images.founder_img4} alt="" /></figure>
                                    </div>
                                </div>
                                <div class="col-lg-3 mw-100">
                                    <div class="app-testimonial">
                                        <figure><img src={images.founder_img1} alt="" /></figure>
                                    </div>
                                </div>
                                <div class="col-lg-3 mw-100">
                                    <div class="app-testimonial">
                                        <figure><img src={images.founder_img2} alt="" /></figure>
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

export default AboutUs;