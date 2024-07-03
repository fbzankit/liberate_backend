import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import FooterSignup from '../Footer/FooterSignup'
import images from '../../Utility/Images'
import AuthUserContext from '../../AuthUser/AuthUserContext'
import { ToastContainer,toast } from 'react-toastify';
import { APIService } from '../../ApiServices/Apis/APIServices';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css'
import Context from '../Home/Context/Context'

const ChooseIntrestTwo = () => {
    const authUser = useContext(AuthUserContext)
    const [state, dispatch,globalState, globalDispatch] = useContext(Context);

    const handleChange=(e,id)=>{
        const target = e.target;
        var value = target.value;
       
        if(target.checked){
            dispatch({type:'selectServices',payload:{Type:'selectServices',selectServices:[...state.selectServices,parseInt(value)]}})
        }else if(target.checked==false){
           const value= state.selectServices.indexOf(parseInt(id))
           if(value !== -1){
            state.selectServices.splice(value,1);
           }
           dispatch({type:'selectServices',payload:{Type:'selectServices',selectServices:state.selectServices}})
        }
    }

    const handleFromSubmit=(e)=>{
        e.preventDefault();
    if(state.selectServices?.length>=1&&state.tags?.length>=1){
        let data={
            userId:authUser?.id,
            modality:state.selectServices.toString(),
            speciality:state.tags.toString(),
        }
        APIService.profileStepTwo(data).then((res)=>{
            console.log(res);
            if(res.data.status==200){
                globalDispatch({type:'steps',payload:{Type:'steps',steps:parseInt(globalState.steps)+1}})
                toast.success(res.data.message)
            }
        }).catch((error)=>{

        })

    }else{
        toast.error('please select min 1 service and specialties');
    }

    }
   const handleChangeInput=(tag)=>{
    dispatch({type:'tag',payload:{Type:'tag',tag:tag}})
    
   }
   const handleChangeTags=(tags)=>{
    dispatch({type:'tags',payload:{Type:'tags',tags:tags}})

   }
  const prevButton=()=>{
    globalDispatch({type:'steps',payload:{Type:'steps',steps:parseInt(globalState.steps)-1}})
   }
    console.log(state.selectServices);
    return (
        <>
            <header id="header-sticky" className="header-wrap p-relative">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-sm-12 col-md-6 col-lg-12">
                            <div className="logo-m-nav logo-header">
                                <div className="logo"> <Link to="/"><img src={images.logo} alt="Logo" /></Link> </div>
                                <Link to="/logout">Logout</Link>
                            </div>
                        </div>
                    </div>

                </div>
            </header>
            <main>
            <form onSubmit={handleFromSubmit}>
                <section className="account-settings-area">
                    <div className="container">
                        <div className="p-sec-heading">
                            <div className="row">
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                                    <div className="section-title">
                                        <h2>Please Choose Your Specialities and Modality</h2>
                                    </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                                    <div className="filter-right">
                                        <ul className="d-inline-block ul-row">
                                            <li><strong>Step 2/3</strong></li>
                                            <li><button className="btn solid-btn" type="button" onClick={prevButton}>Back</button></li>
                                            <li><button className="btn" type="submit">Next</button></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="messages-content">
                            <div className="rit-as-sec p-30">
                                <div className="choose-interest-panel">
                                    <div className="form-group">
                                    
                                        <label for="email-address" className="form-label">
                                        <div className="bdr-heading">
                                            <h2> Specialties 
                                            <span class="text-danger"> *</span>
                                            </h2>
                                        </div>
                                        </label>

                                        <TagsInput
                                            value={state.tags}
                                            onChange={handleChangeTags}
                                            inputValue={state.tag}
                                            addKeys={[9,13,188,32]}
                                            onlyUnique={true}
                                            onChangeInput={handleChangeInput}
                                        />
                                        
                                    </div>
                                    <div className="interests-card-list">
                                        <div className="bdr-heading">
                                            <h2>Modality</h2>
                                        </div>
                                        <div className="row">
                                            {state.services.map((res)=>
                                            <div key={res.id} className="col-6 col-sm-6 col-md-6 col-lg-4 col-xl-3">
                                                <div className="interest-single-bx">
                                                    <div className="ck-img-text">
                                                        <label className="lm-ck-bx">
                                                            <div className="single-services">
                                                                <div className="services-icon"> <i className="lb lb-categories-1-icon"></i> </div>
                                                                <div className="services-content">
                                                                    <strong>{res.name}</strong>
                                                                </div>
                                                            </div>
                                                            <div className="interest-ck-bx"> <input type="checkbox" onChange={(e)=>handleChange(e,res.id)} value={res.id} checked={state.selectServices.find((fi)=>fi==res.id)?true:false} /><span className="checkmark"></span></div></label>
                                                    </div>
                                                </div>

                                            </div>)}
                                        </div>
                                        {/* <div className="row">
                                            <div className="col-12">
                                                <div className="load-more-btn text-center"> <Link to="#" className="btn"><i className="lb lb-refresh-icon"></i> Load More</Link> </div>
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
export default ChooseIntrestTwo;