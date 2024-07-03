import React, { useContext, useState, useEffect } from 'react'
import { Link, Redirect, useHistory } from 'react-router-dom'

import FooterSignup from '../Footer/FooterSignup'
import images from '../../Utility/Images'
import AuthUserContext from '../../AuthUser/AuthUserContext'
import { ToastContainer, toast } from 'react-toastify'
import { APIService } from '../../ApiServices/Apis/APIServices'
import TagsInput from 'react-tagsinput';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import Select from 'react-select';
import PhoneInput from 'react-phone-number-input';
import $ from 'jquery';
import CropperModal from '../UserProfile/Components/CropperModal/CropperModal'
import Context from '../Home/Context/Context'


const ChooseIntrestThree = () => {
    const authUser = useContext(AuthUserContext)
    const history = useHistory();
    const [state, dispatch, globalState, globalDispatch] = useContext(Context);
    const [value, setValue] = useState(state.location);
    useEffect(() => {
        dispatch({ type: 'location', payload: { Type: 'location', location: value } })
        return;
    }, [value])
    const handleChange = (e) => {
        const name = e.target.name;
        var value = e.target.value;
        if (name == "phone") {
            if (validatePhoneNumber(value)) {
                dispatch({ type: name, payload: { Type: name, [name]: value } });
            }
        } else {
            dispatch({ type: name, payload: { Type: name, [name]: value } });
        }
    }
    const handleChangePhone = (number) => {
        dispatch({ type: 'phone', payload: { Type: 'phone', phone: number } });
    }
    const handleProfileUpload = (e) => {
        setTimeout(() => {
            dispatch({ type: 'tempImage', payload: { Type: 'tempImage', croppieImage: [], profileImage: e } });
            $('#upload-images-popup').modal('hide');
        }, 100);
    }
    const dispatchHandle=(Ojb)=>{
        dispatch(Ojb);
    }

    const handleFromSubmit = (e) => {
        e.preventDefault();
        globalDispatch({ type: 'preloader', payload: { Type: 'preloader', preloader: true } })
        if (handleFromSubmitValidation()) {
            const form_data = new FormData();
            form_data.append('image', state.profileImage, state.profileImage.name);
            form_data.append('userId', authUser?.id);
            form_data.append('name', state.name);
            form_data.append('location', JSON.stringify(state.location));
            form_data.append('language', JSON.stringify(state.languageTags));
            form_data.append('phone', state.phone);
            form_data.append('gender', state.gender);
            APIService.profileStepThree(form_data).then((res) => {
                if (res.data.status == 200) {
                    
                        APIService.authUser().then((res)=>{
                            if(res?.data?.status==200){
                               localStorage.setItem('_cu',JSON.stringify(res?.data?.data));
                               globalDispatch({type:'steps',payload:{Type:'steps',steps:parseInt(globalState.steps)+2}})
                               history.push('/home');
                          
                            }
                          }).catch((error)=>{
                            
                          });
                    
                    
                    setTimeout(() => {
                        
                        globalDispatch({ type: 'preloader', payload: { Type: 'preloader', preloader: false } })
                    }, 5000);
                    toast.success('Welcome to liberate')
                } else {
                    globalDispatch({ type: 'preloader', payload: { Type: 'preloader', preloader: false } })
                    toast.error(res.data.message)
                }

            })
                .catch((error) => {
                    globalDispatch({ type: 'preloader', payload: { Type: 'preloader', preloader: false } })

                })

        } else {
            globalDispatch({ type: 'preloader', payload: { Type: 'preloader', preloader: false } })
        }
    }
    const handleFromSubmitValidation = () => {
        let condition = true;
        if (state.languageTags?.length < 1) {
            condition = false
            toast.error('please choose the language...');
        }
        if (state.phone === '') {
            condition = false
            toast.error('please enter the phone number...');
        }
        if (state.location === '') {
            condition = false
            toast.error('please enter the  location...');
        }
        if (state.name === '') {
            condition = false
            toast.error('please enter the  name...');
        }
        if (state.gender === '') {
            condition = false
            toast.error('please choose your gender...');
        }
        if (state.profileImage === '' || state.profileImage === null) {
            condition = false
            toast.error('please choose your profile image...');
        }
        return condition;
    }

    const languageChange = (obj) => {
        let languageArray = [];
        if (obj?.length > 0) {
            obj.map((res) =>
                languageArray.push({ value: res.value, label: res.value })
            )
        }
        dispatch({ type: 'language', payload: { Type: 'language', languageTags: languageArray } })
    }
    const prevButton = () => {
        globalDispatch({type:'steps',payload:{Type:'steps',steps:parseInt(globalState.steps)-1}})
    }
    const removeTempImage = () => {
        dispatch({ type: 'tempImage', payload: { Type: 'tempImage', croppieImageBase64: null, tempImage: '', profileImageValue: '', profileImages: [] } })
        // $('#file-upload').value('');
    }
    const options = []
    globalState.globalLanguages.map((lang) =>
        options.push({ value: lang.name, label: lang.name })
    )
    const validatePhoneNumber = (number) => {
        let isValidPhoneNumber = !isNaN(number)
        if (number.length > 15) {
            isValidPhoneNumber = false
        }
        return (isValidPhoneNumber)
    }
    return (
        <>
            {globalState.preloader ?
                <div id="preloader">
                    <div className="preloader"> <span></span> <span></span> </div>
                </div> : ''}
            <header id="header-sticky" className="header-wrap p-relative">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-sm-12 col-md-6 col-lg-12">
                            <div className="logo-m-nav logo-header">
                                <div className="logo">
                                    <Link to="/"><img src={images.logo} alt="Logo" /></Link>
                                </div>
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
                                            <h2>Update Profile Info <p className="text-danger">(All fields are mandatory)</p></h2>

                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                                        <div className="filter-right">
                                            <ul className="d-inline-block ul-row">
                                                <li><strong>Step 3/3</strong></li>
                                                <li><button className="btn" type="button" onClick={prevButton}>Back</button></li>
                                                <li><button type="submit" className="btn solid-btn">Finish</button></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="messages-content">
                                <div className="rit-as-sec p-30">
                                    <div className="choose-interest-panel">
                                        <div className="upload-images-form">
                                            <div className="bdr-heading">
                                                <h2>Profile Image</h2>
                                            </div>
                                            <div className="row">
                                                <div className="col-sm-6 col-md-6 col-lg-6 form-group">
                                                    {/* <div className="upload-file" >
                                                        <label className="file-upload" for="file-upload"><strong>Upload Profile Image</strong> <span>
                                                        <button type="button" data-backdrop="static" data-keyboard="false" data-toggle="modal" data-target="#upload-images-popup" data-dismiss="modal" className="btn btn-default profile-pic-update-btn"><i className="fa fa-camera"></i></button>
                                                        </span>
                                                            <input type="file" onChange={handleFile} accept="image/*" id="file-upload" value={state.profileImageValue} /> 
                                                            </label>
                                                    </div> */}
                                                    <div className="top-profile-bx">
                                                        <figure className="ac-p-pic">
                                                            <img src={state?.croppieImageBase64 ? state?.croppieImageBase64 : images.profileAvatar} alt={authUser?.name} title={authUser?.name} />
                                                        </figure>
                                                        <button type="button" data-backdrop="static" data-keyboard="false" data-toggle="modal" data-target="#upload-images-popup" data-dismiss="modal" className="btn btn-default profile-pic-update-btn"><i className="fa fa-camera"></i></button>


                                                    </div>
                                                </div>
                                                <div className="col-sm-6 col-md-6 col-lg-6 form-group">
                                                    <div className="uploaded-files-list">
                                                        {/* <ul className="ul-row">
                                                            {state.tempImage ?
                                                                <li>
                                                                    <figure className="upload-s-img">
                                                                        <img src={state.tempImage} alt="" />
                                                                        <button type="button" onClick={removeTempImage} className="remove-file-btn" to="#"><i className="lb lb-delete-icon"></i></button>
                                                                    </figure>
                                                                </li> : ''}
                                                        </ul> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="basic-info-bx">
                                            <div className="bdr-heading">
                                                <h2>Basic Info</h2>
                                            </div>
                                            <div className="cmn-form">
                                                <form>
                                                    <div className="row">
                                                        <div className="col-sm-6 col-md-6 col-lg-6 form-group">
                                                            <label for="email-address" className="form-label">Name</label>
                                                            <input type="text" className="form-control" name="name" onChange={handleChange} placeholder="Name" value={state.name} required />
                                                        </div>

                                                        <div className="col-sm-6 col-md-6 col-lg-6 form-group">
                                                            <label for="email-address" className="form-label">Email address</label>
                                                            <input type="email" className="form-control" placeholder="" value={authUser?.email} readOnly />
                                                        </div>
                                                        <div className="col-sm-6 col-md-6 col-lg-6 form-group">
                                                            <label for="email-address" className="form-label">Location</label>
                                                
                                                            <GooglePlacesAutocomplete
                                                                apiKey="AIzaSyAMgoOeoC_NJBdQMTMhy1tZQtZaSv3Wxps"
                                                                    selectProps={{
                                                                        value,
                                                                        onChange: setValue,
                                                                    }}
                                                                />
                                                            {/* <input type="text" className="form-control" name="location" onChange={handleChange} placeholder="Location india,delhi" value={state.location} required /> */}
                                                        </div>

                                                        <div className="col-sm-6 col-md-6 col-lg-6 form-group">
                                                            <label for="email-address" className="form-label">Gender</label>
                                                            <div className="profile-gender">
                                                                <ul className="ul-row">
                                                                    <li>
                                                                        <label className="radiobox">Male <input type="radio" name="gender" onChange={handleChange} checked={state.gender == 'm' ? true : false} value="m" />
                                                                            <span className="checkmark"></span>
                                                                        </label>
                                                                    </li>
                                                                    <li>
                                                                        <label className="radiobox">Female <input type="radio" name="gender" onChange={handleChange} checked={state.gender == 'f' ? true : false} value="f" />
                                                                            <span className="checkmark"></span>
                                                                        </label>
                                                                    </li>
                                                                    <li>
                                                                        <label className="radiobox">Non Binary <input type="radio" name="gender" onChange={handleChange} checked={state.gender == 'nb' ? true : false} value="nb" />
                                                                            <span className="checkmark"></span>
                                                                        </label>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-6 col-md-6 col-lg-6 form-group">
                                                            <label for="email-address" className="form-label">Language (Max 3)</label>

                                                            <Select
                                                                closeMenuOnSelect={false}
                                                                isMulti
                                                                options={options}
                                                                onChange={languageChange}
                                                            />
                                                            {/* <input className="form-control input-tags" type="text" data-role="tagsinput" placeholder="" value="English" required/> */}
                                                        
                                                        </div>
                                                        <div className="col-sm-6 col-md-6 col-lg-6 form-group">
                                                            <label for="phone" className="form-label">Phone</label>
                                                            {/* <input className="form-control input-tags" name="phone" onChange={handleChange} type="tel" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" placeholder="Phone" value={state.phone} required /> */}
                                                            <PhoneInput
                                                                international
                                                                defaultCountry='US'
                                                                class="form-control"
                                                                placeholder="Enter phone number"
                                                                value={state.phone}
                                                                onChange={handleChangePhone} />
                                                        </div>

                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                        {/* <div className="save-interest-btn save-cancel-btns">
                                        <button type="submit" className="btn solid-btn">Finish</button>
                                    </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </form>

            </main>

            <CropperModal
                response={handleProfileUpload}

                viewport={{
                    width: 250,
                    height: 250,
                    type: "square"
                }}
                size={{
                    width: 300,
                    height: 300,
                }}
                boundary={{
                    width: 300,
                    height: 300
                }
                }
                ModalTitle="Upload Image"
                type="image/*"
                croppieImage={state?.croppieImage}
               croppieVideo={state?.croppieVideo}
               dispatchHandle={dispatchHandle}
            />
            <FooterSignup />
        </>
    )
}
export default ChooseIntrestThree;