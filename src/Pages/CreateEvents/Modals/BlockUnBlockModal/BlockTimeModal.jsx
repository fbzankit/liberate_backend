import React from 'react';

const BlockTimeModal = () => {
    return (
        <>
            <div className="modal right fade modal-sidebar view-event-modal" id="view-event-modal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2 className="modal-heading">Block Time</h2>
                            <button type="button" className="close" data-dismiss="modal">
                                <i className="lb lb-cancel-icon"></i>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="add-service-box">
                                <div className="row">
                                    <div className="col-sm-12 col-md-12 col-lg-12 form-group">
                                        <div className="add-input-bx block-time">
                                            <ul className="ul-row">
                                                <li>
                                                    <label htmlFor="service-name" className="form-label">Date</label>
                                                    <div className="input-left-icon left-calender-icon">
                                                        <input type="text" className="form-control"  placeholder=""  disabled />
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-12 col-lg-12 form-group">
                                        <div className="add-input-bx">
                                            <div className="up-gray-heading">
                                                <strong>Time</strong>
                                            </div>
                                            <ul className="ul-row">
                                                <li>
                                                    <label htmlFor="service-name" className="form-label">From</label>
                                                    <input type="text" className="form-control"  placeholder=""  />
                                                </li>
                                                <li><span className="minus-arrow">-</span></li>
                                                <li>
                                                    <label htmlFor="service-name" className="form-label">To</label>
                                                    <input type="text" className="form-control"  placeholder=""  />
                                                </li>
                                                <li><button className="btn default-btn">Block</button></li>
                                            </ul>
                                        </div>
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


export default BlockTimeModal;