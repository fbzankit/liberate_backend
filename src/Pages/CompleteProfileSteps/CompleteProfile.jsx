import React, { useContext, useReducer, useEffect } from 'react';
import AuthUserContext from '../../AuthUser/AuthUserContext';
import Auth from '../../Auth/Auth';
import { Redirect } from 'react-router';
import ChooseIntrestOne from './ChooseIntrestOne';
import ChooseIntrestThree from './ChooseIntrestThree';
import ChooseIntrestTwo from './ChooseIntrestTwo';
import { APIService } from '../../ApiServices/Apis/APIServices';
import GlobalContext from '../../Global/GlobalContext';
import Context from '../Home/Context/Context';
import Reducer from '../../Utility/Reducer';
const initialState = {
    steps:0,
    tempImage:'',
    profileImage:'',
    profileImageValue:'',
    name:'',
    phone:'',
    gender:'m',
    location:'',
    language:'',
    languageTags:[],
    tag:'',
    tags:[],
    categories:[],
    selectCategories:[],
    services:[],
    selectServices:[],
    croppieImage:[],
    croppieVideo:[],
    croppieImageBase64:null,
    
}
const CompleteProfile = () => {
    const [state, dispatch] = useReducer(Reducer, initialState)
    const [globalState, globalDispatch] = useContext(GlobalContext)
    const authUser = useContext(AuthUserContext)
    useEffect(() => {
        getCategories();
        getServices();
        getAuthUser();          
        return;
    }, []);
    useEffect(() => {
        getServices();
    }, [state.selectCategories])
  
  const  getAuthUser=()=>{
        APIService.authUser().then((res)=>{
            if(res?.data?.status==200){
               localStorage.setItem('_cu',JSON.stringify(res?.data?.data));
               let serviceSelectArray=[];
                res.data.data?.modality.split(',').map((res)=>
                    serviceSelectArray.push(parseInt(res))
                )
                let serviceCategoryArray=[];
                res.data.data?.category.split(',').map((res)=>
                 serviceCategoryArray.push(parseInt(res))
                )
                dispatch({type:'authUser',payload:{
                Type:'authUser',
                tags:res?.data?.data?.speciality.split(','),
                selectServices:serviceSelectArray,
                selectCategories:serviceCategoryArray,
                name:res?.data?.data?.name,
                phone:res?.data?.data?.phone,
                gender:res?.data?.data?.gender,
                location:JSON.parse(res?.data?.data?.location),
                }}) 
                globalDispatch({type:'Steps',payload:{Type:'Steps',steps:res?.data?.data?.signup_step}});
            }
          }).catch((error)=>{
            
          });
    }

   const getCategories=()=>{
        APIService.categories().then(res => {
            if(res.status==200){
                dispatch({type:'category',payload:{Type:'category',categories:res.data.data}})
            }          
        });
    }
    const getServices=()=>{
        APIService.allServiceForUser({category_id:state.selectCategories}).then(res => {
            if(res.data.status==200){
                dispatch({type:'services',payload:{Type:'services',services:res.data.data}})
            }       
        });
    }
    if(Auth.getAccessToken()==null){
        return (<Redirect to="/login"/>);
    }
    
    console.log(globalState.steps,'globalState');
    switch (parseInt(globalState.steps)) {
        case 0:
            return( 
            <Context.Provider value={[state, dispatch,globalState, globalDispatch]}> 
                <ChooseIntrestOne />
            </Context.Provider>
            )
        case 1:
            return(
            <Context.Provider value={[state, dispatch,globalState, globalDispatch]}> 
                <ChooseIntrestTwo/>
            </Context.Provider>
            )
        case 2:
            return (
            <Context.Provider value={[state, dispatch,globalState, globalDispatch]}> 
                <ChooseIntrestThree />
            </Context.Provider>
            )
        case 3:
            return (
            <Context.Provider value={[state, dispatch,globalState, globalDispatch]}> 
                <ChooseIntrestThree />
            </Context.Provider>
            )
        case 4:
            return <Redirect to="/home" />
    }
    
}

export default CompleteProfile;