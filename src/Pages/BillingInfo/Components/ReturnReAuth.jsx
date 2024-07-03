import React, { useEffect, useState } from 'react';
import { useHistory, Redirect } from 'react-router';
import { APIService } from '../../../ApiServices/Apis/APIServices';
import Auth from '../../../Auth/Auth';

const ReturnReAuth = () => {
 const [Response, setResponse] = useState(false)
  useEffect(() => {
    stripeApproved();
    return;
  }, [])
  const stripeApproved=()=>{
    APIService.stripeApproved().then((res)=>{
        if(res.data.status==200){
            setResponse(true)
        }
    }).catch((error)=>{
        Auth.ErrorHandling(error);
    })
  }
  if(Response){
    return <Redirect to={'/account'}/>
  }else{
    return ( <><h1>Redirecting...</h1></>);
  }
  
}

export default ReturnReAuth;