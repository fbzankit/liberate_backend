import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { NavDropdown, Button, Dropdown } from 'react-bootstrap';
import AuthUserContext from '../../../AuthUser/AuthUserContext';
import config from '../../../ApiServices/Apis/config'
import images from '../../../Utility/Images';
const MyAccount = () => {
    const authUser = useContext(AuthUserContext);
    return (
        <>
            <li>
                <div className="dropdown dd-right-side my-account-dd">
                    <Link className="link-btn dropdown-toggle" to="#" role="button" id="my-account-dd" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="lb lb-user-icon" data-toggle="tooltip" title="My Account"></i>
                    </Link>
                    <div className="dropdown-menu" aria-labelledby="my-account-dd">
                    <div className="side-nav-bx">
                            <ul>
                                <li>
                                    <div className="circle-pic-name">
                                        <Link to="/account">
                                            <figure>
                                            <img src={authUser?.image ? config.imageBaseurl + authUser?.image : authUser?.social_image?authUser?.social_image.replace('s92-c','s400-c'):images.profileAvatar}  alt={authUser?.name}/>
                                            </figure>
                                            <span>{authUser?.name}</span>
                                        </Link>
                                        
                                    </div>
                                    
                                    </li>
                                <li><Link to={`/profile/${authUser?.id}`}><i className="lb lb-user-icon"></i> My Profile</Link></li>
                            </ul>
                        </div>
                        {authUser?.is_parctitioner==="0"?
                        <div className="side-nav-bx">
                            <ul>
                                <li><Link to="/apply-for-practitioner"><i className="lb lb-apply--for-practitioner-icon"></i> Apply for Practitioner</Link></li>
                            </ul>
                        </div>
                        :
                        ''
                        }
                        
                        <div className="side-nav-bx">
                            <ul>
                                <li><Link to="/account"><i className="lb lb-dashboard-icon"></i> Dashboard</Link></li>
                                <li><Link to="/bookings"><i className="lb lb-calendar-icon"></i>Bookings</Link>	</li>
                                {/* <li><Link to="#" data-toggle="modal" data-target="#invite-users-popup"><i className="lb lb-invite-icon"></i> Invite</Link>	</li> */}
                            </ul>
                        </div>
                        {/* <div className="side-nav-bx">
                            <ul>
                                <li><Link to="/help-and-support"><i className="lb lb-dashboard-icon"></i> Help & Support</Link></li>
                            </ul>
                        </div> */}

                        <div className="side-nav-bx">
                            <ul>
                                <li><Link to="/logout"><i className="lb lb-exit-icon"></i> Logout</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </li>
        </>
    );
}

export default MyAccount;