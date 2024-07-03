import React from 'react';

const AddServiceQuestion = () => {
    return (
        <>
            <div id="add-form" className="add-card-form" style={{ display: 'none' }}>
                <div className="row name_payment_section">
                    <div className="col-sm-12">
                        <div className="form-group">
                            <label for="question-01" className="form-label">Question 01</label>
                            <div className="plus-add-input-bx">
                                <input type="text" className="form-control"  placeholder="Type Your Question" value="" />
                                <button className="btn add-btn"><i className="lb lb-minus-icon"></i></button>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12">
                        <div className="form-group">
                            <label for="question-01" className="form-label">Question 02</label>
                            <div className="plus-add-input-bx">
                                <input type="text" className="form-control"  placeholder="Type Your Question" value="" />
                                <button className="btn add-btn"><i className="lb lb-minus-icon"></i></button>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12">
                        <div className="form-group">
                            <label for="question-01" className="form-label">Question 03</label>
                            <div className="plus-add-input-bx">
                                <input type="text" className="form-control"  placeholder="Type Your Question" value="" />
                                <button className="btn add-btn"><i className="lb lb-minus-icon"></i></button>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12">
                        <div className="form-group">
                            <label for="question-01" className="form-label">Question 04</label>
                            <div className="plus-add-input-bx">
                                <input type="text" className="form-control"  placeholder="Type Your Question" value="" />
                                <button className="btn add-btn"><i className="lb lb-minus-icon"></i></button>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12">
                        <div className="form-group">
                            <label for="question-01" className="form-label">Question 05</label>
                            <div className="plus-add-input-bx">
                                <input type="text" className="form-control"  placeholder="Type Your Question" value="" />
                                <button className="btn add-btn"><i className="lb lb-plush-icon"></i></button>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12">
                        <div className="form-group">
                            <label className="lm-ck-bx">Attach This Form With Booking<input type="checkbox" checked="checked" />
                                <span className="checkmark"></span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddServiceQuestion;