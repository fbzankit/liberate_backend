import React from 'react';
import SideBar from '../SideBar/DashboardSideBar';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
const Discount = () => {
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
                                <SideBar />
                            </div>
                            <div class="rit-as-sec p-30">
                                <div class="all-noti-panel">
                                    <div class="bdr-heading">
                                        <h2>Generate Code</h2>
                                        <div class="float-right">
                                            <button class="btn solid-btn">Generate</button>
                                        </div>
                                    </div>
                                    <div class="cmn-table-sec">
                                        <table class="rwd-table">
                                            <tbody>
                                                <tr>
                                                    <th>Code</th>
                                                    <th>Discount</th>
                                                    <th>Number Of Time</th>
                                                    <th>Expiry Date</th>
                                                    <th>Last User</th>
                                                    <th>Action</th>
                                                </tr>
                                                <tr>
                                                    <td data-th="Code">
                                                        HGF5CB  <button class="btn-link copy-genrated-code-btn" title="Copy Code"><i class="lb lb-file-icon"></i></button>
                                                    </td>
                                                    <td data-th="Discount">
                                                        10%
        </td>
                                                    <td data-th="Number Of Time">
                                                        10
        </td>
                                                    <td data-th="Expiry Date">
                                                        25 Sep 2020
        </td>
                                                    <td data-th="Last User">
                                                        Last User 5 March 2021
</td>
                                                    <td data-th="Action">
                                                        <div class="l-g-bx dot-dd-bx">
                                                            <div class="dropdown dd-right-side my-account-dd"><a class="link-btn dropdown-toggle" href="#" role="button" id="my-account-dd" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="lb lb-horizontal-more-icon"></i></a>
                                                                <div class="dropdown-menu" aria-labelledby="my-account-dd">
                                                                    <div class="side-nav-bx">
                                                                        <ul>
                                                                            <li><a href="javascript:void(0);" data-toggle="modal" data-target="#delete-service-popup"><i class="lb lb-delete-icon"></i> Delete</a></li>
                                                                            <li><a href="javascript:void(0);" data-toggle="modal" data-target="#delete-service-popup"><i class="lb lb-delete-icon"></i> Share</a></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td data-th="Code">
                                                        HGF5CB  <button class="btn-link copy-genrated-code-btn" title="Copy Code"><i class="lb lb-file-icon"></i></button>
                                                    </td>
                                                    <td data-th="Discount">
                                                        10%
        </td>
                                                    <td data-th="Number Of Time">
                                                        10
        </td>
                                                    <td data-th="Expiry Date">
                                                        25 Sep 2020
        </td>
                                                    <td data-th="Last User">
                                                        Last User 5 March 2021
        </td>

                                                    <td data-th="Action">
                                                        <div class="l-g-bx dot-dd-bx">
                                                            <div class="dropdown dd-right-side my-account-dd"><a class="link-btn dropdown-toggle" href="#" role="button" id="my-account-dd" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="lb lb-horizontal-more-icon"></i></a>
                                                                <div class="dropdown-menu" aria-labelledby="my-account-dd">
                                                                    <div class="side-nav-bx">
                                                                        <ul>
                                                                            <li><a href="javascript:void(0);" data-toggle="modal" data-target="#delete-service-popup"><i class="lb lb-delete-icon"></i> Delete</a></li>
                                                                            <li><a href="javascript:void(0);" data-toggle="modal" data-target="#delete-service-popup"><i class="lb lb-delete-icon"></i> Share</a></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td data-th="Code">
                                                        ###### <button class="btn-link copy-genrated-code-btn" title="Copy Code"><i class="lb lb-file-icon"></i></button>
                                                    </td>
                                                    <td data-th="Discount" class="discount-bx">
                                                        <div class="table-input-bx">
                                                            <ul class="ul-list">
                                                                <li><div class="input-left-icon">
                                                                    <input type="text" class="form-control" id="service-name" placeholder="0.00" value="" />
                                                                </div></li>
                                                                <li>OR</li>
                                                                <li>
                                                                    <select name="options" class="bdr-radius-five">
                                                                        <option value="category_one">0%</option>
                                                                        <option value="category_one">5%</option>
                                                                        <option value="category_one">10%</option>
                                                                        <option value="category_one">15%</option>
                                                                    </select>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </td>
                                                    <td data-th="Number Of Time" class="number-of-time-bx">
                                                        <div class="table-input-bx">
                                                            <input type="text" class="form-control" id="service-name" placeholder="Enter number" value="" />
                                                        </div>
                                                    </td>
                                                    <td data-th="Expiry Date" class="expiry-date-bx">
                                                        <div class="table-input-bx">
                                                            <div class="input-left-icon left-calender-icon">
                                                                <input type="text" class="form-control" id="service-name" placeholder="Expiry Date" value="" />
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>

                                                    </td>
                                                    <td data-th="Action">
                                                        <button class="btn">Save</button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="row">
                                        <div class="col-12">
                                            <div class="load-more-btn text-center"> <a href="#" class="btn"><i class="lb lb-refresh-icon"></i> Load More</a> </div>
                                        </div>
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


export default Discount;