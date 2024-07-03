import React from 'react';
import images from '../../../../Utility/Images';
import { Link } from 'react-router-dom';
import { profileAvatar } from '../../../../Utility/Utility';
import AverageRating from '../../../../Common/AverageRating';

const EventAndClassCard = ({title,description,cost,type,id,userId,image,user,getDetails,service}) => {

    return (
        <>
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                <div className="l-g-bx">
                    <div className="single-shop-item single-media-item l-c-e-item">
                        <div className="shop-thumb fix p-relative">
                            <figure className="p-bx-img"><img src={image} alt={user?.name}/></figure>
                            
                            <div className="product-action"><p>{description} </p></div>
                        </div>
                        <div className="shop-content">
                            
                        
                            <span className="product-tag">
                                <div className="flexbox">
                                    <div className="fav-btn">
                                    <Link to={`/profile/${user?.id}`}>
                                    <div className="circle-pic-name">
                                        <figure>
                                            
                                            <img className="rounded-circle" src={profileAvatar(user?.image,user?.social_image)} alt={title} title={user?.name}/>
                                        
                                        </figure>
                                    </div>
                                    </Link>
                                    </div>
                                </div>
                            </span>
                            
                            <h5>
                                <Link to="#webinar-event-view-modal" data-toggle="modal" data-dismiss="modal">{description}</Link>
                            </h5>
                            {/* <div className="by-admin-media">
                                <div className="usr-name-rating">
                                    <Link to={`/profile/${user?.id}`} target="_blank"><i className="lb lb-user-icon"></i> {user?.name}</Link>
                                    
                                    <AverageRating avgRating={user?.avgRating?user?.avgRating:0}/>
                                </div>
                            </div> */}
                            <div className="sidebar-tag card-tags-list">
                                <ul className="ul-row">
                                    <li>
                                    <a title="deepak service" href={void(0)}>{service?.name?service?.name:'N/A'}</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="share-book-btns">
                                <ul className="display-ib">
                                    <li><strong>{type}</strong></li>
                                    <li><span className="pipe-bdr">|</span></li>
                                    <li><strong>$ {cost}</strong></li>
                                    <li className="float-right"><button className="btn cmn-btn" type="button" onClick={()=>getDetails(id)}>Book Now</button></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EventAndClassCard;