import React, { useContext, useEffect, useState } from 'react';
import images from '../../../Utility/Images';
import { Link } from 'react-router-dom';
import GlobalContext from '../../../Global/GlobalContext';
import moment from 'moment';
import { socketIO } from '../../../ApiServices/socket';
import AuthUserContext from '../../../AuthUser/AuthUserContext';
import { APIService } from '../../../ApiServices/Apis/APIServices';
import { profileAvatar, notificationBell } from '../../../Utility/Utility';
import { NotificationType } from '../../Notifications/Notifications';

const Notifications = () => {
    const [globalState, globalDispatch] = useContext(GlobalContext)
    const [response, setResponse] = useState("");
    const authUser = useContext(AuthUserContext)
    const getAllNotifications = () => {
        APIService.notificationsAll({ page: 0 }).then(res => {
            if (res.data.status == 200) {
                globalDispatch({ type: 'notificationsAll', payload: { Type: 'notificationsAll', notificationsAll: res.data.data } })
            }
        });
    }
    useEffect(() => {
        socketIO.emit("newUser", authUser?.id);
        getAllNotifications();
        return;
    }, [])

    useEffect(() => {
        socketIO.on("getNotification", (data) => {
            notificationBell();
                let resData=data;
                // setTimeout(() => {
                //     globalDispatch({ type: 'notificationsAllPush', payload: { Type: 'notificationsAllPush', notificationsAll:globalState.notificationsAll.push(resData) }})                    
                // }, 1000);
                console.log(resData);
        });
        return;
    }, [socketIO]);


    return (
        <>
            <li>
                <div className="dropdown dd-right-side notification-dd">
                    <Link className="link-btn dropdown-toggle" to="#" role="button" id="notification-dd" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="lb lb-notification-icon" data-toggle="tooltip" title="Notification"></i>
                        {globalState.notificationsAll?.filter((r) => r?.reat_at == null)?.length > 0 ? <span>0</span> : ''}
                    </Link>
                    <div className="dropdown-menu" aria-labelledby="notification-dd">
                        <div className="notification-list">
                            <div className="noti-dd-heading"> <strong>Notification</strong> <Link to="/notifications">See All</Link> </div>
                            <div className="noti-dd-listing">
                                {globalState.notificationsAll?.length > 0 ?
                                    globalState.notificationsAll.map((res, i) =>
                                        <div key={i} onClick={() => alert(res.id)} className="noti-dd-box">
                                            <div className="noti-lft-img"><img src={profileAvatar(JSON.parse(res.data)?.image, JSON.parse(res.data)?.social_image)} alt="" /></div>
                                            <div className="noti-rit-info">
                                                <p><Link to={NotificationType[res?.type].path}>{JSON.parse(res.data)?.name}</Link> {JSON.parse(res.data)?.description} </p>
                                                <span>{moment(res.createdAt).fromNow()}</span> </div>
                                        </div>) : <div className="noti-dd-box">

                                        <div className="noti-rit-info">
                                            <p>No New notification</p>
                                        </div>
                                    </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        </>
    );
}

export default Notifications;