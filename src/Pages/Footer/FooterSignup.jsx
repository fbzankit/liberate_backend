import React from 'react'
import { Link } from 'react-router-dom';

const FooterSignup = () => {
    return (
        <>
            <div className="modal right fade modal-sidebar sidebar-all-links-popup" id="sidebar-all-links" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                        <li><Link to="https://avniksofttech.com/liberate/web/login.html">Login</Link></li>
                                        <li><Link to="https://avniksofttech.com/liberate/web/sign-up.html">Register</Link></li>
                                        <li><Link to="https://avniksofttech.com/liberate/web/forgot-password.html">Forgot Password</Link></li>
                                        <li><Link to="https://avniksofttech.com/liberate/web/reset-password-sent-link.html">Reset Password Sent Link</Link></li>
                                        <li><Link to="https://avniksofttech.com/liberate/web/reset-password.html">Reset Password</Link></li>
                                        <li><Link to="https://avniksofttech.com/liberate/web/choose-interest.html">Choose Interest</Link></li>
                                        <li><Link to="https://avniksofttech.com/liberate/web/home.html">Home</Link></li>
                                        <li><Link to="https://avniksofttech.com/liberate/web/profile.html">Profile</Link></li>
                                        <li><Link to="https://avniksofttech.com/liberate/web/account.html">Dashboard</Link></li>
                                        <li><Link to="https://avniksofttech.com/liberate/web/apply-for-practitioner.html">Apply for Practitioner</Link></li>
                                        <li><Link to="https://avniksofttech.com/liberate/web/create-event.html">Create Events</Link></li>
                                        <li><Link to="https://avniksofttech.com/liberate/web/favourite.html">Favourite</Link></li>
                                        <li><Link to="https://avniksofttech.com/liberate/web/meet/index.html">Meet</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    )
}
export default FooterSignup;