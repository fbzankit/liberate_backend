import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import images from '../../Utility/Images';
import 'bootstrap/dist/js/bootstrap.min.js';
const Footer = () => {
   const history= useHistory();
    return (
        <>
            <footer className={`footer-area ${history.location.pathname==='/'?'home-footer':''}`}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12">
                            <div className="footer-logo"><Link to="/"><img src={images.star_gold_img} alt="" /></Link></div>
                        </div>
                        <div className="col-12">
                            <div className="footer-menu">
                                <ul className="ul-row">
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="/term-and-condition">Terms of Use</Link></li>
                                    <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                                    <li><Link to="/sitemap">Sitemap</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="portfolio-footer-social text-center"> <Link to="https://www.instagram.com/" target="_blank"><img src={images.instagram_icon} alt="" /></Link> <Link to="https://www.facebook.com/" target="_blank"><img src={images.facebook_icon} alt="" /></Link> <Link to="https://twitter.com/" target="_blank"><img src={images.twitter_icon} alt="" /></Link> </div>
                        </div>
                        <div className="col-12">
                            <div className="copyright-text text-center">
                                <p><Link to="/">Liberate</Link> © {new Date().getFullYear()} All Rights Reserved.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            
          
        </>
    );
}

export default Footer;
