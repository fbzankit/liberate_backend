import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import images from '../Utility/Images';
import FooterSignup from './Footer/FooterSignup';
import SignupHeader from './Header/SignupHeader';
import { APIService } from '../ApiServices/Apis/APIServices';
import { toast } from 'react-toastify';

const EmailVerification = () => {
    const [Email, setEmail] = useState('')
    const [Token, setToken] = useState('')
    const [Redirect, setRedirect] = useState(false)
    const [LinkExpired, setLinkExpired] = useState(false)
                                                                                                                                                const history=useHistory();
    const params=new URLSearchParams(history.location.search);
    useEffect(() => {
        LinkValidation();
        setEmail(params.get('email'))
        setToken(params.get('token'))
    }, [window.location.pathname])

    const LinkValidation=()=>{
        if(params.get('email')&&params.get('token')){
           let data={
               token:params.get('token'),
               email:params.get('email'),
            };
            APIService.emailVerify(data).then((res)=>{
                if(res.data.status==200){
                    setLinkExpired(false);
                }else if(res.data.status==201){
                    setTimeout(() => {
                        setLinkExpired(false);                     
                    }, 2000);
                    toast.error(res?.data?.message)
                }
            }).catch((error)=>{
                toast.error(error?.response?.data?.message)
            })

        }else{

            toast.success('link not valid')
        }
    }

    return (
        <>

            <SignupHeader />

            <main>
                <section class="login-signup-area">
                    <div class="container">
                        <div class="l-s-in-sec mid-form-outer">
                            <div class="cmn-form">
                                {/* <form onSubmit={handleFormSubmit}> */}
                                    <div class="l-r-form-bx">
                                        <div class="top-logo-pic">
                                            <figure>
                                                <Link to="/"><img src={images.logo} alt="" /></Link>
                                            </figure>
                                        </div>
                                        <div class="login-signup-heading">
                                            <h2>Email Verified</h2>
                                            
                                        </div>
                                        <div class="notify-message">
                                            <p>Your email is now verified.</p>
                                        </div>
                                        <div class="row">
                            
                                            <div class="col-sm-12 col-md-12 col-lg-12">
                                                <div class="new-users-links">
                                                    <p>Sign In to your account? <Link to="/login">Sign In</Link> </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                {/* </form> */}
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
export default EmailVerification;