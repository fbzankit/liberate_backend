import React, { useEffect, useContext, useReducer, useState } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { Link } from 'react-router-dom';
import images from '../../Utility/Images';
import SideBar from '../SideBar/DashboardSideBar';
import Select from 'react-select';
import AuthUserContext from '../../AuthUser/AuthUserContext';
import Reducer from '../../Utility/Reducer';
import config from '../../ApiServices/Apis/config';
import ChangeEmailPopup from './Modals/ChangeEmailPopup';
import MyAvailabilityPopup from './Modals/MyAvailabilityPopup';
import TagsInput from 'react-tagsinput';
import { ToastContainer, toast } from 'react-toastify';
import GlobalContext from '../../Global/GlobalContext';
import { APIService } from '../../ApiServices/Apis/APIServices';
import validator from 'validator'
import Auth from '../../Auth/Auth';
import { locale } from 'moment';
import $ from 'jquery';
import CropperModal from '../UserProfile/Components/CropperModal/CropperModal';
import Context from '../Home/Context/Context';
import PhoneInput from 'react-phone-number-input';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

const initialState = {
    name: '',
    email: '',
    phone: '',
    location: '',
    language: [],
    tag: '',
    tags: [],
    gender: '',
    aboutMe: '',
    bio: '',
    oldPassword: '',
    oldPasswordShow: false,
    newPasswordShow: false,
    newPassword: '',
    croppieImage: [],
    croppieVideo: [],
    croppieImageBase64: [],
}
const MyAccount = () => {
    const authUser = useContext(AuthUserContext);
    const [globalState, globalDispatch] = useContext(GlobalContext);
    const [state, dispatch] = useReducer(Reducer, initialState)
    const [value, setValue] = useState(null);
    useEffect(() => {
        dispatch({ type: 'location', payload: { Type: 'location', location: value } })
        return;
    }, [value])
    useEffect(() => {
        dispatch({
            type: 'Account',
            payload: {
                Type: 'Account',
                name: authUser?.name,
                email: authUser?.email,
                phone: authUser?.phone,
                location: JSON.parse(authUser?.location),
                language: JSON.parse(authUser.language),
                tags: authUser?.speciality.split(','),
                gender: authUser?.gender,
                aboutMe: authUser?.practitioner?.aboutme,
                bio: authUser?.practitioner?.bio,
            }
        })
        setValue(JSON.parse(authUser?.location))
    }, [authUser])

    const languageChange = (obj) => {
        let languageArray = [];
        if (obj?.length > 0) {
            obj.map((res) =>
                languageArray.push({ value: res.value, label: res.value })
            )
        }
        dispatch({ type: 'language', payload: { Type: 'language', language: languageArray } })
    }

    const AuthUser = () => {
        APIService.authUser().then((res) => {
            if (res?.data?.status == 200) {
                localStorage.setItem('_cu', JSON.stringify(res?.data?.data));
                dispatch({
                    type: 'AccountResponse',
                    payload: {
                        Type: 'AccountResponse',
                        name: res?.data?.data?.name,
                        email: res?.data?.data?.email,
                        phone: res?.data?.data?.phone,
                        location: JSON.parse(res?.data?.data?.location),
                        language: JSON.parse(res?.data?.data.language),
                        tags: res?.data?.data?.speciality.split(','),
                        gender: res?.data?.data?.gender,
                        aboutMe: res?.data?.data?.practitioner?.aboutme,
                        bio: res?.data?.data?.practitioner?.bio,
                    }
                })
                setValue(JSON.parse(res?.data?.data?.location))
            }
        }).catch((error) => {
            if (error?.response?.status == 401) {
                Auth.LogOutUser();
            }
        })
    }

    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        if (name == "phone") {
            if (validatePhoneNumber(value)) {
                dispatch({ type: name, payload: { Type: name, [name]: value } });
            }
        } else {
            dispatch({ type: name, payload: { Type: name, [name]: value } });
        }
    }
    const handleChangePhone = (number) => {
        dispatch({ type: 'phone', payload: { Type: 'phone', phone: number } })
    }
    const validatePhoneNumber = (number) => {
        let isValidPhoneNumber = !isNaN(number)
        if (number.length > 15) {
            isValidPhoneNumber = false
        }
        return (isValidPhoneNumber)
    }
    const resetState = () => {
        let languageArray = []
        authUser.language.split(',').map((res) =>
            languageArray.push({ value: res, label: res })
        )
        dispatch({
            type: 'reset', payload: {
                Type: 'reset',
                name: authUser?.name,
                email: authUser?.email,
                phone: authUser?.phone,
                oldPassword: '',
                newPassword: '',
                oldPasswordShow: false,
                newPasswordShow: false,
                location: authUser?.location,
                language: languageArray,
                gender: authUser?.gender,
                tags: authUser?.speciality.split(','),
                aboutMe: authUser?.practitioner?.aboutme,
                bio: authUser?.practitioner?.bio,

            }
        })
    }
    const options = []
    globalState.globalLanguages.map((lang) =>
        options.push({ value: lang.name, label: lang.name })
    )
    const SubmitForm = (e) => {
        e.preventDefault();
        if (validateForm()) {
            let data = {
                name: state.name,
                location: JSON.stringify(state.location),
                language: JSON.stringify(state.language),
                gender: state.gender,
                phone: state.phone,
                aboutme: state.aboutMe,
                bio: state.bio,
                speciality: state.tags.toString(),
                password: state.oldPassword,
                con_password: state.newPassword,
            }
            APIService.profileUpdate(data).then((res) => {
                if (res.data.status == 200) {
                    toast.success(res.data.message);
                    resetState();
                    AuthUser();
                } else {
                    toast.error(res.data.message)
                }
            }
            )
        }
    }
    const validateForm = (e) => {
        let condition = true;
        if (state.phone == '') {
            toast.error('Phone number is required')
            condition = false;
        }
        if (state.name == '') {
            toast.error('Name is required')
            condition = false;
        }
        if (state.email == '') {
            toast.error('Email is required')
            condition = false;
        }
        if (state.location == '') {
            toast.error('Location is required')
            condition = false;
        }
        if (state.gender == '') {
            toast.error('Gender is required')
            condition = false;
        }
        if (state.aboutMe == '') {
            toast.error('About me is required')
            condition = false;
        }
        if (state.bio == '') {
            toast.error('Bio is required')
            condition = false;
        }
        if (state.tags?.length == 0) {
            toast.error('Specialty is required')
            condition = false;
        }
        if (state.oldPassword != '' && state.newPassword != '') {
            if (state.oldPassword != state.newPassword) {
                toast.error('new password and confirm password not correct')
                condition = false;
            }
        }
        return condition;
    }
    const handleChangeInput = (tag) => {
        dispatch({ type: 'tag', payload: { Type: 'tag', tag: tag } })
    }
    const handleChangeTags = (tags) => {
        dispatch({ type: 'tags', payload: { Type: 'tags', tags: tags } });
    }
    const hideShowEyeIcon = (type) => {
        if (type == "oldPasswordShow") {
            dispatch({ type: type, payload: { Type: type, [type]: !state.oldPasswordShow } });
        } if (type == "newPasswordShow") {
            dispatch({ type: type, payload: { Type: type, [type]: !state.newPasswordShow } });
        }
    }
    const handleProfileUpload = (file, type) => {
        let form_data = new FormData();
        form_data.append('image', file);
        APIService.updateProfilePicture(form_data).then((res) => {
            if (res.data.status == 200) {
                AuthUser();
                $('#upload-images-popup').modal('hide');
                toast.success(res.data.message)

            } else {
                toast.error(res.data.message)
            }
        }).catch((error) => {

        })
    }
    const dispatchHandle = (Ojb) => {
        dispatch(Ojb);
    }
    console.log(state, value, 'state');
    return (
        <>
            <Context.Provider value={[state, dispatch]}>

                <Header />
                <main>
                    <section className="account-settings-area">
                        <div className="container">
                            <div className="p-sec-heading">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="section-title">
                                            <h2>Dashboard</h2>
                                            <p>Change Your Account And Profile Settings</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="account-settings-content">
                                <SideBar />
                                <div className="rit-as-sec">
                                    <div className="top-profile-bx">
                                        <figure className="ac-p-pic">
                                            <img src={authUser?.image ? config.imageBaseurl + authUser?.image : authUser?.social_image ? authUser?.social_image.replace('s92-c', 's400-c') : images.profileAvatar} alt={state.name} title={state.name} />
                                        </figure>
                                        <button type="button" data-backdrop="static" data-keyboard="false" data-toggle="modal" data-target="#upload-images-popup" data-dismiss="modal" className="btn btn-default profile-pic-update-btn"><i className="fa fa-camera"></i></button>
                                        <div className="account-short-info">
                                            <strong>{state.name}</strong>
                                            {/* <span>Co-Founder &amp; CTO</span> */}
                                            {/* <div className="availability-bx">
                                            <span>Availability: Available Now </span>
                                            <label className="on-off-switch">
                                                <label className="switch3" >
                                                    <input type="checkbox" />
                                                <div>
                                                </div>
                                                </label>
                                        </label>
                                            <div className="reschedule-time-btn">
                                                <a href="#my-availability-popup" data-toggle="modal"><i className="lb lb-calendar-icon" title="Rescheduled Booking" data-toggle="tooltip"></i></a>
                                            </div>
                                        </div> */}
                                        </div>

                                    </div>

                                    <div className="basic-info-bx">
                                        <div className="bdr-heading">
                                            <h2>Basic Info</h2>
                                        </div>
                                        <div className="cmn-form">
                                            <form onSubmit={SubmitForm}>
                                                <div className="row">
                                                    <div className="col-sm-6 col-md-6 col-lg-6 form-group">
                                                        <label for="email-address" className="form-label">Name <span className="text-danger">*</span></label>
                                                        <input type="text" className="form-control" name="name" onChange={handleChange} placeholder="" value={state.name} />
                                                    </div>
                                                    <div className="col-sm-6 col-md-6 col-lg-6 form-group">
                                                        <label for="email-address" className="form-label">Email address <span className="text-danger">*</span>
                                                            {/* <a href="#new-email-update-popup" className="change-email-link" data-toggle="modal">Change Email</a> */}
                                                        </label>
                                                        <input type="email" className="form-control" name="email" onChange={handleChange} placeholder="" value={state.email} disabled={true} readOnly={true} />
                                                    </div>
                                                    <div className="col-sm-6 col-md-6 col-lg-6 form-group">
                                                        <label for="email-address" className="form-label">Phone <span className="text-danger">*</span></label>
                                                        {/* <input type="text" className="form-control" name="phone" onChange={handleChange} placeholder="" value={state.phone}/> */}
                                                        <PhoneInput

                                                            defaultCountry='US'
                                                            className="form-control"
                                                            placeholder="Enter phone number"
                                                            value={state.phone}
                                                            onChange={handleChangePhone} />
                                                    </div>
                                                    <div className="col-sm-6 col-md-6 col-lg-6 form-group">
                                                        <label for="email-address" className="form-label">Location <span className="text-danger">*</span></label>
                                                        <GooglePlacesAutocomplete
                                                            apiKey="AIzaSyB4jXwDLN5itSJkTafZH_RrJucrCE-4Jgk"
                                                            selectProps={{
                                                                value,
                                                                onChange: setValue,
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="col-sm-6 col-md-6 col-lg-6 form-group">
                                                        <label for="email-address" className="form-label">Gender <span className="text-danger">*</span></label>
                                                        <div className="profile-gender">
                                                            <ul className="ul-row">
                                                                <li>
                                                                    <label className="radiobox">Male
                                                                    <input type="radio" name="gender" onChange={handleChange} value="m" checked={state.gender == "m" ? true : false} />
                                                                        <span className="checkmark"></span>
                                                                    </label>
                                                                </li>
                                                                <li>
                                                                    <label className="radiobox">Female
                                                                    <input type="radio" name="gender" onChange={handleChange} value="f" checked={state.gender == "f" ? true : false} />
                                                                        <span className="checkmark"></span>
                                                                    </label>
                                                                </li>
                                                                <li>
                                                                    <label className="radiobox">Non Binary
                                                                    <input type="radio" name="gender" onChange={handleChange} value="nb" checked={state.gender == "nb" ? true : false} />
                                                                        <span className="checkmark"></span>
                                                                    </label>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6 col-md-6 col-lg-6 form-group">
                                                        <label for="email-address" className="form-label">Language (Max 3)<span className="text-danger">*</span></label>
                                                        {state.language?.length > 0 ?
                                                            <Select
                                                                defaultValue={state.language}
                                                                closeMenuOnSelect={false}
                                                                isMulti
                                                                options={options}
                                                                onChange={languageChange}
                                                            /> :
                                                            <input className="form-control input-tags" type="text" data-role="tagsinput" placeholder="" />

                                                        }
                                                    </div>
                                                    {authUser.is_parctitioner === "1" ?
                                                        <>
                                                            <div className="col-12 form-group">
                                                                <label for="email-address" className="form-label">About Me <span className="text-danger">*</span></label>
                                                                <textarea className="form-control" id="about-me" name="aboutMe" onChange={handleChange} placeholder="Type Hare..." value={state.aboutMe}></textarea>
                                                                <div className="input-btm-note">
                                                                    <span className="float-left">Minimum 25 Words</span>
                                                                    <span className="float-right">{state.bio?.length > 0 ? state.aboutMe?.length : 0}/500 </span>
                                                                </div>
                                                            </div>
                                                            <div className="col-12 form-group">
                                                                <label for="email-address" className="form-label">Bio <span className="text-danger">*</span></label>
                                                                <textarea className="form-control" id="about-me" name="bio" onChange={handleChange} placeholder="Type Hare..." value={state.bio}></textarea>
                                                                <div className="input-btm-note">
                                                                    <span className="float-left">Minimum 250 Words</span>
                                                                    <span className="float-right">{state.bio?.length > 0 ? state.bio?.length : 0}/500 </span>
                                                                </div>
                                                            </div></>
                                                        : ''}
                                                    {/* <div className="col-12 form-group">
                                                    <label for="email-address" className="form-label">Modalities</label>
                                                    <input className="form-control input-tags" type="text" data-role="tagsinput" placeholder="Add New Modalities" />
                                                </div> */}
                                                    <div className="col-12 form-group">
                                                        <label for="Specialties" className="form-label">Specialties/Tags <span className="text-danger">*</span></label>
                                                        <TagsInput
                                                            value={state.tags}
                                                            onChange={handleChangeTags}
                                                            inputValue={state.tag}
                                                            addKeys={[9, 13, 188, 32]}
                                                            onlyUnique={true}
                                                            onChangeInput={handleChangeInput}
                                                        />
                                                    </div>
                                                    <div className="col-12 change-password-form">
                                                        <div className="bdr-heading">
                                                            <h2>Change Password</h2>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-sm-6 col-md-6 col-lg-6 form-group">
                                                                <label for="old-password" className="form-label">New Password</label>
                                                                <div class="password-hide-show">
                                                                    <input type={state.newPasswordShow ? "text" : "password"} onChange={handleChange} className="form-control" name="newPassword" placeholder="" value={state.newPassword} />
                                                                    {state.newPasswordShow ?
                                                                        <i class="fa fa-eye-slash" onClick={() => hideShowEyeIcon('newPasswordShow')}></i>
                                                                        : <i class="fa fa-eye" onClick={() => hideShowEyeIcon('newPasswordShow')} ></i>}
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-6 col-md-6 col-lg-6 form-group">
                                                                <label for="new-password" className="form-label">Confirm Password</label>
                                                                <div class="password-hide-show">
                                                                    <input type={state.oldPasswordShow ? "text" : "password"} onChange={handleChange} className="form-control" name="oldPassword" placeholder="" value={state.oldPassword} />

                                                                    {state.oldPasswordShow ?
                                                                        <i class="fa fa-eye-slash" onClick={() => hideShowEyeIcon('oldPasswordShow')}></i> :
                                                                        <i class="fa fa-eye" onClick={() => hideShowEyeIcon('oldPasswordShow')}></i>
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="save-cancel-btns">
                                                            <ul className="ul-row">
                                                                <li><button type="button" className="btn bdr-btn">Cancel</button></li>
                                                                <li><button type="submit" className="btn solid-btn">Save</button></li>
                                                            </ul>
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
                    <Footer />
                    <ChangeEmailPopup />
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
                        ModalTitle="Upload Images/Video"
                        type="image/*,video/mp4,video/webm"
                        croppieImage={state?.croppieImage}
                        croppieVideo={state?.croppieVideo}
                        dispatchHandle={dispatchHandle}
                    />
                    <MyAvailabilityPopup />
                </main>
            </Context.Provider>


        </>
    );
}


export default MyAccount;