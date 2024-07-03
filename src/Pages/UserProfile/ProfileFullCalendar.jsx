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
import { APIService } from '../../ApiServices/Apis/APIServices';
import AuthUserContext from '../../AuthUser/AuthUserContext';
import Context from '../Home/Context/Context';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
const ProfileFullCalendar = () => {
    const [state,dispatch] = useContext(Context)
    const authUser= useContext(AuthUserContext)
    const { id } = useParams();
    const getEventDetails=(eventID)=>{
        $('#webinar-event-view-modal').modal('show');
        let data={
            event_id:eventID
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
    const eventContent = (e) => {
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
                    </p> */}
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
            </>
        );
    }
const handleBooking=(info)=>{
    console.log(info.event.start,info.event.end,'nifof');
    dispatch({
        type:'eventType',
        payload:{
            Type:'eventType',
            eventType:info.event.extendedProps.eventType,
            appointmentStartEventDate:'',
            appointmentStartEventTime:'',
            costVariationValue:'none',
            appointmentEndDateTime:info.event.end,
            startEventDate:moment(info.event.start).format('DD-MM-YYYY'),
            startEventTime:moment(info.event.start).format('HH:mm:ss'),
            endEventTime:moment(info.event.end).format('HH:mm:ss'),
            endEventDate:moment(info.event.end).format('DD-MM-YYYY')
        }
    })
    if(info.event.extendedProps.isBooked==false){
        if(info.event.extendedProps.eventType==="Appointments"){
            if(info.event.extendedProps.userId!=authUser?.id){
                dispatch({type:'startEventDate',payload:{Type:'startEventDate',eventId:info.event.id,cost:'0',selectServiceId:''}})
                $('#booker-modal').modal('show')
                if(info.event.id){
                let data={
                    event_id:info.event.id
                }
                APIService.eventDetailsById(data).then((res)=>{
                        if(res.data.status==200){
                            dispatch({type:'bookingDetails',payload:{
                                Type:'bookingDetails',
                                bookingDetails:res.data.data,eventDetailResponse:true
                            }})
                        }else{
                            dispatch({type:'bookingDetails',payload:{
                                Type:'bookingDetails',eventDetailResponse:true
                            }})
                        }
                }).catch((error)=>{
                    dispatch({type:'bookingDetails',payload:{
                        Type:'bookingDetails',eventDetailResponse:true
                    }})
                    })
                }
            }
        }else if(info.event.extendedProps.eventType==='None'){
                toast.error(`sorry you can not select the ${info.event.title} time please choose another available time|`)
        }else{
            if(info.event?.extendedProps?.isBooked!=1&&info.event.extendedProps.userId!=authUser?.id){
                console.log(moment(info.event.start),info.event.end);
                let duration = moment.duration(moment(info.event.end).diff(moment(info.event.start)));
                let minutes = duration.asMinutes();
                dispatch({
                    type:'startEventDate',
                    payload:{
                        Type:'startEventDate',
                        eventId:info.event.id,
                        duration:minutes,
                        selectServiceId:'',
                        startEventDate:moment(info.event.start).format('DD-MM-YYYY'),
                        startEventTime:moment(info.event.start).format('HH:mm:ss'),
                        endEventTime:moment(info.event.end).format('HH:mm:ss'),
                        endEventDate:moment(info.event.end).format('DD-MM-YYYY'),
                    }})
                $('#booker-modal').modal('show');
                if(info.event.id){
                let data={
                    event_id:info.event.id
                }
                APIService.eventDetailsById(data).then((res)=>{
                        if(res.data.status==200){
                            dispatch({type:'bookingDetails',payload:{
                                Type:'bookingDetails',
                                bookingDetails:res.data.data,
                                selectServiceId:res.data.data?.services?.length>0?res.data.data?.services[0].id:'',
                                selectServiceText:res.data.data?.services?.length>0?res.data.data?.services[0]?.service.name:'',
                                cost:res.data.data.cost,eventDetailResponse:true
                            }})
                        }else{
                            dispatch({type:'bookingDetails',payload:{
                                Type:'bookingDetails',eventDetailResponse:true
                            }})
                        }
                }).catch((error)=>{
                    dispatch({type:'bookingDetails',payload:{
                        Type:'bookingDetails',eventDetailResponse:true
                    }})
                })
            }
        }
        }
    }else{
        // if(info.event.extendedProps.eventType==='None'){

        // }else{
            getEventDetails(info.event.id)
        // }
        
    }

       
    }
   const fullCalendarClickDate=(e)=>{

        dispatch({type:'AppointmentStartEventDate',payload:{ 
            Type:'AppointmentStartEventDate',
            startEventDate:moment(e.date).format('DD-MM-YYYY'),
            startEventTime:moment(e.date).format('HH:mm:ss'),
            appointmentDurationRange:moment(state.appointmentEndDateTime).diff(moment(e.date), 'minutes'),
            appointmentStartEventDate:moment(e.date).format('DD-MM-YYYY'),
            appointmentStartEventTime:moment(e.date).format('HH:mm:ss'),
        }})

   }
    return (
        <>
            <FullCalendar
                initialView='timeGridWeek'
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                events={state.allEventsData}
                dateClick={fullCalendarClickDate}
                selectable={false}
                unselectAuto={false}
                droppable={true}
                selectAllow={(e)=>e.rendering === 'background'}
                // selectOverlap={(e)=>e.rendering === 'background'}
                // unselectCancel=".my-form"
                longPressDelay={1}
                selectLongPressDelay={1}
                eventLongPressDelay={1}
                // timeZone={'Asia/Kollkata'}
                progressiveEventRendering={true}
                nowIndicator={false}
               
                eventDragStart={(info) => {
                    console.log(info)
                }}
                select={fullCalendarClickDate}
                // eventDataTransform={(obj)=>
                //   obj.display='inverse-background' 
                //     // console.log(obj,'eventDataTransform')

                // }
                allDaySlot={false}
                views={{
                    timeGridWeek: {
                        titleFormat: { year: 'numeric', month: 'long', day: '2-digit' }
                    }
                }}
                dayHeaderContent={(args) => moment(args.date).format('ddd Do')}
                slotDuration={'00:15:00'}
                customButtons={{
                    myCustomButton: {
                        text:<>
                            <div class="legend-dd" style={{margin: '-12px'}}>
                                <div class="l-g-bx dot-dd-bx">
                                    <div class="dropdown dd-right-side">
                                        <a class="link-btn dropdown-toggle" href="#" id="my-account-dd" data-toggle="dropdown">Legend <i class="lb lb-dropdown-icon"></i></a>
                                        <div class="dropdown-menu" aria-labelledby="my-account-dd">
                                            <div class="side-nav-bx">
                                                <ul>
                                                    <li><a href="#"><em class="color-bx booked-color"></em>Booked By Me</a></li>
                                                    <li><a href="#"><em class="color-bx bot-booked-color"></em>{id==authUser?.id?'Not Yet Booked':'Available'} (Webinar/Class/Group)</a></li>
                                                    <li><a href="#"><em class="color-bx ava-appointment-color"></em>Availability For Appointment</a></li>
                                                    <li><a href="#"><em class="color-bx blocked-time-color"></em>Blocked Time</a></li>
                                                    {id==authUser?.id?<li><a href="#"><em class="color-bx somebody-booed-color"></em>Somebody Booked Me</a></li>:''}
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
                // nowIndicatorContent={<span>now</span>}
                //headerToolbar={{ left: 'prev,next today',
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
                // ref={calendarComponentRef}
                selectMinDistance={0}
                eventClick={handleBooking}
                rerenderDelay={200}
                nowIndicatorClassNames="text-primary"
                // themeSystem="bootstrap"
                // nowIndicator={true}
                eventContent={eventContent}
                // initialEvents={moment(state.eventSingleDate, 'DD-MM-YYYY').format('YYYY-MM-DD')}
                // now={`${moment().format('YYYY-MM-DD HH:MM:SS')}`}
            />
        </>
    );
}

export default ProfileFullCalendar;