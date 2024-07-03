import React from 'react';
import { Link } from 'react-router-dom';
import images from '../../../Utility/Images';
import Auth from '../../../Auth/Auth';
const Logo = () => {
    return(
        <>
        <div className="col-sm-12 col-md-6 col-lg-6">
            <div className="logo-m-nav">
                <div className="logo"> <Link to="/"><img src={images.logo} alt="Logo" /></Link> </div>
                <div className="mobile-menu">
                    <ul>
                        <li><Link to="#"><i className="lb lb-search-icon"></i></Link></li>
                        <li><Link to="/home"><i className="lb lb-home-icon"></i></Link></li>

{Auth.getAccessToken()?'':<li><Link to="/login"><i className="lb lb-user-icon"></i> <span>Login</span></Link></li>}
                        <li><Link to="#" className="sidebar-menu menu-tigger"><i className="lb lb-modalities-icon"></i></Link></li>
                    </ul>
                </div>
            </div>
        </div>
    </>);
}

export default Logo;