import React, { useState, useReducer, useContext } from 'react'
import axios from 'axios'
import { Link, Redirect, useHistory } from 'react-router-dom'
import images from '../Utility/Images'
import FooterSignup from './Footer/FooterSignup'
import SignupHeader from './Header/SignupHeader'
import config from '../ApiServices/Apis/config';
import SocialButtons from './Register/SocialLogin/SocialButtons'
import { ToastContainer, toast } from 'react-toastify';
import RegisterContext from './Register/Context/RegisterContext'
import Reducer from '../Utility/Reducer'
import Auth from '../Auth/Auth'
import GlobalContext from '../Global/GlobalContext'

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
    emailVerification:false,
}
const Login = () => {
    const [state, dispatch] = useReducer(Reducer, initialState);
    const [globalState, globalDispatch] = useContext(GlobalContext);

    let history = useHistory();
    const [email, setEmail] = useState('')

    const [ShowPassword, setShowPassword] = useState(false)

    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        if (name == "rememberMe") {
            dispatch({ type: name, payload: { Type: name, [name]: !state.rememberMe } });
        } else {
            dispatch({ type: name, payload: { Type: name, [name]: value } });
        }
    }
    const handleForm = (e) => {
        e.preventDefault();
        const formData = new URLSearchParams();
        formData.append("email", state.email);
        formData.append("password", state.password);
        axios.post(baseUrl + config.endpoints.signIn, formData)
            .then(res => {
                if (res.data.status == 200) {
                    if (res.data.data.roles === "user") {
                        // toast.success('Logged in successfully');
                        if (parseInt(res?.data?.data?.signup_step) < 4) {
                            dispatch({ type: 'loginPath', payload: { Type: 'loginPath', loginPath: '/complete-profile' } });
                        }
                        localStorage.setItem("_tk", res.data.data.accessToken);
                        dispatch({ type: 'isLogin', payload: { Type: 'isLogin', isLogin: true } });
                        globalDispatch({ type: 'steps', payload: { Type: 'steps', steps: res?.data?.data?.signup_step } });
                    } else {
                        toast.error(`sorry ${res.data.data.roles} can't login, you need to register as a user`);
                    }
                } else {
                    toast.error(res.data.message);
                    dispatch({ type: 'isLogin', payload: { Type: 'isLogin', isLogin: false } });
                }
            }).catch((error) => {
                toast.error(error.message);
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
                                                <h2>Sign In</h2>
                                            </div>
                                            <div class="row">
                                                <div class="col-sm-12 col-md-12 col-lg-12 form-group">
                                                    <label htmlFor="email-address" class="form-label">Email</label>
                                                    <input type="email" onChange={handleChange} name="email" value={state.email} class="form-control" id="email-address" placeholder="Enter email" />
                                                </div>
                                                <div class="col-sm-12 col-md-12 col-lg-12 form-group">
                                                    <label htmlFor="email-address" class="form-label">Password</label>
                                                    <div class="password-hide-show">
                                                        <input type={ShowPassword ? 'text' : 'password'} onChange={handleChange} name="password" value={state.password} class="form-control" placeholder="Enter password" />
                                                        {ShowPassword ?
                                                            <i class="fa fa-eye-slash" onClick={() => setShowPassword(!ShowPassword)}></i> :
                                                            <i class="fa fa-eye" onClick={() => setShowPassword(!ShowPassword)}></i>
                                                        }
                                                    </div>
                                                </div>
                                                <div class="col-sm-12 col-md-12 col-lg-12 form-group">
                                                    <div class="save-card-ck float-left">
                                                        <label class="lm-ck-bx">Remember Password<input type="checkbox" onChange={handleChange} name="rememberMe" checked={state.rememberMe} />
                                                            <span class="checkmark"></span>
                                                        </label>
                                                    </div>
                                                    <div class="lost-password-link float-right"><Link to="/forget-password">Lost your password?</Link></div>
                                                </div>
                                                <div class="col-sm-12 col-md-12 col-lg-12 form-group">
                                                    <div class="login-signup-btns">
                                                        <button class="btn solid-btn" type="submit">Login
                                                        <span class="spinner"></span>
                                                        </button>
                                                        {/* <Link to="/" className="btn solid-btn">Login</Link> */}
                                                        {/* <button class="btn solid-btn">Login</button> */}
                                                    </div>
                                                </div>
                                                <div class="col-sm-12 col-md-12 col-lg-12">
                                                    <SocialButtons />
                                                    <div class="new-users-links">
                                                        <p>New user? <Link to="/signup">Sign Up</Link> </p>
                                                    </div>
                                                </div>
                                            </div>
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
export default Login;