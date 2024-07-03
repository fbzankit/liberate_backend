import React from 'react';
import images from '../Utility/Images';

const NoInternet = () => {
    return (
        <>
            <main>
                <section class="login-signup-area no-network-found-page">
                    <div class="container">
                        <div class="l-s-in-sec">
                            <div class="section-title">
                                <figure>
                                    <img src={images.no_network_found_img} alt="" />
                                </figure>
                                <h2>No Network Available</h2>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the</p>
                                <a class="btn cmn-btn" href="#">Go Back</a>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}

export default NoInternet;