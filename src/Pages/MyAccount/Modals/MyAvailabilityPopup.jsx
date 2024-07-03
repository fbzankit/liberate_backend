import React from 'react';

const MyAvailabilityPopup = () => {
    return (
        <>
            <div className="modal cmn-popup booking-reschedule-popup" id="my-availability-popup" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="change-email-form">
                                <div className="bdr-heading">
                                    <h2>My Availability</h2>
                                </div>
                                <div className="add-service-box bdr-btm">
                                    <div className="row">
                                        <div className="col-sm-12 col-md-12 col-lg-12 form-group">
                                            <div className="add-input-bx">
                                                <ul className="ul-row">
                                                    <li>
                                                        <label for="service-name" className="form-label">From</label>
                                                        <div className="input-left-icon left-calender-icon">
                                                            <input type="text" className="form-control" id="service-name" placeholder="" value="07 Jan,2020 - 02:00PM" />
                                                        </div>
                                                    </li>
                                                    <li><span className="minus-arrow">-</span></li>
                                                    <li>
                                                        <label for="service-name" className="form-label">To</label>
                                                        <div className="input-left-icon left-calender-icon">
                                                            <input type="text" className="form-control" id="service-name" placeholder="" value="07 Jan,2020 - 05:00PM" />
                                                        </div>
                                                    </li>
                                                    <li><button className="btn gray-btn"> Remove</button></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-sm-12 col-md-12 col-lg-12 form-group">
                                            <div className="add-input-bx">
                                                <ul className="ul-row">
                                                    <li>
                                                        <label for="service-name" className="form-label">From</label>
                                                        <input type="text" className="form-control" id="service-name" placeholder="" value="07 Jan,2020 - 02:00PM" />
                                                    </li>
                                                    <li><span className="minus-arrow">-</span></li>
                                                    <li>
                                                        <label for="service-name" className="form-label">To</label>
                                                        <input type="text" className="form-control" id="service-name" placeholder="" value="07 Jan,2020 - 05:00PM" />
                                                    </li>
                                                    <li><button className="btn gray-btn"><i className="lb lb-plush-icon"></i> Add</button></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="both-btns">
                                    <ul className="ul-list">
                                        <li><a className="btn" href="#reschedule-time-table-popup" data-toggle="modal" data-dismiss="modal">Save and Next</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MyAvailabilityPopup;