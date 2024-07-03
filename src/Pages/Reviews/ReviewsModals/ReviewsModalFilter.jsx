import React from 'react';

const ReviewsModalFilter = () => {
    return (
        <>
            <div class="modal right fade modal-sidebar review-modal" id="review-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h2 class="modal-heading">Filters</h2>
                            <button type="button" class="close" data-dismiss="modal"><i class="lb lb-cancel-icon"></i></button>
                        </div>
                        <div class="modal-body">
                            <div class="sidebar-filter-box bdr-btm">
                                <div class="up-gray-heading">
                                    <strong>Filter by review </strong>
                                </div>
                                <div class="filter-by-age">
                                    <div id="slider-range3"></div>
                                    <div class="slider-labels">
                                        <div class="float-left caption">
                                            <strong>Min:</strong> <span id="slider-range-value5"></span>
                                        </div>
                                        <div class="float-right text-right caption">
                                            <strong>Max:</strong> <span id="slider-range-value6"></span>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <form>
                                                <input type="hidden" name="min-value" value="" />
                                                <input type="hidden" name="max-value" value="" />
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="sidebar-filter-box bdr-btm">
                                <div class="up-gray-heading">
                                    <strong>Filter by Date/time</strong>
                                </div>
                                <div class="row">
                                    <div class="col-sm-12 col-md-12 col-lg-12 form-group">
                                        <div class="add-input-bx">
                                            <ul class="ul-row">
                                                <li>
                                                    <label for="service-name" class="form-label">From</label>
                                                    <div class="input-left-icon left-calender-icon">
                                                        <input type="text" class="form-control" id="service-name" placeholder="" value="07 Jan 2020" />
                                                    </div>
                                                </li>
                                                <li><span class="minus-arrow">-</span></li>
                                                <li>
                                                    <label for="service-name" class="form-label">To</label>
                                                    <div class="input-left-icon left-calender-icon">
                                                        <input type="text" class="form-control" id="service-name" placeholder="" value="10 Jan 2020" />
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="col-sm-12 col-md-12 col-lg-12">
                                        <div class="filter-by-week">
                                            <ul>
                                                <li>
                                                    <button type="button" class="btn bdr-btn f-w-btn">Today</button>
                                                </li>
                                                <li>
                                                    <button type="button" class="btn bdr-btn f-w-btn">Yesterday</button>
                                                </li>
                                                <li>
                                                    <button type="button" class="btn bdr-btn f-w-btn">This Week</button>
                                                </li>
                                                <li>
                                                    <button type="button" class="btn bdr-btn f-w-btn">Last Week</button>
                                                </li>
                                                <li>
                                                    <button type="button" class="btn bdr-btn f-w-btn">This Month</button>
                                                </li>
                                                <li>
                                                    <button type="button" class="btn bdr-btn f-w-btn">Past 3 Months</button>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="sidebar-filter-box">
                                <div class="pay-now-btn">
                                    <div class="text-center">
                                        <button class="btn default-btn">Apply</button>
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


export default ReviewsModalFilter;