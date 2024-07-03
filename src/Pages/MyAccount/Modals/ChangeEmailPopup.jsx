import React from 'react';
const ChangeEmailPopup = () => {
    return (
            <>
            <div className="modal cmn-popup new-email-update-popup" id="new-email-update-popup" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="change-email-form">
                                <div className="bdr-heading">
                                    <h2>Change Email Address</h2>
                                </div>
                                <div className="form-group">
                                    <label for="email-address" className="form-label">New Email Address</label>
                                    <input type="email" className="form-control" placeholder="Enter new email id" value="" />
                                </div>
                                <div className="both-btns">
                                    <ul className="ul-list">
                                        <li><button className="btn bdr-btn" data-dismiss="modal">Cancel</button></li>
                                        <li><button className="btn">Save</button></li>
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

export default ChangeEmailPopup;