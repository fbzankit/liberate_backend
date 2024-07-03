import React from 'react';
import SideBar from '../SideBar/DashboardSideBar';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { useEffect } from 'react';
const Credits = () => {
    
    return (
        <>
        <Header/>
            <main>
                <section class="account-settings-area">
                    <div class="container">
                        <div class="p-sec-heading">
                            <div class="row">
                                <div class="col-12">
                                    <div class="section-title">
                                        <h2>Dashboard</h2>
                                        <p>Change Your Account And Profile Settings</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="account-settings-content">
                            <div class="lft-as-sec">
                                <SideBar/>
                            </div>
                            <div class="rit-as-sec p-30">
                                <div class="all-noti-panel">
                                    <div class="bdr-heading">
                                        <h2>Credits</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </main>
            <Footer/>
        </>
    );
}

export default Credits;