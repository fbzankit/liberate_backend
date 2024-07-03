import React, { useEffect } from 'react';
import $ from 'jquery';
const FilterModals = () => {
   
    return (
        <>
            <div className="modal right fade modal-sidebar payment-filter-modal" id="payment-filter-modal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2 className="modal-heading">Filters</h2>
                            <button type="button" className="close" data-dismiss="modal"><i className="lb lb-cancel-icon"></i></button>
                        </div>
                        <div className="modal-body">
                            <div className="sidebar-filter-box bdr-btm">
                                <div className="up-gray-heading">
                                    <strong>Payment Status Wise </strong>
                                </div>
                                <div className="filter-categories-list">
                                    <ul>
                                        <li><label className="lm-ck-bx">Sent<input type="checkbox" /> <span className="checkmark"></span>
                                        </label> </li>
                                        <li><label className="lm-ck-bx">Recived<input type="checkbox" /> <span className="checkmark"></span>
                                        </label></li>
                                        <li><label className="lm-ck-bx">Cancel<input type="checkbox" /> <span className="checkmark"></span>
                                        </label></li>
                                        <li><label className="lm-ck-bx">Disbute<input type="checkbox" /> <span className="checkmark"></span>
                                        </label></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="sidebar-filter-box bdr-btm">
                                <div className="up-gray-heading">
                                    <strong>Filter by Amount </strong>
                                </div>
                                <div className="filter-by-price">
                                    <div id="slider-range2"></div>
                                    <div className="slider-labels">
                                        <div className="float-left caption">
                                            <strong>Min:</strong> <span id="slider-range-value3"></span>
                                        </div>
                                        <div className="float-right text-right caption">
                                            <strong>Max:</strong> <span id="slider-range-value4"></span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <form>
                                                <input type="hidden" name="min-value" value="" />
                                                <input type="hidden" name="max-value" value="" />
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="sidebar-filter-box">
                                <div className="pay-now-btn">
                                    <div className="text-center">
                                        <button className="btn default-btn">Apply</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default FilterModals;