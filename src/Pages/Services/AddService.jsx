import React, { useRef, useState } from 'react';
import SideBar from '../SideBar/DashboardSideBar';
import { useContext } from 'react';
import ServicesContext from './ServicesContext/ServicesContext';
import AuthUserContext from '../../AuthUser/AuthUserContext';
import GlobalContext from '../../Global/GlobalContext';
import { toast, ToastContainer } from 'react-toastify';
import { Redirect } from 'react-router';
import { APIService } from '../../ApiServices/Apis/APIServices';
import config from  '../../ApiServices/Apis/config';

const AddService = ({getServiceList}) => {
    const [state, dispatch] = useContext(ServicesContext)
    const authUser = useContext(AuthUserContext);
    const [globalState, globalDispatch] = useContext(GlobalContext);
    const [progress, setProgress] = useState(0)
    const [progressTwo, setProgressTwo] = useState(0)
    const docUpload = useRef(null)
    const certificateUpload = useRef(null)
    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        if (name == "isAccept") {
            dispatch({ type: name, payload: { Type: name, [name]: !state.isAccept } })
        }else if(name=="participate"){
            dispatch({ type: name, payload: { Type: name, [name]: !state.participate } })
        } else {
            dispatch({ type: name, payload: { Type: name, [name]: value } })
        }

    }
    const HandleFileChangeClick = (type) => {
        if(type==="certificateUpload"){
            certificateUpload.current.click()
        }else{
            docUpload.current.click();
        }
    }
    const formValidation = () => {
        var condition = true;
        if (state.category == '') {

            dispatch({ type: 'error', payload: { Type: 'error', errorCategory: true } })
            condition = false;
            toast.error('category is required ')

        }
        if (state.service == '') {
            dispatch({ type: 'error', payload: { Type: 'error', errorService: true } })
            condition = false;
            toast.error('service is required ')


        }
        if (state.description == '' || state.description.length < 150) {
            if (state.description.length < 150) {
                dispatch({ type: 'error', payload: { Type: 'error', errorDescription: true } })
                condition = false
                toast.error('description min 150  ')

            }
            if (state.description == '') {
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
            dispatch({ type: 'fileUploadPreloader', payload: { Type:'fileUploadPreloader',fileUploadPreloader:true} })

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
                    dispatch({ type: 'Documents', payload: { Type: 'Documents', documentsAll:[...state.documentsAll,...res.data.data] } })
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
            toast.error('max 5 file selected')
        }
        // console.log(e.target.files);

    }
    const CertificationHandleChange = (e) => {

        if (e.target.files.length+state.certificationsAll?.length<= 5) {
            dispatch({ type: 'fileUploadPreloader', payload: { Type:'fileUploadPreloader',fileUploadPreloader:true} })

            const form_data = new FormData();
            for (const file of e.target.files) {
                form_data.append('documents', file);
            }
            form_data.append('isDoc', 0);
            APIService.ApplyForPractitionerUploadDocs(form_data,setProgress).then((res) => {
                if (res.data.status == 200 && res.data.success) {
                    setProgress(0)
                    toast.success(res.data.message)
                    const FileIds = []
                    dispatch({ type: 'certificationsAll', payload: { Type: 'certificationsAll', certificationsAll:[...state.certificationsAll, ...res.data.data] } })
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

            toast.error('max 5 file selected')
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
               
                dispatch({ type:'delete', payload: { Type:'delete',documentsAll:docAll,documents:doc} })
            }else if(type==="Certifications"){
               const certAll= state.certificationsAll.filter((re)=>re.id!=ids);      
               const cert= state.certifications.filter((re)=>re!=ids);
             
                dispatch({ type:'delete', payload: { Type:'delete',certificationsAll:certAll,certifications:cert} })

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
                serviceId: state.service,
                categoryId: state.category,
                participate: state.participate?'1':'0',
                description: state.description,
                certifications: state.certifications.toString(),
                documents: state.documents.toString(),
                isAccept: state.isAccept,
            }
            APIService.dashboardAddServices(data).then((res) => {
                
                if (res.data.status == 200) {
                    toast.success(res.data.message)
                    getServiceList();
                   dispatch({type:'Service',payload:{
                       Type:'Service',
                       currentAction:'Service',
                       service: '',
                       category:'',
                       participate:0,
                       description:'',
                       certifications:[],
                       documentsAll:[],
                       documents:[],
                       certificationsAll:[],
                       isAccept: false,
                       editExtendDuration:[],
                       editExtendDurationTime:'30',
                       editExtendDurationCost:'0',
                       editVariationCost:[],
                       editVariationCostTime:'60',
                       editVariationCostCost:'0',
                    }})
                }
            }).catch((error) => {
                console.log(error);
            })
        }
    }

    return (
        <>
            <main>
                <section className="account-settings-area">
                    <div className="container">
                        <div className="p-sec-heading">
                            <div className="row">
                                <div className="col-12">
                                    <div className="section-title">
                                        <h2>Add service</h2>
                                        <p>Add a service on your account to get approved from admin.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="account-settings-content">
                            <SideBar />
                            <div className="rit-as-sec">

                                <div className="add-service-bx">
                                    <div className="bdr-heading">
                                        <h2><button type="button" onClick={() => dispatch({ type: 'Service', payload: { Type: 'Service', currentAction: 'Service' } })} className="btn cricle-btn" ><i className="lb lb-back-icon"></i></button> Add Service</h2>
                                    </div>
                                    <div className="cmn-form">
                                        <form onSubmit={handleFormSubmit}>
                                            <div className="add-service-box bdr-btm">
                                                <div className="row">
                                                    <div className="col-sm-12 col-md-12 col-lg-6 form-group">
                                                            <label for="service-name" className="form-label">Category  <span className="text-danger">* {state.errorCategory ? 'choose category' : ''}</span></label>
                                                            <select name="category" className={`bdr-radius-five ${state.errorCategory ? "is-invalid" : ''}`} onChange={handleChange}>
                                                                <option value="choose" disabled={true} selected={true}>choose</option>
                                                                {globalState.categories.map((res)=>
                                                                        <option key={res.id} value={res.id}>{res.name}</option>
                                                                )}
                                                            </select>
                                                    </div>
                                                    <div className="col-sm-12 col-md-12 col-lg-6 form-group">
                                                    <label for="service-name" className="form-label">Service <span className="text-danger">* {state.errorService ? 'choose service' : ''}</span></label>
                                                    <select name="service" className={`bdr-radius-five ${state.errorService ? "is-invalid" : ''}`} onChange={handleChange}>
                                                        <option value="choose" disabled={true} selected={true}>choose</option>
                                                        {state.services.map((res)=>
                                                            <option key={res.id} value={res.id}>{res.name}</option>
                                                        )}
                                                    </select>
                                                    </div>
                                                    <div className="col-12 form-group">
                                                    <label for="email-address" className="form-label">Description  <span className="text-danger">*</span></label>
                                                    <textarea className={`form-control ${state.errorDescription ? state.description?.length == 0 ? "is-invalid" : '' : ''} ${state.description?.length == 0 ? '' : state.description?.length >= 150 ? 'border-success' : 'border-danger'}`} name="description" onChange={handleChange} placeholder="Type Here..." value={state.description}>{state.description}</textarea>
                                                    <div className="input-btm-note">
                                                        <span className="float-left">Minimum 150 Characters</span>
                                                        <span className="float-right">150/{state.description?.length}</span>
                                                    </div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="add-service-box bdr-btm">
                                                <div className="up-gray-heading">
                                                    <strong>Certifications</strong>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-12 col-md-12 col-lg-6 form-group">
                                                        <div className="upload-file">
                                                            <label className="file-upload" for="file-upload" onClick={()=>HandleFileChangeClick('certificateUpload')}>
                                                                <strong>Uploading document</strong> 
                                                                <span><i className="lb lb-attachment-icon"></i></span>
                                                                <input type="file" ref={certificateUpload} accept="image/*" style={{position: 'absolute',left: '-9999px'}} onChange={CertificationHandleChange} multiple={true}/>
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-12 col-md-12 col-lg-6">
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
                                            <div className="add-service-box bdr-btm">
                                                <p className="s-d-p">"Please provide us with some supporting links/document of your testimonials. which may help us to approve your account"</p>
                                                <div className="up-gray-heading">
                                                    <strong>Supporting documents</strong>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-12 col-md-12 col-lg-6 form-group">
                                                        <div className="upload-file" onClick={()=>HandleFileChangeClick('docUpload')}>
                                                            <label className="file-upload" for="file-upload"><strong>Uploading document</strong> <span><i className="lb lb-attachment-icon"></i></span>
                                                            <input type="file" ref={docUpload}  style={{position: 'absolute',left: '-9999px'}} onChange={DocumentsHandleChange} accept=".txt,text/plain,.sql,.pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" multiple={true}/>
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-12 col-md-12 col-lg-6">
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
                                                    <div className="col-sm-12">
                                                        <div className="form-group"><label className="lm-ck-bx">Participate In Company Offered Discounts
                                                        <input type="checkbox" onChange={handleChange} name="participate" checked={state.participate} /> <span className="checkmark"></span>
                                                        </label> </div> 
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <div className="form-group">
                                                        <label className="lm-ck-bx agree-tnc">I Agree With The Terms And Conditions
                                                        <input type="checkbox" onChange={handleChange} name="isAccept" checked={state.isAccept} /><span className="checkmark"></span></label>
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className="form-group text-right">
                                                        <button type="submit" className="btn solid-btn" disabled={state.isAccept ? false : true}>Submit for approval</button>
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
        </>
    );
}
export default AddService;