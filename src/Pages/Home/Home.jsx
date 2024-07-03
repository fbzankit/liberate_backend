import React, { useContext, useEffect, useReducer } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import images from '../../Utility/Images';
import Auth from '../../Auth/Auth';
import { Link, Redirect } from 'react-router-dom';
import AuthUserContext from '../../AuthUser/AuthUserContext';
import SlickSlider from './Components/Slider/SlickSlider';
import EventCards from './Components/Cards/EventCards';
import { APIService } from '../../ApiServices/Apis/APIServices';
import Reducer from '../../Utility/Reducer';
import config from '../../ApiServices/Apis/config'
import ProfileShareModals from './Components/Modals/ProfileShareModals';
import HomeFilterModal from './Components/Modals/HomeFilterModal';
import Context from './Context/Context';
import $ from 'jquery';
import GlobalContext from '../../Global/GlobalContext';
import NoDataFound from '../../Common/NoDataFound';
import EventAndClassCard from './Components/Cards/EventAndClassCard';
import ProfileEventDetailsModal from '../UserProfile/EventsList/ProfileEventDetailsModal/ProfileEventDetailsModal';
import PaymentModal from '../Payments/Modals/PaymentModal';
import moment from 'moment';
import { toast } from 'react-toastify';

const initialState = {
    practitioner: '',
    classEvents: [],
    category: [],
    userCategories: [],
    eventDetail:'',
    gender: '',
    eventDetailResponse:false,
    eventType: '',
    duration:0,
    eventId:'',
    selectBookingTimeDateForClass:'choose',
    startEventDate:'',
    startEventTime:'',
    endEventTime:'',
    endEventDate:'',
    selectServiceId:'',
    selectServiceText:'',
    packagesId:'',
    cost:0,
    userProfileUrl: '',
    minCost: 0,
    maxCost: 0,
    page: 0,
    menu: 'Practitioners',
    error: false,
}
const Home = () => {
    const authUser = useContext(AuthUserContext);
    const [globalState, globalDispatch] = useContext(GlobalContext);
    const [state, dispatch] = useReducer(Reducer, initialState)

    useEffect(() => {
        getAllPractitioner();
        return;
    }, [state.category])

    useEffect(() => {
        getAllClassEvents()
    }, [state.menu])
    const getAllClassEvents=()=>{
            let data={
                limit:18,
                page:0,
            }
            APIService.homeClassEvents(data).then((res)=>{
                    if(res.data.status==200){
                        dispatch({type:'homeClassEvents',payload:{Type:'homeClassEvents',classEvents:res.data.data}});
                    }else{

                    }
            }).catch((error)=>{

            })
    }
    const getAllPractitioner = () => {
        globalDispatch({ type: 'preloader', payload: { Type: 'preloader', preloader: true } })
        let data = {
            category: state.category.toString(),
            gender: state.gender,
            limit: 9,
            page:0
        }
        APIService.getAllPractitioner(data).then((res) => {
            if (res.data.status == 200) {
                if (res.data.data?.practitioners != undefined) {
                    globalDispatch({ type: 'preloader', payload: { Type: 'preloader', preloader: false } })
                    dispatch({ type: 'practitioner', payload: { Type: 'practitioner', page: 1, error: false, practitioner: res.data.data.practitioners, userCategories: res.data.data?.userCategories.split(',') } });
                } else {
                    globalDispatch({ type: 'preloader', payload: { Type: 'preloader', preloader: false } })
                }
            } else {
                globalDispatch({ type: 'preloader', payload: { Type: 'preloader', preloader: false } })
            }
        }).catch((error) => {
            globalDispatch({ type: 'preloader', payload: { Type: 'preloader', preloader: false } })

            dispatch({ type: 'error', payload: { Type: 'error', error: true } });
            Auth.ErrorHandling(error);
        })
    }
    const changeMenu = (type) => {
        dispatch({ type: 'menu', payload: { Type: 'menu', menu: type,page:0 } });
    }
    const resetFilter = () => {
        dispatch({ type: 'resetFilter', payload: { Type: 'resetFilter', gender: '', category: [] } });
        getAllPractitioner();
    }
    const loadMore = () => {
        let data = {
            category: state.category.toString(),
            gender: state.gender,
            page: state.page,
            limit: 9,
        }
        APIService.getAllPractitioner(data).then((res) => {
            if (res.data.status == 200) {
                if (res.data.data?.practitioners != undefined && res.data.data?.practitioners?.length > 0) {
                    dispatch({ type: 'practitioner', payload: { Type: 'practitioner', error: false, page: state.page + 1, practitioner: [...state.practitioner, ...res.data.data.practitioners], userCategories: res.data.data?.userCategories.split(',') } });
                } else {
                    dispatch({ type: 'loadMore', payload: { Type: 'loadMore', error: false, page: 0 } });
                }
            }
        }).catch((error) => {
            dispatch({ type: 'error', payload: { Type: 'error', error: true } });
        })
    }
    const handleBookingTImeChange=(e)=>{
        let value=e.target.value;   
        let duration = moment.duration(moment(value.split(',')[1]+' '+value.split(',')[3]).diff(moment(value.split(',')[0]+' '+value.split(',')[2])));
        let minutes = duration.asMinutes(); 
        dispatch({type:'handleBookingTImeChange',payload:{Type:'handleBookingTImeChange',duration:minutes,selectBookingTimeDateForClass:value,startEventDate:moment(value.split(',')[0]).format('DD-MM-YYYY'),endEventDate:moment(value.split(',')[1]).format('DD-MM-YYYY'),startEventTime:value.split(',')[2],endEventTime:value.split(',')[3]}})
    }
  
   // get event details Modal
   const getEventDetailsModal = (eventID) => {
    $('#profile-event-details-modal').modal('show');
    dispatch({
        type: 'eventDetail',
        payload: {
            Type: 'eventDetail',
            eventDetailResponse: false,
            eventId: eventID,
        }
    })
    let data = {
        event_id: eventID
    }
    APIService.eventDetailsById(data).then((res) => {

        if (res.data.status == 200) {
            dispatch({
                type: 'eventDetail',
                payload: {
                    Type: 'eventDetail',
                    eventDetail: res.data.data,
                    eventDetailResponse: true,
                    selectBookingTimeDateForClass:'choose',
                    eventType: res.data.data?.type,
                    selectServiceId: res.data.data?.services?.length > 0 ? res.data.data?.services[0].id : '',
                    selectServiceText: res.data.data?.services?.length > 0 ? res.data.data?.services[0]?.service.name : '',
                    cost: res.data.data.cost, 
                }
            })
        } else {
            dispatch({
                type: 'bookingDetails', payload: {
                    Type: 'bookingDetails', eventDetailResponse: true
                }
            })
            $('#profile-event-details-modal').modal('hide');
        }
    }).catch((error) => {
        dispatch({
            type: 'bookingDetails', payload: {
                Type: 'bookingDetails', eventDetailResponse: true
            }
        })
        $('#profile-event-details-modal').modal('hide');
    })
}
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
    if (Auth.getAccessToken() && parseInt(authUser?.signup_step) < 4) {
        return <Redirect to="/complete-profile" />
    }
console.log(state)
    return (
        <>
            <Context.Provider value={[state, dispatch]}>
                <Header />
                <main>
                    <section className="categories-list-sec pt-30 pb-30">
                        <div className="container">
                            <div className="row app-testi-active slick-initialized slick-slider">
                                <SlickSlider />
                            </div>
                        </div>
                    </section>
                    <section className="practitioners-area">
                        <div className="container">
                            <div className="home-tags-tab">
                                <div className="default-tabing">
                                    <div className="p-sec-heading">
                                        <div className="default-tabs-list">
                                            <ul className="nav nav-pills">
                                                <li className="nav-item">
                                                    <Link className={`nav-link ${state.menu === "Practitioners" ? 'active' : ""}`} onClick={() => changeMenu('Practitioners')} to="#">Practitioners</Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link className={`nav-link ${state.menu === "Media" ? 'active' : ""}`} onClick={() => changeMenu('Media')} to="#">Media</Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link className={`nav-link ${state.menu === "LiveClassesEvents" ? 'active' : ""}`} onClick={() => changeMenu('LiveClassesEvents')} to="#">Classes/Events</Link>
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="filter-right">
                                            <ul className="d-inline-block">
                                                <li>
                                                    <div className="search-form filter-search-bx">
                                                        <form action="javascript:void(0);">
                                                            <div className="top-search-bar">
                                                                <input type="email" placeholder="Search..." />
                                                                <button className="btn-link"><i className="lb lb-search-icon"></i></button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </li>
                                                <li><Link className="reset-btn" to="#" onClick={resetFilter}>Reset</Link></li>
                                                <li><Link className="filter-btn" to="#filter-modal" data-toggle="modal" onClick={() => $('#filter-modal').modal('show')} className="sidebar-menu menu-tigger"><i className="lb lb-filter-icon"></i></Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="tab-content">
                                        <div className={`tab-pane ${state.menu === "Practitioners" ? 'active' : "fade"}`} id="practitioners">
                                            <div className="practitioners-content">
                                                <div className="p-sec-list">
                                                    <div className="row">
                                                        {state.practitioner?.length > 0 ? state?.practitioner.map((res, i) =>
                                                            <EventCards
                                                                key={i}
                                                                id={res.id}
                                                                practitionerId={res?.practitioner?.id}
                                                                isFav={res?.isFav == undefined ? 0 : res?.isFav}
                                                                name={res.name}
                                                                aboutMe={res?.practitioner?.aboutme}
                                                                avgRating={res?.avgRating ? res?.avgRating : 0}
                                                                services={res?.practitioner?.practitionerServices}
                                                                image={res?.image ? config.imageBaseurl + res?.image : res?.social_image.replace('s96-c', 's400-c')}
                                                            />
                                                        ) : ''
                                                        }
                                                    </div>

                                                    {state.practitioner?.length > 0 ? state.page > 0 ?
                                                        <div className="row">
                                                            <div className="col-12">
                                                                <div className="load-more-btn text-center"> <button type="button" onClick={() => loadMore()} className="btn"><i className="lb lb-refresh-icon"></i> Load More</button> </div>
                                                            </div>
                                                        </div> : '' : <NoDataFound
                                                            image={images.no_webinars_right_now_img}
                                                            title={'No Practitioners Right Now!'}
                                                            description={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem."}
                                                            buttonTitle="Refresh"
                                                            buttonPath="" />}
                                                </div>
                                            </div>
                                        </div>
                                        <div className={`tab-pane ${state.menu === "Media" ? 'active' : "fade"}`} id="media">
                                            <div className="media-content">
                                                <div className="p-sec-list">
                                                    <div className="row">
                                                        <div className="col-xl-3 col-lg-4 col-md-4 col-sm-6">
                                                            <div className="l-g-bx">
                                                                <div className="single-shop-item single-media-item">
                                                                    <div className="shop-thumb fix p-relative">
                                                                        <figure className="p-bx-img"><img src={images.practitioner_img9} alt="img" /></figure>
                                                                        <div className="video-time">2:16:42</div>
                                                                        {/* <span className="favorite-icon"><Link className="active" to="#"><i className="lb lb-favorite-icon"></i></Link></span> */}
                                                                        <div className="product-action"><p>Lorem ipsum.  </p></div>
                                                                    </div>
                                                                    <div className="shop-content">
                                                                        <span className="product-tag"><Link to="#" className="disabled-btn"><i className="lb lb-video-play-icon"></i></Link>
                                                                        </span>
                                                                        <h5>Find Your Meditation Style With These 7 Practices</h5>
                                                                        <div className="by-admin-media">
                                                                            <Link to="#"><i className="lb lb-user-icon"></i> BY ADMIN</Link>
                                                                            <div className="media-cat-list">
                                                                                <ul className="ul-row">
                                                                                    <li><span>Modality</span></li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                        <div className="share-book-btns">
                                                                            <ul className="display-ib">
                                                                                <li className="float-left"><strong>$ 302</strong></li>
                                                                                <li className="float-right"><Link className="btn cmn-btn" to="#payment-modal" data-toggle="modal">Buy Now</Link></li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-3 col-lg-4 col-md-4 col-sm-6">
                                                            <div className="l-g-bx">
                                                                <div className="single-shop-item single-media-item">
                                                                    <div className="shop-thumb fix p-relative">
                                                                        <figure className="p-bx-img"><img src={images.practitioner_img10} alt="img" /></figure>
                                                                        <div className="video-time">2:16:42</div>
                                                                        <span className="favorite-icon"><Link to="#"><i className="lb lb-favorite-icon"></i></Link></span>
                                                                        <div className="product-action"><p>Lorem ipsum, or lipsum as it is sometimes known, is dummy text. Lorem ipsum, or lipsum as it is sometimes known, is dummy text. Lorem ipsum, or lipsum as it is sometimes known, is dummy text.  </p></div>
                                                                    </div>
                                                                    <div className="shop-content">
                                                                        <span className="product-tag"><Link to="#"><i className="lb lb-video-play-icon"></i></Link>
                                                                        </span>
                                                                        <h5>Find Your Meditation Style With These 7 Practices</h5>
                                                                        <div className="by-admin-media">
                                                                            <Link to="#"><i className="lb lb-user-icon"></i> BY ADMIN</Link>
                                                                            <div className="media-cat-list">
                                                                                <ul className="ul-row">
                                                                                    <li><span>Modality</span></li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                        <div className="share-book-btns">
                                                                            <ul className="display-ib">
                                                                                <li className="float-left"><strong>Free</strong></li>
                                                                                <li className="float-right"><Link className="btn cmn-btn" to="#">Download</Link></li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-3 col-lg-4 col-md-4 col-sm-6">
                                                            <div className="l-g-bx">
                                                                <div className="single-shop-item single-media-item">
                                                                    <div className="shop-thumb fix p-relative">
                                                                        <figure className="p-bx-img"><img src={images.practitioner_img11} alt="img" /></figure>
                                                                        <div className="video-time">2:16:42</div>
                                                                        <span className="favorite-icon"><Link to="#"><i className="lb lb-favorite-icon"></i></Link></span>
                                                                        <div className="product-action"><p>Lorem ipsum, or lipsum as it is sometimes known, is dummy text. Lorem ipsum, or lipsum as it is sometimes known, is dummy text. Lorem ipsum, or lipsum as it is sometimes known, is dummy text.  </p></div>
                                                                    </div>
                                                                    <div className="shop-content">
                                                                        <span className="product-tag"><Link to="#" className="disabled-btn"><i className="lb lb-video-play-icon"></i></Link>
                                                                        </span>
                                                                        <h5>Find Your Meditation Style With These 7 Practices</h5>
                                                                        <div className="by-admin-media">
                                                                            <Link to="#"><i className="lb lb-user-icon"></i> BY ADMIN</Link>
                                                                            <div className="media-cat-list">
                                                                                <ul className="ul-row">
                                                                                    <li><span>Modality</span></li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                        <div className="share-book-btns">
                                                                            <ul className="display-ib">
                                                                                <li className="float-left"><strong>$ 302</strong></li>
                                                                                <li className="float-right"><Link className="btn cmn-btn" to="#payment-modal" data-toggle="modal">Buy Now</Link></li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-3 col-lg-4 col-md-4 col-sm-6">
                                                            <div className="l-g-bx">
                                                                <div className="single-shop-item single-media-item">
                                                                    <div className="shop-thumb fix p-relative">
                                                                        <figure className="p-bx-img"><img src={images.practitioner_img12} alt="img" /></figure>
                                                                        <div className="video-time">2:16:42</div>
                                                                        {/* <span className="favorite-icon"><Link className="active" to="#"><i className="lb lb-favorite-icon"></i></Link></span> */}
                                                                        <div className="product-action"><p>Lorem ipsum, or lipsum as it is sometimes known, is dummy text. Lorem ipsum, or lipsum as it is sometimes known, is dummy text. Lorem ipsum, or lipsum as it is sometimes known, is dummy text.  </p></div>
                                                                    </div>
                                                                    <div className="shop-content">
                                                                        <span className="product-tag"><Link to="#"><i className="lb lb-video-play-icon"></i></Link>
                                                                        </span>
                                                                        <h5>Find Your Meditation Style With These 7 Practices</h5>
                                                                        <div className="by-admin-media">
                                                                            <Link to="#"><i className="lb lb-user-icon"></i> BY ADMIN</Link>
                                                                            <div className="media-cat-list">
                                                                                <ul className="ul-row">
                                                                                    <li><span>Modality</span></li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                        <div className="share-book-btns">
                                                                            <ul className="display-ib">
                                                                                <li className="float-left"><strong>Free</strong></li>
                                                                                <li className="float-right"><Link className="btn cmn-btn" to="#">Download</Link></li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-3 col-lg-4 col-md-4 col-sm-6">
                                                            <div className="l-g-bx">
                                                                <div className="single-shop-item single-media-item">
                                                                    <div className="shop-thumb fix p-relative">
                                                                        <figure className="p-bx-img"><img src={images.practitioner_img13} alt="img" /></figure>
                                                                        <div className="video-time">2:16:42</div>
                                                                        {/* <span className="favorite-icon"><Link className="active" to="#"><i className="lb lb-favorite-icon"></i></Link></span> */}
                                                                        <div className="product-action"><p>Lorem ipsum, or lipsum as it is sometimes known, is dummy text. Lorem ipsum, or lipsum as it is sometimes known, is dummy text. Lorem ipsum, or lipsum as it is sometimes known, is dummy text.  </p></div>
                                                                    </div>
                                                                    <div className="shop-content">
                                                                        <span className="product-tag"><Link to="#" className="disabled-btn"><i className="lb lb-video-play-icon"></i></Link>
                                                                        </span>
                                                                        <h5>Find Your Meditation Style With These 7 Practices</h5>
                                                                        <div className="by-admin-media">
                                                                            <Link to="#"><i className="lb lb-user-icon"></i> BY ADMIN</Link>
                                                                            <div className="media-cat-list">
                                                                                <ul className="ul-row">
                                                                                    <li><span>Modality</span></li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                        <div className="share-book-btns">
                                                                            <ul className="display-ib">
                                                                                <li className="float-left"><strong>$ 302</strong></li>
                                                                                <li className="float-right"><Link className="btn cmn-btn" to="#payment-modal" data-toggle="modal">Buy Now</Link></li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-3 col-lg-4 col-md-4 col-sm-6">
                                                            <div className="l-g-bx">
                                                                <div className="single-shop-item single-media-item">
                                                                    <div className="shop-thumb fix p-relative">
                                                                        <figure className="p-bx-img"><img src={images.practitioner_img14} alt="img" /></figure>
                                                                        <div className="video-time">2:16:42</div>
                                                                        {/* <span className="favorite-icon"><Link className="active" to="#"><i className="lb lb-favorite-icon"></i></Link></span> */}
                                                                        <div className="product-action"><p>Lorem ipsum, or lipsum as it is sometimes known, is dummy text. Lorem ipsum, or lipsum as it is sometimes known, is dummy text. Lorem ipsum, or lipsum as it is sometimes known, is dummy text.  </p></div>
                                                                    </div>
                                                                    <div className="shop-content">
                                                                        <span className="product-tag"><Link to="#" className="disabled-btn"><i className="lb lb-video-play-icon"></i></Link>
                                                                        </span>
                                                                        <h5>Find Your Meditation Style With These 7 Practices</h5>
                                                                        <div className="by-admin-media">
                                                                            <Link to="#"><i className="lb lb-user-icon"></i> BY ADMIN</Link>
                                                                            <div className="media-cat-list">
                                                                                <ul className="ul-row">
                                                                                    <li><span>Modality</span></li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                        <div className="share-book-btns">
                                                                            <ul className="display-ib">
                                                                                <li className="float-left"><strong>$ 302</strong></li>
                                                                                <li className="float-right"><Link className="btn cmn-btn" to="#payment-modal" data-toggle="modal">Buy Now</Link></li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-3 col-lg-4 col-md-4 col-sm-6">
                                                            <div className="l-g-bx">
                                                                <div className="single-shop-item single-media-item">
                                                                    <div className="shop-thumb fix p-relative">
                                                                        <figure className="p-bx-img"><img src={images.practitioner_img15} alt="img" /></figure>
                                                                        <div className="video-time">2:16:42</div>
                                                                        {/* <span className="favorite-icon"><Link className="active" to="#"><i className="lb lb-favorite-icon"></i></Link></span> */}
                                                                        <div className="product-action"><p>Lorem ipsum, or lipsum as it is sometimes known, is dummy text. Lorem ipsum, or lipsum as it is sometimes known, is dummy text. Lorem ipsum, or lipsum as it is sometimes known, is dummy text.  </p></div>
                                                                    </div>
                                                                    <div className="shop-content">
                                                                        <span className="product-tag"><Link to="#" className="disabled-btn"><i className="lb lb-video-play-icon"></i></Link>
                                                                        </span>
                                                                        <h5>Find Your Meditation Style With These 7 Practices</h5>
                                                                        <div className="by-admin-media">
                                                                            <Link to="#"><i className="lb lb-user-icon"></i> BY ADMIN</Link>
                                                                            <div className="media-cat-list">
                                                                                <ul className="ul-row">
                                                                                    <li><span>Modality</span></li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                        <div className="share-book-btns">
                                                                            <ul className="display-ib">
                                                                                <li className="float-left"><strong>$ 302</strong></li>
                                                                                <li className="float-right"><Link className="btn cmn-btn" to="#payment-modal" data-toggle="modal">Buy Now</Link></li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-3 col-lg-4 col-md-4 col-sm-6">
                                                            <div className="l-g-bx">
                                                                <div className="single-shop-item single-media-item">
                                                                    <div className="shop-thumb fix p-relative">
                                                                        <figure className="p-bx-img"><img src={images.practitioner_img16} alt="img" /></figure>
                                                                        <div className="video-time">2:16:42</div>
                                                                        {/* <span className="favorite-icon"><Link className="active" to="#"><i className="lb lb-favorite-icon"></i></Link></span> */}
                                                                        <div className="product-action"><p>Lorem ipsum, or lipsum as it is sometimes known, is dummy text. Lorem ipsum, or lipsum as it is sometimes known, is dummy text. Lorem ipsum, or lipsum as it is sometimes known, is dummy text.  </p></div>
                                                                    </div>
                                                                    <div className="shop-content">
                                                                        <span className="product-tag"><Link to="#" className="disabled-btn"><i className="lb lb-video-play-icon"></i></Link>
                                                                        </span>
                                                                        <h5>Find Your Meditation Style With These 7 Practices</h5>
                                                                        <div className="by-admin-media">
                                                                            <Link to="#"><i className="lb lb-user-icon"></i> BY ADMIN</Link>
                                                                            <div className="media-cat-list">
                                                                                <ul className="ul-row">
                                                                                    <li><span>Modality</span></li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                        <div className="share-book-btns">
                                                                            <ul className="display-ib">
                                                                                <li className="float-left"><strong>$ 302</strong></li>
                                                                                <li className="float-right"><Link className="btn cmn-btn" to="#payment-modal" data-toggle="modal">Buy Now</Link></li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <div className="load-more-btn text-center"> <Link to="#" className="btn"><i className="lb lb-refresh-icon"></i> Load More</Link> </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={`tab-pane ${state.menu === "LiveClassesEvents" ? 'active' : "fade"}`} id="live-classes-events">
                                            <div className="live-classes-events-content">
                                                <div className="p-sec-list">
                                                    <div className="row">
                                                        {state?.classEvents?.length>0?state.classEvents.map((res)=>
                                                          <EventAndClassCard key={res.id} 
                                                          title={res?.title}
                                                          description={res?.description}
                                                          cost={res?.cost}
                                                          type={res?.type}
                                                          id={res?.id}
                                                          userId={res?.userId}
                                                          image={res?.docs ? config.imageBaseurl + res?.docs : images.no_image_available_default}
                                                          user={res?.eventCreatedUser}
                                                          service={res?.service}
                                                          getDetails={getEventDetailsModal}

                                                          />
                                                        ):''}
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <div className="load-more-btn text-center"> <Link to="#" className="btn"><i className="lb lb-refresh-icon"></i> Load More</Link> </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <ProfileShareModals />
                    <HomeFilterModal />
                    
                </main>
                <ProfileEventDetailsModal
                    data={state?.eventDetail}
                    response={state.eventDetailResponse}
                    host={state.eventDetail?.userId==authUser?.id}
                    onChange={handleBookingTImeChange}
                    value={state.selectBookingTimeDateForClass}
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
                    response={getAllClassEvents}
                    backButton="#profile-event-details-modal"
                 />
                <Footer />
            </Context.Provider>
        </>
    );
}

export default Home;
