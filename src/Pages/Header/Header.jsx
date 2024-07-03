import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import images from '../../Utility/Images';
import Logo from './Components/Logo';
import SearchBar from './Components/SearchBar';
import Packages from './Components/Packages';
import Messages from './Components/Messages';
import Notifications from './Components/Notifications';
import MyAccount from './Components/MyAccount';
import Auth from '../../Auth/Auth';
import AuthUserContext from '../../AuthUser/AuthUserContext';
import GlobalContext from '../../Global/GlobalContext';
import { profileAvatar } from '../../Utility/Utility';

const Header = () => {
    const authUser = useContext(AuthUserContext);
    const history = useHistory();
    const [globalState, globalDispatch] = useContext(GlobalContext)
    const [Internet, setInternet] = useState(false);
    const [MobileMenu, setMobileMenu] = useState(false);
    window.ononline = (event) => {
        setInternet(false)
    };
    window.onoffline = (event) => {
        setInternet(true)
    };

    return (
        <>
            {globalState.preloader ?
                <div id="preloader">
                    <div className="preloader"> <span></span> <span></span> </div>
                </div> : ''}
            {Internet ? <div className="bg-danger row" style={{
                textAlign: 'center',
                marginLeft: 'auto',
                marginRight: 'auto',
                display: 'block',
                color: '#fff',
                fontSize: 'large',
                marginTop: '-5px',
            }}>No internet connected...
            </div> : ''}

            <div className={`sidebar-menu extra-info ${MobileMenu ? 'active' : ''}`}>
                <div className='m-view-user-info'>                    
                <div className="close-icon menu-close">
                    <button type="button" onClick={() => setMobileMenu(false)}> <i className="lb lb-cancel-icon"></i> </button>
                </div>
                </div>
                <div className="side-nav-bx">
                    <ul>
                    {Auth.getAccessToken() ?<li>
                                    <div className="circle-pic-name">
                                        <Link to="/account">
                                            <figure>
                                            <img src={profileAvatar(authUser?.image,authUser?.social_image?.replace('s92-c','s400-c'))}  alt={authUser?.name}/>
                                            </figure>
                                            <span>{authUser?.name}</span>
                                        </Link>
                                        
                                    </div>
                                    
                        </li>:''}
                        {/* <li><Link to="/credits"><i className="lb lb-credits-icon"></i> Credits (15)</Link></li> */}
                    </ul>
                </div>
                {Auth.getAccessToken() ?<><div className="side-nav-bx">
                    <ul>
                        <li><Link to={`/profile/${authUser?.id}`}><i className="lb lb-user-icon"></i> My Profile</Link></li>
                        <li><Link to="/create-event"><i className="lb lb-calendar-icon"></i> Scheduler</Link></li>
                        {/* <li><Link to="#" data-toggle="modal" data-target="#invite-users-popup"><i className="lb lb-invite-icon"></i> Invite</Link></li> */}
                        {authUser?.is_parctitioner == 0 ?
                            <li><Link to="/apply-for-practitioner"><i className="lb lb-apply--for-practitioner-icon"></i> Apply for Practitioner</Link></li>
                            : ''}
                    </ul>
                </div>
                <div className="side-nav-bx">
                    <ul>
                        <li><Link to="/account"><i className="lb lb-dashboard-icon"></i> Dashboard</Link></li>
                        <li><Link to="/notifications"><i className="lb lb-notification-icon"></i> Notifications</Link></li>
                        <li><Link to="/payments"><i className="lb lb-Payments-icon"></i> Payments</Link></li>
                        <li><Link to="/billing-info"><i className="lb lb-billinginfo-icon"></i> Billing Info</Link></li>
                        <li><Link to="/referrals"><i className="lb lb-referrals-icon"></i> Referrals</Link></li>
                        <li><Link to="/settings"><i className="lb lb-settings-icon"></i> Settings</Link></li>
                        <li><Link to="/interests"><i className="lb lb-interests-dashboard-icon"></i> Interests</Link></li>
                        <li><Link to="/reviews"><i className="lb lb-interests-icon"></i> Reviews</Link></li>
                        <li><Link to="/media"><i className="lb lb-medial-icon"></i> Media</Link></li>
                        <li><Link to="/services"><i className="lb lb-service-icon"></i> Service</Link></li>
                        <li><Link to="/packages"><i className="lb lb-delivery-box-icon"></i> Packages</Link></li>
                        <li><Link to="/favorite"><i className="lb lb-favorite-icon"></i>Favorites</Link></li>
                        <li><Link to="/bookings"><i className="lb lb-calendar-icon"></i> Bookings</Link></li>
                        <li><Link to="/messages"><i className="lb lb-message-icon"></i> Messages</Link></li>
                        {/* <li><Link to="/discount"><i className="lb lb-generate-code-icon"></i> Discount</Link></li> */}
                        {/* <li><Link to="/credits"><i className="lb lb-credits-icon"></i> Credits</Link></li> */}
                    </ul>
                </div>
                <div className="side-nav-bx">
                    <ul>
                        <li><Link to="/logout"><i className="lb lb-exit-icon"></i> Logout</Link></li>
                    </ul>
                </div>
                </>:<div className="side-nav-bx">
                    <ul>
                        <li><Link to="/home"><i className="lb lb-home-icon"></i> Home</Link></li>
                        <li><Link to="/about-us"><i className="lb lb-notification-icon"></i> About Us</Link></li>
                        <li><Link to="/how-to-work"><i className="lb lb-Payments-icon"></i> How to Work</Link></li>
                        <li><Link to="/faq"><i className="lb lb-billinginfo-icon"></i> Faq</Link></li>
                        <li><Link to="/contact-us"><i className="lb lb-referrals-icon"></i> Contact Us</Link></li>
                        <li><Link to="/login"><i className="lb lb-referrals-icon"></i> Login</Link></li>
                        <li><Link to="/sign-up"><i className="lb lb-referrals-icon"></i> Sign Up</Link></li>
                    </ul>
                </div>}
            </div>
            <div className="offcanvas-overly"></div>
            <header id="header-sticky" className="header-wrap p-relative">
                <div className="container">
                    <div className="row align-items-center">
                        {/* <Logo/> */}
                        <div className={`${Auth.getAccessToken() ? 'col-sm-12 col-md-6 col-lg-6' : 'col-sm-12 col-md-2 col-lg-3'}`}>
                            <div className="logo-m-nav">
                                <div className="logo"> <Link to="/"><img src={images.logo} alt="Logo" /></Link> </div>
                                <div className="mobile-menu">
                                    <ul>
                                        {/* {Auth.getAccessToken()?history.location.pathname==="/home"?<li><Link to="#"><i className="lb lb-search-icon"></i></Link></li>:'':''} */}
                                        <li><Link to="/home"><i className="lb lb-home-icon"></i></Link></li>

                                        <li><Link to="#" onClick={() => setMobileMenu(true)} className="sidebar-menu menu-tigger"><i className="lb lb-modalities-icon"></i></Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {Auth.getAccessToken() ?
                            <SearchBar /> : ''}
                        <div className={`${Auth.getAccessToken() ? 'col-sm-6 col-md-6 col-lg-6 ' : 'col-sm-10 col-md-10 col-lg-9 landing-p-menu'} desktop-nav-right `}>
                            <div className="menu-icon menu-rit-side text-right float-right">
                                <div className="dektop-menu">
                                    <ul>
                                        {Auth.getAccessToken() ?
                                            <>
                                                <li><Link to="/home" data-toggle="tooltip" title="Home"><i className="lb lb-home-icon"></i></Link></li>
                                                <Packages />
                                                <li><Link to="/create-event" data-toggle="tooltip" title="Scheduler"><i className="lb lb-calendar-icon"></i></Link> </li>
                                                <Messages />
                                                <li><Link to="/favorite" data-toggle="tooltip" title="Favourite"><i className="lb lb-favorite-icon"></i></Link></li>
                                                <Notifications  />
                                                <MyAccount />
                                            </>
                                            :
                                            <>
                                                <div className="menu-icon menu-rit-side text-right">

                                                    <div className="dektop-menu">
                                                        <ul>
                                                            <li><Link to="/">Home</Link></li>
                                                            <li><Link to="/about-us">About Us</Link></li>
                                                            <li><Link to="/how-to-work">How to Work</Link></li>
                                                            <li><Link to="/faq">Faq</Link></li>
                                                            <li><Link to="/contact-us">Contact Us</Link></li>
                                                            <li><Link to="/login" className="btn bdr-btn"> login</Link></li>
                                                            <li><Link to="/signup" className="btn btn-default"> Sign Up</Link></li>
                                                        </ul>
                                                    </div>
                                                </div>

                                            </>
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {/* mobile search */}
                         {/*<div className="col-12 mobile-search-bx">
                            {Auth.getAccessToken() && history.location.pathname === "/home" ? <div className="search-form">
                                <form action="#">
                                    <div className="top-search-bar">
                                        <input type="email" placeholder="Search..." />
                                        <button type="button" className="btn-link"><i className="lb lb-search-icon"></i></button>
                                    </div>
                                </form>
                            </div> : ''}
                        </div>*/}
                        {/* end mobile search */}
                    </div>
                </div>
            </header>
        </>
    );
}

export default Header;
