import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import images from '../Utility/Images';
import FooterSignup from './Footer/FooterSignup';
import SignupHeader from './Header/SignupHeader';
import { APIService } from '../ApiServices/Apis/APIServices';
import { toast } from 'react-toastify';
import ResetEmailSend from './ResetEmailSend';

const ForgetPassword = () => {
    const [Email, setEmail] = useState('')
    const [Redirect, setRedirect] = useState(false)
   
    const handleFormSubmit=(e)=>{
         e.preventDefault();
              let data={
                  email:Email
              }
    APIService.resetPassword(data).then((res)=>{
        console.log(res);
        if(res.data.status==200){
            toast.success(res.data.message)
            setRedirect(true);
        }else{
            toast.error(res.data.message)
        }
    }).catch((error)=>{

    })
    }

    return (
        <>
        
            <SignupHeader />
           
            <main>
                <section class="login-signup-area">
                    <div class="container">
                        <div class="l-s-in-sec mid-form-outer">
                            <div class="cmn-form">
                                <form onSubmit={handleFormSubmit}>
                                    <div class="l-r-form-bx">
                                        <div class="top-logo-pic">
                                            <figure>
                                                <Link to="/"><img src={images.logo} alt="" /></Link>
                                            </figure>
                                        </div>
                                        <div class="login-signup-heading">
                                            <h2>Forgot Password</h2>
                                        </div>
                                        {Redirect?<ResetEmailSend email={Email}/>:
                                        <div class="row">
                                            <div class="col-sm-12 col-md-12 col-lg-12 form-group">
                                                <label for="email-address" class="form-label">Email</label>
                                                <input type="email" class="form-control"  placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)}  value={Email} />
                                            </div>
                                            <div class="col-sm-12 col-md-12 col-lg-12 form-group">
                                                <div class="login-signup-btns">
                                                    <button type="submit" class="btn solid-btn">Reset</button>
                                                </div>
                                            </div>
                                            <div class="col-sm-12 col-md-12 col-lg-12">
                                                <div class="new-users-links">
                                                    <p>Already have a account? <Link to="/login">Sign In</Link> </p>
                                                </div>
                                            </div>
                                        </div>}
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="login-footer-img">
                        <figure>
                            <img src={images.login_footer_img} alt="" />
                        </figure>
                    </div>
                </section>
            </main>
            
            <FooterSignup />
        </>
    )
}
export default ForgetPassword;