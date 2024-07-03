import React, { useReducer } from 'react'
import { Link, useHistory, Redirect } from 'react-router-dom'
import images from '../Utility/Images'
import FooterSignup from './Footer/FooterSignup'
import SignupHeader from './Header/SignupHeader'
import { APIService } from '../ApiServices/Apis/APIServices'
import { useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify'

const initialState = {
    email:"",
    token:"",
    password:"",
    con_password:"",
    LinkExpiredMessage:'',
    LinkExpired:false,
    passwordChanges:false,
}
const reducer=(state, { type, payload }) => {
    switch (type) {
    case payload.Type:
        return { ...state, ...payload }
    default:
        return state
    }
}

const SetPassword = () => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const history=useHistory();
    const params=new URLSearchParams(history.location.search);
    useEffect(() => {
        LinkValidation();
        dispatch({type:'email',payload:{Type:'email',token:params.get('token'),email:params.get('email')}})
    }, [window.location.pathname])

    const LinkValidation=()=>{
        if(params.get('email')&&params.get('token')){
           let data={
               token:params.get('token'),
               email:params.get('email'),
            };
            APIService.changePassword(data).then((res)=>{
                if(res.data.status==200){
                    dispatch({type:"LinkExpired",payload:{Type:'LinkExpired',passwordChanges:true,LinkExpired:false}});
                }else if(res.data.status==201){
                    setTimeout(() => {
                        dispatch({type:"passwordChanges",payload:{Type:'passwordChanges',LinkExpired:true,passwordChanges:false}});                        
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
    const handleChange=(e)=>{
        let name =e.target.name;
        let value =e.target.value;
        dispatch({type:name,payload:{Type:name,[name]:value}});
    }    
   const handleSubmit=(e)=>{
    e.preventDefault();
    let data={
        email:state.email,
        token:state.token,
        password:state.password,
        con_password:state.con_password,
    }
    APIService.updatePassword(data).then((res)=>{
        if(res.data.status==200){
            toast.success(res.data.message)
            dispatch({type:"LinkExpired",payload:{Type:'LinkExpired',LinkExpired:false,passwordChanges:true}});
        }else if(res.data.status==201){
            dispatch({type:"passwordChanges",payload:{Type:'passwordChanges',LinkExpired:true,passwordChanges:false}});
            toast.error(res?.data?.message)
        }else{
            toast.error(res?.data?.message)
        }
    }).catch((error)=>{
        toast.error(error?.response?.data?.message)
        
    })
   }   
   console.log(state,'state');
   if(state.passwordChanges){
        <Redirect to="/login"/>
   }
    return (
        <>
            <SignupHeader />
            <main>
                <section className="login-signup-area">
                    <div className="container">
                        <div className="l-s-in-sec mid-form-outer">
                            <div className="cmn-form">
                               {state.LinkExpired?
                               <div className="l-r-form-bx">
                               <div className="top-logo-pic">
                                   <figure>
                                       <Link to="/"><img src={images.logo} alt="logo" /></Link>
                                   </figure>
                               </div>
                               <div className="login-signup-heading">
                                   <h2>Link Expired</h2>
                               </div>
                               <div className="row">
                                   
                                   <div className="col-sm-12 col-md-12 col-lg-12 form-group">
                                       <div className="login-signup-btns">
                                           <Link to="/forget-password" className="btn solid-btn" disabled={true}>Resend </Link>
                                       </div>
                                   </div>
                                   <div className="col-sm-12 col-md-12 col-lg-12">
                                       <div className="new-users-links">
                                           <p>Already have a account? <Link to="/login">Login</Link> </p>
                                       </div>
                                   </div>
                               </div>
                           </div>
                               :<form onSubmit={handleSubmit}>
                                    <div className="l-r-form-bx">
                                        <div className="top-logo-pic">
                                            <figure>
                                                <Link to="/"><img src={images.logo} alt="logo" /></Link>
                                            </figure>
                                        </div>
                                        <div className="login-signup-heading">
                                            <h2>Reset Password</h2>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-12 col-md-12 col-lg-12 form-group">
                                                <label for="password" className="form-label">New Password</label>
                                                <input type="password" className="form-control" name="password" onChange={handleChange} id="password" placeholder="Enter new password" value={state.password} />
                                            </div>
                                            <div className="col-sm-12 col-md-12 col-lg-12 form-group">
                                                <label for="confirm-password" className="form-label">Confirm New Password</label>
                                                <input type="password" className="form-control" id="confirm-password" onChange={handleChange} name="con_password" placeholder="Enter confirm new password" value={state.con_password} />
                                            </div>
                                            <div className="col-sm-12 col-md-12 col-lg-12 form-group">
                                                <div className="login-signup-btns">
                                                    <button type="submit" className="btn solid-btn">Change Password</button>
                                                </div>
                                            </div>
                                            <div className="col-sm-12 col-md-12 col-lg-12">
                                                <div className="new-users-links">
                                                    <p>Already have a account? <Link to="/login">Sign In</Link> </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </form>}
                            </div>
                        </div>
                    </div>
                    <div className="login-footer-img">
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
export default SetPassword;
