import React from 'react';
import { Link } from 'react-router-dom';

const Packages = () => {
    return (
        <>
            <li>
                <div className="dropdown dd-right-side notification-dd"><Link className="link-btn dropdown-toggle" to="#" role="button" id="package-dd" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="lb lb-delivery-box-icon" data-toggle="tooltip" title="Packages"></i></Link>
                    <div className="dropdown-menu" aria-labelledby="packages-dd">
                        <div className="notification-list">
                            <div className="noti-dd-heading"> <strong>Your Packages</strong> <Link to="/packages">See All</Link> </div>
                            <div className="noti-dd-listing">
                               
                                {/* <div className="package-dd-box">
                                    <p><Link to="/practitioner-profile">Natale Janu</Link> 1 Package Booked for Webnaires at <span>15, March 2021</span></p>
                                </div> */}
                                <div className="noti-rit-info">                                           
                                            <p>No running Package</p>
                               </div>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        </>
    );
}

export default Packages;