import React, { useEffect, useReducer } from 'react';
import SideBar from '../SideBar/DashboardSideBar';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { APIService } from '../../ApiServices/Apis/APIServices';
import Reducer from '../../Utility/Reducer';
import { ToastContainer, toast } from 'react-toastify';
const initialState={
    Notifications:0,
    Messages:0,
    Events:0,
    Promotions:0,
    ProfileHide:0
}
const Settings = () => {
const [state, dispatch] = useReducer(Reducer, initialState)
useEffect(() => {
    getSettingList();
    return;
}, [])
const getSettingList=()=>{
    APIService.settingData().then((res)=>{
        if(res.data.status==200){
            dispatch({type:'response',payload:{
                Type:'response',
                Notifications:res.data.data?.notification,
                Messages:res.data.data?.messages,
                Events:res.data.data?.event,
                Promotions:res.data.data?.promotion,
                ProfileHide:res.data.data?.profile_hide
            }})
        }else{
            toast.error(res.data.message)
        }
    }).catch((error)=>{
        
    })
}
const HandleChange=(e)=>{
   let value= e.target.value;
   let name= e.target.name;
   let valueFilter=value==1?0:1
   dispatch({type:name,payload:{Type:name,[name]:valueFilter}});

}
const updateSetting=(e)=>{
    e.preventDefault();
    let data={
        notification:state.Notifications.toString(),
        event:state.Events.toString(),
        promotion:state.Promotions.toString(),
        profile_hide:state.ProfileHide.toString(),
        messages:state.Messages.toString()
    }
    APIService.userSetting(data).then((res)=>{
        if(res.data.status==200){ 
            getSettingList();  
            toast.success(res.data.message)
        }else{
            toast.error(res.data.message)
        }
    }).catch((error)=>{
        
    })
}
    return (
        <>
        <Header/>
            <main>
                <section className="account-settings-area">
                    <div className="container">
                        <div className="p-sec-heading">
                            <div className="row">
                                <div className="col-12">
                                    <div className="section-title">
                                        <h2>Settings</h2>
                                        <p>Change your email notifications.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="account-settings-content">
                            <SideBar />
                            <div className="rit-as-sec">

                                <div className="basic-info-bx">
                                    <div className="cmn-form">
                                        <form onSubmit={updateSetting}>
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="setting-bx">
                                                        <strong>Notifications : On</strong>
                                                        <p>If you wish to stop all notification turn this off. you can change this anytime</p>
                                                        <label className="switch">
                                                        <input type="checkbox" onChange={HandleChange} name="Notifications" checked={state.Notifications==0?false:true} value={state.Notifications}/><span className="switch-toggle round"></span></label>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="setting-bx">
                                                        <strong>Messages : Off</strong>
                                                        <p>If you wish to stop all notification turn this off. you can change this anytime</p>
                                                        <label className="switch"><input type="checkbox" onChange={HandleChange} name="Messages" checked={state.Messages==0?false:true} value={state.Messages}/><span className="switch-toggle round"></span></label>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="setting-bx">
                                                        <strong>Events: On</strong>
                                                        <p>If you wish to stop all notification turn this off. you can change this anytime</p>
                                                        <label className="switch"><input type="checkbox" onChange={HandleChange} name="Events" checked={state.Events==0?false:true} value={state.Events} /><span className="switch-toggle round"></span></label>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="setting-bx">
                                                        <strong>Promotions : On</strong>
                                                        <p>Site wide promotions</p>
                                                        <label className="switch"><input type="checkbox" onChange={HandleChange} name="Promotions" checked={state.Promotions==0?false:true} value={state.Promotions}/><span className="switch-toggle round"></span></label>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="setting-bx">
                                                        <strong>Profile Hide : On</strong>
                                                        <p>Temporarily hide their profile</p>
                                                        <label className="switch"><input type="checkbox" onChange={HandleChange} name="ProfileHide" checked={state.ProfileHide==0?false:true} value={state.ProfileHide} /><span className="switch-toggle round"></span></label>
                                                    </div>
                                                </div>

                                                <div className="col-12">
                                                    <div className="send-envite-btn">
                                                        <button type="submit" className="btn solid-btn">Save</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer/>
        </>
    );
}


export default Settings;