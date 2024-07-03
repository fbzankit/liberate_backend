
import React, { useEffect, useState, useReducer } from 'react';
import { Route, Redirect} from "react-router-dom";
import { APIService } from '../../ApiServices/Apis/APIServices';
import AuthUserContext from '../../AuthUser/AuthUserContext';
import GlobalContext from '../../Global/GlobalContext';
import Reducer from '../../Utility/Reducer';
import Auth from '../../Auth/Auth';
const initialState={
  categories:[],
  services:[],
  notificationsAll:[],
  globalLanguages:[],
  preloader:false,
  steps:0,
}
export const ProtectedRoute = ({component: Component,...rest}) => {

const [CurrentUserDetails, setCurrentUserDetails] = useState();
const [globalState, globalDispatch] = useReducer(Reducer, initialState);
useEffect(async () => {
  if(Auth.getAccessToken()){
    getServicesCategoriesAuthUser();
  }
  return;
}, [window.location.pathname]);
const getServicesCategoriesAuthUser=()=>{
  // getAuthUser
  APIService.authUser().then((res)=>{
    if(res?.data?.status==200){
      globalDispatch({type:'Steps',payload:{Type:'Steps',steps:res?.data?.data?.signup_step}});
       setCurrentUserDetails(res?.data?.data)
       localStorage.setItem('_cu',JSON.stringify(res?.data?.data));
    }
  }).catch((error)=>{
   if(error?.response?.status==401){
      Auth.LogOutUser();
   }
  });

    APIService.globalLanguages().then((res)=>{
      // if(res.data.status===200){
          globalDispatch({type:'globalLanguages',payload:{Type:'globalLanguages',globalLanguages:res.data.data}})
      // }
    })
  

// get Categories
APIService.categories().then(res => {
  if(res?.status==200){
    globalDispatch({type:'category',payload:{Type:'category',categories:res.data.data}})
  }          
});

}

    return (
      <Route
        {...rest}
        render={props => {
          let userDetails = CurrentUserDetails || JSON.parse(localStorage.getItem('_cu'));
          if (!Auth.getAccessToken()) {
            // not logged in so redirect to login page with the return url
              return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
          }
          return (
            
            <GlobalContext.Provider value={[globalState, globalDispatch]}>
            <AuthUserContext.Provider value={userDetails}>
              
              <Component {...props}  />
            </AuthUserContext.Provider>
            </GlobalContext.Provider>
          ); 
        }}
      />
    );
  };