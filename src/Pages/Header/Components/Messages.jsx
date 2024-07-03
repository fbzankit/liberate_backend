import React from 'react';
import { Link } from 'react-router-dom';
import images from '../../../Utility/Images';

const Messages = () => {
    return (
        <>
            <li>
                <div className="dropdown dd-right-side notification-dd"><Link className="link-btn dropdown-toggle" to="#" role="button" id="message-dd" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="lb lb-message-icon" data-toggle="tooltip" title="Message"></i><span>5</span></Link>
                    <div className="dropdown-menu" aria-labelledby="message-dd">
                        <div className="notification-list">
                            <div className="noti-dd-heading"> <strong>Message</strong> <Link to="/messages">See All</Link> </div>
                            <div className="noti-dd-listing">
                            <div className="noti-dd-box">
                                    {/* <div className="noti-lft-img"><img src={images.practitioner_img1} alt="" /></div> */}
                                        <p>No New  Messages</p>
                                </div>
                                {/* <div className="noti-dd-box">
                                    <div className="noti-lft-img"><img src={images.practitioner_img1} alt="" /></div>
                                    <div className="noti-rit-info">
                                        <p><Link to="/messages">Natale Janu : </Link> Hi, Dear</p>
                                        <span>1 Hour ago</span> </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        </>
    );
}

export default Messages;