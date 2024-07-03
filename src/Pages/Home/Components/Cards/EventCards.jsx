import React, { useRef, useReducer, useContext } from 'react';
import { Link } from 'react-router-dom';
import images from '../../../../Utility/Images';
import $ from 'jquery';
import HomeFilterModal from '../Modals/HomeFilterModal';
import { APIService } from '../../../../ApiServices/Apis/APIServices';
import { toast, ToastContainer } from 'react-toastify';
import Context from '../../Context/Context';
import { socketIO } from '../../../../ApiServices/socket';

const EventCards = ({ image, name, cost, practitionerId, id, services, aboutMe, isFav,avgRating }) => {

    const [state, dispatch] = useContext(Context)
    const favorite = useRef(null)
    function addClassActive() {
        favorite.current.classList.add('active')
    }
    function removeClassActive() {
        favorite.current.classList.remove('active')
    }
    const favoriteToggle = (id) => {
        let data = {
            pracId: id
        }
        APIService.favoritePractitioner(data).then((res) => {
            if (res.data.status == 200) {
                if (favorite.current.classList[3] == "active") {
                    removeClassActive();
                    
                } else {
                    
                    socketIO.emit('sendNotification',res.data.data)
                    addClassActive();
                }
                // toast.success(res.data.message)
            } else {
                toast.error(res.data.message)
            }
        }).catch((error) => {

        })

    }

    const showShare = (uID) => {
        if (uID) {
            $('#share-event-popup').modal('show')
            let buildUrl = window.location.origin + '/profile/' + uID
           
            dispatch({ type: 'userProfileUrl', payload: { Type: 'userProfileUrl', userProfileUrl: buildUrl } })
        }
    }
    return (
        <>
            <div className="col-xl-4 col-sm-6 col-md-6 col-lg-6 mw-100">
                <div className="l-g-bx p-new-card">
                    <div className="single-shop-item">
                        <div className="shop-thumb fix p-relative">
                            <figure className="p-bx-img"><img src={image ? image : images.cardAvatar} alt="img" /></figure>
                            <span className="favorite-icon share-icon"><a href="#" data-target="#share-event-popup" onClick={() => showShare(id)}><i className="lb lb-share-icon"></i></a></span>
                            <span className="product-tag">
                                <div className="flexbox">
                                    <div className="fav-btn">
                                        <Link to="#" ref={favorite} onClick={() => favoriteToggle(id)} className={`favme fa fa-heart ${isFav == 0 ? '' : 'active'}`}></Link>
                                    </div>
                                </div>
                            </span>
                        </div>
                        <div className="shop-content">
                            <h5>
                                <Link to={`/profile/${id}`}>{name}</Link>
                                <div className="rating-star">
                                    <ul className="ul-row"><li><span>{avgRating}</span></li><li>{avgRating>0?<img src={images.star_rating}alt="" /> :<img src={images.un_rating_img}/>}</li></ul>
                                </div>
                            </h5>
                            <div className="sidebar-tag card-tags-list">
                                <ul className="ul-row">
                                    {services?.length > 0 ? services.map((res,i) =>
                                        <li key={i} ><Link to="#" title={res.service?.name}>{res.service?.name}</Link></li>
                                    ) : ''}
                                </ul>
                            </div>
                            <div className="about-practitioners ellipse-two-lines"><p >{aboutMe}  </p></div>
                            <div className="share-book-btns">

                                <ul className="display-ib">
                                {services?.length > 0 ?
                                    <li className="float-left">
                                    <strong>
                                    {services[0]?.service?.min_amt&&services[0]?.service?.max_amt
                                    ?`$${services[0]?.service?.min_amt + ' - ' + '$'+services[0]?.service?.max_amt}`
                                    :services[0]?.service?.min_event&&services[0]?.service?.max_event
                                    ?`$${services[0]?.service?.min_event+ ' - ' +'$'+services[0]?.service?.max_event}`
                                    :''}</strong>
                                    </li>:''}
                                    <li className="float-right">
                                        {services?.length>0
                                        ?<Link className="btn cmn-btn" to={`/profile/${id}`}>Book Now</Link>
                                        :<button type="button" className="btn cmn-btn"  disabled={true} >Book Now</button>
                                        }
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <HomeFilterModal />
        </>
    );
}
export default EventCards;