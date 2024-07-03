import React, { useReducer,useContext } from 'react';
import images from '../../Utility/Images';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import SideBar from '../SideBar/DashboardSideBar';
import { useEffect } from 'react';
import { APIService } from '../../ApiServices/Apis/APIServices';
import Context from '../Home/Context/Context';
import Reducer from '../../Utility/Reducer';
import MyBooking from './MyBooking/MyBooking'
import BookedMe from './BookedMe/BookedMe';
import AuthUserContext from '../../AuthUser/AuthUserContext';
import moment from 'moment';
import $ from 'jquery';
import EventDetailsModal from '../CreateEvents/Modals/EventDetailsModal/EventDetailsModal';
import { toast } from 'react-toastify';
import BookingUserListModal from '../CreateEvents/Modals/BookinsUserModal/BookingUserListModal';
const initialState = {
    bookings: [],
    myBookings: [],
    menu:'Bookings',
    startEventDate:'',
    startEventTime:'',
    endEventDate:'',
    endEventTime:'',
    bookingUserList:[],
    bookingUserListResponse:false,
    eventDetails:'',
    eventDetailResponse:false

}
const Bookings = () => {
    const authUser = useContext(AuthUserContext)
    const [state, dispatch] = useReducer(Reducer, initialState)
    useEffect(() => {
        booking();
        myBooking();
    }, [])

    useEffect(() => {
        if(authUser?.is_parctitioner==='0'){
            dispatch({type:'menu',payload:{Type:'menu',menu:'MyBookings'}});
        }
    }, [authUser])
    const booking = () => {
        let data = {

        }
        APIService.bookings(data).then((res) => {
            if (res.data.status == 200) {
                console.log(res, 'booking')
                dispatch({ type: 'bookings', payload: { Type: 'bookings', bookings: res.data.data } });
            } else {

            }
        }).catch((error) => {

        })
    }
    const myBooking = () => {
        let data = {
            page:0,
            limit:5,         
        }
        APIService.myBookings(data).then((res) => {
            if (res.data.status == 200) {
                dispatch({ type: 'myBookings', payload: { Type: 'myBookings', myBookings: res.data.data } });
            }
        }).catch((error) => {

        })
    }
   const changeMenu=(type)=>{
        dispatch({type:'menu',payload:{Type:'menu',menu:type}});
    }
    // EventDetail By Id
   const handleDetails=(id,date,time,duration)=>{
   let endTime= moment(moment(date +' '+ time,"DD-MM-YYYY hh:mm A")).add(parseInt(duration), 'minutes');
       dispatch({type:'DateTime',payload:{Type:'DateTime',endEventDate:endTime,endEventTime:endTime,startEventDate:date,startEventTime:time}})
       getEventDetails(id,date,time)
    }
    // view bookings
    const handleViewBooking=(date,time,event_id)=>{
        $('#block-time-modal').modal('show')
        dispatch({type:'bookingUserList',payload:{Type:'bookingUserList',bookingUserListResponse:false}})
        
        APIService.bookedEventUsers({time,date,event_id}).then((res)=>{
            if(res.data.status==200){
                dispatch({type:'bookingUserList',payload:{Type:'bookingUserList',bookingUserList:res.data.data,bookingUserListResponse:true}})
            }else{
                dispatch({type:'bookingUserList',payload:{Type:'bookingUserList',bookingUserListResponse:true}})
                toast.error(res.data.message);
            }
        }).catch((error)=>{
            dispatch({type:'bookingUserList',payload:{Type:'bookingUserList',bookingUserListResponse:true}})
                toast.error('Error!');
            console.log(error);
        })
    }
    // View Details
    const getEventDetails=(eventID,date,time)=>{
        $('#webinar-event-view-modal').modal('show');
        dispatch({
            type: 'responseDataFalse',
            payload: {
                Type: 'responseDataFalse',
                eventDetailResponse:false
            }
        })
        let data={
            event_id:eventID,
            date:date,
            time:time
          }
        APIService.eventDetailsById(data).then((res)=>{
      
                 if(res.data.status==200){
                     dispatch({
                         type: 'eventDetail',
                         payload: {
                             Type: 'eventDetail',
                             eventDetail:res.data.data,
                             eventDetailResponse:true
                         }
                     })
                 }else{
                    dispatch({type:'bookingDetails',payload:{
                        Type:'bookingDetails',eventDetailResponse:true
                    }})
                     $('#webinar-event-view-modal').modal('hide');
                 }
        }).catch((error)=>{
            dispatch({type:'bookingDetails',payload:{
                Type:'bookingDetails',eventDetailResponse:true
            }})
             $('#webinar-event-view-modal').modal('hide');
        })
    }
console.log(state);
    return (
        <>
            <Context.Provider value={[state, dispatch]}>
                <Header />
                <main>
                    <section class="account-settings-area">
                        <div class="container">
                            <div class="p-sec-heading">
                                <div class="row">
                                    <div class="col-12">
                                        <div class="section-title">
                                            <h2>Bookings</h2>
                                            <p>View your bookings.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="account-settings-content">
                                <SideBar />
                                <div class="rit-as-sec p-30">
                                    <div class="all-noti-panel">
                                        <div class="bdr-heading">
                                            <h2>Bookings</h2>
                                            <div class="search-form">
                                                <form action="#">
                                                    <div class="top-search-bar">
                                                        <input type="email" placeholder="Search..." />
                                                        <button class="btn-link"><i class="lb lb-search-icon"></i></button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                        <div class="default-tabing">
                                            <div class="default-tabs-list">
                                                <ul class="nav nav-pills">
                                                   {authUser?.is_parctitioner==1?
                                                   <>
                                                   <li class="nav-item">
                                                        <a class={`nav-link ${state.menu==="Bookings"?'active':''}`} href="#" onClick={()=>changeMenu('Bookings')}>Bookings</a>
                                                    </li>
                                                    <li class="nav-item">
                                                        <a class={`nav-link ${state.menu==="MyBookings"?'active':''}`} href="#" onClick={()=>changeMenu('MyBookings')} >My Bookings</a>
                                                    </li>
                                                    </>
                                                    :
                                                    <li class="nav-item">
                                                        <a class={`nav-link active`} href="#" onClick={()=>changeMenu('MyBookings')} >My Bookings</a>
                                                    </li>
                                                    }
                                                </ul>
                                            </div>
                                            {authUser?.is_parctitioner==1?<BookedMe getEventDetails={handleDetails} />:''}
                                            <MyBooking getEventDetails={handleDetails}/>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </section>
                </main>
                <EventDetailsModal 
                eventId={state.eventDetail?.id} 
                title={state.eventDetail?.title} 
                eventType={state.eventDetail?.type}
                date={moment(state?.startEventDate, 'DD-MM-YYYY').format('D MMM YYYY')}
                time={moment(state?.startEventTime, 'HH:mm').format('hh:mm A')}
                endDate={moment(state?.endEventDate, 'DD-MM-YYYY').format('D MMM YYYY')}
                endTime={moment(state?.endEventTime, 'HH:mm').format('hh:mm A')}
                seats={state.eventDetail?.seats}
                services={state.eventDetail?.services}
                description={state.eventDetail?.description}
                cost={state.eventDetail?.cost}
                meetingRoomId={state.eventDetail?.meeting_detail?.room_id}
                host={state.eventDetail?.userId==authUser?.id?true:false}
                remainingSeats={state.eventDetail?.remainingSeats}
                docs={state.eventDetail?.docs}
                response={state.eventDetailResponse}
                handleViewBooking={handleViewBooking}

                />
                <BookingUserListModal
                data={state.bookingUserList}
                response={state.bookingUserListResponse}
                />
                <Footer />
            </Context.Provider>
        </>
    );
}

export default Bookings;