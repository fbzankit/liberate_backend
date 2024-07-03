import React, { useContext } from 'react';
import Context from '../../../Home/Context/Context';
import images from '../../../../Utility/Images';

const BankVerify = ({verifyBank}) => {
    const [state,dispatch] = useContext(Context)
    return (
        <>
            <div className="modal cmn-popup booking-reschedule-popup verify-bank-account-popup show" id="verify-bank-account-popup" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2 className="modal-heading"><figure><img src={images.bankIcon} /></figure> Verify Bank Account</h2>
                            <p>liberate sent two small deposits to this bank account. to verify this account, please confirm
the amount of these deposits.</p>
                            <button type="button" className="close" data-dismiss="modal"><i className="lb lb-cancel-icon"></i></button>
                        </div>
                        <div className="modal-body">
                            <div className="cmn-form">
                                <form>
                                    <div className="row">
                                        {/* <div className="col-sm-6 col-md-6 col-lg-6 form-group">
                                            <label for="service-name" className="form-label">First Deposit</label>
                                            <div className="input-left-icon dollar-input-icon">
                                                <input type="text" className="form-control" placeholder="00" value="" />
                                            </div>
                                        </div>
                                        <div className="col-sm-6 col-md-6 col-lg-6 form-group">
                                            <label for="service-name" className="form-label">Second Deposit</label>
                                            <div className="input-left-icon dollar-input-icon">
                                                <input type="text" className="form-control" placeholder="00" value="" />
                                            </div>
                                        </div> */}
                                        <div className="col-12">
                                            <div className="save-cancel-btns text-center">
                                                <ul className="ul-row">
                                                    <li><button type="button" data-dismiss="modal" className="ladda-button animate-btn zoom-out animate-gray-btn"><span className="label">Cancle</span> <span className="spinner"></span></button></li>
                                                    <li><button type="button" onClick={()=>verifyBank(state.verifyId)} className="ladda-button animate-btn zoom-out"><span className="label">Verfiy</span> <span className="spinner"></span></button></li>
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
        </>
    );
}

export default BankVerify;