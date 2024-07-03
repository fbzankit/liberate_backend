import React, { useReducer, useContext, useEffect } from 'react';
import Reducer from '../../Utility/Reducer';
import AuthUserContext from '../../AuthUser/AuthUserContext';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SideBar from '../SideBar/DashboardSideBar';
import GlobalContext from '../../Global/GlobalContext';
import TagsInput from 'react-tagsinput';
import Auth from '../../Auth/Auth';
import { toast, ToastContainer } from 'react-toastify';
import { APIService } from '../../ApiServices/Apis/APIServices';
import { Redirect } from 'react-router';
const initialState={
    step:1,
    selectCategory:[],
    selectService:[],
    services:[],
    tags:[],
    tag:'',
    redirect:false,
}
const Interests = () => {
const [state,dispatch]=useReducer(Reducer,initialState);
const authUser=useContext(AuthUserContext)
const [globalState,globalDispatch]=useContext(GlobalContext);
console.log(state);


    useEffect(() => {
        let categoryArray=[]
        let serviceArray=[]
        if(Auth.isAuthLogIn()){
        authUser?.category.split(',').map((res)=>
            categoryArray.push(parseInt(res))
        )
        authUser?.modality.split(',').map((res)=>
            serviceArray.push(parseInt(res))
        )
        dispatch({type:'onLoad',
                payload:{
                        Type:'onLoad',
                        selectCategory:categoryArray,
                        selectService:serviceArray,
                        tags:authUser?.speciality.split(',')
                        }
            })
        }
    }, [])

useEffect(() => {
    getServices();
}, [state.selectCategory])
const nextStep=()=>{
    dispatch({type:'Steps',payload:{Type:'Steps',step:state.step+1}})
}
const prevStep=()=>{
    dispatch({type:'Steps',payload:{Type:'Steps',step:state.step-1}})
}
const formSubmit=(e)=>{
    e.preventDefault();
   if(formValidation()){ 
    let StepOne={
            category:state.selectCategory.toString(),
    }
    let StepTwo={
        modality:state.selectService.toString(),
        speciality:state.tags.toString()
    }
   
    APIService.chooseInterestOneUpdate(StepOne).then((res)=>{
        if(res.data.status==200){
            dispatch({type:'redirect',payload:{Type:'redirect',redirect:true}});
            toast.success(res.data.message)
        }  
    })
    APIService.chooseInterestTwoUpdate(StepTwo).then((res)=>{
        console.log(res,'StepTwo');    
        if(res.data.status==200){
                dispatch({type:'redirect',payload:{Type:'redirect',redirect:true}});
                toast.success(res.data.message)
        }  

    })
    
    }

}
const formValidation=()=>{
    let condition=true;
    if(state.selectCategory.length==0){
        condition=false;
        toast.error('Min 1 category select')
    }
    if(state.selectService.length==0){
        condition=false;
        toast.error('Min 1 Service select')
    }
    if(state.tags.length==0){
        condition=false;
        toast.error('Enter min 1 specialty')
    } 
    return condition;
}
const handleChangeCategory=(e,id)=>{
    const target = e.target;
    var value = target.value;
    if(target.checked){
        dispatch({type:'selectCategory',payload:{Type:'selectCategory',selectCategory:[...state.selectCategory,parseInt(value)]}})
    }else if(target.checked==false){
       const value= state.selectCategory.indexOf(parseInt(id))
       if(value !== -1){
        state.selectCategory.splice(value,1);
       }
       dispatch({type:'selectCategory',payload:{Type:'selectCategory',selectCategory:state.selectCategory}})
    }
}
const handleChangeService=(e,id)=>{
    const target = e.target;
    var value = target.value;
    if(target.checked){
        dispatch({type:'selectServices',payload:{Type:'selectServices',selectService:[...state.selectService,parseInt(value)]}})
    }else if(target.checked==false){
       const value= state.selectService.indexOf(parseInt(id))
       if(value !== -1){
        state.selectService.splice(value,1);
       }
       dispatch({type:'selectServices',payload:{Type:'selectServices',selectService:state.selectService}})
    }
    
}
const getServices=()=>{
    APIService.allServiceForUser({category_id:state.selectCategory}).then(res => {
        if(res.data.status==200){
            dispatch({type:'services',payload:{Type:'services',services:res.data.data}})
        }       
    });
}

const handleChangeInput=(tag)=>{
    dispatch({type:'tag',payload:{Type:'tag',tag:tag}});
   }
const handleChangeTags=(tags)=>{
    dispatch({type:'tags',payload:{Type:'tags',tags:tags}});
}
if(state.redirect){
    return <Redirect to="/account"/>
}
    return (
            <>
            <Header/>
            <main>
            <form onSubmit={formSubmit}>
                <section class="account-settings-area">
                    <div class="container">
                        <div class="p-sec-heading">
                            <div class="row">
                                <div class="col-12">
                                    <div class="section-title">
                                        <h2>Interests</h2>
                                        <p>Update your interests to show on the homepage</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="account-settings-content">
                            <SideBar />
                           
                            <div class="rit-as-sec">
                                <div class="interests-edit-steps-top">
                                    <div class="row">
                                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                                            <div class="section-title">
                                                <h2>Please Choose Your {state.step==1?'Categories':'Specialties and Modality'}</h2>
                                            </div>
                                        </div>
                                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                                            <div class="filter-right">
                                                <ul class="d-inline-block ul-row">
                                                    <li><strong>Step {state.step}/2</strong></li>
                                                {state.step==2?
                                                    <>
                                                        <li><button type="button" onClick={()=>prevStep()} class="btn">Back</button></li>
                                                        <li><button type="submit" class="btn">Finish</button></li>
                                                    </>
                                                    :
                                                    <li><button type="button" onClick={()=>nextStep()} class="btn">Next</button></li>
                                                }

                                                </ul>

                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div class="interests-card-list">
                                    
                                    {state.step==1?<div class="row">
                                        {globalState.categories.map((res)=>
                                        <div key={res.id} class="col-6 col-sm-6 col-md-6 col-lg-4 col-xl-3">
                                            <div class="interest-single-bx">
                                                <div class="ck-img-text">
                                                    <label class="lm-ck-bx">
                                                        <div class="single-services">
                                                            <div class="services-icon"> <i class="lb lb-categories-1-icon"></i> </div>
                                                            <div class="services-content">
                                                                <strong>{res.name}</strong>
                                                            </div>
                                                        </div>
                                                        <div class="interest-ck-bx"> <input type="checkbox" onChange={(e)=>handleChangeCategory(e,res.id)} value={res.id} checked={state.selectCategory.find((id)=>id==res.id)?true:false}/><span class="checkmark"></span></div></label>
                                                </div>
                                            </div>
                                        </div>)}
                                    </div>:
                                    <>
                                     <div class="form-group">
                                        <label for="email-address" class="form-label">Specialties</label>
                                        <TagsInput
                                            value={state.tags}
                                            onChange={handleChangeTags}
                                            inputValue={state.tag}
                                            addKeys={[9, 13,188,32]}
                                            onlyUnique={true}
                                            onChangeInput={handleChangeInput}
                                        />
                                        {/* <input class="form-control input-tags" type="text" data-role="tagsinput" placeholder="Add New Specialties" value="Psychic" /> */}
                                    </div>
                                    <div class="bdr-heading">
                                        <h2>Modality</h2>
                                    </div>
                                    <div class="row">
                                        {state.services.map((res)=>
                                        <div key={res.id} class="col-6 col-sm-6 col-md-6 col-lg-4 col-xl-3">
                                            <div class="interest-single-bx">
                                                <div class="ck-img-text">
                                                    <label class="lm-ck-bx">
                                                        <div class="single-services">
                                                            <div class="services-icon"> <i class="lb lb-categories-1-icon"></i> </div>
                                                            <div class="services-content">
                                                                <strong>{res.name}</strong>
                                                            </div>
                                                        </div>
                                                        <div class="interest-ck-bx"> <input type="checkbox" onChange={(e)=>handleChangeService(e,res.id)} value={res.id} checked={state.selectService.find((id)=>id==res.id)?true:false}/><span class="checkmark"></span></div></label>
                                                </div>
                                            </div>
                                        </div>)}
                                    </div>
                                 </>
                                    }
                                    <div class="row">
                                        <div class="col-12">
                                            <div class="load-more-btn text-center">
                                                 <button type="button" class="btn"><i class="lb lb-refresh-icon"></i> Load More</button> 
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                           
                        </div>
                    </div>
                </section>
                </form>
            </main>

            <Footer/>
            </>
            );
}


export default Interests;