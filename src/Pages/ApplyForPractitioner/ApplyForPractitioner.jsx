import React, { useContext, useRef, useReducer, useEffect, useState } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import ApplyForPractitionerReducer from './ApplyForPractitionerReducer/ApplyForPractitionerReducer';
import ApplyForPractitionerContext from './ApplyForPractitionerContext/ApplyForPractitionerContext';
import { APIService } from '../../ApiServices/Apis/APIServices';
import { toast } from 'react-toastify'
import AuthUserContext from '../../AuthUser/AuthUserContext';
import { Redirect } from 'react-router';
import config from '../../ApiServices/Apis/config';
import GlobalContext from '../../Global/GlobalContext';
import Select from 'react-select';
const initialState = {
    aboutMe:'',
    bio:'',
    reviewLink:'',
    facebook:'',
    linkedin:'',
    twitter:'',
    instagram:'',
    yelp:'',
    category:'',
    service:'',
    description:'',
    documents:[],
    documentsValue:'',
    documentsAll:[],
    certifications:[],
    certificationsValue:'',
    certificationsAll:[],
    fileUploadPreloader:false,
    isAccept:false,
    errorAboutMe:false,
    errorBio:false,
    errorCategory:false,
    errorService:false,
    errorDescription:false,
    errorDocuments:false,
    errorCertifications:false,
    redirect:false,
    servicesList:[],
    
 }

const ApplyForPractitioner = () => {
    const authUser = useContext(AuthUserContext);
    const [globalState, globalDispatch] = useContext(GlobalContext);
    const [state, dispatch] = useReducer(ApplyForPractitionerReducer, initialState);
    const [progress, setProgress] = useState(0)
    const [progressTwo, setProgressTwo] = useState(0)
    const docUpload = useRef(null)
    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        if (name ==="isAccept") {
            dispatch({ type: name, payload: { Type: name, [name]: !state.isAccept } })
        } else {
            dispatch({ type: name, payload: { Type: name, [name]: value } })
        }
    }
    useEffect(() => {
        if(state.category){
            getServices();
        }
       return;
    }, [state.category])
    const getServices=()=>{
        APIService.services({category_id:state.category}).then(res => {
            if(res.data.status==200){
                dispatch({type:'services',payload:{Type:'services',servicesList:res.data.data,service:res?.data?.data[0]?.id}})
            }       
        });
    }
    const HandleFileChangeClick = () => {
        docUpload.current.click();
    }
    const formValidation = () => {
        var condition = true;
        if (state.aboutMe ==='' || state.aboutMe.length < 150) {
            if (state.aboutMe.length < 150) {
                dispatch({ type: 'error', payload: { Type: 'error', errorAboutMe: true } })
                condition = false;
                toast.error('about me  min 150 ')
            }
            if (state.aboutMe ==='') {
                dispatch({ type: 'error', payload: { Type: 'error', errorAboutMe: true } })
                condition = false;
                toast.error('about me is required ')

            }

        }
        if (state.bio || state.bio.length < 150) {
            if (state.bio.length < 150) {
                dispatch({ type: 'error', payload: { Type: 'error', errorBio: true } });
                condition = false;
                toast.error('bio min 150 ')
            }
            if (state.bio ==='') {
                dispatch({ type: 'error', payload: { Type: 'error', errorBio: true } })
                condition = false;
                toast.error('bio is required ')
            }
        }
        if (state.category ==='') {

            dispatch({ type: 'error', payload: { Type: 'error', errorCategory: true } })
            condition = false;
            toast.error('category is required ')

        }
        if (state.service ==='') {
            dispatch({ type: 'error', payload: { Type: 'error', errorService: true } })
            condition = false;
            toast.error('service is required ')


        }
        if (state.description ==='' || state.description.length < 150) {
            if (state.description.length < 150) {
                dispatch({ type: 'error', payload: { Type: 'error', errorDescription: true } })
                condition = false
                toast.error('description min 150  ')

            }
            if (state.description ==='') {
                dispatch({ type: 'error', payload: { Type: 'error', errorDescription: true } })
                condition = false
                toast.error('description is required ')
            }
        }
        if (state.documents.length <= 0) {
            dispatch({ type: 'documents', payload: { Type: 'documents', errorDocuments: true } })
            condition = false
            toast.error('documents is required ')
        }
        if (state.certifications.length <= 0) {
            dispatch({ type: 'certifications', payload: { Type: 'certifications', errorCertifications: true } })
            condition = false
            toast.error('certifications is required ')
        }

        return condition;
    }

    const DocumentsHandleChange = (e) => {

        if (e.target.files.length+state.documentsAll?.length <= 5) {
            dispatch({ type: 'fileUploadPreloader', payload: { Type:'fileUploadPreloader',fileUploadPreloader:true,documentsValue:e.target.value} })

            const form_data = new FormData();
            for (const file of e.target.files) {
                form_data.append('documents', file);
            }
            form_data.append('isDoc', 1);
            APIService.ApplyForPractitionerUploadDocs(form_data,setProgressTwo).then((res) => {
                if (res.data.status == 200 && res.data.success) {
                    setProgressTwo(0)
                    toast.success(res.data.message)
                    const FileIds = []
                    dispatch({ type: 'Documents', payload: { Type: 'Documents',documentsValue:'', documentsAll:[...state.documentsAll,...res.data.data] } })
                    res.data.data.map(res => {
                        FileIds.push(res.id);
                    })

                    dispatch({ type: 'DocumentsIds', payload: { Type: 'DocumentsIds',fileUploadPreloader:false, documents: FileIds } })

                } else {
                    dispatch({ type: 'fileUploadPreloader', payload: { Type:'fileUploadPreloader',fileUploadPreloader:false} })

                    toast.error('something wrong')
                }
                // console.log(res.data,'file');
            }).catch((error) => {
                dispatch({ type: 'fileUploadPreloader', payload: { Type:'fileUploadPreloader',fileUploadPreloader:false} });
            })
        } else {
            dispatch({ type: 'fileUploadPreloader', payload: { Type:'fileUploadPreloader',fileUploadPreloader:false} })

            toast.error('You can upload max 5 files')
        }
        // console.log(e.target.files);

    }
    const CertificationHandleChange = (e) => {
        if (e.target.files.length+state.certificationsAll?.length<= 5) {
            dispatch({ type: 'fileUploadPreloader', payload: { Type:'fileUploadPreloader',fileUploadPreloader:true,certificationsValue:e.target.value} })
            const form_data = new FormData();
            for (const file of e.target.files) {
                form_data.append('documents', file);
            }
            form_data.append('isDoc', 0);
            APIService.ApplyForPractitionerUploadDocs(form_data,setProgress).then((res) => {
                if (res.data.status == 200 && res.data.success) {
                    toast.success(res.data.message)
                    setProgress(0)
                    const FileIds = []
                    dispatch({ type: 'certificationsAll', payload: { Type: 'certificationsAll',certificationsValue:'', certificationsAll:[...state.certificationsAll, ...res.data.data] } })
                    res.data.data.map(res => {
                        FileIds.push(res.id);
                    })
                    dispatch({ type: 'certificationsIds', payload: { Type: 'certificationsIds',fileUploadPreloader:false, certifications: FileIds } })
                    // console.log(res.data,'file  200');
                } else {
                    dispatch({ type: 'fileUploadPreloader', payload: { Type:'fileUploadPreloader',fileUploadPreloader:false} })

                    toast.error('something wrong')
                }
                // console.log(res.data,'file');
            }).catch((error) => {
                dispatch({ type: 'fileUploadPreloader', payload: { Type:'fileUploadPreloader',fileUploadPreloader:false} })

            })
        } else {
            dispatch({ type: 'fileUploadPreloader', payload: { Type:'fileUploadPreloader',fileUploadPreloader:false} })

            toast.error('You can upload max 5 files')
        }
        // console.log(e.target.files);
    }

   const DeleteDocFile=(ids,type)=>{
       
    let data={
        docId:ids
    }
    APIService.ApplyForPractitionerDeleteDocs(data).then((res)=>{
        if(res.data.status==200){
            if(type==="Documents"){
               const docAll= state.documentsAll.filter((re)=>re.id!=ids);      
               const doc= state.documents.filter((re)=>re!=ids); 
               
                dispatch({ type:'delete', payload: { Type:'delete',documentsAll:docAll,documents:doc,documentsValue:''} })
            }else if(type==="Certifications"){
               const certAll= state.certificationsAll.filter((re)=>re.id!=ids);      
               const cert= state.certifications.filter((re)=>re!=ids);
             
                dispatch({ type:'delete', payload: { Type:'delete',certificationsAll:certAll,certifications:cert,certificationsValue:''} })

            }  
            toast.success(res.data.message)
        }
        
    }).catch((error)=>{

    })
   }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (formValidation()) {
            let data = {
                userId: authUser?.id,
                aboutMe: state.aboutMe,
                bio: state.bio,
                facebook: state.facebook,
                twitter: state.twitter,
                instagram: state.instagram,
                yelp: state.yelp,
                linkedin: state.linkedin,
                review_link: state.reviewLink,
                service: state.service,
                category: state.category,
                description: state.description,
                certifications: state.certifications.toString(),
                documents: state.documents.toString(),
            }
            APIService.ApplyForPractitioner(data).then((res) => {
                console.log(res, 'app');
                if (res.data.status == 200) {
                    toast.success('Your form has been sent successfully. You will get an email notification from the admin after reviewing your application.')
                   dispatch({type:'redirect',payload:{Type:'redirect',redirect:true}})
                }
            }).catch((error) => {
                console.log(error);
            })
        }
    }

    const CategoryOptions = []
    globalState.categories.map((res)=>
        CategoryOptions.push({value:res.id,label:res.name})
    )
    const ServiceOptions = []
    state.servicesList.map((res)=>
        ServiceOptions.push({value:res.id,label:res.name})
    )
   const changeCategory=(e)=>{
    dispatch({ type: 'category', payload: { Type: 'category', category: e.value ,service:'choose'} })
    }
    const changeService=(e)=>{
        dispatch({ type: 'service', payload: { Type: 'service', service: e.value } })
    }
    if (state.redirect||authUser?.is_parctitioner === "1" || authUser?.is_parctitioner == 1) {
       if(state.redirect){
            return <Redirect to="/home" />
       }else{
            return <Redirect to="/home" />
       }
           
    }
    console.log(state,'state');
    return (
        <>
            <ApplyForPractitionerContext.Provider value={[state, dispatch]}>
                <Header />
                <main>
                    <section className="account-settings-area">
                        <div className="container">
                            <div className="p-sec-heading">
                                <div className="section-title">
                                    <h2>Apply For Practitioner</h2>
                                </div>
                            </div>
                            <div className="apply-for-practitioner-content">
                                <form onSubmit={handleFormSubmit}>
                                    <div className="practitioner-s-bx bdr-btm">
                                        <div className="row">

                                            <div className="col-12 form-group">
                                                <label htmlFor="email-address" className="form-label">About Me  <span className="text-danger">*</span></label>
                                                <textarea className={`form-control ${state.errorAboutMe ? state.aboutMe?.length == 0 ? "is-invalid" : '' : ''} ${state.aboutMe?.length == 0 ? '' : state.aboutMe?.length >= 150 ? 'border-success' : 'border-danger'}`} name="aboutMe" onChange={handleChange} placeholder="Type Here..." value={state.aboutMe}>{state.aboutMe}</textarea>
                                                <div className="input-btm-note">
                                                    <span className="float-left">Minimum 150 Characters</span>
                                                    <span className="float-right">150/{state.aboutMe?.length} </span>
                                                </div>
                                            </div>
                                            <div className="col-12 form-group">
                                                <label htmlFor="email-address" className="form-label">Bio  <span className="text-danger">*</span></label>
                                                <textarea className={`form-control ${state.errorBio ? state.bio?.length <= 0 ? "is-invalid" : '' : ''} ${state.bio?.length == 0 ? '' : state.bio?.length >= 150 ? 'border-success' : 'border-danger'}`} name="bio" onChange={handleChange} placeholder="Type Here..." value={state.bio}>{state.bio}</textarea>
                                                <div className="input-btm-note">
                                                    <span className="float-left">Minimum 150 Characters</span>
                                                    <span className="float-right">150/{state.bio?.length} </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="practitioner-s-bx bdr-btm">
                                        <div className="row">
                                            <div className="col-sm-6 col-md-6 col-lg-6 form-group">
                                                <label htmlFor="service-name" className="form-label">Please input your reviews website link</label>
                                                <div className="plus-add-input-bx">
                                                    <input type="text" onChange={handleChange} name="reviewLink" className="form-control" placeholder="Past Your Review Link" value={state.reviewLink} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="practitioner-s-bx bdr-btm">
                                        <div className="up-gray-heading">
                                            <strong>Social Media</strong>
                                        </div>
                                        <div className="row">
                                            <div className="col-12 col-sm-6 form-group">
                                                <div className="social-input-connect input-facebook">
                                                    <span className="social-icon-input"> <i className="fa fa-facebook" aria-hidden="true"></i>  </span>
                                                    <input type="text" className="form-control" name="facebook" onChange={handleChange} placeholder="https://www.facebook.com/username" value={state.facebook} />
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-6 form-group">
                                                <div className="social-input-connect input-linkedin">
                                                    <span className="social-icon-input"> <i className="fa fa-linkedin" aria-hidden="true"></i>  </span>
                                                    <input type="text" className="form-control" name="linkedin" onChange={handleChange} placeholder="https://www.linkedin.com/username" value={state.linkedin} />
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-6 form-group">
                                                <div className="social-input-connect input-twitter">
                                                    <span className="social-icon-input"> <i className="fa fa-twitter" aria-hidden="true"></i>  </span>
                                                    <input type="text" className="form-control" name="twitter" onChange={handleChange} placeholder="https://twitter.com/username" value={state.twitter} />
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-6 form-group">
                                                <div className="social-input-connect input-instagram">
                                                    <span className="social-icon-input"> <i className="fa fa-instagram" aria-hidden="true"></i></span>
                                                    <input type="text" className="form-control" name="instagram" onChange={handleChange} placeholder="https://www.instagram.com/username" value={state.instagram} />
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-6 form-group">
                                                <div className="social-input-connect input-google-plus">
                                                    <span className="social-icon-input"> <i className="fa fa-yelp" aria-hidden="true"></i></span>
                                                    <input type="text" className="form-control" name="yelp" onChange={handleChange} placeholder="https://www.yelp.com/username" value={state.yelp} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="practitioner-s-bx bdr-btm">
                                        <div className="up-gray-heading">
                                            <strong>Add Services</strong> &nbsp;(You will be able to add more services once you get approved by the admin)
                                        </div>
                                        <div className="p-add-service-bx bdr-btm">
                                            <div className="row">
                                                <div className="col-sm-6 col-md-6 col-lg-6 form-group">
                                                    <label htmlFor="service-name" className="form-label">Category  <span className="text-danger">* {state.errorCategory ? 'choose category' : ''}</span></label>
                                                    {/* <Select
                                                        closeMenuOnSelect={true}
                                                        isMulti={false}
                                                        
                                                        options={CategoryOptions}
                                                        onChange={changeCategory}
                                                    /> */}
                                                   
                                                    <select name="category" className={`bdr-radius-five ${state.errorCategory ? "is-invalid" : ''}`} onChange={handleChange}>
                                                        <option value="select category" disabled={true} selected={true}>select category</option>
                                                        {globalState.categories.map((res)=>
                                                                 <option key={res.id} value={res.id}>{res.name}</option>
                                                        )}
                                                    </select>
                                                </div>
                                                <div className="col-sm-6 col-md-6 col-lg-6 form-group">
                                                    <label htmlFor="service-name" className="form-label">Service <span className="text-danger">* {state.errorService ? 'choose service' : ''}</span></label>
                                                    {/* <Select
                                                        closeMenuOnSelect={true}
                                                        isMulti={false}
                                                        options={ServiceOptions}
                                                        defaultValue={[{value:'3',label:'hike'}]}
                                                        onChange={changeService}
                                                    /> */}
                                                    <select name="service" className={`bdr-radius-five ${state.errorService ? "is-invalid" : ''}`} onChange={handleChange} value={state.service}>
                                                        <option value="select service" disabled={true} selected={true}>select service</option>
                                                        {state.servicesList.map((res)=>
                                                                 <option key={res.id} value={res.id}>{res.name}</option>
                                                        )}
                                                    </select>
                                                </div>
                                                <div className="col-12">
                                                    <label htmlFor="email-address" className="form-label">Description  <span className="text-danger">*</span></label>
                                                    <textarea className={`form-control ${state.errorDescription ? state.description?.length == 0 ? "is-invalid" : '' : ''} ${state.description?.length == 0 ? '' : state.description?.length >= 150 ? 'border-success' : 'border-danger'}`} name="description" onChange={handleChange} placeholder="Type Here..." value={state.description}>{state.description}</textarea>
                                                    <div className="input-btm-note">
                                                        <span className="float-left">Minimum 150 Characters</span>
                                                        <span className="float-right">150/{state.description?.length}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <div className="payment-card-add">
                                        <div className="cmn-new-toggle">
                                            <div id="add-card" className="add-card-form bdr-btm" style={{display: 'none'}}>
                                                <div className="row">
                                                    <div className="col-sm-6 col-md-6 col-lg-6 form-group">
                                                        <label htmlFor="service-name" className="form-label">Category</label>
                                                        <select name="options" onChange={handleChange} className="bdr-radius-five">
                                                            <option value="category_one">Category One</option>
                                                            <option value="category_one">Category One</option>
                                                            <option value="category_one">Category One</option>
                                                            <option value="category_one">Category One</option>
                                                        </select>
                                                    </div>
                                                    <div className="col-sm-6 col-md-6 col-lg-6 form-group">
                                                        <label htmlFor="service-name" className="form-label">Service</label>
                                                        <select name="options" onChange={handleChange} className="bdr-radius-five">
                                                            <option value="category_one">Service One</option>
                                                            <option value="category_one">Service One</option>
                                                            <option value="category_one">Service One</option>
                                                            <option value="category_one">Category One</option>
                                                        </select>
                                                    </div>
                                                    <div className="col-12 form-group">
                                                        <label htmlFor="email-address" className="form-label">Description</label>
    <textarea className="form-control"  onChange={handleChange} placeholder="Type Here..." value={state.description}>{state.description}</textarea>
                                                        <div className="input-btm-note">
                                                            <span className="float-left">Minimum 150 Characters</span>
                                                            <span className="float-right">0/150 </span>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6 col-md-6 col-lg-6">
                                                        <a className="btn-link p-s-remove" href="#"><i className="lb lb-cancel-icon"></i> Remove Service</a>
                                                    </div> 
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}
                                        {/* <div className="add-more-service-btn">
                                        <button type="button" className="btn" value="Show/Hide" onclick="showHideDiv('add-card')"> <i className="lb lb-plush-icon"></i> Add More Service</button>
                                    </div> */}
                                    </div>
                                    <div className="practitioner-s-bx upload-documents-bx">
                                        <div className="row">
                                            <div className="col-sm-6 col-md-6 col-lg-6">
                                                <div className="form-group">
                                                    <label htmlFor="service-name" className="form-label">Certifications / Licenses  <span className="text-danger">* {state.errorCertifications ? "Required" : ''}</span></label>
                                                    <div className="upload-file">
                                                        <label className="file-upload" htmlFor="file-upload">
                                                            <strong>Drop more file(s) here or <p>browse</p> <br />max. File Size: 200mb</strong>
                                                            <input type="file" id="file-upload" accept="image/*" onChange={CertificationHandleChange} multiple={true} value={state.certificationsValue}/>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6 col-md-6 col-lg-6">
                                                <div className="form-group">
                                                    <div className="form-control upload-process-bx">
                                                        <strong>Uploading</strong>
                                                    </div>
                                                    <div className="uploaded-files-list">
                                                    {progress>0?<div class="progress image-uploading-progress">
                                                        <div class="progress-done" id="progress-one" data-done={`${progress}%`} style={{opacity: 1, width: `${progress}%`}}>
                                                        {`${progress}%`}
                                                        </div>
                                                    </div>:''}
                                                        <ul className="ul-row">
                                                            {state.certificationsAll.map((res) =>
                                                                <li key={res.id}>
                                                                    <figure className="upload-s-img">
                                                                        <img src={config.imageBaseurl+res.file} alt="" />
                                                                        <a className="remove-file-btn" href={void(0)} onClick={()=>DeleteDocFile(res.id,'Certifications')}><i className="lb lb-delete-icon"></i></a></figure>
                                                                </li>
                                                            )}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="practitioner-s-bx upload-documents-bx">
                                        <div className="form-group">
                                            <label className="form-label">"Please Provide Us With Some Supporting Links/Document Of Your Testimonials. Which May Help Us To Approve Your Account"</label>
                                        </div>
                                    </div>
                                    <div className="practitioner-s-bx upload-documents-bx bdr-btm">
                                        <div className="row">
                                            <div className="col-sm-6 col-md-6 col-lg-6">
                                                <div className="form-group">
                                                    <label htmlFor="service-name" className="form-label">Supporting Documents <span className="text-danger">* {state.errorDocuments ? "Required" : ''}</span></label>
                                                    <div className="upload-file" onClick={HandleFileChangeClick}>
                                                            <label className="file-upload" htmlFor="doc">
                                                                <strong>Drop more file(s) here or <p>browse</p> <br />max. File Size: 200mb</strong>
                                                                <input type="file" ref={docUpload} id="file-upload" onChange={DocumentsHandleChange} accept=".txt,text/plain,.pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" multiple={true} value={state.documentsValue}/>
                                                            </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6 col-md-6 col-lg-6">
                                                <div className="form-group">
                                                    <div className="form-control upload-process-bx">
                                                        <strong>Uploading</strong>
                                                    </div>
                                                    <div className="uploaded-files-list">
                                                    {progressTwo>0?<div class="progress image-uploading-progress">
                                                        <div class="progress-done" id="progress-one" data-done={`${progressTwo}%`} style={{opacity: 1, width: `${progressTwo}%`}}>
                                                        {`${progressTwo}%`}
                                                        </div>
                                                    </div>:''}
                                                        <ul className="ul-row">
                                                            {state.documentsAll.map((res) =>
                                                                <li key={res.id}>
                                                                    {/* <figure className="upload-s-img"> */}
                                                                        <span>{res.name}
                                                                            <a className="p-2" href={void(0)} onClick={()=>DeleteDocFile(res.id,'Documents')}>
                                                                                <i className="lb lb-delete-icon"></i>
                                                                            </a>
                                                                        </span>
                                                                    {/* </figure> */}
                                                                </li>
                                                            )}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="practitioner-s-bx tnc-modal-btn">
                                        <ul className="ul-row float-right">
                                            <li><label className="lm-ck-bx"><a href="#tnc-modal" data-toggle="modal"> I Agree</a><input type="checkbox" onChange={handleChange} name="isAccept" checked={state.isAccept} />
                                                <span className="checkmark"></span>
                                            </label></li>
                                            <li>
                                                <button type="submit" className="btn" disabled={state.isAccept ? false : true}>Submit for approval</button>
                                            </li>
                                        </ul>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </section>
                </main>
                <Footer />
            </ApplyForPractitionerContext.Provider>
        </>
    );
}


export default ApplyForPractitioner;