import React, { useReducer, createRef, useContext, useState } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import images from '../../Utility/Images';
import EventFullCalendar from './FullCalendar/EventFullCalendar';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import Reducer from '../../Utility/Reducer';
import CreateEventContext from './CreateEventContext/CreateEventContext';
import { toast, ToastContainer } from 'react-toastify';
import CreateEventModal from './Modals/CreateEventModal';
import EventDetailsModal from './Modals/EventDetailsModal/EventDetailsModal';
import BlockTimeModal from './Modals/BlockUnBlockModal/BlockTimeModal';
import UnblockTimeModal from './Modals/BlockUnBlockModal/UnblockTimeModal';
import PaymentModal from '../Payments/Modals/PaymentModal';
import AuthUserContext from '../../AuthUser/AuthUserContext';
import BookingUserListModal from './Modals/BookinsUserModal/BookingUserListModal';
import $ from 'jquery';
import { APIService } from '../../ApiServices/Apis/APIServices';
import CropperModal from '../UserProfile/Components/CropperModal/CropperModal';
const initialState = {
    eventSingleDate: moment().format('DD-MM-YYYY'),
    repeatBy: '',
    eventType: '',
    weekDays: [moment().format('dddd')],
    numberOfWeek: 1,
    startDate: '',
    endDate: '',
    defaultStartDate: '',
    defaultEndDate: '',
    fromTime: '',
    toTime: '',
    availableDate: [],
    availableTime: [],
    cost: "0",
    service: [],
    endEventDate:'',
    startEventDate:'',
    endEventTime:'',
    startEventTime:'',
    serviceListOptions: [],
    description: '',
    seats: "0",
    documents: [],
    docs: '',
    documentsValue: '',
    documentsAll: [],
    title: '',
    allEventsData: [],
    eventDetail: '',
    eventDetailResponse: false,
    bookingUserList: [],
    bookingUserListResponse: false,
    practitionerServiceList: [],
    practitionerServiceListValue: [],
    croppieImage: [],
    croppieVideo: [],
    croppieImageBase64: [],
    progress:0,

}

const CreateEvent = () => {
    const [state, dispatch] = useReducer(Reducer, initialState)
    const authUser = useContext(AuthUserContext);
    function onChangeCalendar(newDate) {
        if (moment(newDate, 'DD-MM-YYYY') >= moment(moment(), 'DD-MM-YYYY')) {
            dispatch({ type: 'eventSingleDate', payload: { Type: 'eventSingleDate', eventSingleDate: moment(newDate).format('DD-MM-YYYY') } });
        } else {
            dispatch({ type: 'eventSingleDate', payload: { Type: 'eventSingleDate', eventSingleDate: moment(newDate).format('DD-MM-YYYY') } });
            // toast.error('Please select a date & time greater than current date & time');
        }
    }
    const handleViewBooking = (date, time, event_id) => {
        $('#block-time-modal').modal('show')
        dispatch({ type: 'bookingUserList', payload: { Type: 'bookingUserList', bookingUserListResponse: false } })
        APIService.bookedEventUsers({ time, date, event_id }).then((res) => {
            if (res.data.status == 200) {
                dispatch({ type: 'bookingUserList', payload: { Type: 'bookingUserList', bookingUserList: res.data.data, bookingUserListResponse: true } })
            } else {
                dispatch({ type: 'bookingUserList', payload: { Type: 'bookingUserList', bookingUserListResponse: true } })
                toast.error(res.data.message);
            }
        }).catch((error) => {
            dispatch({ type: 'bookingUserList', payload: { Type: 'bookingUserList', bookingUserListResponse: true } })
            toast.error('Error!');
            console.log(error);
        })
    }
    const CheckIsValue = ({ dots }) => {
        return (
            dots ? <span class="sidebar-numbers"></span> : ''
        )
    }
    const CalenderDots = ({ date, view }) => {

        if (view == "month")
            return (
                state.allEventsData?.find(res => moment(res.start).format('DD-MM-YYYY') == moment(date).format('DD-MM-YYYY'))
                    ? <CheckIsValue host={1} dots={true} />
                    : ''
            );
        return;
    }
    const setProgressBar=(count)=>{
        dispatch({ type: 'setProgressBar', payload: { Type: 'setProgressBar',progress:count} })

    }
    const handleProfileUpload = (file, type) => {
        $('#upload-images-popup').modal('hide');
        let form_data = new FormData();
        form_data.append('documents', file);
        dispatch({ type: 'documentsValue', payload: { Type: 'documentsValue', documentsValue: '' } })
        form_data.append('isDoc', 2);
        APIService.ApplyForPractitionerUploadDocs(form_data,setProgressBar).then((res) => {
            if(res.data.status == 200 && res.data.success) {
          
                toast.success(res.data.message)
                const FileIds = []
                // dispatch({ type: 'certificationsAll', payload: { Type: 'certificationsAll', documentsAll: [...state.documentsAll, ...res.data.data] } })
                dispatch({ type: 'certificationsAll', payload: { Type: 'certificationsAll',progress:0, documentsValue: '', documentsAll: res.data.data } })
                res.data.data.map(res => {
                    FileIds.push(res.id);
                })
                // dispatch({ type: 'certificationsIds', payload: { Type: 'certificationsIds', documents: [...state.documents, ...FileIds] } })
                dispatch({ type: 'certificationsIds', payload: { Type: 'certificationsIds', documents: FileIds,docs:res.data.data[0]?.name } })
            } else {
                dispatch({ type: 'fileUploadPreloader', payload: { Type: 'fileUploadPreloader', documentsValue: '', fileUploadPreloader: false } })
                toast.error('something wrong')
            }

        })
    }
    const dispatchHandle=(Ojb)=>{
        dispatch(Ojb);
    }
    return (
        <>
            <CreateEventContext.Provider value={[state, dispatch]}>
                <Header />
                <main>
                    <section className="account-settings-area">
                        <div className="container">
                            <div className="p-sec-heading">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="section-title">
                                            <h2>Scheduler</h2>
                                            <p>Click and Drag on the scheduler to create appointment slots, webinars, classes, group sessions.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="create-events-steps-content">
                                <div className="row">
                                    <div className="col-md-4">
                                        {/* <div className="demo-popup">
                                        <ul className="ul-row">
                                            <li><a href="#booker-modal" data-toggle="modal">Booker</a></li>
                                            <li><a href="#payment-modal" data-toggle="modal">Payment</a></li>
                                        </ul>
                                    </div> */}
                                        <div className="create-e-sidebar">
                                            <div className="shadow-radius-bx mb-25">
                                                <div className="calender-sec">
                                                    {/* <figure className="claender-img">
                                                    <img src={images.calender_img} alt="" />
                                                </figure> */}
                                                    <Calendar
                                                        tileContent={CalenderDots}
                                                        showNavigation={true}
                                                        onChange={onChangeCalendar}
                                                    // value={state.eventSingleDate}
                                                    />
                                                </div>
                                            </div>
                                            <div className="shadow-radius-bx">
                                                <div className="booking-sec">
                                                    <div className="bdr-heading">
                                                        <h2 className="float-left">Booking/Event</h2>
                                                        <a href="bookings.html" className="float-right">View All</a>
                                                    </div>
                                                    <div className="booking-list">
                                                        <div className="cmn-table-sec">
                                                            <table className="table">
                                                                <tbody>
                                                                    <tr>
                                                                        <td>
                                                                            <a href="#">Event Name</a>
                                                                        </td>
                                                                        <td>
                                                                            <a href="#">Host Name</a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <a href="#">Event Name</a>
                                                                        </td>
                                                                        <td>
                                                                            <a href="#">Host Name</a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <a href="#">Event Name</a>
                                                                        </td>
                                                                        <td>
                                                                            <a href="#">Host Name</a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <a href="#">Event Name</a>
                                                                        </td>
                                                                        <td>
                                                                            <a href="#">Host Name</a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <a href="#">Event Name</a>
                                                                        </td>
                                                                        <td>
                                                                            <a href="#">Host Name</a>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="demo-popup">
                                            <ul className="ul-row">
                                                {/* <li><a href="#event-type-popup" data-toggle="modal">Create Event Popup</a></li> */}
                                                {/* <li>
                                                <div className="l-g-bx dot-dd-bx">
                                                    <div className="dropdown dd-right-side my-account-dd"><a className="link-btn dropdown-toggle" href="#" role="button" id="my-account-dd" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Webinar  <i className="lb lb-horizontal-more-icon"></i></a>
                                                        <div className="dropdown-menu" aria-labelledby="my-account-dd">
                                                            <div className="side-nav-bx">
                                                                <ul>
                                                                    <li><a href="#webinar-event-view-modal" data-toggle="modal" data-dismiss="modal"><i className="lb lb-message-icon"></i> Event Detail</a></li>
                                                                    <li><a href="#block-time-modal" data-toggle="modal" data-dismiss="modal"><i className="lb lb-calendar-icon"></i> View Bookings</a></li>
                                                                    <li><a href="#view-event-modal" data-toggle="modal"><i className="lb lb-delete-icon"></i> Block Time</a></li>
                                                                    <li><a href="#event-type-popup" data-toggle="modal"><i className="lb lb-user-1-icon"></i> Edit Event</a></li>
                                                                    <li><a href="#share-event-popup" data-toggle="modal"><i className="lb lb-share-icon"></i> Share Profile</a></li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li> */}
                                                {/* <li><a href="#appointment-event-view-modal" data-toggle="modal">Appointment Event View</a></li> */}
                                            </ul>
                                        </div>
                                        <div className="create-event-content">
                                            {/* <div className="bdr-heading">
                                            <div className="row">
                                                <div className="col-md-6"> <h2>03 Jan 2021 - 09 Jan 2021</h2></div>
                                                <div className="col-md-6">
                                                    <div className="text-next-preview">
                                                        <strong>Today</strong>
                                                        <ul className="ul-row">
                                                            <li><a className="btn bdr-btn" href="#"><i className="lb lb-left_arrow-icon"></i></a></li>
                                                            <li><a className="btn bdr-btn" href="#"><i className="lb lb-rigth_arrow-icon"></i></a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> */}
                                            <div className="full-calender-sec">
                                                {/* <figure className="claender-img sidebar-right-btn" data-toggle="modal" data-target="#create-event-modal">
                                                <img src={images.calender_view} alt="" />
                                            </figure> */}
                                                <EventFullCalendar />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
                <CreateEventModal />
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
                    host={state.eventDetail?.userId == authUser?.id ? true : false}
                    remainingSeats={state.eventDetail?.remainingSeats}
                    docs={state.eventDetail?.docs}
                    response={state.eventDetailResponse}
                    handleViewBooking={handleViewBooking}
                />
                <BlockTimeModal />
                <UnblockTimeModal />
                <BookingUserListModal
                    data={state.bookingUserList}
                    response={state.bookingUserListResponse}
                />
                <CropperModal
                    response={handleProfileUpload}

                    viewport={{
                        width: 275,
                        height: 155,
                        // type: "square"
                    }}
                    size={{
                        width: 640,
                        height: 360,
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
                <Footer />
            </CreateEventContext.Provider>
        </>
    );
}

export default CreateEvent;