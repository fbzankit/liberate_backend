import React, { useEffect, useState, useContext } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SideBar from '../SideBar/DashboardSideBar';
import images from '../../Utility/Images';
import { socketIO } from '../../ApiServices/socket'
import GlobalContext from '../../Global/GlobalContext';
import { profileAvatar } from '../../Utility/Utility';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { APIService } from '../../ApiServices/Apis/APIServices';
import NoDataFound from '../../Common/NoDataFound';
export const NotificationType = {
    // 1: { path: '/favorite' },
    1: { path: '/bookings' },
    2: { path: '/messages' },
    3: { path: '/services' },
    4: { path: '/reviews' },
}
const Notifications = () => {
    const [globalState, globalDispatch] = useContext(GlobalContext);
    const [Type, setType] = useState('1');
    const ReadNotification = (Obj) => {
        APIService.ReadNotifications(Obj).then((res) => {
            if (res.data.status == 200) {
                console.log(res, 'notification');
            } else {

            }
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <>
            <Header />
            <main>

                <section className="account-settings-area">
                    <div className="container">
                        <div className="p-sec-heading">
                            <div className="row">
                                <div className="col-12">
                                    <div className="section-title">
                                        <h2>Notifications</h2>
                                        <p>View your categorized notifications</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="account-settings-content">
                            <SideBar />
                            <div className="rit-as-sec p-30">
                                <div className="all-noti-panel">
                                    <div className="bdr-heading">
                                        {globalState.notificationsAll?.filter((r) => r?.reat_at == null || r?.reat_at == '')?.length > 0 ? <button className="btn default-btn" onClick={() => ReadNotification({ id: 0 })} type="button" ><i class="lb lb-notification-icon" data-toggle="tooltip" title="Notification"></i><span className="ml-2">{globalState.notificationsAll?.filter((r) => r?.reat_at == null || r?.reat_at == '')?.length}</span> Read All</button> : ''}

                                        {/* <div className="search-form">
                                            <form action="#">
                                                <div className="top-search-bar">
                                                    <input type="email" placeholder="Search..." />
                                                    <button className="btn-link"><i className="lb lb-search-icon"></i></button>
                                                </div>
                                            </form>
                                        </div> */}
                                    </div>
                                    <div className="default-tabing">
                                        <div className="default-tabs-list">
                                            <ul className="nav nav-pills">
                                                <li className="nav-item">
                                                    <a className="nav-link" data-toggle="pill" onClick={() => setType(2)} href="#notification-two">Event{globalState.notificationsAll?.filter((r) => r?.reat_at == null && r?.type == 2)?.length ? <span class="noti-tabs-dot"></span> : ''}</a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link" data-toggle="pill" onClick={() => setType(3)} href="#notification-three">General{globalState.notificationsAll?.filter((r) => r?.reat_at == null && r?.type == 3)?.length ? <span class="noti-tabs-dot"></span> : ''}</a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link" data-toggle="pill" onClick={() => setType(4)} href="#notification-four">Service{globalState.notificationsAll?.filter((r) => r?.reat_at == null && r?.type == 4)?.length ? <span class="noti-tabs-dot"></span> : ''}</a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link" data-toggle="pill" onClick={() => setType(5)} href="#notification-six">Review{globalState.notificationsAll?.filter((r) => r?.reat_at == null && r?.type == 5)?.length ? <span class="noti-tabs-dot"></span> : ''}</a>
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="tab-content">
                                            <div className="tab-pane active" id="notification-one">
                                                <div className="notification-content">
                                                    <div className="cmn-table-sec">
                                                        <table className="rwd-table">
                                                            <tbody>
                                                                {globalState.notificationsAll?.filter((filter) => filter?.type == Type)?.length > 0 ?
                                                                    globalState.notificationsAll.filter((filter) => filter?.type == Type).map((res, i) =>
                                                                        <tr key={i}>
                                                                            <td>

                                                                                <div className="cricle-pic-name">
                                                                                    <Link to={NotificationType[res?.type].path}> <figure><img src={profileAvatar(JSON.parse(res.data)?.image, JSON.parse(res.data)?.social_image)} alt={JSON.parse(res.data)?.name} /></figure><span>{JSON.parse(res.data)?.name}</span></Link>
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                {JSON.parse(res.data)?.description}
                                                                            </td>
                                                                            <td>
                                                                                {moment(res.createdAt).fromNow()}
                                                                            </td>
                                                                            <td>
                                                                                {res?.reat_at == '' || res?.reat_at == null ? <button type="button" onClick={() => ReadNotification({ id: res?.id })} className="btn-link">Read</button> : ''}
                                                                            </td>
                                                                        </tr>) : <NoDataFound
                                                                        image={images.no_webinars_right_now_img}
                                                                        title={'No Notifications Right Now!'}
                                                                        description={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem."}
                                                                        buttonTitle="None"
                                                                        buttonPath="/home"
                                                                    />}
                                                            </tbody>
                                                        </table>

                                                    </div>
                                                    {globalState.notificationsAll?.filter((filter) => filter?.type == Type)?.length > 0 ? <div className="row">
                                                        <div className="col-12">
                                                            <div className="load-more-btn text-center"> <a href="#" className="btn"><i className="lb lb-refresh-icon"></i> Load More</a> </div>
                                                        </div>
                                                    </div> : ''}
                                                </div>
                                            </div>
                                            {/* <div className="tab-pane fade" id="notification-two">
                                                <div className="notification-content">
                                                    <div className="cmn-table-sec">
                                                        <table className="rwd-table">
                                                            <tbody>
                                                                <tr>
                                                                    <td>

                                                                        <div className="cricle-pic-name">
                                                                            <a href="/profile"> <figure><img src={images.testi_use_img} alt="Username" /></figure><span>User Name</span></a>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        User Has Started A New Event
                      </td>
                                                                    <td>
                                                                        04:56 PM
                     </td>
                                                                    <td>
                                                                        <button className="btn-link">Read</button>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <div className="load-more-btn text-center"> <a href="#" className="btn"><i className="lb lb-refresh-icon"></i> Load More</a> </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="tab-pane fade" id="notification-three">
                                                <div className="notification-content">
                                                    <div className="cmn-table-sec">
                                                        <table className="rwd-table">
                                                            <tbody>
                                                            <tr>
                                                                    <td>

                                                                        <div className="cricle-pic-name">
                                                                            <a href="/profile"> <figure><img src={images.testi_use_img} alt="Username" /></figure><span>User Name</span></a>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        User Has Started A New Event
</td>
                                                                    <td>
                                                                        04:56 PM
</td>
                                                                    <td>
                                                                        <button className="btn-link">Read</button>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <div className="load-more-btn text-center"> <a href="#" className="btn"><i className="lb lb-refresh-icon"></i> Load More</a> </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="tab-pane fade" id="notification-four">
                                                <div className="notification-content">
                                                    <div className="cmn-table-sec">
                                                        <table className="rwd-table">
                                                            <tbody>
                                                                
                                                                <tr>
                                                                    <td>

                                                                        <div className="cricle-pic-name">
                                                                            <a href="/profile"> <figure><img src={images.testi_use_img} alt="Username" /></figure><span>User Name</span></a>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        User Has Started A New Event
</td>
                                                                    <td>
                                                                        04:56 PM
</td>
                                                                    <td>
                                                                        <button className="btn-link">Read</button>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <div className="load-more-btn text-center"> <a href="#" className="btn"><i className="lb lb-refresh-icon"></i> Load More</a> </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="tab-pane fade" id="notification-six">
                                                <div className="notification-content">
                                                    <div className="cmn-table-sec">
                                                        <table className="rwd-table">
                                                            <tbody>
                                                            <tr>
                                                                    <td>

                                                                        <div className="cricle-pic-name">
                                                                            <a href="/profile"> <figure><img src={images.testi_use_img} alt="Username" /></figure><span>User Name</span></a>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        User Has Started A New Event
</td>
                                                                    <td>
                                                                        04:56 PM
</td>
                                                                    <td>
                                                                        <button className="btn-link">Read</button>
                                                                    </td>
                                                                </tr>
                                                    
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <div className="load-more-btn text-center"> <a href="#" className="btn"><i className="lb lb-refresh-icon"></i> Load More</a> </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </main>
            <Footer />
        </>
    );
}


export default Notifications;