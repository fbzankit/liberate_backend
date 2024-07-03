import React, { useState, useReducer, useEffect, useContext } from 'react'
import axios from 'axios'
import { Link, Redirect, useHistory } from 'react-router-dom'
import images from '../Utility/Images'
import FooterSignup from './Footer/FooterSignup'
import SignupHeader from './Header/SignupHeader'
import config from '../ApiServices/Apis/config';
import SocialButtons from './Register/SocialLogin/SocialButtons'
import RegisterContext from './Register/Context/RegisterContext'
import { ToastContainer, toast } from 'react-toastify';
import Reducer from '../Utility/Reducer'
import GlobalContext from '../Global/GlobalContext'
import { APIService } from '../ApiServices/Apis/APIServices'

const baseUrl = config.baseurl;
const initialState = {
    username: '',
    email: '',
    password: '',
    c_password: '',
    social_image: '',
    social_token: '',
    social_id: '',
    loginWith: '',
    showPassword: false,
    showConformPassword: false,
    rememberMe: false,
    isLogin: false,
    loginPath: '/home',
    emailVerificationResponse:false,
}
const Signup = () => {

    const [globalState, globalDispatch] = useContext(GlobalContext);
    const [state, dispatch] = useReducer(Reducer, initialState);
    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        dispatch({ type: name, payload: { Type: name, [name]: value } });
    }

    const handleForm = (e) => {
        e.preventDefault();
        if (state.c_password != state.password) {
            toast.error('Confirm password not match..')
            return false;
        }
        const formData = new URLSearchParams();
        // formData.append("username", state.username);
        formData.append("email", state.email);
        formData.append("password", state.password);
        formData.append("roles[]", "user");
        axios.post(baseUrl + config.endpoints.userRegister, formData)
            .then(res => {
                if (res.data.status == 200) {
                    toast.success(res.data.message)
                    dispatch({ type: 'emailVerification', payload: { Type: 'emailVerification',emailVerification:true} });

                    axios.get(baseUrl + config.endpoints.userInfo, {
                        headers: {
                            'Content-Type': 'application/json;charset=UTF-8',
                            'Authorization': `Bearer ${res.data.data.accessToken}`
                        }
                    })
                        .then((resAuth) => {
                            if (resAuth.data.status == 200) {
                                localStorage.setItem("_tk", res.data.data.accessToken);
                                if (parseInt(resAuth?.data?.data?.signup_step) < 4) {
                                    dispatch({ type: 'loginPath', payload: { Type: 'loginPath', loginPath: '/complete-profile' } });
                                }
                                dispatch({ type: 'isLogin', payload: { Type: 'isLogin', isLogin: true ,emailVerification:true} });
                                globalDispatch({ type: 'steps', payload: { Type: 'steps', steps: resAuth?.data?.data?.signup_step } });
                            }
                        }).catch((error) => {

                        });

                } else {
                    dispatch({ type: 'isLogin', payload: { Type: 'isLogin', isLogin: false } });
                    toast.error(res.data.message)
                }
            }).catch((error) => {
                toast.error(error.message)
                dispatch({ type: 'isLogin', payload: { Type: 'isLogin', isLogin: false } });
            })
    }
    return (
        <>
            <RegisterContext.Provider value={[state, dispatch]}>
                <SignupHeader />
                <main>
                    <section class="login-signup-area">
                        <div class="container">
                            <div class="l-s-in-sec mid-form-outer">
                                <div class="cmn-form">
                                    <form onSubmit={handleForm}>

                                        <div class="l-r-form-bx">
                                            <div class="top-logo-pic">
                                                <figure>
                                                    <Link to="/"><img src={images.logo} alt="" /></Link>
                                                </figure>
                                            </div>
                                            <div class="login-signup-heading">
                                                <h2>{state.emailVerification?'Verification Link sent to your email':'Sign Up'}</h2>
                                            </div>
                                            
                                            {state.emailVerification?<div className="m-5"> <h5 className="text-success text-center">Your account has been created. A confirmation email has been sent. Please click on the confirmation link to verify your account.</h5></div>:<div class="row">
                                
                                                <div class="col-sm-12 col-md-12 col-lg-12 form-group">
                                                    <label for="email-address" class="form-label">Email</label>
                                                    <input type="email" name="email" onChange={handleChange} autocomplete="off" value={state.email} class="form-control" id="email-address" placeholder="Enter email" />
                                                </div>
                                                <div class="col-sm-12 col-md-12 col-lg-12 form-group">
                                                    <label for="password" class="form-label">Password</label>
                                                    <div class="password-hide-show">
                                                        <input type={state.showPassword ? "text" : "password"} autocomplete="off" name="password" onChange={handleChange} value={state.password} class="form-control" id="password" placeholder="Enter password" />
                                                        {state.showPassword ?
                                                            <i class="fa fa-eye-slash" onClick={() => dispatch({ type: 'showPassword', payload: { Type: 'showPassword', showPassword: !state.showPassword } })}></i> :
                                                            <i class="fa fa-eye" onClick={() => dispatch({ type: 'showPassword', payload: { Type: 'showPassword', showPassword: !state.showPassword } })}></i>
                                                        }
                                                    </div>
                                                </div>
                                                <div class="col-sm-12 col-md-12 col-lg-12 form-group">
                                                    <label for="confirm-password" class="form-label">Confirm Password</label>
                                                    <div class="password-hide-show">
                                                        <input type={state.showConformPassword ? "text" : "password"} autocomplete="off" name="c_password" onChange={handleChange} value={state.c_password} class="form-control" id="confirm-password" placeholder="Enter confirm password" />
                                                        {state.showConformPassword ?
                                                            <i class="fa fa-eye-slash" onClick={() => dispatch({ type: 'showConformPassword', payload: { Type: 'showConformPassword', showConformPassword: !state.showConformPassword } })}></i> :
                                                            <i class="fa fa-eye" onClick={() => dispatch({ type: 'showConformPassword', payload: { Type: 'showConformPassword', showConformPassword: !state.showConformPassword } })}></i>
                                                        }
                                                    </div>
                                                </div>
                                                <div class="col-sm-12 col-md-12 col-lg-12 form-group">
                                                    <div class="login-signup-btns">
                                                        <button class="btn solid-btn" type="submit">Sign Up</button>
                                                    </div>
                                                </div>
                                                <div class="col-sm-12 col-md-12 col-lg-12">
                                                    <SocialButtons />
                                                    <div class="new-users-links">
                                                        <p>Already have a account? <Link to="login">Sign In</Link> </p>
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
            </RegisterContext.Provider>
        </>
    )
}
export default Signup;
