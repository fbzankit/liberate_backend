import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SideBar from '../SideBar/DashboardSideBar';

const Referrals = () => {
    return (
        <>
            <Header />
            <main>

                <section class="account-settings-area">
                    <div class="container">
                        <div class="p-sec-heading">
                            <div class="row">
                                <div class="col-12">
                                    <div class="section-title">
                                        <h2>Referrals</h2>
                                        <p>Refer your friends/family to this platform.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="account-settings-content">
                            <SideBar />
                            <div class="rit-as-sec">
                                <div class="basic-info-bx">
                                    <div class="bdr-heading">
                                        <h2>Refer People To Apply For Practitioners</h2>
                                    </div>
                                    <div class="cmn-form">
                                        <form>
                                            <div class="refer-people-add-remove">
                                                <div class="row">
                                                    <div class="col-sm-6 col-md-6 col-lg-6 form-group">
                                                        <label for="email-address" class="form-label">Name</label>
                                                        <input type="email" class="form-control" id="email-address" placeholder="" value="Angela Johnson" />
                                                    </div>
                                                    <div class="col-sm-6 col-md-6 col-lg-6 form-group">
                                                        <label for="email" class="form-label">Email</label>
                                                        <div class="plus-add-input-bx">
                                                            <input type="email" class="form-control" id="email" placeholder="" value="Emailname@123Gmail.Com" />
                                                            <button class="btn add-btn"><i class="lb lb-plush-icon"></i></button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="refer-people-add-remove">
                                                <div class="row">
                                                    <div class="col-sm-6 col-md-6 col-lg-6 form-group">
                                                        <label for="email-address" class="form-label">Name</label>
                                                        <input type="email" class="form-control" id="email-address" placeholder="" value="Angela Johnson" />
                                                    </div>
                                                    <div class="col-sm-6 col-md-6 col-lg-6 form-group">
                                                        <label for="email" class="form-label">Email</label>
                                                        <div class="plus-add-input-bx">
                                                            <input type="email" class="form-control" id="email" placeholder="" value="Emailname@123Gmail.Com" />
                                                            <button class="btn add-btn"><i class="lb lb-minus-icon"></i></button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-12 form-group">
                                                    <label for="email-address" class="form-label">Note</label>
                                                    <textarea class="form-control" id="about-me" placeholder="Write A Personal Note :-" value=""></textarea>
                                                    <div class="input-btm-note">
                                                        <span class="float-left">Minimum 150 Characters</span>
                                                        <span class="float-right">0/150 </span>
                                                    </div>
                                                </div>
                                                <div class="col-12">
                                                    <div class="save-cancel-btns">
                                                        <ul class="ul-row">
                                                            <li><button class="btn solid-btn">Send Invite</button></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </main>
            <Footer />
        </>
    );
}


export default Referrals;