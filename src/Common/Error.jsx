import React from 'react';
import Header from '../Pages/Header/Header';
import Footer from '../Pages/Footer/Footer';
import { Link } from 'react-router-dom';
import images from '../Utility/Images';
const Error = ({title,description,goBackTitle,goBackPath,enableHeaderFooter}) => {
    return (
        <>
           {enableHeaderFooter?<Header />:''}
            <main>

                <section className="account-settings-area">
                    <div className="container">
                        <div className="page-not-found-content">
                            <div className="rit-as-sec">
                                <div className="section-title">
                                    <figure>
                                        <img src={images.page_not_found_img} alt="Page Not Found"/>
                                    </figure>
                                    <h2>{title}</h2>
                                    <p>{description}</p>			  
                                </div>
                                    <div className="go-to-back-btn">
                                        <Link to={goBackPath} className="ladda-button animate-btn zoom-out"><span className="label">{goBackTitle}</span> <span className="spinner"></span></Link></div>
                                </div>
                            </div>
                        </div>
                    </section>

                    </main>
               {enableHeaderFooter?<Footer />:''}
        </>
            );
        }
        
        export default Error;
