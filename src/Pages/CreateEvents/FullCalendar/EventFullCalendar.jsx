import React, { useContext, useEffect, createRef } from 'react';
import FullCalendar, { CustomContentRenderContext } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Calendar } from '@fullcalendar/core';
import allLocales from '@fullcalendar/core/locales-all';
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import moment from 'moment';
import $ from 'jquery';
import CreateEventContext from '../CreateEventContext/CreateEventContext';
import { APIService } from '../../../ApiServices/Apis/APIServices';
import AuthUserContext from '../../../AuthUser/AuthUserContext';
import { toast } from 'react-toastify';
const EventFullCalendar = () => {
    const [state, dispatch] = useContext(CreateEventContext)
    const authUser = useContext(AuthUserContext)
    const calendarComponentRef = createRef();

    useEffect(() => {
        let calendarApi = calendarComponentRef.current.getApi();
        calendarApi.gotoDate(moment(state.eventSingleDate, 'DD-MM-YYYY').format('YYYY-MM-DD'));
        return;
    }, [state.eventSingleDate])

    function fullCalendarChangeDate(date) {
        APIService.checkUser().then((res)=>{
            if(res.data.status==200){
            if (authUser?.is_parctitioner === '1') {
                dispatch({
                    type: 'startDate',
                    payload: {
                        Type: 'startDate',
                        defaultStartDate: moment(date?.startStr).format('YYYY-MM-DD'),
                        defaultStartDate: moment(date?.endStr).format('YYYY-MM-DD'),
                        startDate: moment(date?.startStr).format('YYYY-MM-DD'),
                        endDate: moment(date?.endStr).format('YYYY-MM-DD'),
                        fromTime: moment(date?.start).format('HH:mm'),
                        toTime: moment(date?.end).format('HH:mm'),
                        eventSingleDate: moment().format('DD-MM-YYYY'),
                        repeatBy: '',
                        eventType: '',
                        weekDays: [moment().format('dddd')],
                        numberOfWeek: 1,
                        availableDate: [{ from: moment(date?.startStr).format('YYYY-MM-DD'), to: moment(date?.endStr).format('YYYY-MM-DD') }],
                        // availableTime: [{from: moment(date?.startStr).format('HH:mm'), to: moment(date?.endStr).format('HH:mm')}],
                        availableTime: [],
                        cost: "0",
                        service: [],
                        serviceListOptions: [],
                        description: '',
                        seats: "0",
                        documents: [],
                        documentsValue: '',
                        documentsAll: [],
                        title: '',
                        eventDetail: '',
                    }
                })
                $('#event-type-popup').modal({
                    backdrop: 'static',
                    keyboard: false  // to prevent closing with Esc button (if you want this too)
                });
            } else {
                toast.error('You need to be approved as a Practitioner in order to start an event...')
            }
        }else{
            toast.error(res.data.message)
        }
    }).catch((error)=>{

    })
        // }else{
        //     alert('sorry you cant get')
        // }



    }
    const getEventBookingUserDetails = (eventID) => {
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
                        eventDetailResponse:true
                    }
                })
            } else {
                dispatch({
                    type: 'eventDetail',
                    payload: {
                        Type: 'eventDetail',
                        eventDetailResponse:true
                    }
                })
                $('#webinar-event-view-modal').modal('hide');
            }
        }).catch((error) => {
            dispatch({
                type: 'eventDetail',
                payload: {
                    Type: 'eventDetail',
                    eventDetailResponse:true
                }
            })
            $('#webinar-event-view-modal').modal('hide');
        })
    }
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
                        eventDetailResponse:true
                    }
                })
            } else {
                dispatch({
                    type: 'eventDetail',
                    payload: {
                        Type: 'eventDetail',
                        eventDetailResponse:true
                    }
                })
                $('#webinar-event-view-modal').modal('hide');
            }
        }).catch((error) => {
            dispatch({
                type: 'eventDetail',
                payload: {
                    Type: 'eventDetail',
                    eventDetailResponse:true
                }
            })
            $('#webinar-event-view-modal').modal('hide');
        })
    }

    const handleEventDetail=(info)=>{
        console.log(info.event,"handleInfo");
        dispatch({
            type:'eventType',
            payload:{
                Type:'eventType',
                eventType:info.event.extendedProps.eventType,
                startEventDate:moment(info.event.start).format('DD-MM-YYYY'),
                startEventTime:moment(info.event.start).format('HH:mm:ss'),
                endEventDate:moment(info.event.end).format('DD-MM-YYYY'),
                endEventTime:moment(info.event.end).format('HH:mm:ss'),
            }
        })
        if(info.event.extendedProps.eventType==="Appointments"){
            getEventDetails(info.event.id)
        }else{
            // getEventBookingUserDetails(info.event.id)
            getEventDetails(info.event.id)
        }
    }
    const eventContent = (e) => {
        // console.log(e.currentRange.start);
        const style={fontSize:'large',
            color:'#fff',
            fontWeight:'800',
            textAlign:' center',
            marginLeft:' auto',
            display:' block',
            marginTop:' 8px'
        }
        return (
            <>
                {/* <p className="text-light" style={{fontSize:"10px"}} >
                        {e.event.title}
                        <span><br/>{e.timeText}</span>
                    </p>
                */}
                {/* <a className="link-btn dropdown-toggle" href="#" role="button" id="my-account-dd" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> */}
                {e.event.extendedProps.eventType==="None"?
                <a className="link-btn dropdown-toggle mr-auto" style={style} href="#">
                                    {e.event.title}
                                    </a>:
                                    
                                    

                <div className="demo-popup">
                    <ul className="ul-row">
                        <li>
                            {e.timeText}
                            <div className="l-g-bx dot-dd-bx">
                                <div className="dropdown dd-right-side my-account-dd">
                                    {e.event.title}
                                    {/* <i className="lb lb-horizontal-more-icon"></i> */}

                                    <div className="dropdown-menu" aria-labelledby="my-account-dd">
                                        <div className="side-nav-bx">
                                            <ul>
                                                {/* <li><a href="#webinar-event-view-modal" onClick={() => getEventDetails(e.event.id)} data-toggle="modal" data-dismiss="modal"><i className="lb lb-message-icon"></i> Event Detail</a></li> */}
                                                <li><a href="#block-time-modal" data-toggle="modal" data-dismiss="modal"><i className="lb lb-calendar-icon"></i> View Bookings</a></li>
                                                <li><a href="#view-event-modal" data-toggle="modal"><i className="lb lb-block-icon"></i> Block Time</a></li>
                                                <li><a href="#un-block-time-modal" data-toggle="modal"><i className="lb lb-block-icon"></i> Unblock Time</a></li>
                                                <li><a href="#event-type-popup" data-toggle="modal"><i className="lb lb-user-1-icon"></i> Edit Event</a></li>
                                                <li><a href="#share-event-popup" data-toggle="modal"><i className="lb lb-share-icon"></i> Share Profile</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>}
                {/* </a> */}
            </>
        );
    }
    // console.log(state, 'AllEvents');
    return (
        <>

            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                // slotLabelContent={(e)=><span className="text-danger">{e.text}</span>}
                // eventTextColor={'#C4F1D4'}
                // eventColor={'#C4F1D4'}
                // displayEventTime={false}
                // editable={true}
                
                eventResizeStart={(e) => console.log(e, 'eventResizeStart')}
                initialView='timeGridWeek'
                events={state.allEventsData}
                // events={[
                //     {
                //         title: "What is Lorem Ipsum2",
                //         start: '2021-08-09 16:00:00',
                //         end: '2021-08-09 21:00:00'
                //     }
                // ]}
                // dateClick={fullCalendarChangeDate}
                selectable={true}
                // unselectAuto={false}
                longPressDelay={1}
                selectLongPressDelay={1}
                eventLongPressDelay={1}
                // timeZone={'Asia/Kollkata'}
                // progressiveEventRendering={true}
                nowIndicator={true}
                eventDragStart={(info) => {
                    console.log(info)
                }}
                // dayHeaderFormat={}
                select={fullCalendarChangeDate}
                allDaySlot={false}
                views={{
                    timeGridWeek: {
                        titleFormat: { year: 'numeric', month: 'long', day: '2-digit' }
                    }
                }}

                selectAllow={ function(info) {
                    if (moment(info.start).isBefore(moment()))
                        return false;
                        return true;          
                }}
                // selectOverlap={(e)=>console.log(e,'selectOverlap')}
                selectOverlap={false}

                // selectMinDistance={1}
                dayHeaderContent={(args) => moment(args.date).format('ddd Do')}
                slotDuration={'00:15:00'}
                customButtons={{
                    myCustomButton: {
                        text:<>
                            <div className="legend-dd" style={{margin: '-12px'}}>
                                <div className="l-g-bx dot-dd-bx">
                                    <div className="dropdown dd-right-side">
                                        <a className="link-btn dropdown-toggle" href="#" id="my-account-dd" data-toggle="dropdown">Legend <i className="lb lb-dropdown-icon"></i></a>
                                        <div className="dropdown-menu" aria-labelledby="my-account-dd">
                                            <div className="side-nav-bx">
                                                <ul>
                                                    <li><a href="#"><em className="color-bx booked-color"></em>Booked By Me</a></li>
                                                    <li><a href="#"><em className="color-bx bot-booked-color"></em>Not Yet Booked (Webinar/Class/Group)</a></li>
                                                    <li><a href="#"><em className="color-bx ava-appointment-color"></em>Availability For Appointment</a></li>
                                                    <li><a href="#"><em className="color-bx blocked-time-color"></em>Blocked Time</a></li>
                                                    <li><a href="#"><em className="color-bx somebody-booed-color"></em>Somebody Booked Me</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                        // click: function () {
                        //     alert('clicked the custom button!');
                        // },
                    },
                }}
                // dropAccept={true}
                nowIndicatorContent={<span>now</span>}
                // headerToolbar={{ left: 'prev,next today',
                //     center: 'title',
                //     right: 'dayGridMonth,timeGridWeek,timeGridDay'}}
                headerToolbar={{
                    start: 'title', // will normally be on the left. if RTL, will be on the right
                    center: 'myCustomButton',
                    end: 'today prev,next', // will normally be on the right. if RTL, will be on the left
                }}
                selectMirror={true}
                // viewDidMount={(info)=> {
                //         if(info.view.type == 'dayGridWeek') {
                //         info.view.calendar.setOption('firstDay', moment().toDate().getDay());
                //     } else if (info.view.type == 'dayGridMonth') {
                //         info.view.calendar.setOption('firstDay', 0);
                //     }
                // }
                // }
                ref={calendarComponentRef}
                // selectMinDistance={0}
                eventClick={handleEventDetail}
                rerenderDelay={200}
                nowIndicatorClassNames="text-primary"
                // themeSystem="bootstrap"
                nowIndicator={true}
                eventContent={eventContent}
                initialEvents={moment(state.eventSingleDate, 'DD-MM-YYYY').format('YYYY-MM-DD')}
                // now={`${moment().format('YYYY-MM-DD HH:MM:SS')}`}
            />
        </>
    );
}

export default EventFullCalendar;