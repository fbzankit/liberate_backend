import React, { useContext } from 'react';
import moment from 'moment';
import ReadMoreReact from 'read-more-react';
import Context from '../../Home/Context/Context';
import { useParams } from 'react-router';
import AuthUserContext from '../../../AuthUser/AuthUserContext';
import $ from 'jquery'
import { APIService } from '../../../ApiServices/Apis/APIServices';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { profileAvatar } from '../../../Utility/Utility';
import NoDataFound from '../../../Common/NoDataFound';
import images from '../../../Utility/Images';
const ProfilesEvents = ({ loadMore }) => {
    const authUser = useContext(AuthUserContext);
    const [state, dispatch] = useContext(Context)
    const { id } = useParams();
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
                // let duration = moment.duration(moment(info.end).diff(moment(info.start)));
                // let minutes = duration.asMinutes();
                dispatch({
                    type: 'eventDetail',
                    payload: {
                        Type: 'eventDetail',
                        eventDetail: res.data.data,
                        eventDetailResponse: true,
                        eventType: res.data.data?.type,
                        appointmentStartEventDate: '',
                        selectBookingTimeDateForClass:'choose',
                        appointmentStartEventTime:'',
                        costVariationValue: 'none',
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
    // get event details 
    const getEventDetails = (eventID) => {
        $('#webinar-event-view-modal').modal('show');
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
                        eventDetailResponse: true
                    }
                })
            } else {
                dispatch({
                    type: 'bookingDetails', payload: {
                        Type: 'bookingDetails', eventDetailResponse: true
                    }
                })
                $('#webinar-event-view-modal').modal('hide');
            }
        }).catch((error) => {
            dispatch({
                type: 'bookingDetails', payload: {
                    Type: 'bookingDetails', eventDetailResponse: true
                }
            })
            $('#webinar-event-view-modal').modal('hide');
        })
    }
    // handle booking details only webinars 
    const handleBooking = (info) => {

        dispatch({
            type: 'eventType',
            payload: {
                Type: 'eventType',
                eventType: info.extendedProps.eventType,
                appointmentStartEventDate: '',
                appointmentStartEventTime: '',
                costVariationValue: 'none',
                startEventDate: moment(info.start).format('DD-MM-YYYY'),
                startEventTime: moment(info.start).format('HH:mm:ss')
            }
        })
        if (info?.isBooked == false) {
            if (info.extendedProps.eventType === 'None') {
                toast.error(`sorry you can not select the ${info.title} time please choose another available time|`)
            } else {
                if (info?.isBooked != 1 && info.userId != authUser?.id) {
                    let duration = moment.duration(moment(info.end).diff(moment(info.start)));
                    let minutes = duration.asMinutes();
                    dispatch({
                        type: 'startEventDate',
                        payload: {
                            Type: 'startEventDate',
                            eventId: info.id,
                            duration: minutes,
                            selectServiceId: '',
                            startEventDate: moment(info.start).format('DD-MM-YYYY'),
                            startEventTime: moment(info.start).format('HH:mm:ss')
                        }
                    })
                    $('#booker-modal').modal('show');
                    if (info?.id) {
                        let data = {
                            event_id: info?.id
                        }
                        APIService.eventDetailsById(data).then((res) => {
                            if (res.data.status == 200) {
                                dispatch({
                                    type: 'bookingDetails', payload: {
                                        Type: 'bookingDetails',
                                        bookingDetails: res.data.data,
                                        selectServiceId: res.data.data?.services?.length > 0 ? res.data.data?.services[0].id : '',
                                        selectServiceText: res.data.data?.services?.length > 0 ? res.data.data?.services[0]?.service.name : '',
                                        cost: res.data.data.cost, 
                                        eventDetailResponse: true
                                    }
                                })
                            } else {
                                dispatch({
                                    type: 'bookingDetails', payload: {
                                        Type: 'bookingDetails', eventDetailResponse: true
                                    }
                                })
                            }
                        }).catch((error) => {
                            dispatch({
                                type: 'bookingDetails', payload: {
                                    Type: 'bookingDetails', eventDetailResponse: true
                                }
                            })
                        })
                    }
                }
            }
        } else {
            getEventDetails(info?.id)
        }
    }
    console.log(state);
    return (
        <>
            <div className="events-tab-content">
                <div className="rit-as-sec">
                    <div className="cmn-table-sec">
                        <table className="rwd-table">
                            <tbody>
                                {state.profileEvents.length > 0 ?
                                    <>
                                        <tr>
                                            <th>Event</th>
                                            <th>Type</th>
                                            <th>Description </th>
                                            {/* <th>Date & Time</th> */}
                                            <th>Action</th>
                                        </tr>
                                        {state.profileEvents.map((res, i) =>
                                            res.type != "Appointments" ? <tr key={i}>
                                                <td data-th="Host Name">
                                                    <div className="cricle-pic-name">
                                                        <Link to={`/profile/${res?.userId}`}> <figure className='event-square-image'><img src={profileAvatar(res.docs)} alt={res?.title} /></figure><span>{res?.title}</span></Link>
                                                    </div>
                                                </td>
                                                <td data-th="Service" className="event-service">
                                                    {res.type}
                                                </td>
                                                <td data-th="Description" className="review-more-less event-description">
                                                    <span className="more">
                                                        <ReadMoreReact
                                                            min={50}
                                                            max={5000}
                                                            text={res?.description ? res?.description : 'N/A'}
                                                            readMoreText={<a href={void (0)} className="morelink" style={{ cursor: 'pointer' }}>Read more</a>}
                                                        />
                                                    </span>
                                                </td>

                                                {/* <td data-th="Date" className="event-date">

                                                    {moment(res.start, 'YYYY-MM-DD HH:mm:ss').format('DD MMM YYYY')} &nbsp; {moment(res.start, 'YYYY-MM-DD HH:mm:ss').format('h:mm A')}
                                                </td> */}

                                                {/* {authUser?.id==id
                                                ?
                                                <td data-th="Action">
                                                    <button type="button" disabled={res?.isBooked?false:true} className="btn bdr-btn-default" onClick={()=>handleViewBooking(moment(res.start, 'YYYY-MM-DD HH:mm:ss').format('DD-MM-YYYY'),moment(res.start, 'YYYY-MM-DD HH:mm:ss ').format('hh:mm A'),res.id)}>View Bookings</button>
                                                </td>
                                                :<td data-th="Action">
                                                    {res?.isBooked ? <button type="button" className="btn bdr-btn" disabled={res?.isBooked}>Booked</button> : <button className="btn p-e-book-btn" type="button"  onClick={() => handleBooking(res)}>Book Now</button>}
                                                </td>} */}
                                                <td data-th="Action">
                                                    <button type="button" className="btn bdr-btn-default" onClick={() => getEventDetailsModal(res?.id)}>View</button>
                                                </td>

                                            </tr> : '')}
                                    </>
                                    : <NoDataFound
                                        image={images.no_webinars_right_now_img}
                                        title={'No Events Right Now!'}
                                        description={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem."}
                                        buttonTitle="Go Back to Home"
                                        buttonPath="/home"
                                    />}

                            </tbody>
                        </table>
                    </div>

                    {state.profileLimit > 0 ? <div className="row">
                        <div className="col-12">
                            <div className="load-more-btn text-center"> <button type="button" disabled={state.profileLimit > 1 ? false : true} onClick={loadMore} className="btn"><i className="lb lb-refresh-icon"></i> Load More</button> </div>
                        </div>
                    </div> : ''}
                </div>
            </div>

        </>
    );
}


export default React.memo(ProfilesEvents);