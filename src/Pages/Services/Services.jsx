import React, { useReducer, useContext } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SideBar from '../SideBar/DashboardSideBar';
import images from '../../Utility/Images';
import ServicesContext from './ServicesContext/ServicesContext';
import Reducer from '../../Utility/Reducer';
import { useEffect } from 'react';
import { APIService } from '../../ApiServices/Apis/APIServices';
import { toast, ToastContainer } from 'react-toastify';
import ServiceLists from './ServiceLists';
import AddService from './AddService';
import UpdateService from './UpdateService';
import GlobalContext from '../../Global/GlobalContext';
import { useState } from 'react';

const initialState = {
    serviceLists: [],
    services:[],
    page: 0,
    limit:20,
    pagination:true,
    readMore:50,
    currentAction:'Service',
    getServiceList:'',
    // 
    editDescription:'',
    bufferTime:0,
    editPackages:[],
    editPackagesIds:[],
    editPackagesSessions:0,
    editPackagesCost:0,
    editPackagesDuration:'15',
    editServiceId:0,
    ediServiceDetails:'',
    editExtendDuration:[],
    editExtendDurationTime:'30',
    editExtendDurationCost:'0',
    editVariationCost:[],
    editVariationCostTime:'15',
    editVariationCostCost:'1',
    // 
    category:'',
    service:'',
    participate:false,
    description:'',
    documents:[],
    documentsAll:[],
    certifications:[],
    certificationsAll:[],
    fileUploadPreloader:false,
    isAccept:false,
    errorCategory:false,
    errorService:false,
    errorDescription:false,
    errorDocuments:false,
    errorCertifications:false,
    redirect:false,

  
}
document.title = "Services"
const Services = () => {
const [state, dispatch] = useReducer(Reducer, initialState);
const [globalState,globalDispatch] = useContext(GlobalContext)

    useEffect(() => {
        getServiceList();
        return;
    }, [])
    useEffect(() => {

        return;
    }, [])
    useEffect(() => {
        if(state.category){
            getServices();
        }
    }, [state.category])

    const getServices=()=>{
        APIService.services({category_id:state.category}).then(res => {
            if(res.data.status==200){
                dispatch({type:'services',payload:{Type:'services',services:res.data.data}})
            }       
        });
    }
    

    const getServiceList=()=>{
        globalDispatch({type:'preloader',payload:{Type:'preloader',preloader:true}});
        let data={
            page:state.page,
            limit:state.limit,
        }
        APIService.dashboardServicesList(data).then((res)=>{
            console.log(state.serviceLists,state.serviceLists.concat(res.data.data),'res');
            if(res.data.status==200){
                    if(res.data.data?.length>0){
                        // toast.success(res.data.message);
                        setTimeout(() => {
                            dispatch({type:"dashboardServicesList",payload:{Type:"dashboardServicesList",getServiceList:getServiceList,pagination:true,page:state.page+1,serviceLists:[...state.serviceLists,...res.data.data]}})                            
                        }, 3000);
                        
                    }else{
                        dispatch({type:"pagination",payload:{Type:"pagination",pagination:false}})
                        toast.error(res.data.message);

                    }
                    globalDispatch({type:'preloader',payload:{Type:'preloader',preloader:false}});
            }else{
                globalDispatch({type:'preloader',payload:{Type:'preloader',preloader:false}});
                dispatch({type:"pagination",payload:{Type:"pagination",pagination:false}})
                toast.error(res.data.message);
            }
            
        }).catch((error)=>{
            globalDispatch({type:'preloader',payload:{Type:'preloader',preloader:false}});
        })
    }
   console.log(state);
    return (
        <>
            <ServicesContext.Provider value={[state, dispatch]}>
                <Header />
                {state.currentAction==='Service'
                ?<ServiceLists/>      
                :state.currentAction==="editService"?<UpdateService getServiceList={getServiceList}/>:<AddService getServiceList={getServiceList}/>
                }
                <Footer />
            </ServicesContext.Provider>
        </>
    );
}

export default Services;