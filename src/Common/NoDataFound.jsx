import React from 'react';
import { NavLink } from 'react-router-dom';

const NoDataFound = ({image,title,description,buttonTitle,buttonPath}) => {
    return (
        <>
            <section className="no-network-found-page">
                <div className="data-not-message-sec">
                    <div className="container">
                        <div className="l-s-in-sec">
                            <div className="section-title">
                                <figure><img src={image} alt={title} /></figure>
                                <h2>{title}</h2>
                                <p>{description}</p>
                                {buttonTitle==="None"?'':buttonPath?<NavLink className="btn cmn-btn" to={buttonPath}>{buttonTitle}</NavLink>:<button className="btn cmn-btn" onClick={()=>window.location.reload()}>{buttonTitle}</button>}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default NoDataFound;