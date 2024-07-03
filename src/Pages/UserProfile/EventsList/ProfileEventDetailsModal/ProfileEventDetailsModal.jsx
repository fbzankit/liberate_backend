import React from 'react';
import { getTimeFromMins, getTimeFromHours } from '../../../../Utility/Utility';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { ModalPreloader, ModalDataNotFound } from '../../../../Common/ModalComponents/ModalComponents';
import images from '../../../../Utility/Images';
import config from '../../../../ApiServices/Apis/config';
import ReadMoreReact from 'read-more-react';
const ProfileEventDetailsModal = ({data, response, host, onChange,value}) => {
    
    return <>
        <div className="modal right fade modal-sidebar view-bookings-modal" id="profile-event-details-modal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                {response ? '' : <ModalPreloader />}
                <div className="modal-content">
                    <div className="modal-header">
                        <h2 className="modal-heading">{data?.title}</h2>
                        <button type="button" className="close" data-dismiss="modal"><i className="lb lb-cancel-icon"></i></button>
                    </div>
                    <div className="modal-body">
                        {data ? <><div className="created-event-details">
                            <>
                                <div className="c-e-bx ce-lft-rit services-list-tag">
                                    <strong>Service Name</strong>
                                    {data?.services?.length > 0 ? data?.services.map((res) =>
                                        <span className="service-name-tag" key={res.id}>{res.service?.name}</span>
                                    ) : ''}
                                </div>
                                <div className="c-e-bx ce-lft-rit">
                                    {data?.type === "Appointments" ? '' : <div className="c-e-img">
                                        <figure><img src={data?.docs ? config.imageBaseurl + data?.docs : images.no_image_available_default} alt="img" /></figure>
                                    </div>}
                                    <div className="c-e-dis">
                                        <h4>Description</h4>
                                        <div className="review-more-less">
                                            <span className="more">
                                                <ReadMoreReact
                                                    min={50}
                                                    max={5000}
                                                    text={data?.description}
                                                    readMoreText={<a href={void (0)} className="morelink" style={{ cursor: 'pointer' }}>Read more</a>}
                                                />
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div class="c-e-bx ce-lft-rit slot-lists">
                                    <strong>Available Event Date/Time</strong>
                                    <select class="bdr-radius-five" name="" onChange={onChange} value={value}>
                                        <option disabled={true} selected={true} value="choose">Choose Date & Time</option>
                                        {data?.available_date ? JSON.parse(data.available_date)?.map((date) =>
                                            JSON.parse(data?.available_time).map((time) =>
                                                <option value={[date?.from,date?.to,time?.from,time?.to]}>{moment(`${date?.from}`, 'YYYY-MM-DD').format('DD ,MMM YY')} {moment(`${time?.from}`, 'HH:mm').format('h:mm A')} - {moment(`${date?.to}`, 'YYYY-MM-DD').format('DD ,MMM YY')} {moment(`${time?.to}`, 'HH:mm').format('h:mm A')}</option>
                                            ))
                                            : ''}
                                    </select>
                                </div>
                                <div class="service-total-book side-next-back-btn">
                                    <strong class="float-left">Total ${data?.cost}</strong>
                                    <div class="float-right">
                                        <a href="#payment-modal" className={`btn default-btn ${value==="choose"?'disabled':''}`} data-toggle="modal" data-dismiss="modal" >Book Now</a>
                                    </div>
                                </div>
                            </>
                        </div>

                        </>
                            : <ModalDataNotFound
                                title="No Event Detail Found"
                                description="simply dummy text of the printing and typesetting industry."
                                modalId={"#block-time-modal"} />
                        }
                    </div>
                </div>
            </div>
        </div>
    </>;
}
export default React.memo(ProfileEventDetailsModal);