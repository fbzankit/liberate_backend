
import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import FooterSignup from '../Footer/FooterSignup'
import config from '../../ApiServices/Apis/config';
import { APIService } from '../../ApiServices/Apis/APIServices';
import images from '../../Utility/Images';
import AuthUserContext from '../../AuthUser/AuthUserContext';
import { ToastContainer,toast } from 'react-toastify';
import Context from '../Home/Context/Context';
const baseUrl = config.baseurl;

const ChooseIntrestOne = () => {
    const authUser = useContext(AuthUserContext)
    const [state, dispatch,globalState, globalDispatch] = useContext(Context);

    const handleChange=(e,id)=>{
        const target = e.target;
        var value = target.value;
        if(target.checked){
            dispatch({type:'selectCategories',payload:{Type:'selectCategories',selectCategories:[...state.selectCategories,parseInt(value)]}})
        }else if(target.checked==false){
           const value= state.selectCategories.indexOf(parseInt(id))
           if(value !== -1){
            state.selectCategories.splice(value,1);
           }
           dispatch({type:'selectCategories',payload:{Type:'selectCategories',selectCategories:state.selectCategories}})
        }
    }

    const handleFromSubmit=(e)=>{
        e.preventDefault();
       
        if(state.selectCategories?.length>=1){
            let data={
                userId:authUser?.id,
                category:state.selectCategories.toString()
            }
            APIService.profileStepOne(data).then((res)=>{
                console.log(res)
                if(res.data.status==200){
                    globalDispatch({type:'steps',payload:{Type:'steps',steps:parseInt(globalState.steps)+1}})
                    toast.success(res.data.message)
                }
            }).catch((error)=>{

            })
        }else{
            toast.error('please select min 1 category');
        }

    }
   
    console.log(state,globalState);
    return (
        <>
            <header id="header-sticky" class="header-wrap p-relative">
                <div class="container">
                    <div class="row align-items-center">
                        <div class="col-sm-12 col-md-6 col-lg-12">
                            <div class="logo-m-nav logo-header">
                                <div class="logo"> <Link to="/"><img src={images.logo} alt="Logo" /></Link> </div>
                                <Link to="/logout">Logout</Link>
                            </div>
                        </div>
                    </div>

                </div>
            </header>
            <main>
            <form onSubmit={handleFromSubmit}>
                <section class="account-settings-area">
                    <div class="container">
                        <div class="p-sec-heading">
                            <div class="row">
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                                    <div class="section-title">
                                        <h2>Please Choose Your Categories </h2>
                                    </div>
                                </div>
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                                    <div class="filter-right">
                                        <ul class="d-inline-block ul-row">
                                            <li><strong>Step 1/3</strong></li>
                                            <li><button type="submit" class="btn" >Next</button></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="messages-content">
                            <div class="rit-as-sec p-30">
                                <div class="choose-interest-panel">
                                    <div class="interests-card-list">
                                        <div class="row">
                                            {state.categories.map((res) =>
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
                                                                <div class="interest-ck-bx"> <input type="checkbox" onChange={(e)=>handleChange(e,res.id)} value={res.id} checked={state.selectCategories.find((fi)=>fi==res.id)?true:false} /><span class="checkmark"></span></div></label>
                                                        </div>
                                                    </div>

                                                </div>
                                            )}
                                        </div>


                                        {/* <div class="row">
                                            <div class="col-12">
                                                <div class="load-more-btn text-center"> <Link to="#" class="btn"><i class="lb lb-refresh-icon"></i> Load More</Link> </div>
                                            </div>
                                        </div> */}
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                </form>
            </main>


            <FooterSignup />
        </>
    )
}
export default ChooseIntrestOne;