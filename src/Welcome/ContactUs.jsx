import React from 'react';
import Header from '../Pages/Header/Header';
import Footer from '../Pages/Footer/Footer';
import images from '../Utility/Images';

const ContactUs = () => {
    return (
        <>
            <Header />
            <main class="landing-page-main">
                <section class="inner-p-banner-sec">
                    <div class="container">
                        <div class="inner-banner-text">
                            <h1>Contact Us</h1>
                            <p>Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do Eiusmod Tempor Incididunt Ut Labore Et Dolore Ma Aliqua.</p>
                        </div>
                    </div>
                </section>
                <section class="cmn-default-sec">
                    <div class="container">
                        <div class="contact-us-top-sec">
                            <div class="row">
                                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                    <div class="c-lr-bx contact-info">
                                        <div class="section-title">
                                            <h2>Contact Info</h2>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore ma aliqua.</p>
                                        </div>
                                        <div class="contact-info-content-list">
                                            <ul>
                                                <li> <img src={images.phone_icon} alt="" /> <strong>818-387-6201</strong></li>
                                                <li> <img src={images.email_icon} alt="" /> <strong><a href="#">hello@Username.Com</a></strong></li>
                                                <li> <img src={images.location_icon} alt="" /> <strong>13323 Ventura Blvd. Sherman Oaks, CA 91423, United States</strong></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                    <div class="c-lr-bx send-a-message-bx">
                                        <div class="section-title">
                                            <h2>Send a Message</h2>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore ma aliqua.</p>
                                        </div>
                                        <div class="write-messsage-form-bx">
                                            <form>
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <label class="form-label">Name</label>
                                                            <input type="text" class="form-control" placeholder="Enter your name..." />
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <label class="form-label">Email </label>
                                                            <input type="text" class="form-control" placeholder="Enter your email..." />
                                                        </div>
                                                    </div>
                                                    <div class="col-md-12">
                                                        <div class="form-group">
                                                            <label class="form-label">Message </label>
                                                            <textarea class="form-control" placeholder="Type Here..."></textarea>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-12 text-right">
                                                        <button type="submit" class="btn cmn-btn">Send</button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="location-on-map-bx">
                            <div class="section-title">
                                <h2>As A Participant</h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, <br />sed do eiusmod tempor incididunt ut labore et dolore ma aliqua.</p>
                            </div>
                            <div class="google-location-map">
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3557.9578124386585!2d75.81042551436566!3d26.90483396690766!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db6a4275f7307%3A0x109124a23a745acf!2sAvnik%20Soft%20Tech!5e0!3m2!1sen!2sin!4v1635147008308!5m2!1sen!2sin" width="100%" height="450" style={{border:'0'}} allowfullscreen="" loading="lazy"></iframe>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}


export default ContactUs;