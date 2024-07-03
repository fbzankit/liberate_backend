import React from 'react';
import { getTimeFromMins, getTimeFromHours } from '../../../../Utility/Utility';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { ModalPreloader, ModalDataNotFound } from '../../../../Common/ModalComponents/ModalComponents';
const BookingUserListModal = ({ data, response }) => {
    return <>
        <div className="modal right fade modal-sidebar view-bookings-modal" id="block-time-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                {response?'':<ModalPreloader/>}
                <div className="modal-content">
                    <div className="modal-header">
                        <h2 className="modal-heading">Bookings User</h2>
                        <button type="button" className="close" data-dismiss="modal"><i className="lb lb-cancel-icon"></i></button>
                    </div>
                    <div className="modal-body">
                        {data?.length>0? <div className="bookings-user-list">
                            <div id="accordion" className="accordion">
                                <div className="card mb-0">
                                    {data.map((res,i) => <><div key={i} className="card-header collapsed">
                                        <span className="card-title"><Link to={`/profile/${res?.bookerId}`}> {res?.user?.name}</Link> <a className="btn cancel-btn" href="#"><i className="lb lb-block-icon"></i></a></span>
                                        <div className="accordion-arrow-icon" data-toggle="collapse" href={`#collapseOne${i}`}><i className="lb lb-dropdown-icon"></i></div>
                                    </div>
                                        <div id={`collapseOne${i}`} className="card-body collapse show" data-parent="#accordion">
                                            <div className="user-services-list">
                                                <div className="u-s-box">
                                                    <div className="u-s-heading">
                                                        <strong className="float-left">{res?.service_name}</strong>
                                                        <ul className="ul-row float-right">
                                                            <li><a className="link" href="#">Cancel Booking</a></li>
                                                        </ul>
                                                    </div>
                                                    <div className="u-s-content">
                                                        <ul className="ul-row">
                                                            <li>{moment(res.date, 'DD-MM-YYYY').format('D MMM YYYY')}</li>
                                                            <li>{moment(res.time, 'hh:mm A').format('h:mm A')}</li>
                                                            <li>{getTimeFromHours(parseInt(res?.duration))} hr {moment(getTimeFromMins(parseInt(res?.duration)), "hh:mm A").format('mm')} min</li>
                                                            {/* <li>Cost : $100</li> */}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div></>)}
                                </div>
                            </div>
                        </div>
                            : <ModalDataNotFound 
                            title="No Bookings Found" 
                            description="simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's" 
                            modalId={"#block-time-modal"}/>
                            }
                    </div>
                </div>
            </div>
        </div>
    </>;
}
export default BookingUserListModal;