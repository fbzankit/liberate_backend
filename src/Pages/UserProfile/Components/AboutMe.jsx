import React from 'react';
import { showHideDiv } from '../../../Utility/Utility';
import { useContext } from 'react';

import Context from '../../Home/Context/Context';

const AboutMe = () => {
    const [state,dispatch] = useContext(Context);
    return (
        <>
            <section className="about-me-area">
            
                    <div className="p-sec-heading">
                        <div className="row">
                            <div className="col-12">
                                <div className="section-title">
                                    <h2>About {state.UserProfile?.name}</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="full-bio-content">
                        <p>{state.UserProfile?.practitioner?.aboutme}</p>
                        <div className="full-bio-box">
                            <div className="cmn-new-toggle">
                                <button type="button" className="btn bdr-btn" value="Show/Hide" onClick={()=>showHideDiv('full-bio')}>Full Bio</button>
                                <div id="full-bio" className="f-b-text" style={{display: 'none'}}>
                                    <p>{state.UserProfile?.practitioner?.bio}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                
            </section>
        </>
    );
}

export default AboutMe;