import React,{ useEffect, useReducer, useState, useRef } from 'react';
import SideBar from '../SideBar/DashboardSideBar';
import images from '../../Utility/Images';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import AddMediaModal from './MedaiModals/AddMediaModal';
import AddMusicModal from './MedaiModals/AddMusicModal';
import { APIService } from '../../ApiServices/Apis/APIServices';
import { toast } from 'react-toastify';
import Reducer from '../../Utility/Reducer'
import ReactPlayer from 'react-player'
import config from '../../ApiServices/Apis/config'
import NoDataFound from '../../Common/NoDataFound';
const initialState={
    mediaRecordingList:[],
    limit:20,
    page:0,
}

const Media = () => {
const [state, dispatch] = useReducer(Reducer, initialState)
const [playing, setPlaying] = useState(0)
    useEffect(() => {
        getAllMediaRecordings();
        return;
    }, [])
    const playerRef = useRef();

   const fullScreen=() => {
        const videoElem = playerRef.current.getInternalPlayer();
        // screenfull.request(videoElem);
        // if (videoElem.mozRequestFullScreen) {
        //     videoElem.mozRequestFullScreen();
        //   } else if (videoElem.webkitRequestFullScreen) {
        //     videoElem.webkitRequestFullScreen();
        //   }
        if (videoElem.requestFullscreen) {
            videoElem.requestFullscreen();
        } else if (videoElem.mozRequestFullScreen) {
            videoElem.mozRequestFullScreen();
        } else if (videoElem.webkitRequestFullScreen) {
            videoElem.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        }
        console.log(videoElem);
      
  }
   const getAllMediaRecordings=()=>{
       APIService.userRecordings({page:state.page,limit:state.limit}).then((res)=>{
            if(res.data.status==200){
                dispatch({type:'saveRecordingList',payload:{Type:'saveRecordingList',mediaRecordingList:res.data.data}})
            }else{
                toast.error(res.data.message)
            }
       }).catch((error)=>{
           console.log(error);
       })

    }
    console.log(state,'media');
    return (
        <>
        <Header/>
            <main>

                <section className="account-settings-area">
                    <div className="container">
                        <div className="p-sec-heading">
                            <div className="row">
                                <div className="col-12">
                                    <div className="section-title">
                                        <h2>Media</h2>
                                        <p>View/Edit/Sell media to users.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="account-settings-content">
                            <div className="lft-as-sec">
                                <SideBar />
                            </div>
                            <div className="rit-as-sec">
                                <div className="default-tabing">
                                    <div className="default-tabs-list">
                                        <ul className="nav nav-pills">
                                            <li className="nav-item">
                                                <a className="nav-link active" data-toggle="pill" href="#media-tab">Media</a>
                                            </li>
                                            {/* <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" href="#music-tab">Music</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" href="#wishlist-tab">Wishlist</a>
                                            </li> */}

                                        </ul>
                                    </div>


                                    <div className="tab-content">
                                        <div className="tab-pane active" id="media-tab">
                                            <div className="media-tab-content">
                                                <div className="media-right-btns">
                                                    <div className="filter-right g-l-btns">
                                                        <ul className="d-inline-block ul-row">
                                                            <li><a className="btn" href="#add-new-media-popup" data-toggle="modal"><i className="lb lb-plush-icon"></i> Add New</a></li>
                                                            <li><a className="filter-btn" href="#filter-modal" data-toggle="modal"><i className="lb lb-filter-icon"></i></a></li>
                                                            {/* <li><a href={void (0)} className="link-btn grid active"><i className="lb lb-grid-view-icon"></i></a></li> */}
                                                            {/* <li><a href={void (0)} className="link-btn list"><i className="lb lb-list-view-icon"></i></a></li> */}
                                                            <li><div className="search-form">
                                                                <form action="#">
                                                                    <div className="top-f-btn"></div>
                                                                    <div className="top-search-bar">
                                                                        <input type="email" placeholder="Search..." />
                                                                        <button className="btn-link"><i className="lb lb-search-icon"></i></button>
                                                                    </div>
                                                                </form>
                                                            </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="list-grid-view">
                                                    <div className="liView gridStyle">
                                                    {state.mediaRecordingList?.length>0?state.mediaRecordingList.map((res,i)=>
                                                            <> <div key={i} className="l-g-bx">
                                                            
                                                            <div key={i} className="grid-view-bx">
                                                                <div className="single-shop-item">
                                                                    <div className="shop-thumb fix p-relative">
                                                                        <a href="#" className="p-bx-img">
                                                                            {/* <img src={images.practitioner_img1} alt="img" /> */}
                                                                            <ReactPlayer 
                                                                            ref={playerRef}
                                                                            className='react-player'
                                                                            url={config.mediaBaseUrlFunction(res?.file_name)}
                                                                            width='300'
                                                                            height="300"
                                                                            // light={true}

                                                                            playing={playing==0?false:playing===res.id?true:false}/>
                                                                        </a>
                                                                        {/* <div className="purchased-tag">Purchased</div> */}
                                                                        <div className="product-action">
                                                                           <button type="button" className="btn cmn-btn fullscreen-icon" onClick={fullScreen}><img src={images.fullscreen_icon}alt="Full Screen"/></button>
                                                                            <button type="button" className="btn cmn-btn" onClick={()=>playing==0?setPlaying(res.id):setPlaying(0)}>{playing===res.id?'Pause':'Play'}</button>
                                                                        </div>
                                                        
                                                                    </div>
                                                                    <div className="shop-content">
                                                                        <span className="product-tag"><a href="#"><i className="lb lb-video-play-icon"></i></a></span>
                                                                        <h5>
                                                                            <a href="#">{res.file_name}</a>
                                                                            {/* <div className="rating-star">
                                                                                <ul className="ul-row"><li><span>4.6</span></li><li><img src="img/star-rating.svg" alt="" /></li></ul>
                                                                            </div> */}
                                                                        </h5>
                                                                        {/* <div className="media-cat-list">
                                                                            <ul className="ul-row">
                                                                                <li><span>Psychic</span></li>
                                                                                <li><span>Psychic</span></li>
                                                                            </ul>
                                                                        </div> */}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="list-view-bx">
                                                                <div className="left-l-v-c float-left">
                                                                    <ul className="ul-row">
                                                                        <li>
                                                                            <a className="video-pic-bx" href="#">
                                                                                <figure className="l-v-pic">
                                                                                    <img src={images.pp_banner_img1} alt="" />
                                                                                </figure>
                                                                                <span className="play-icon">
                                                                                    <i className="lb lb-video-play-icon"></i>
                                                                                </span>
                                                                            </a>
                                                                        </li>
                                                                        <li>
                                                                            <div className="l-view-name">
                                                                                <a href="#">Angela Johnson</a>
                                                                            </div>
                                                                        </li>
                                                                        <li><span className="l-v-date">22 Dec 2020</span></li>
                                                                    </ul>
                                                                </div>
                                                                <div className="right-l-v-c float-right">
                                                                    <div className="action-btns">
                                                                        <ul className="ul-row">
                                                                            <li><a href={void (0)} data-toggle="modal" data-target="#share-service-popup"><i className="lb lb-share-icon"></i></a></li>
                                                                            <li><a href={void (0)} data-toggle="modal" data-target="#delete-service-popup"><i className="lb lb-delete-icon"></i></a></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div></>):''}

                                                    </div>
                                                    {state.mediaRecordingList?.length>0?
                                                    <div className="load-more-bx">
                                                            <div className="load-more-btn text-center"> <a href={void (0)} className="btn"><i className="lb lb-refresh-icon"></i> Load More</a> </div>
                                                    </div>
                                                    :<NoDataFound
                                                                        image={images.no_webinars_right_now_img}
                                                                        title={'No Media Right Now!'}
                                                                        description={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem."}
                                                                        buttonTitle="Go Back to Home"
                                                                        buttonPath="/home"/>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tab-pane fade" id="music-tab">
                                            <div className="music-tab-content">
                                                <div className="media-right-btns">
                                                    <ul className="d-inline-block ul-row">
                                                        <li><a className="btn" href="#add-music-popup" data-toggle="modal"><i className="lb lb-plush-icon"></i> Add New</a></li>
                                                        <li>
                                                            <div className="search-form">
                                                                <form action="#">
                                                                    <div className="top-f-btn"></div>
                                                                    <div className="top-search-bar">
                                                                        <input type="email" placeholder="Search..." />
                                                                        <button className="btn-link"><i className="lb lb-search-icon"></i></button>
                                                                    </div>
                                                                </form>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="cmn-table-sec">
                                                    <table className="rwd-table" id="sortable">
                                                        <tbody>
                                                            <tr>
                                                                <td className="music-title-td"><span>1</span> Music Play Title</td>
                                                                <td className="music-date-td">25 Sep 2020</td>
                                                                <td className="music-play-td"><a className="m-play-btn" href="#"><i className="lb lb-video-play-icon"></i></a></td>
                                                                <td>
                                                                    <button className="btn-link"><i className="lb lb-delete-icon"></i></button>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="music-title-td"><span>2</span> Music Play Title</td>
                                                                <td className="music-date-td">25 Sep 2020</td>
                                                                <td className="music-play-td"><a className="m-play-btn" href="#"><i className="lb lb-video-play-icon"></i></a></td>
                                                                <td>
                                                                    <button className="btn-link"><i className="lb lb-delete-icon"></i></button>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="music-title-td"><span>3</span> Music Play Title</td>
                                                                <td className="music-date-td">25 Sep 2020</td>
                                                                <td className="music-play-td"><a className="m-play-btn" href="#"><i className="lb lb-video-play-icon"></i></a></td>
                                                                <td>
                                                                    <button className="btn-link"><i className="lb lb-delete-icon"></i></button>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="music-title-td"><span>4</span> Music Play Title</td>
                                                                <td className="music-date-td">25 Sep 2020</td>
                                                                <td className="music-play-td"><a className="m-play-btn" href="#"><i className="lb lb-video-play-icon"></i></a></td>
                                                                <td>
                                                                    <button className="btn-link"><i className="lb lb-delete-icon"></i></button>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="music-title-td"><span>5</span> Music Play Title</td>
                                                                <td className="music-date-td">25 Sep 2020</td>
                                                                <td className="music-play-td"><a className="m-play-btn" href="#"><i className="lb lb-video-play-icon"></i></a></td>
                                                                <td>
                                                                    <button className="btn-link"><i className="lb lb-delete-icon"></i></button>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="music-title-td"><span>6</span> Music Play Title</td>
                                                                <td className="music-date-td">25 Sep 2020</td>
                                                                <td className="music-play-td"><a className="m-play-btn" href="#"><i className="lb lb-video-play-icon"></i></a></td>
                                                                <td>
                                                                    <button className="btn-link"><i className="lb lb-delete-icon"></i></button>
                                                                </td>
                                                            </tr>

                                                        </tbody>
                                                    </table>
                                                </div>
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="lm-dp-btns">
                                                            <div className="load-more-btn text-center"><a href="#" className="btn"><i className="lb lb-refresh-icon"></i> Load More</a></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tab-pane fade" id="wishlist-tab">
                                            <div className="wishlist-tab-content">
                                                <div className="p-sec-list">
                                                    <div className="row">
                                                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6">
                                                            <div className="l-g-bx">
                                                                <div className="single-shop-item single-media-item">
                                                                    <div className="shop-thumb fix p-relative">
                                                                        <figure className="p-bx-img"><img src={images.practitioner_img9} alt="img" /></figure>
                                                                        <div className="video-time">2:16:42</div>
                                                                        {/* <span className="favorite-icon"><a className="active" href="#"><i className="lb lb-favorite-icon"></i></a></span> */}
                                                                        <div className="product-action"><p>Lorem ipsum, or lipsum as it is sometimes known, is dummy text. Lorem ipsum, or lipsum as it is sometimes known, is dummy text. Lorem ipsum, or lipsum as it is sometimes known, is dummy text.  </p></div>
                                                                    </div>
                                                                    <div className="shop-content">
                                                                        <span className="product-tag"><a href="#" className="disabled-btn"><i className="lb lb-video-play-icon"></i></a>
                                                                        </span>
                                                                        <h5>Find Your Meditation Style With These 7 Practices</h5>
                                                                        <div className="by-admin-media">
                                                                            <a href="#"><i className="lb lb-user-icon"></i> BY ADMIN</a>
                                                                            <div className="media-cat-list">
                                                                                <ul className="ul-row">
                                                                                    <li><span>Modality</span></li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                        <div className="share-book-btns">
                                                                            <ul className="display-ib">
                                                                                <li className="float-left"><strong>$ 302</strong></li>
                                                                                <li className="float-right"><a className="btn cmn-btn" href="#payment-modal" data-toggle="modal">Buy Now</a></li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6">
                                                            <div className="l-g-bx">
                                                                <div className="single-shop-item single-media-item">
                                                                    <div className="shop-thumb fix p-relative">
                                                                        <figure className="p-bx-img"><img src={images.practitioner_img9} alt="img" /></figure>
                                                                        <div className="video-time">2:16:42</div>
                                                                        {/* <span className="favorite-icon"><a className="active" href="#"><i className="lb lb-favorite-icon"></i></a></span> */}
                                                                        <div className="product-action"><p>Lorem ipsum, or lipsum as it is sometimes known, is dummy text. Lorem ipsum, or lipsum as it is sometimes known, is dummy text. Lorem ipsum, or lipsum as it is sometimes known, is dummy text.  </p></div>
                                                                    </div>
                                                                    <div className="shop-content">
                                                                        <span className="product-tag"><a href="#" className="disabled-btn"><i className="lb lb-video-play-icon"></i></a>
                                                                        </span>
                                                                        <h5>Find Your Meditation Style With These 7 Practices</h5>
                                                                        <div className="by-admin-media">
                                                                            <a href="#"><i className="lb lb-user-icon"></i> BY ADMIN</a>
                                                                            <div className="media-cat-list">
                                                                                <ul className="ul-row">
                                                                                    <li><span>Modality</span></li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                        <div className="share-book-btns">
                                                                            <ul className="display-ib">
                                                                                <li className="float-left"><strong>$ 302</strong></li>
                                                                                <li className="float-right"><a className="btn cmn-btn" href="#payment-modal" data-toggle="modal">Buy Now</a></li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6">
                                                            <div className="l-g-bx">
                                                                <div className="single-shop-item single-media-item">
                                                                    <div className="shop-thumb fix p-relative">
                                                                        <figure className="p-bx-img"><img src={images.practitioner_img9} alt="img" /></figure>
                                                                        <div className="video-time">2:16:42</div>
                                                                        {/* <span className="favorite-icon"><a className="active" href="#"><i className="lb lb-favorite-icon"></i></a></span> */}
                                                                        <div className="product-action"><p>Lorem ipsum, or lipsum as it is sometimes known, is dummy text. Lorem ipsum, or lipsum as it is sometimes known, is dummy text. Lorem ipsum, or lipsum as it is sometimes known, is dummy text.  </p></div>
                                                                    </div>
                                                                    <div className="shop-content">
                                                                        <span className="product-tag"><a href="#" className="disabled-btn"><i className="lb lb-video-play-icon"></i></a>
                                                                        </span>
                                                                        <h5>Find Your Meditation Style With These 7 Practices</h5>
                                                                        <div className="by-admin-media">
                                                                            <a href="#"><i className="lb lb-user-icon"></i> BY ADMIN</a>
                                                                            <div className="media-cat-list">
                                                                                <ul className="ul-row">
                                                                                    <li><span>Modality</span></li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                        <div className="share-book-btns">
                                                                            <ul className="display-ib">
                                                                                <li className="float-left"><strong>$ 302</strong></li>
                                                                                <li className="float-right"><a className="btn cmn-btn" href="#payment-modal" data-toggle="modal">Buy Now</a></li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6">
                                                            <div className="l-g-bx">
                                                                <div className="single-shop-item single-media-item">
                                                                    <div className="shop-thumb fix p-relative">
                                                                        <figure className="p-bx-img"><img src={images.practitioner_img9} alt="img" /></figure>
                                                                        <div className="video-time">2:16:42</div>
                                                                        {/* <span className="favorite-icon"><a className="active" href="#"><i className="lb lb-favorite-icon"></i></a></span> */}
                                                                        <div className="product-action"><p>Lorem ipsum, or lipsum as it is sometimes known, is dummy text. Lorem ipsum, or lipsum as it is sometimes known, is dummy text. Lorem ipsum, or lipsum as it is sometimes known, is dummy text.  </p></div>
                                                                    </div>
                                                                    <div className="shop-content">
                                                                        <span className="product-tag"><a href="#" className="disabled-btn"><i className="lb lb-video-play-icon"></i></a>
                                                                        </span>
                                                                        <h5>Find Your Meditation Style With These 7 Practices</h5>
                                                                        <div className="by-admin-media">
                                                                            <a href="#"><i className="lb lb-user-icon"></i> BY ADMIN</a>
                                                                            <div className="media-cat-list">
                                                                                <ul className="ul-row">
                                                                                    <li><span>Modality</span></li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                        <div className="share-book-btns">
                                                                            <ul className="display-ib">
                                                                                <li className="float-left"><strong>$ 302</strong></li>
                                                                                <li className="float-right"><a className="btn cmn-btn" href="#payment-modal" data-toggle="modal">Buy Now</a></li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6">
                                                            <div className="l-g-bx">
                                                                <div className="single-shop-item single-media-item">
                                                                    <div className="shop-thumb fix p-relative">
                                                                        <figure className="p-bx-img"><img src={images.practitioner_img9} alt="img" /></figure>
                                                                        <div className="video-time">2:16:42</div>
                                                                        {/* <span className="favorite-icon"><a className="active" href="#"><i className="lb lb-favorite-icon"></i></a></span> */}
                                                                        <div className="product-action"><p>Lorem ipsum, or lipsum as it is sometimes known, is dummy text. Lorem ipsum, or lipsum as it is sometimes known, is dummy text. Lorem ipsum, or lipsum as it is sometimes known, is dummy text.  </p></div>
                                                                    </div>
                                                                    <div className="shop-content">
                                                                        <span className="product-tag"><a href="#" className="disabled-btn"><i className="lb lb-video-play-icon"></i></a>
                                                                        </span>
                                                                        <h5>Find Your Meditation Style With These 7 Practices</h5>
                                                                        <div className="by-admin-media">
                                                                            <a href="#"><i className="lb lb-user-icon"></i> BY ADMIN</a>
                                                                            <div className="media-cat-list">
                                                                                <ul className="ul-row">
                                                                                    <li><span>Modality</span></li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                        <div className="share-book-btns">
                                                                            <ul className="display-ib">
                                                                                <li className="float-left"><strong>$ 302</strong></li>
                                                                                <li className="float-right"><a className="btn cmn-btn" href="#payment-modal" data-toggle="modal">Buy Now</a></li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6">
                                                            <div className="l-g-bx">
                                                                <div className="single-shop-item single-media-item">
                                                                    <div className="shop-thumb fix p-relative">
                                                                        <figure className="p-bx-img"><img src={images.practitioner_img9} alt="img" /></figure>
                                                                        <div className="video-time">2:16:42</div>
                                                                        {/* <span className="favorite-icon"><a className="active" href="#"><i className="lb lb-favorite-icon"></i></a></span> */}
                                                                        <div className="product-action"><p>Lorem ipsum, or lipsum as it is sometimes known, is dummy text. Lorem ipsum, or lipsum as it is sometimes known, is dummy text. Lorem ipsum, or lipsum as it is sometimes known, is dummy text.  </p></div>
                                                                    </div>
                                                                    <div className="shop-content">
                                                                        <span className="product-tag"><a href="#" className="disabled-btn"><i className="lb lb-video-play-icon"></i></a>
                                                                        </span>
                                                                        <h5>Find Your Meditation Style With These 7 Practices</h5>
                                                                        <div className="by-admin-media">
                                                                            <a href="#"><i className="lb lb-user-icon"></i> BY ADMIN</a>
                                                                            <div className="media-cat-list">
                                                                                <ul className="ul-row">
                                                                                    <li><span>Modality</span></li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                        <div className="share-book-btns">
                                                                            <ul className="display-ib">
                                                                                <li className="float-left"><strong>$ 302</strong></li>
                                                                                <li className="float-right"><a className="btn cmn-btn" href="#payment-modal" data-toggle="modal">Buy Now</a></li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6">
                                                            <div className="l-g-bx">
                                                                <div className="single-shop-item single-media-item">
                                                                    <div className="shop-thumb fix p-relative">
                                                                        <figure className="p-bx-img"><img src={images.practitioner_img9} alt="img" /></figure>
                                                                        <div className="video-time">2:16:42</div>
                                                                        {/* <span className="favorite-icon"><a className="active" href="#"><i className="lb lb-favorite-icon"></i></a></span> */}
                                                                        <div className="product-action"><p>Lorem ipsum, or lipsum as it is sometimes known, is dummy text. Lorem ipsum, or lipsum as it is sometimes known, is dummy text. Lorem ipsum, or lipsum as it is sometimes known, is dummy text.  </p></div>
                                                                    </div>
                                                                    <div className="shop-content">
                                                                        <span className="product-tag"><a href="#" className="disabled-btn"><i className="lb lb-video-play-icon"></i></a>
                                                                        </span>
                                                                        <h5>Find Your Meditation Style With These 7 Practices</h5>
                                                                        <div className="by-admin-media">
                                                                            <a href="#"><i className="lb lb-user-icon"></i> BY ADMIN</a>
                                                                            <div className="media-cat-list">
                                                                                <ul className="ul-row">
                                                                                    <li><span>Modality</span></li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                        <div className="share-book-btns">
                                                                            <ul className="display-ib">
                                                                                <li className="float-left"><strong>$ 302</strong></li>
                                                                                <li className="float-right"><a className="btn cmn-btn" href="#payment-modal" data-toggle="modal">Buy Now</a></li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <div className="load-more-btn text-center"> <a href={void (0)} className="btn"><i className="lb lb-refresh-icon"></i> Load More</a> </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer/>
            <AddMediaModal/>
            <AddMusicModal/>
        </>
    );
}


export default Media;