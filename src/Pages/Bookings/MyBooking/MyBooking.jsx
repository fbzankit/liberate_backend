import React, { useContext } from 'react';
import images from '../../../Utility/Images';
import Context from '../../Home/Context/Context';
import { getTimeFromMins, getTimeFromHours } from '../../../Utility/Utility';
import moment from 'moment';
import { Link } from 'react-router-dom';
import config from '../../../ApiServices/Apis/config'
import NoDataFound from '../../../Common/NoDataFound';
const MyBooking = ({getEventDetails}) => {

    const [state, dispatch] = useContext(Context)
    
    return (
        <>
            <div className={`tab-pane ${state.menu == "MyBookings" ? 'active' : 'fade'}`}>
                <div className="my-bookings-content">
                    <div className="cmn-table-sec">
                        <table className="rwd-table">                           
                            <tbody>
                                {state.myBookings?.length > 0 ?
                                    <tr>
                                        <th>Name</th>
                                        {/* <th>Type</th> */}
                                        <th>Service</th>
                                        <th>Date & Time</th>
                                        <th>Duration</th>
                                        <th>Cost</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr> : <NoDataFound
                                        image={images.no_webinars_right_now_img}
                                        title={'No MyBooking Right Now!'}
                                        description={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem."}
                                        buttonTitle="Go Back to Home"
                                        buttonPath="/home" />
                                }
                                {state.myBookings?.map((res, i) =>
                                    <tr key={i}>
                                        <td data-th="Host Name">
                                            <div className="cricle-pic-name">
                                                <Link to={`/profile/${res?.User?.id}`}>
                                                    <figure>
                                                        <img src={res.User?.image != null ? config.imageBaseurl + res.User?.image : res.User?.social_image} alt={res?.User?.name} />
                                                    </figure>
                                                    <span>{res?.User?.name}</span></Link>
                                            </div>
                                        </td>

                                        <td data-th="Service Name">{res.service_name}</td>
                                        <td data-th="Date & Time">
                                            {moment(res.date, 'DD-MM-YYYY').format('D MMM, YYYY')}  {moment(res.time, 'hh:mm').format('hh:mm A')}
                                        </td>
                                        <td data-th="Duration">
                                            {res.duration != null ? `${getTimeFromHours(parseInt(res.duration)) + ' hr ' + moment(getTimeFromMins(parseInt(res.duration)), "hh:mm A").format('m')} min` : 'N/A'}
                                        </td>
                                        <td data-th="Cost">
                                            {res?.cost ? `$` + res.cost : 'N/A'}
                                        </td>
                                        {/* <td data-th="Type">
                                        Webinar
                                                                      </td> */}
                                        <td data-th="Status">
                                            <span className="btn status-btn withdrawn-status">{res.status != null ? res.status : 'N/A'}</span>
                                        </td>
                                        <td data-th="Action" className='b-action-td'>
                                            <ul className="ul-list">
                                                <li><a href={void (0)} onClick={()=>getEventDetails(res?.event_id,res.date,res.time,res?.duration)} style={{cursor:'pointer'}} data-toggle="modal" data-target="#faq-answer-popup" className="ask-question-m-btn"><i className="fa fa-eye"></i></a></li>
                                                <li>
                                                    {res?.meeting_detail == null ?
                                                        "" :
                                                        <a href={`/join/?rm=${res?.meeting_detail?.room_id}`} ><img src={images.online_meeting_icon} alt="meet"/></a>
                                                    }
                                                </li>

                                                {/* <li> <div className="l-g-bx dot-dd-bx">
                                                    <div className="dropdown dd-right-side my-account-dd"><a className="link-btn dropdown-toggle" href="#" role="button" id="my-account-dd" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="lb lb-horizontal-more-icon"></i></a>
                                                        <div className="dropdown-menu" aria-labelledby="my-account-dd">
                                                            <div className="side-nav-bx">
                                                                <ul>
                                                                    {res?.meeting_detail == null ?
                                                                        "" :
                                                                        <li>
                                                                            <a href={`/join/?rm=${res?.meeting_detail?.room_id}`} ><img src={images.online_meeting_icon} alt="meet"/></a>
                                                                        </li>
                                                                    }                                                                   
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                </li>*/}

                                            </ul>
                                        </td>
                                    </tr>)}
                            </tbody>
                        </table>
                    </div>
                    {/* <div className="row">
                        <div className="col-12">
                            <div className="load-more-btn text-center"> <a href="#" className="btn"><i className="lb lb-refresh-icon"></i> Load More</a> </div>
                        </div>
                    </div> */}

                </div>
            </div>
        </>
    );
}

export default MyBooking;