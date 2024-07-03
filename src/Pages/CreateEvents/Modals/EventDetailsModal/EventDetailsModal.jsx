import React from 'react';
import images from '../../../../Utility/Images';
import { useContext } from 'react';
import moment from 'moment';
import config from '../../../../ApiServices/Apis/config';

import { ModalPreloader, ModalDataNotFound } from '../../../../Common/ModalComponents/ModalComponents';


const EventDetailsModal = ({eventId, eventType, date, time, title, description, services, seats, cost, meetingRoomId, host, remainingSeats, docs ,response,handleViewBooking,endDate,endTime}) => {
    
    return (
        <>
            <div className="modal right fade modal-sidebar webinar-event-view-modal" id="webinar-event-view-modal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    {response?'':<ModalPreloader/>}
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2 className="modal-heading">{eventType == 'Appointments'?eventType:title}</h2>                           
                            <button type="button" className="close" data-dismiss="modal"><i className="lb lb-cancel-icon"></i></button>
                            <div className="event-date-time">
                            <p>
                                <span>Date/Time</span> {date}&nbsp; {time} - {endDate}&nbsp; {endTime}
                                {/* &nbsp;
                                &nbsp;
                                <span>Time</span> {time} */}
                            </p>
                            </div>
                        </div>
                        <div className="modal-body">
                        {eventType === '' ? <ModalDataNotFound 
                            title="No Bookings Found" 
                            description="simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's" 
                            modalId={"#webinar-event-view-modal"}/>:
                            <div className="created-event-details">
                                
                                    <>
                                     <div className="c-e-bx ce-lft-rit services-list-tag">
                                            <strong>Service Name</strong>
                                            {services?.length > 0 ? services.map((res) =>
                                                <span  className="service-name-tag" key={res.id}>{res.service?.name}</span>
                                            ) : ''}
                                        </div>
                                        <div className="c-e-bx ce-lft-rit">
                                            {eventType === "Appointments" ? '' : <div className="c-e-img">
                                                <figure><img src={docs ? config.imageBaseurl + docs : images.no_image_available_default} alt="img" /></figure>
                                            </div>}
                                            {/* {eventType == 'Appointments' ? '' : */}
                                                <div className="c-e-dis">
                                                    <h4>Description</h4>
                                                    <div className="review-more-less">
                                                        <span className="more">
                                                            {description||services?.length > 0 ?services.map((res) =>res?.description):''}
                                                        </span>
                                                    </div>
                                                </div>
                                             {/* } */}
                                        </div>
                                        
                                        {eventType == 'Appointments' ? '' :
                                            <div className="c-e-bx ce-lft-rit">
                                                <strong>No. of seats remaining?</strong>
                                                <span>{remainingSeats}/{seats}</span>
                                            </div>}
                                        <div className="c-e-bx ce-lft-rit">
                                            <strong>Cost</strong>
                                            <span>$ {cost}</span>
                                        </div>
                                    </>
                            </div>}
                            <div className="col-sm-12 col-md-12 col-lg-12">
                                <div className="side-next-back-btn">

                                    {
                                        host
                                            ?
                                            meetingRoomId
                                                ? <>
                                                    <a className="btn default-btn float-left" href={`/join/?rm=${meetingRoomId}`} >Start Meet</a>
                                                    <button type="button" className="btn default-btn float-right" onClick={()=>handleViewBooking(moment(date,'D MMM YYYY').format('DD-MM-YYYY'),time,eventId)} >View Booking</button></>
                                                : <>
                                                    <button type="button" className="btn default-btn float-left" disabled={true} >Start Meet</button>
                                                    <button type="button" className="btn default-btn float-right" onClick={()=>handleViewBooking(moment(date,'D MMM YYYY').format('DD-MM-YYYY'),time,eventId)} >View Booking</button></>
                                            : <div className="book-btn">
                                                <div className="text-center">
                                                    {meetingRoomId ? <a className="btn default-btn " href={`/join/?rm=${meetingRoomId}`} >Join Meet</a> : <button type="button" className="btn default-btn float-left" disabled={true} >Join Meet</button>}
                                                </div>
                                            </div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default React.memo(EventDetailsModal);