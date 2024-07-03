import React, { useReducer, useEffect, useContext } from 'react';
import images from '../../Utility/Images';
import Footer from '../Footer/Footer';
import SideBar from '../SideBar/DashboardSideBar';
import ReviewsModalFilter from './ReviewsModals/ReviewsModalFilter';
import Header from '../Header/Header';
import Reducer from '../../Utility/Reducer'
import { APIService } from '../../ApiServices/Apis/APIServices';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import config from '../../ApiServices/Apis/config';
import ReadMoreReact from 'read-more-react/dist/components/ReadMoreReact';
import moment from 'moment';
import ReviewModal from './ReviewsModals/ReviewModal';
import Context from '../Home/Context/Context';
import PaymentModal from '../Payments/Modals/PaymentModal';
import ReplyModal from './ReviewsModals/ReplyModal';
import AuthUserContext from '../../AuthUser/AuthUserContext';
import NoDataFound from '../../Common/NoDataFound';
import $ from 'jquery';
import { showHideDiv, profileAvatar } from '../../Utility/Utility';
import ReviewsPaymentModal from './ReviewsModals/ReviewsPaymentModal';
const initialState = {
    sendReviews: [],
    bookerId:'',
    pracId:'',
    notReviews: [],
    receivedReviews: [],
    comment: '',
    eventTip: 0,
    eventRating: 0,
    menu: 'Sent',
    page: 0,
    limit: 20,
    LoadMore: true,
    replyComment: '',
    replyID: '',
    response: 0,
    displayOnProfile: []
}
const Reviews = () => {
    const [state, dispatch] = useReducer(Reducer, initialState)
    const authUser = useContext(AuthUserContext)
    useEffect(() => {
        if (state.menu === "Sent") {
            listOfRatedEvent('useEffect');
        } else if (state.menu === "Received") {
            listOfReceivedRating('useEffect');
        } else if (state.menu === "Reviews") {
            listOfNoneRatedEvent('useEffect');
        }
    }, [state.menu]);

 const handleResponse=()=>{
    $('#reviews-payment-modal').modal('hide');
    $('#review-tips-popup').modal('hide');
    dispatch({type:'reset',payload:{Type:'reset',eventRating:0,comment:'',eventTip:0}})
 }
    const listOfRatedEvent = (type) => {
        let data = {
            page: state.page,
            limit: state.limit
        }
        APIService.ratedEvent(data).then((res) => {
            if (res.data.status == 200) {
                if (type === 'useEffect') {
                    dispatch({ type: type, payload: { Type: type, sendReviews: res.data.data, response: 1 } })
                } else if (type === 'loadMore') {
                    dispatch({ type: type, payload: { Type: type, sendReviews: [...state.sendReviews, ...res.data.data], response: 1 } })
                }
            } else {
                dispatch({ type: "response", payload: { Type: "response", response: 1 } })
                toast.error(res.data.message);
            }
        }).catch((error) => {
            dispatch({ type: "response", payload: { Type: "response", response: 1 } })

        })
    }
    const ChangeMenu = (type) => {
        dispatch({ type: type, payload: { Type: type, menu: type, Page: 0, LoadMore: true } });
    }
    const handleChange = (e, id) => {
        const target = e.target;
        var value = target.value;
      if(value!=NaN&&value!=undefined&&value!=null&&value!=''){ 
          if (target.checked) {
            dispatch({ type: 'displayOnProfile', payload: { Type: 'displayOnProfile', displayOnProfile: [...state.displayOnProfile, parseInt(value)] } })
        } else if (target.checked == false) {
            const value = state.displayOnProfile.indexOf(parseInt(id))
            if (value !== -1) {
                state.displayOnProfile.splice(value, 1);
            }
            dispatch({ type: 'displayOnProfile', payload: { Type: 'displayOnProfile', displayOnProfile: state.displayOnProfile } })
        }
      }
    }
    const DisplayOnProfile = (e) => {
        e.preventDefault();
        if (state.displayOnProfile?.length > 0) {
            APIService.displayReview({ review_id: state.displayOnProfile.toString() }).then((res) => {
                if (res.data.status == 200) {
                    dispatch({ type: 'displayOnProfile', payload: { Type: 'displayOnProfile', displayOnProfile: [] } })
                    toast.success(res.data.message)
                } else {
                    toast.error(res.data.message)
                }
            }).catch((error) => {

            })
        } else {
            toast.error('please select min 1 review to show profile')
        }
    }
    const listOfNoneRatedEvent = (type) => {
        let data = {
            page: state.page,
            limit: state.limit
        }
        APIService.nonRatedEvent(data).then((res) => {
            dispatch({ type: "response", payload: { Type: "response", response: 3 } })

            if (res.data.status == 200) {
                if (type === 'useEffect') {
                    dispatch({ type: type, payload: { Type: type, notReviews: res.data.data } })
                } else if (type === 'loadMore') {
                    dispatch({ type: type, payload: { Type: type, notReviews: [...state.notReviews, ...res.data.data] } })
                }
            } else {
                // toast.error(res.data.message);
            }
        }).catch((error) => {
            dispatch({ type: "response", payload: { Type: "response", response: 3 } })
        })
    }
    const listOfReceivedRating = (type) => {
        let data = {
            page: state.page,
            limit:state.limit
        }
        APIService.receivedRating(data).then((res) => {
            dispatch({ type: "response", payload: { Type: "response", response: 2 } })
            if (res.data.status == 200) {
                if (type === 'useEffect') {
                    dispatch({ type: type, payload: { Type: type, receivedReviews: res.data.data } })
                } else if (type === 'loadMore') {
                    dispatch({ type: type, payload: { Type: type, receivedReviews: [...state.receivedReviews, ...res.data.data] } })
                }
            } else {
                // toast.error(res.data.message);
            }
        }).catch((error) => {
            dispatch({ type: "response", payload: { Type: "response", response: 2 } })
        })
    }
    const handleSubmitReview = () => {
        
        if(state.eventTip>0){
            $('#reviews-payment-modal').modal('show');
            $('#review-tips-popup').modal('hide');
        }else{
            if (submitReviewValidation()) {
                let data = {
                    prac_id: state.pracId,
                    rating: state.eventRating,
                    tip: state.eventTip,
                    comment: state.comment,
                    booking_id: state.bookerId,
                    tip_stripe_id: '',
                }
                APIService.submitReview(data).then((res) => {
                    if (res.data.status == 200) {
                        toast.success(res.data.message);
                        handleResponse()
                    } else {
                        toast.error(res.data.message);
                    }
                }).catch((error) => {
    
                })
            }
        }
        
    }
    const submitReviewValidation = () => {
        const condition = true;
        if (state.comment?.length > 0 && state.comment?.length < 20) {
            condition = false;
            toast.error('min 20 words required');
        }
        if (state.eventTip==='') {
            condition = false;
            toast.error('tip is required');
        }
        if (state.bookerId=='') {
            condition = false;
            toast.error('you missed something!');
        }
        if (state.pracId=='') {
            condition = false;
            toast.error('you missed something!');
        }
        if (state.eventRating==0) {
            condition = false;
            toast.error('rating is required');
        }
        return condition;
    }

    const loadMore = () => {

        if (state.menu === "Sent") {

            listOfRatedEvent('loadMore');

        } else if (state.menu === "Received") {

            listOfReceivedRating('loadMore');
        } else if (state.menu === "Reviews") {

            listOfNoneRatedEvent('loadMore');
        }

    }

    console.log(state);
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
                                            <h2>Reviews</h2>
                                            <p>Send/Receive reviews and tips.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="account-settings-content">
                                <div className="lft-as-sec">
                                    <SideBar />
                                </div>
                                <div className="rit-as-sec p-30">
                                    <div className="all-noti-panel all-review-panel">
                                        <div className="bdr-heading">
                                            <div className="row">
                                                {/*<div className="col-xl-4 col-lg-4 col-md-4 col-sm-4">
                                                    <div className="section-title">
                                                         <h2>3 New Review</h2> 
                                                    </div>
                                                </div>*/}
                                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                                    <div className="filter-right">
                                                        <ul className="d-inline-block ul-row">
                                                            <li><a className="filter-btn" href="#review-modal" data-toggle="modal" className="sidebar-menu menu-tigger filter-tigger"><i className="lb lb-filter-icon"></i></a></li>
                                                            <li><div className="search-form">
                                                                <form action="#">
                                                                    <div className="top-f-btn"></div>
                                                                    <div className="top-search-bar">
                                                                        <input type="email" placeholder="Search..." />
                                                                        <button className="btn-link"><i className="lb lb-search-icon"></i></button>
                                                                    </div>
                                                                </form>
                                                            </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="default-tabing">
                                            <div className="default-tabs-list">
                                                <ul className="nav nav-pills">
                                                    <li className="nav-item">
                                                        <a className="nav-link active" onClick={() => ChangeMenu('Sent')} data-toggle="pill" href="#sent-review">Sent</a>
                                                    </li>
                                                    {authUser?.is_parctitioner === '1' ? <li className="nav-item">
                                                        <a className="nav-link" onClick={() => ChangeMenu('Received')} data-toggle="pill" href="#received-review">Received</a>
                                                    </li> : ''}
                                                    <li className="nav-item">
                                                        <a className="nav-link" onClick={() => ChangeMenu('Reviews')} data-toggle="pill" href="#reviews">Reviews </a>
                                                    </li>
                                                </ul>
                                            </div>


                                            <div className="tab-content">
                                                <div className="sent-review-tab tab-pane active" id="sent-review">
                                                    <div className="review-events-table">
                                                        <div class="u-p-files-list">
                                                            <div class="custom-table">
                                                                {state.sendReviews.length > 0 ? <div class="c-table-row table-header">
                                                                    <div class="cell review-user-name">Name</div>
                                                                    <div class="cell review-event-date">Event Date</div>
                                                                    <div class="cell review-write-date">Review Date</div>
                                                                    <div class="cell review-event-type">Type</div>
                                                                    <div class="cell review-event-rate">Rate</div>
                                                                    <div class="cell review-write-btn text-right">Action</div>
                                                                </div> : ''}
                                                                {state.sendReviews.length > 0 ? state.sendReviews.map((res, i) => <div key={i} class="c-table-row cmn-new-toggle">
                                                                    <div class="cell review-user-name" data-title="Name">
                                                                        <div class="review-ck">
                                                                            <div class="cricle-pic-name">
                                                                                <figure><img src={profileAvatar(res?.User?.image, res?.User?.social_image)} alt={res?.User?.name} /></figure><span><Link to={`/profile/${res?.User?.id}`}>{res?.User?.name}</Link></span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="cell review-event-date" data-title="Event Date">
                                                                        <div class="c-table-text">{moment(res.date + ' ' + res.time, 'DD-MM-YYYY hh:mm A').format('D MMM, YYYY h:m A')}</div>
                                                                    </div>
                                                                    <div class="cell review-write-date" data-title="Review Date">
                                                                        <div class="c-table-text">{moment(res.createdAt).format('D MMM, YYYY hh:m A')}</div>
                                                                    </div>
                                                                    <div class="cell review-event-type" data-title="Type">
                                                                        <div class="c-table-text">{res?.event?.type}</div>
                                                                    </div>
                                                                    <div class="cell review-event-rate" data-title="Rate">
                                                                        <div class="rating-star"><ul class="ul-row"><li><span>{res?.event_review?.rating}</span></li><li><img src={images.star_rating} alt="" /></li><li><span class="gave-tip">(${res?.event_review?.tip})</span></li></ul></div>
                                                                    </div>

                                                                    <div class="cell review-write-btn text-right" data-title="Write Review">
                                                                        {/* <div class="c-table-text text-right"> */}
                                                                        {/* <button type="button" class="btn default-btn" >Reply</button> */}                                                                       
                                                                                        <ul className="ul-list">
                                                                                            <li><a href="chat.html" target="_blank"><i className="lb lb-message-icon"></i></a></li>
                                                                                        </ul>                                                                                   
                                                                        {/* </div> */}
                                                                    </div>
                                                                    <div class="posted-review-content">
                                                                        <p><ReadMoreReact
                                                                            min={50}
                                                                            max={5000}
                                                                            text={res?.event_review?.comment ? res?.event_review?.comment : 'N/A'}
                                                                            readMoreText={<a href={void (0)} className="morelink" style={{ cursor: 'pointer' }}>Read more</a>}
                                                                        /></p>
                                                                    </div>
                                                                    <div id="post-review-box" class="write-review-content-bx new-toggle-dropdown" style={{ display: res?.event_review?.reply ? 'block' : 'none' }}>
                                                                        <div class="review-bx">
                                                                            <figure class="n-m-pic"><img src={profileAvatar(res?.User?.image, res?.User?.social_image)} alt={res?.User?.name} /></figure>
                                                                            <div class="rit-m-bx">
                                                                                <div class="review-parent-bx">
                                                                                    <strong><Link to={`/profile/${res?.User?.id}`}>{res?.User?.name}</Link></strong><span>20 Oct, 2021 6:15 AM</span>
                                                                                    {/* <button type="button" class="btn link-btn" ><i class="lb lb-reply-icon"></i></button> */}
                                                                                    <p><ReadMoreReact
                                                                                        min={50}
                                                                                        max={5000}
                                                                                        text={res?.event_review?.reply ? res?.event_review?.reply : 'N/A'}
                                                                                        readMoreText={<a href={void (0)} className="morelink" style={{ cursor: 'pointer' }}>Read more</a>}
                                                                                    /></p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>) : state.response == 1 ? <NoDataFound
                                                                    image={images.no_webinars_right_now_img}
                                                                    title={'No Sent Reviews Right Now!'}
                                                                    description={"Lorem ipsum dolor sit amet consectetur odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem."}
                                                                    buttonTitle="Go Back to Home"
                                                                    buttonPath="/home" /> : <div className="spinner-border text-primary" role="status">
                                                                            <span className="sr-only">Loading...</span>
                                                                        </div>}
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="received-review-tab tab-pane fade" id="received-review">
                                                    <div className="review-events-table">

                                                        <div class="u-p-files-list">
                                                            <div class="custom-table">
                                                                {state.receivedReviews.length > 0 ? <div class="c-table-row table-header">
                                                                    <div class="cell review-user-name">Name</div>
                                                                    <div class="cell review-event-date">Event Date</div>
                                                                    <div class="cell review-write-date">Review Date</div>
                                                                    <div class="cell review-event-type">Type</div>
                                                                    <div class="cell review-event-rate">Rate</div>
                                                                    <div class="cell review-write-btn text-right">Action</div>
                                                                </div> : ''}
                                                                {state.receivedReviews.length > 0 ? state.receivedReviews.map((res, i) => <div key={i} class="c-table-row cmn-new-toggle">
                                                                    <div class="cell review-user-name" data-title="Name">
                                                                        <div class="review-ck">
                                                                            <label class="lm-ck-bx"><input type="checkbox" checked="checked" onChange={(e) => handleChange(e, res?.event_review?.id)} value={res?.event_review?.id} checked={state.displayOnProfile.find((fi) => fi == res?.event_review?.id) ? true : false} />
                                                                                <span class="checkmark"></span>
                                                                            </label>
                                                                            <div class="cricle-pic-name">
                                                                                <figure><img src={profileAvatar(res?.user?.image, res?.user?.social_image)} alt={res?.user?.name} /></figure><span><Link to={`/profile/${res?.user?.id}`}>{res?.user?.name}</Link></span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="cell review-event-date" data-title="Event Date">
                                                                        <div class="c-table-text">{moment(res.date + ' ' + res.time, 'DD-MM-YYYY hh:mm A').format('D MMM, YYYY h:m A')}</div>
                                                                    </div>
                                                                    <div class="cell review-write-date" data-title="Review Date">
                                                                        <div class="c-table-text">{moment(res.createdAt).format('D MMM, YYYY hh:m A')}</div>
                                                                    </div>
                                                                    <div class="cell review-event-type" data-title="Type">
                                                                        <div class="c-table-text">{res?.event?.type}</div>
                                                                    </div>
                                                                    <div class="cell review-event-rate" data-title="Rate">
                                                                        <div class="rating-star"><ul class="ul-row"><li><span>{res?.event_review?.rating}</span></li><li><img src={images.star_rating} alt="" /></li><li><span class="gave-tip">(${res?.event_review?.tip})</span></li></ul></div>
                                                                    </div>

                                                                    <div class="cell review-write-btn text-right" data-title="Write Review">
                                                                        {/* <div class="c-table-text text-right"> */}
                                                                        {/* <button type="button" class="btn default-btn" >Reply</button> */}
                                                                         <ul className="ul-list">
                                                                                            {res?.event_review?.reply == null ?
                                                                                                <li><a href="#review-reply-popup" data-toggle="modal" onClick={() => dispatch({ type: 'replyID', payload: { Type: 'replyID', replyID: res.event_review.id } })}><i className="lb lb-refresh-icon"></i> Reply</a></li>
                                                                                                : ''}
                                                                                            {/* <li><a href="chat.html" target="_blank"><i className="lb lb-message-icon"></i></a></li> */}
                                                                          </ul>                                                                        
                                                                        {/* </div> */}
                                                                    </div>
                                                                    <div class="posted-review-content">
                                                                        <p><ReadMoreReact
                                                                            min={50}
                                                                            max={5000}
                                                                            text={res?.event_review?.comment ? res?.event_review?.comment : 'N/A'}
                                                                            readMoreText={<a href={void (0)} className="morelink" style={{ cursor: 'pointer' }}>Read more</a>}
                                                                        /></p>
                                                                    </div>
                                                                    <div id="post-review-box" class="write-review-content-bx new-toggle-dropdown" style={{ display: res?.event_review?.reply ? 'block' : 'none' }}>
                                                                        <div class="review-bx">
                                                                            <figure class="n-m-pic"><img src={profileAvatar(authUser?.image, authUser?.social_image)} alt={authUser?.name} /></figure>
                                                                            <div class="rit-m-bx">
                                                                                <div class="review-parent-bx">
                                                                                    <strong><Link to={`/profile/${authUser?.id}`}>{authUser?.name}</Link></strong><span>20 Oct, 2021 6:15 AM</span>
                                                                                    {/* <button type="button" class="btn link-btn" ><i class="lb lb-reply-icon"></i></button> */}
                                                                                    <p><ReadMoreReact
                                                                                        min={50}
                                                                                        max={5000}
                                                                                        text={res?.event_review?.reply ? res?.event_review?.reply : 'N/A'}
                                                                                        readMoreText={<a href={void (0)} className="morelink" style={{ cursor: 'pointer' }}>Read more</a>}
                                                                                    /></p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>) : state.response == 2 ? <NoDataFound
                                                                    image={images.no_webinars_right_now_img}
                                                                    title={'No Received Reviews Right Now!'}
                                                                    description={"Lorem ipsum dolor sit amet consectetur odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem."}
                                                                    buttonTitle="Go Back to Home"
                                                                    buttonPath="/home" /> : <div className="spinner-border text-primary" role="status">
                                                                            <span className="sr-only">Loading...</span>
                                                                        </div>}
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-12">
                                                                <div className="lm-dp-btns">

                                                                    <div className="diplay-profile-btn"> <button type="button" onClick={DisplayOnProfile} disabled={state.displayOnProfile?.length > 0 ? false : true} className="btn">Display on my Profile</button> </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="reviews-tab tab-pane fade" id="reviews">
                                                    <div className="received-review-content">
                                                        <div className="cmn-table-sec">
                                                            <table className="rwd-table">
                                                                <tbody>
                                                                    {state.notReviews.length > 0 ? <tr>
                                                                        <th>Name</th>
                                                                        <th>Event Date</th>
                                                                        <th>Date</th>
                                                                        <th>Type</th>
                                                                        <th>Action</th>
                                                                    </tr> : ''}
                                                                    {state.notReviews.length > 0 ?
                                                                        state.notReviews.map((res, i) =>
                                                                            <tr key={i}>

                                                                                <td className="review-name" data-th="Name">
                                                                                    <div className="cricle-pic-name">
                                                                                        <Link to={`/profile/${res?.User?.id}`}> <figure><img src={profileAvatar(res?.User?.image , res?.User?.social_image)} alt={res?.User.name} /></figure><span>{res?.User.name}</span></Link>
                                                                                    </div>
                                                                                </td>
                                                                                <td className="review-time" data-th="Event Date">{moment(res.date + ' ' + res.time, 'DD-MM-YYYY hh:mm A').format('D MMM, YYYY h:m A')}</td>
                                                                                
                                                                                <td className="review-time" data-th="Review Date">{moment(res.createdAt).format('D MMM, YYYY hh:m A')}</td>
                                                                                <td className="review-type" data-th="Type">Webinar</td>                                                                                
                                                                                <td className="write-review-user"  data-th="Action">
                                                                                    <button type="button" className="btn" data-toggle="modal" onClick={()=>dispatch({type:'ReviewTo',payload:{Type:'ReviewTo',bookerId:res.id,pracId:res?.event?.userId}})} data-target="#review-tips-popup">Review</button>
                                                                                </td>
                                                                            </tr>
                                                                        ) : state.response == 3 ? <NoDataFound
                                                                            image={images.no_webinars_right_now_img}
                                                                            title={'No Reviews Right Now!'}
                                                                            description={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem."}
                                                                            buttonTitle="Go Back to Home"
                                                                            buttonPath="/home" /> : <div className="spinner-border text-primary" role="status">
                                                                                <span className="sr-only">Loading...</span>
                                                                            </div>

                                                                    }
                                                                </tbody>
                                                            </table>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="lm-dp-btns">
                                                        <div className="load-more-btn text-center">
                                                            <button type="button" className="btn" onClick={loadMore}><i className="lb lb-refresh-icon"></i> Load More</button>
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
                </main>
                <ReviewModal submit={handleSubmitReview} />
                <ReviewsModalFilter />
                <ReplyModal replyId={state.replyID} replyComment={dispatch} />
                <Footer />
                <ReviewsPaymentModal
                    tip={state.eventTip}
                    rating={state.eventRating}
                    comment={state.comment}
                    pracId={state.pracId}
                    bookingId={state.bookerId}
                    validation={submitReviewValidation}
                    response={handleResponse}
            />
            </Context.Provider>
        </>
    );
}


export default Reviews;