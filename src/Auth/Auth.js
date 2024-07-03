import React from 'react';
import { Redirect } from 'react-router-dom';
class Auth {
  constructor() {
    const Token = localStorage.getItem('_tk');
      (Token) ? this.authenticated = true : this.authenticated = false;
       this.getAuthUserData=[];

  }
  LogOutUser(){
    localStorage.clear();
    sessionStorage.clear();
    return <Redirect to="/login" />
  }
  RedirectToLogin(){
      return <Redirect to="/login" />  
   }
  RedirectToRegister(){
      return <Redirect to="/signup" />
  }
  getAccessToken() {

    return localStorage.getItem('_tk');
  
  }
  ErrorHandling(error) {

    if(error.response.status==401){
      localStorage.clear();
      sessionStorage.clear();
    }
  }
  isAuthLogIn(){
        let user = localStorage.getItem('_cu');
        let token = localStorage.getItem('_tk');
        if (user && token) {
            return true;
        } else {
          return false;
        }
       
  }
  
}

export default new Auth();
