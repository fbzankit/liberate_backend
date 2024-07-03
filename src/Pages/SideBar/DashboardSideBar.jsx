import React,{ useContext, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import GlobalContext from '../../Global/GlobalContext';
import AuthUserContext from '../../AuthUser/AuthUserContext';


function SideBar(props) {
    const history = useLocation()
    const authUser =useContext(AuthUserContext)
    const [NotificationCount, setNotificationCount] = useState(0);
    const [globalState,globalDispatch] = useContext(GlobalContext)
useEffect(() => {

        setNotificationCount((prev)=>prev||globalState.notificationsAll.filter((r)=>r.reat_at==null)?.length);        
    
    return;
}, [globalState.notificationsAll])
   
    return (
        <>
            <div className="lft-as-sec">
                <div className="side-nav-bx">
                    <ul>
                        <li className={history.pathname=="/account"?"active":''}><Link to="/account"><i className="lb lb-user-icon"></i> Account</Link></li>
                        <li className={history.pathname=="/notifications"?"active":''}><Link to="/notifications"><i className="lb lb-notification-icon"></i> Notifications</Link>{NotificationCount>0? <span class="sidebar-numbers"></span>:''}</li>
                        <li className={history.pathname=="/payments"?"active":''}><Link to="/payments"><i className="lb lb-Payments-icon"></i> Payments</Link> <span class="sidebar-numbers"></span></li>
                        <li className={history.pathname=="/billing-info"?"active":''}><Link to="/billing-info"><i className="lb lb-billinginfo-icon"></i> Billing Info</Link></li>
                        <li className={history.pathname=="/referrals"?"active":''}><Link to="/referrals"><i className="lb lb-referrals-icon"></i> Referrals</Link></li>
                        <li className={history.pathname=="/settings"?"active":''}><Link to="/settings"><i className="lb lb-settings-icon"></i> Settings</Link></li>
                        <li className={history.pathname=="/interests"?"active":''}><Link to="/interests"><i className="lb lb-interests-dashboard-icon"></i> Interests</Link></li>
                        <li className={history.pathname=="/reviews"?"active":''}><Link to="/reviews"><i className="lb lb-interests-icon"></i> Reviews</Link></li>
                        <li className={history.pathname=="/media"?"active":''}><Link to="/media"><i className="lb lb-medial-icon"></i> Media</Link></li>
                       { authUser?.is_parctitioner==='1'?<li className={history.pathname=="/services"?"active":''}><Link to="/services"><i className="lb lb-service-icon"></i> Service</Link></li>:''}
                        <li className={history.pathname=="/packages"?"active":''}><Link to="/packages"><i className="lb lb-delivery-box-icon"></i> Packages</Link></li>
                        <li className={history.pathname=="/bookings"?"active":''}><Link to="/bookings"><i className="lb lb-calendar-icon"></i> Bookings</Link> <span class="sidebar-numbers"></span></li>
                        <li className={history.pathname=="/messages"?"active":''}><Link to="/messages"><i className="lb lb-message-icon"></i> Messages</Link> <span class="sidebar-numbers"></span></li>
                        {/* <li className={history.pathname=="/discount"?"active":''}><Link to="/discount"><i className="lb lb-generate-code-icon"></i> Discount</Link></li> */}
                        {/* <li className={history.pathname=="/credits"?"active":''}><Link to="/credits"><i className="lb lb-credits-icon"></i> Credits</Link></li> */}
                        <li className={history.pathname=="/favorite"?"active":''}><Link to="/favorite"><i className="lb lb-favorite-icon"></i> Favorite</Link></li>
                    </ul>   
                </div>
            </div>
        </>
    );
}

export default SideBar;