import React, { useEffect, useContext,useState} from 'react';
import images from '../../Utility/Images';
import { Link, useParams, Redirect } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Slider from 'react-slick';
import { APIService } from '../../ApiServices/Apis/APIServices';
import Testimonials from './Components/Testimonials';
import Recommend from './Components/Recommend';
import AboutMe from './Components/AboutMe';
import Modalities from './Components/Modalities';
import Specialties from './Components/Specialties';
import Language from './Components/Language';
import { useReducer } from 'react';
import Reducer from '../../Utility/Reducer';
import ServiceModal from './Components/Modal';
import ProfileSlider from './Components/ProfileSlider/ProfileSlider';
import { toast, ToastContainer } from 'react-toastify';
import $ from 'jquery';
import moment from 'moment';
import CropperModal from './Components/CropperModal/CropperModal';
import ProfileFullCalendar from './ProfileFullCalendar';
import PaymentModal from '../Payments/Modals/PaymentModal';
import BookerModal from './Components/BookerModal/BookerModal';
import GlobalContext from '../../Global/GlobalContext';
import Auth from '../../Auth/Auth';
import ProfilesEvents from './EventsList/ProfilesEvents';
import EventDetailsModal from '../CreateEvents/Modals/EventDetailsModal/EventDetailsModal';
import AuthUserContext from '../../AuthUser/AuthUserContext';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Context from '../Home/Context/Context';
import DeleteConfirmationModal from '../../Common/DeleteConfirmationModal';
import BookingUserListModal from '../CreateEvents/Modals/BookinsUserModal/BookingUserListModal';
import ProfileEventDetailsModal from './EventsList/ProfileEventDetailsModal/ProfileEventDetailsModal';
import AverageRating from '../../Common/AverageRating';
const initialState = {
    UserProfile: '',
    ModelServiceName: '',
    ModelCategoryName: '',
    ModelCertification: [],
    ModelDescription: '',
    UserProfileImage: [],
    tempImage:'image.png',
    selectServiceId:'',
    selectServiceText:'',
    startEventDate:'',
    startEventTime:'',
    endEventTime:'',
    endEventDate:'',
    selectBookingTimeDateForClass:'choose',
    appointmentDurationRange:0,
    appointmentEndDateTime:new Date(),
    appointmentStartEventDate:'',
    appointmentStartEventTime:'',
    packages:[],
    currentPackages:[],
    cost:0,
    serviceDescription:'',
    duration:0,
    session:0,
    costVariation:[],
    costVariationList:[],
    packagesId:'',
    eventId:'',
    eventType:'',
    packagesValue:'none',
    costVariationValue:'none',
    bookingDetails:'',
    eventDetailResponse:false,
    getUserProfile:'',
    profileEvents:[],
    profilePage:0,
    profileLimit:10,
    allEventsData:[],
    menu:'Profile',
    croppedImage: null,
    isFileUploaded: false,
    deleteId:0,
    croppieImage:[],
    croppieVideo:[],
    getAllReviews:[],
    croppieImageBase64:null,
    bookingUserList:[],
    bookingUserListResponse:false,
}
document.title="Profile";
const Profile = () => {
    const { id } = useParams();
    const [state, dispatch] = useReducer(Reducer, initialState);
    const [globalState,globalDispatch]=useContext(GlobalContext);
    const authUser=useContext(AuthUserContext);
    useEffect(() => {
        getUserProfile();
        fetchAllEvent();
        profileEvents();
        getAllReviews();
        return;
    }, [window.location.pathname,state.menu]);

    useEffect(() => {
        $('#block-time-modal').modal('hide');
        dispatch({type:'Menu',payload:{Type:'Menu',menu:'Profile'}})
        return ;
    }, [id])

  const  getAllReviews=()=>{
       APIService.userProfileReviews({prac_id:id}).then((res)=>{
           if(res.data.status==200){
            dispatch({ type: 'userProfileReviews', payload: { Type: 'userProfileReviews', getAllReviews: res.data.data } })

           }else{

           }
       })
    }
    useEffect(() => {
        globalDispatch({type:'preloader',payload:{Type:'preloader',preloader:true}});
    }, [])

    const getUserProfile = () => {
        let data = {
            participentId: id
        }
        APIService.UserProfile(data).then((res) => {
            if (res.data.status == 200) {
                globalDispatch({type:'preloader',payload:{Type:'preloader',preloader:false}});
                dispatch({ type: 'UserProfile', payload: { Type: 'UserProfile', UserProfile: res.data.data } })
            }
        }).catch((error) => {

        })
    }
    const setModalData = (res) => {
        dispatch({
            type: 'certifications',
            payload: {
                Type: 'certifications',
                ModelCertification: res.certifications,
                ModelCategoryName: res.categoryId,
                ModelDescription: res.description,
                ModelServiceName: res.serviceId,
            }
        });
    }

    const CropperUploadImages=(files,type)=>{
        console.log(files,'upload');
        const form_data = new FormData();
        if(type==="Image"){
            form_data.append('images', files);
            form_data.append('is_main', 0);
        }else{
            for (const file of files) {
                form_data.append('images', file);
                form_data.append('is_main', 0);
            }
        }
        APIService.profileImagesUpload(form_data).then((res) => {
          if (res.data.status == 200) {
                getUserProfile();
                $('#upload-images-popup').modal('hide');
              toast.success(res.data.message);
          } else {
              toast.error(res.data.message);
          }
      }).catch((error) => {

      })
    }
    const dispatchHandle=(Ojb)=>{
        dispatch(Ojb);
    }
const deleteSliderImage=(id)=>{
    dispatch({type:'DeleteImageSlider',payload:{
        Type:'DeleteImageSlider',
        deleteId:id
    }});
    $('#delete-service-popup').modal('show');   
}
const deleteSliderId=(id)=>{
    let data ={
        imageId:id,
        is_main:0,
    }
    APIService.delUserImage(data).then((res)=>{
            if(res.data.status==200){
                getUserProfile();
                $('#delete-service-popup').modal('hide');
                toast.success(res.data.message)
            }else{
                $('#delete-service-popup').modal('hide');
                toast.error(res.data.message)
            }
    }).catch((error)=>{
        $('#delete-service-popup').modal('hide');
    });
}
const changeMenu=(type)=>{
    dispatch({type:'Menu',payload:{Type:'Menu',menu:type}})
}
// get All Events 
function fetchAllEvent() {
    let data = {
        prac_id:id,
        page: 0,
    }
    APIService.fetchEventAllCurrentUser(data).then((res) => {
       
        if (res.data.status == 200) {           
            var responseCollection = [];
            res.data.data.map((res) =>
            res?.available_date?JSON.parse(res.available_date)?.map((date) =>
                    JSON.parse(res?.available_time).map((time) =>
                        responseCollection = [...responseCollection, {
                            title:res?.title,
                            // updatedAt: res?.updatedAt,
                            userId:res?.userId,
                            // createdAt: res?.createdAt,
                            // description: res?.description,
                            // docs: res?.docs,
                            cost:res?.cost,
                            extendedProps: {
                                eventType: res?.type
                            },
                            // isBooked:res?.isBooked,
                            isBooked:res.eventBookings.find((find)=> moment(`${find.date} ${find.time}`,'DD-MM-YYYY HH:mm a').format('YYYY-MM-DD HH:mm')===moment(`${date?.from} ${time?.from}`,'YYYY-MM-DD HH:mm').format('YYYY-MM-DD HH:mm')&&find.bookerId==authUser?.id)?true:false,
                            display:res?.type==="Appointments"?'background':'',
                            color:res?.type==="Appointments"?'#09bd48':res.eventBookings.find((find)=> moment(`${find.date} ${find.time}`,'DD-MM-YYYY HH:mm a').format('YYYY-MM-DD HH:mm')===moment(`${date?.from} ${time?.from}`,'YYYY-MM-DD HH:mm').format('YYYY-MM-DD HH:mm')&&find.bookerId==authUser?.id)?true:false?"#19AEFF":"#FF5F1F",
                            // eventBackgroundColor:res?.type==="Appointments"?'#C4F1D4':'',
                            id:res?.id,
                            start: moment(`${date?.from} ${time?.from}`,'YYYY-MM-DD HH:mm').format('YYYY-MM-DD HH:mm:ss'),
                            end: moment(`${date?.to} ${time?.to}`,'YYYY-MM-DD HH:mm').format('YYYY-MM-DD HH:mm:ss'),
                            // startDate:moment(`${date?.from} ${time?.from}`,'YYYY-MM-DD HH:mm').format('DD-MM-YYYY HH:mm'),
                            // endDate:  moment(`${date?.to} ${time?.to}`, 'YYYY-MM-DD HH:mm').format('DD-MM-YYYY HH:mm')
                        }]
                    )
                ):''
            );
            res.data.data.map((res) =>
            res?.type==="Appointments"?
            res?.eventBookings?.length>0?res.eventBookings?.map((booking) =>
                        responseCollection = [...responseCollection, {
                            title:booking.eventUser==authUser?.id?'Booked Me':booking.bookerId==authUser?.id?'Booked':'Blocked',
                            // updatedAt: res?.updatedAt,
                            userId:res?.userId,
                            // createdAt: res?.createdAt,
                            description: res?.description,
                            // docs: res?.docs,
                            cost:res?.cost,
                            extendedProps: {
                                eventType: 'None'
                            },
                            isBooked:res?.isBooked,
                            // isBooked:res.eventBookings.find((find)=> moment(`${find.date} ${find.time}`,'DD-MM-YYYY HH:mm a').format('YYYY-MM-DD HH:mm')===moment(`${date?.from} ${time?.from}`,'YYYY-MM-DD HH:mm').format('YYYY-MM-DD HH:mm')&&find.bookerId==authUser?.id),
                            // color:booking.eventUser==authUser?.id)?"#1acd28":"#000111",
                            color:booking.eventUser==authUser?.id?'#1CAF00':booking.bookerId==authUser?.id?'#19AEFF':'#3A3A3A',
                            display:'',
                            id:res?.id,
                            start: moment(`${booking?.date} ${booking?.time}`,'DD-MM-YYYY HH:mm A').format('YYYY-MM-DD HH:mm:ss'),
                            end: moment(`${booking?.date} ${booking?.time}`,'DD-MM-YYYY HH:mm A').add(parseInt(booking?.duration==undefined?0:booking?.duration), 'minutes').format('YYYY-MM-DD HH:mm:ss'),
                            
                        }] 
  
                ):'':''
            );
            dispatch({ type: 'allEventsData', payload: { Type: 'allEventsData', allEventsData: responseCollection } })
        }
    })
}

// show the profile tab events with pagination
const profileEvents=()=>{
    let data = {
        prac_id:id,
        page:state.profilePage,
        limit:state.profileLimit,
    }
    APIService.fetchEventAllCurrentUser(data).then((res) => {
       
        if (res.data.status == 200) {
            if(res.data.data.length>1){
                dispatch({ type: 'profileEvents', payload: { Type: 'profileEvents',profileLimit:state.profileLimit+10, profileEvents: res.data.data} })
            }else{
                dispatch({ type: 'loadMore', payload: { Type: 'loadMore',profileLimit:0} })
            }
        }
    })
}

// favorite if user click on heart icon then favorite again click then UnFavorite 

const favoriteToggle = (id) => {
    let data = {
        pracId: id
    }
    APIService.favoritePractitioner(data).then((res) => {
        if (res.data.status == 200) {
            getUserProfile();
        } else {
            toast.error(res.data.message)
        }
    }).catch((error) => {

    })

}
// end 

// show profile events List with load more funcnaltiy 
const handleBookingFormValidation=()=>{
    let condition=true;
    if(state.eventType==="Appointments"){
        if(state.selectServiceId==''){
            condition=false
            toast.error('please choose 1 service...');
        }
        if(state.packagesValue=='none'&&state.costVariationValue=="none"){
            condition=false
            toast.error('please choose package or cost variation...');
        }
        if(state.appointmentStartEventDate==""&&state.appointmentStartEventTime===""){
            condition=false
            toast.error('please click on Appointment date & time');
        }
    }else{
        if(state.selectServiceId==''){
            condition=false
            toast.error('please choose 1 service...');
        }
        if(state.cost==""){
            condition=false
            toast.error('please enter cost variation...');
        }
    }        
    return condition; 
}
const handleBookingTImeChange=(e)=>{
    let value=e.target.value;    
    let duration = moment.duration(moment(value.split(',')[1]+' '+value.split(',')[3]).diff(moment(value.split(',')[0]+' '+value.split(',')[2])));
    let minutes = duration.asMinutes(); 
    dispatch({type:'handleBookingTImeChange',payload:{Type:'handleBookingTImeChange',duration:minutes,selectBookingTimeDateForClass:value,startEventDate:moment(value.split(',')[0]).format('DD-MM-YYYY'),endEventDate:moment(value.split(',')[1]).format('DD-MM-YYYY'),startEventTime:value.split(',')[2],endEventTime:value.split(',')[3]}})
}
if(Auth.getAccessToken()==null||Auth.getAccessToken()==''){

    return (<Redirect to="/login"/>);
}    

    return (
        <>
            <Context.Provider value={[state, dispatch]}>
                <Header />
                <main>
                    <section className="practitioner-profile-area">
                        <div className="container">
                            <div className="default-tabing profile-tabing">
                                <div className="default-tabs-list">
                                    <ul className="nav nav-pills">
                                        <li className="nav-item">
                                            <a className={`nav-link ${state.menu==='Profile'?'active':''}`} onClick={()=>changeMenu('Profile')} href="#">Profile</a>
                                        </li>
                                        {/* <li className="nav-item">
                                            <a className={`nav-link ${state.menu==='Media'?'active':''}`}  onClick={()=>changeMenu('Media')} href="#">Media</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className={`nav-link ${state.menu==='Blog'?'active':''}`} onClick={()=>changeMenu('Blog')} href="#">Blog</a>
                                        </li> */}
                                        {state.UserProfile?.is_parctitioner === "1" || state.UserProfile?.is_parctitioner === 1 ?
                                        <><li className="nav-item">
                                            <a className={`nav-link ${state.menu==='Events'?'active':''}`} onClick={()=>changeMenu('Events')} href="#">Events</a>
                                        </li>
                                        {id==authUser?.id?'':<li className="nav-item">
                                            <a className={`nav-link ${state.menu==='Schedule'?'active':''}`} onClick={()=>changeMenu('Schedule')} href="#">Schedule</a>
                                        </li>}</>:""}
                                    </ul>
                                </div>
                                <div className="tab-content">
                                    <div className={`tab-pane ${state.menu==='Profile'?'active':''}`} >
                                        <div className="profile-content">
                                            <div className="row">
                                                <div className="col-sm-12 col-md-6 col-lg-5 col-xl-5">
                                                    <div className="pp-image-slider">
                                                        {id==authUser?.id?<div className="upload-file">
                                                            <label className="file-upload" htmlFor="file-upload">
                                                                <span><img src={images.upload_image_video_icon} alt="upload icon"/></span>
                                                                <button id="file-upload" data-backdrop="static" data-keyboard="false" data-toggle="modal" data-target="#upload-images-popup" data-dismiss="modal"type="button">image</button>

                                                            </label>
                                                        </div>:''}
                                                        <ProfileSlider deleteFile={deleteSliderImage}/>
                                                    </div>
                                                </div>
                                                <div className="col-sm-12 col-md-6 col-lg-7 col-xl-7">
                                                    <div className="pp-rit-details">
                                                        <div className="pp-single-bx">
                                                            <div className="lft-pp-icon">
                                                                <i className="lb lb-host-icon"></i>
                                                            </div>
                                                            <div className="rit-pp-info rating-share-bx">
                                                                <div className="first-pp-bx">
                                                                    <strong>
                                                                        {state.UserProfile.name}
                                                                    {/*<i className="badge-icon"><img src={images.badge_icon} title="Top Rater" alt="Top Rater" /></i>*/}
                                                                    </strong>
                                                                    {/* <span>Co-Founder & CTO</span> */}
                                                                </div>
                                                                <div className="rating-star">
                                                                    
                                                                    <AverageRating avgRating={state?.UserProfile?.avgRating?state?.UserProfile?.avgRating:0}/>
                                                                </div>
                                                                <div className="pp-others-icon-btns">
                                                                    <ul className="ul-row">
                                                                    {id==authUser?.id?'':<li><Link to="#"><i className="lb lb-report-icon"></i></Link></li>}
                                                                        <li><Link to="#"><i className="lb lb-share-icon"></i></Link></li>
                                                                        
                                                                        {id==authUser?.id?'':<li>
                                                                            {state.UserProfile?.isFav===1?
                                                                            <button type="button" onClick={()=>favoriteToggle(state.UserProfile?.id)} class="btn-link"><i class="fa fa-heart"></i></button>
                                                                            
                                                                            :
                                                                            <Link to="#" onClick={()=>favoriteToggle(state.UserProfile?.id)}><i className="lb lb-favorite-icon"></i></Link>

                                                                            }
                                                                        </li>}
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="language-email-bx">
                                                            <div className="pp-single-bx">
                                                                <div className="lft-pp-icon">
                                                                    <i className="lb lb-location-icon"></i>
                                                                </div>
                                                                <div className="rit-pp-info">
                                                                    <div className="first-pp-bx">
                                                                        <strong>Location</strong>
                                                                        <span>{state.UserProfile?.location?JSON.parse(state.UserProfile?.location)?.label:'N/A'}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <Language language={state.UserProfile!=''?JSON.parse(state.UserProfile?.language):[]} />
                                                        </div>
                                                        <div className="modalities-list-bx">
                                                            {state.UserProfile?.is_parctitioner === "1" || state.UserProfile?.is_parctitioner === 1 ?
                                                            <>
                                                                <div className="pp-single-bx">
                                                                    <div className="lft-pp-icon">
                                                                        <i className="lb lb-categories_2-icon"></i>
                                                                    </div>
                                                                    <div className="rit-pp-info">
                                                                        <div className="first-pp-bx">
                                                                            <strong>Modalities</strong>
                                                                            <div className="sidebar-tag">
                                                                                <ul className="ul-row">
                                                                                {state.UserProfile?.PractitionerServices?.length>0?state.UserProfile?.PractitionerServices.map((res,i)=>
                                                                                    <li key={res.id}><a href="#service1" onClick={() => setModalData(res)} data-toggle="modal" title={res.serviceId}>{res.serviceId}</a></li>  
                                                                                ):''} 
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </>: ''}
                                                        </div>
                                                        {state.UserProfile?.is_parctitioner === "1" || state.UserProfile?.is_parctitioner === 1 ?
                                                                <Specialties />
                                                            : ''}
                                                        {id==authUser?.id?'':<div className="pp-booking-message-bx">
                                                            <ul className="ul-row">
                                                                {state.UserProfile?.is_parctitioner === "1" || state.UserProfile?.is_parctitioner === 1 ?
                                                                    <li><Link className="btn" to="#" onClick={()=>changeMenu('Schedule')}>Book Now</Link></li> : ''
                                                                }
                                                                <li><Link to={`/messages/${id}`} className="btn-link"><i className="lb lb-message-icon"></i> Send A Message</Link></li>
                                                            </ul>
                                                        </div>}
                                                    </div>
                                                </div>
                                            </div>
                                            {state.UserProfile?.is_parctitioner === "1" || state.UserProfile?.is_parctitioner === 1 ?
                                                <>
                                                    <AboutMe />
                                                    
                                                    {state.getAllReviews?.length>0?<Testimonials data={state.getAllReviews} getAllReviews={getAllReviews}/>:''}
                                                    <Recommend />
                                                </> : ''}

                                        </div>
                                    </div>
                                    <div className={`tab-pane  ${state.menu==='Media'?'active':''}`} >
                                        <div className="media-content">
                                            <div className="p-sec-list">
                                                <div className="row">
                                                    
                                                </div>
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="load-more-btn text-center"> <Link to={void(0)} className="btn"><i className="lb lb-refresh-icon"></i> Load More</Link> </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`tab-pane  ${state.menu==='Blog'?'active':''}`} >
                                        <div className="blog-tab-content">
                                            <div className="create-blog-btn"><Link className="btn" to="create-blog-post.html">Create New</Link></div>
                                            <div className="row">
                                                <div className="col-sm-12 col-md-6 col-lg-6">
                                                    <div className="single-blog">
                                                        <div className="blog-img">
                                                            <Link to="blog-details.html"><img src={images.no_image_available_default} alt="img" /></Link>
                                                        </div>
                                                        <div className="s-blog-content">
                                                            <h4><Link to="blog-details.html">Find Your Meditation Style 7 Practices</Link></h4>
                                                            <p>Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter.</p>
                                                            <div className="blog-meta">
                                                                <ul>
                                                                    <li><i className="fal fa-calendar-alt"></i>28 JANUARY, 2021</li>
                                                                    <li><i className="far fa-user-alt"></i><Link to="#">BY ADMIN</Link></li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-sm-12 col-md-6 col-lg-6">
                                                    <div className="single-blog">
                                                        <div className="blog-img">
                                                            <Link to="blog-details.html"><img src={images.no_image_available_default} alt="img" /></Link>
                                                        </div>
                                                        <div className="s-blog-content">
                                                            <h4><Link to="blog-details.html">Find Your Meditation Style 7 Practices Style 7</Link></h4>
                                                            <p>Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter.</p>
                                                            <div className="blog-meta">
                                                                <ul>
                                                                    <li><i className="fal fa-calendar-alt"></i>28 JANUARY, 2021</li>
                                                                    <li><i className="far fa-user-alt"></i><Link to="#">BY ADMIN</Link></li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-sm-12 col-md-6 col-lg-6">
                                                    <div className="single-blog">
                                                        <div className="blog-img">
                                                            <Link to="blog-details.html"><img src={images.no_image_available_default} alt="img" /></Link>
                                                        </div>
                                                        <div className="s-blog-content">
                                                            <h4><Link to="blog-details.html">Find Your Meditation Style 7 Practices</Link></h4>
                                                            <p>Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter.</p>
                                                            <div className="blog-meta">
                                                                <ul>
                                                                    <li><i className="fal fa-calendar-alt"></i>28 JANUARY, 2021</li>
                                                                    <li><i className="far fa-user-alt"></i><Link to="#">BY ADMIN</Link></li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-sm-12 col-md-6 col-lg-6">
                                                    <div className="single-blog">
                                                        <div className="blog-img">
                                                            <Link to="blog-details.html"><img src={images.no_image_available_default} alt="img" /></Link>
                                                        </div>
                                                        <div className="s-blog-content">
                                                            <h4><Link to="blog-details.html">Find Your Meditation Style 7 Practices</Link></h4>
                                                            <p>Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter.</p>
                                                            <div className="blog-meta">
                                                                <ul>
                                                                    <li><i className="fal fa-calendar-alt"></i>28 JANUARY, 2021</li>
                                                                    <li><i className="far fa-user-alt"></i><Link to="#">BY ADMIN</Link></li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`tab-pane  ${state.menu==='Events'?'active':''}`}>
                                        <ProfilesEvents loadMore={profileEvents}/>
                                    </div>
                                    <div className={`tab-pane  ${state.menu==='Schedule'?'active':''}`} >
                                        <div className="schedule-tab-content">
                                            <div className="rit-as-sec">

                                                {/* <div className="demo-popup">
                                                    <ul className="ul-row">
                                                        <li><Link to="#booker-modal" data-toggle="modal">Booker</Link></li>
                                                        <li><Link to="#payment-modal" data-toggle="modal">Payment</Link></li>
                                                        <li>
                                                            <div className="l-g-bx dot-dd-bx">
                                                                <div className="dropdown dd-right-side my-account-dd"><Link className="link-btn dropdown-toggle" to="#" role="button" id="my-account-dd" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Webinar  <i className="lb lb-horizontal-more-icon"></i></Link>
                                                                    <div className="dropdown-menu" aria-labelledby="my-account-dd">
                                                                        <div className="side-nav-bx">
                                                                            <ul>
                                                                                <li><Link to="#webinar-event-view-modal" data-toggle="modal" data-dismiss="modal"><i className="lb lb-message-icon"></i> Event Detail</Link></li>
                                                                                <li><Link to="#block-time-modal" data-toggle="modal" data-dismiss="modal"><i className="lb lb-calendar-icon"></i> View Bookings</Link></li>
                                                                                <li><Link to="#share-event-popup" data-toggle="modal"><i className="lb lb-share-icon"></i> Share Profile</Link></li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div> */}
                                                <div className="schedule-claender-content">
                                        
                                                    <div className="full-calender-sec">
                                                        <figure className="claender-img sidebar-right-btn" data-toggle="modal" data-target="#create-event-modal">
                                                        <ProfileFullCalendar/>
                                                        </figure>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
                <Footer />
                <ServiceModal />
                <CropperModal  
                 response={CropperUploadImages}
                 
                 viewport={{
                    width: 275,
                    height: 155,
                    // type: "square"
                }}
                size={{
                    width: 960,
                    height: 540,
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
                <PaymentModal
                    paymentType="eventBooking"
                    cost={state.cost}
                    eventId={state.eventId}
                    serviceId={state.selectServiceId} 
                    date={moment(state.startEventDate,'DD-MM-YYYY').format('D MMM YYYY')}  
                    time={moment(state.startEventTime,'HH:mm').format('hh:mm A')} 
                    endTime={moment(state.endEventTime,'HH:mm').format('hh:mm A')} 
                    serviceName={state.selectServiceText}
                    packageId={state.packagesId} 
                    duration={state.duration}
                    validation={handleBookingFormValidation}
                    response={fetchAllEvent}
                    backButton={state.menu==='Events'?'#profile-event-details-modal':"#booker-modal"}
                 />
                <BookerModal/>
                <DeleteConfirmationModal 
                deleteItem={deleteSliderId}
                title={"Are you sure?"}
                />
                <EventDetailsModal 
                title={state.eventDetail?.title} 
                eventType={state.eventDetail?.type}
                date={moment(state?.startEventDate, 'DD-MM-YYYY').format('D MMM YYYY')}
                time={moment(state?.startEventTime, 'hh:mm').format('hh:mm A')}
                endDate={moment(state?.endEventDate, 'DD-MM-YYYY').format('D MMM YYYY')}
                endTime={moment(state?.endEventTime, 'hh:mm').format('hh:mm A')}
                seats={state.eventDetail?.seats}
                services={state.eventDetail?.services}
                description={state.eventDetail?.description}
                cost={state.eventDetail?.cost}
                meetingRoomId={state.eventDetail?.meeting_detail?.room_id}
                host={state.eventDetail?.userId==authUser?.id?true:false}
                remainingSeats={state.eventDetail?.remainingSeats}
                docs={state.eventDetail?.docs}
                response={state.eventDetailResponse}
                />
                <BookingUserListModal
                data={state.bookingUserList}
                response={state.bookingUserListResponse}
                />
                <ProfileEventDetailsModal
                 data={state?.eventDetail}
                 response={state.eventDetailResponse}
                 host={state.eventDetail?.userId==authUser?.id}
                 onChange={handleBookingTImeChange}
                 value={state.selectBookingTimeDateForClass}
                 />
            </Context.Provider>
        </>
    );
}

export default Profile;
