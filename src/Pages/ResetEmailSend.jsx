import React from 'react';
import { Link } from 'react-router-dom';
import images from '../Utility/Images';

const ResetEmailSend = ({email}) => {
    return (
        <>

            <div class="notify-message">
                <p>Your reset password link has been emailed to you. Please check your mail to reset password.</p>
            </div>
            <div class="row">
                <div class="col-sm-12 col-md-12 col-lg-12 form-group">
                    <label for="email-address" class="form-label">Email</label>
                    <input type="email" class="form-control" id="email-address" placeholder="" value={email} disabled={true}/>
                    <i class="sent-email-sign"><img src={images.sent_email_sign} alt="" /></i>
                </div>
                <div class="col-sm-12 col-md-12 col-lg-12 form-group">
                    <div class="login-signup-btns">
                        <button class="btn solid-btn">Reset</button>
                    </div>
                </div>
                <div class="col-sm-12 col-md-12 col-lg-12">
                    <div class="new-users-links">
                        <p>Already have a account? <Link to="/login">Sign In</Link> </p>
                    </div>
                </div>
            </div>

        </>
    );
}


export default ResetEmailSend;