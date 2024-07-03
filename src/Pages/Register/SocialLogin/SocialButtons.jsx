import React, { useContext } from 'react';
import images from '../../../Utility/Images';
import { Link, Redirect } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import { APIService } from '../../../ApiServices/Apis/APIServices';
import RegisterContext from '../Context/RegisterContext';
import Auth from '../../../Auth/Auth';
import GlobalContext from '../../../Global/GlobalContext';
import axios from 'axios';
import config from '../../../ApiServices/Apis/config';
const baseUrl = config.baseurl;
const SocialButtons = (props) => {
    const [state,dispatch] = useContext(RegisterContext)
    const [globalState, globalDispatch] = useContext(GlobalContext);
    const responseGoogleSuccess = (response) => {
          let  postData = {
                name: response.profileObj.name,
                // username: response.Ys.hU+Math.floor(Math.random() * 99999),
                platform: response.tokenObj.idpId,
                email: response.profileObj.email,
                social_id: response.profileObj.googleId,
                social_token: response.tokenObj.id_token,
                social_image: response.profileObj.imageUrl
            };
            handleLogin(postData)
        
      }
      const responseGoogleFailed=(response)=>{
            console.log(response);
      }
    const handleLogin=(obj)=>{
        APIService.registerSocial(obj).then((res)=>{
            if(res.data.status==200){
                axios.get(baseUrl + config.endpoints.userInfo, {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8',
                        'Authorization': `Bearer ${res.data.data.accessToken}`
                    }
                }).then((resAuth) => {
                        if (resAuth.data.status == 200) {
                            localStorage.setItem("_tk", res.data.data.accessToken);
                            if (parseInt(resAuth?.data?.data?.signup_step) < 4) {
                                dispatch({ type: 'loginPath', payload: { Type: 'loginPath', loginPath: '/complete-profile' } });
                            }
                            dispatch({ type: 'isLogin', payload: { Type: 'isLogin', isLogin: true } });
                            globalDispatch({ type: 'steps', payload: { Type: 'steps', steps: resAuth?.data?.data?.signup_step } });
                        }
                    }).catch((error) => {

                    });
            }else{
                dispatch({type:'isLogin',payload:{Type:'isLogin',isLogin:false}});
                console.log(res);
            }
        }).catch((error)=>{
            dispatch({type:'isLogin',payload:{Type:'isLogin',isLogin:false}});
        })
    }
    if(state.isLogin||Auth.getAccessToken()){
        return <Redirect to={state.loginPath} />
    }
    return (
        <>
            
                        
                        <div className="login-gplus">
                        <GoogleLogin
                            clientId="294754431381-03bumrkhm7vl3eg4tv0h0khsjt2bp328.apps.googleusercontent.com"
                            render={renderProps => (
                                <a className="btn bdr-btn"  href={void(0)} onClick={renderProps.onClick} disabled={renderProps.disabled} ><img src={images.google_plus_icon} alt="" /> <span>Google</span> </a>
                            )}
                            buttonText="Login"
                            onSuccess={responseGoogleSuccess}
                            onFailure={responseGoogleFailed}
                            cookiePolicy={'single_host_origin'}
                        />
                        </div>
                       
        </>
    );
}

export default SocialButtons;



