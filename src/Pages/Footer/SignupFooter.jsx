import React from 'react';

const SignupFooter = () => {
    return (
        <>
            <footer className="footer-area">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12">
                            <div className="footer-logo"><a href="index.html"><img src="img/star-gold-img.svg" alt="" /></a></div>
                        </div>
                        <div className="col-12">
                            <div className="theme-title-one text-center">
                                <h2 className="main-title">Newsletter</h2>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="subscribe-form text-center">
                                <form action="#">
                                    <div className="top-subscribe-bar">
                                        <input type="email" placeholder="Please enter your email id" />
                                        <button className="btn btn-dark">Subscribe</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="portfolio-footer-social text-center"> <a href="https://www.instagram.com/" target="_blank"><img src="img/instagram-icon.svg" alt="" /></a> <a href="https://www.facebook.com/" target="_blank"><img src="img/facebook-icon.svg" alt="" /></a> <a href="https://twitter.com/" target="_blank"><img src="img/twitter-icon.svg" alt="" /></a> </div>
                        </div>
                        <div className="col-12">
                            <div className="copyright-text text-center">
                                <p><a href="index.html">Liberate</a> © 2020 All Rights Reserved.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            {/* <div className="modal right fade modal-sidebar sidebar-all-links-popup" id="sidebar-all-links" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2 className="modal-heading">All Link</h2>
                            <button type="button" className="close" data-dismiss="modal"><i className="lb lb-cancel-icon"></i></button>
                        </div>
                        <div className="modal-body">
                            <div className="sidebar-filter-box bdr-btm">
                                <div className="filter-categories-list">
                                    <ul>
                                        <li><a href="https://avniksofttech.com/liberate/web/login.html">Login</a></li>
                                        <li><a href="https://avniksofttech.com/liberate/web/sign-up.html">Register</a></li>
                                        <li><a href="https://avniksofttech.com/liberate/web/forgot-password.html">Forgot Password</a></li>
                                        <li><a href="https://avniksofttech.com/liberate/web/reset-password-sent-link.html">Reset Password Sent Link</a></li>
                                        <li><a href="https://avniksofttech.com/liberate/web/reset-password.html">Reset Password</a></li>
                                        <li><a href="https://avniksofttech.com/liberate/web/choose-interest.html">Choose Interest</a></li>
                                        <li><a href="https://avniksofttech.com/liberate/web/home.html">Home</a></li>
                                        <li><a href="https://avniksofttech.com/liberate/web/profile.html">Profile</a></li>
                                        <li><a href="https://avniksofttech.com/liberate/web/account.html">Dashboard</a></li>
                                        <li><a href="https://avniksofttech.com/liberate/web/apply-for-practitioner.html">Apply for Practitioner</a></li>
                                        <li><a href="https://avniksofttech.com/liberate/web/create-event.html">Create Events</a></li>
                                        <li><a href="https://avniksofttech.com/liberate/web/favourite.html">Favourite</a></li>
                                        <li><a href="https://avniksofttech.com/liberate/web/meet/index.html">Meet</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
        </>
    );
}

export default SignupFooter;
