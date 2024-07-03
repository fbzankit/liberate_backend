import React, { useContext, useState, useEffect, useRef,createRef } from 'react';
import images from '../../Utility/Images';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { Link, useHistory, useParams, Redirect } from 'react-router-dom';
import { profileAvatar } from '../../Utility/Utility';
import AuthUserContext from '../../AuthUser/AuthUserContext';
import moment from 'moment';
import MessagesList from './Components/MessagesList';
import { APIService } from '../../ApiServices/Apis/APIServices';
import { socketIO } from '../../ApiServices/socket';
import TimeLap from './Components/TimeLap';
import ChatNotFound from './Components/ChatNotFound';
import ScrollToBottom from 'react-scroll-to-bottom';
import { toast } from 'react-toastify';

const Messages = () => {
    const history = useHistory();
    const { id } = useParams();
    const messageInputs = useRef(null);
    const messagesEndRef = createRef();
    const authUser = useContext(AuthUserContext)
    const [ShowInfo, setShowInfo] = useState(false)
    const [CurrentUser, setCurrentUser] = useState();
    const [Conversations, setConversations] = useState([]);
    const [OnlineUsers, setOnlineUsers] = useState([]);
    const [CurrentUserChatList, setCurrentUserChatList] = useState([]);
    const [CurrentMessage, setCurrentMessage] = useState('');
    const [RoomId,SetRoomId]=useState(localStorage.getItem('_ms'))
    console.log(authUser,ShowInfo,CurrentUser,Conversations);
    const scrollToBottom = () => {

        //   if (messagesEndRef) {
        //         messagesEndRef?.current.addEventListener('DOMNodeInserted', event => {
        //         const { currentTarget: target } = event;
        //             target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
        //         });
        //   }

        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        messageInputs.current.focus();
    }
    
useEffect(() => {
    if(id){
        let msIds = [authUser?.id, id];
        const ms = Math.min.apply(null, msIds) + '_' + Math.max.apply(null, msIds);
        localStorage.setItem('_ms', ms);
        SetRoomId(ms);

        

    }
    if(RoomId&&Conversations?.length>0){
        setCurrentUser(Conversations.filter((res)=>res?.group_id===RoomId)[0])
    }
    return;
}, [id])


  useEffect(scrollToBottom, [CurrentUserChatList]);
    const messageHandle = (e) => {
        setCurrentMessage(e.target.value);
    }
    const handleCurrentRoomUser = (user) => {
        history.push(`/messages/${user?.user_id}`)
        let msIds = [authUser?.id, id];
        const ms = Math.min.apply(null, msIds) + '_' + Math.max.apply(null, msIds);
        localStorage.setItem('_ms', ms);
        setCurrentUser(user);
    }
    const handleCurrentUserChatList = (chat) => {
        setCurrentUserChatList(chat);
    }
    useEffect(() => {
       
            scrollToBottom();
        
        
        socketIO.emit("newRoom", RoomId);
        socketIO.on('getConversations', (data) => {
            setConversations((prev) => [...prev, data]);
        });
        socketIO.on('getOnlineRooms', (data) => {
            setOnlineUsers(data);
        });
        socketIO.on('getMessage', (data) => {
            setCurrentUserChatList((prev) => [...prev, data]);
            
        });

        if(id){
            APIService.UserProfile({participentId:id}).then((res)=>{
            if(res.data.status==200){
                setCurrentUser(res.data.data);
            }else{
                toast.error(res.data.message);
            }
        })}

    }, [])
    useEffect(() => {
        socketIO.off("getMessage").on('getMessage', (data) => {
            UserConversations();
            if(data.group_id===RoomId){
                setCurrentUserChatList((prev) => [...prev, data]);
            }
        });
    }, [socketIO])
    useEffect(() => {
        ChatListUser();
        UserConversations();
        //   if(CurrentUser){
        //     
        //   }
        return;
    }, [CurrentUser,RoomId])
    const ChatListUser = () => {
        let data = {
            page: 0,
            // limit:10,
            group_id: RoomId
        }
        APIService.messageList(data).then((res) => {
            if (res.data.status == 200) {
                UserConversations();
                handleCurrentUserChatList(res.data.data);
            }
        }).catch((error) => {
            console.log(error);
        });
    }
    const UserConversations = () => {
        let data = {
            page: 0,
        }
        APIService.allConversation(data).then((res) => {
            if (res.data.status == 200) {
                setConversations(res.data.data);                
            }
        }).catch((error) => {
            console.log(error);
        });
    }
    const handleMessageSubmit = (e) => {
        e.preventDefault();
        let data = {
            group_id:RoomId,
            receiver_id:id,
            message:CurrentMessage,
        }
        APIService.saveMessage(data).then((res) => {
            if (res.data.status == 200) {
                socketIO.emit('sendMessage', res.data.data);
                setCurrentMessage('');
                // setCurrentUserChatList((prev) => [...prev, res.data.data]);
                UserConversations();
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <>
            <Header />
            <main>

                <section className="account-settings-area ">
                    <div className="container">
                        <div className="p-sec-heading">
                            <div className="row">
                                <div className="col-12">
                                    <div className="section-title">
                                        <h2><button type='button' onClick={() => history.goBack()} className="btn cricle-btn back-btn-cricle"><i className="lb lb-back-icon"></i></button>Back</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="chat-content">
                            <div className="main-grid">
                                <aside className="main-side">
                                    {/* <div className="common-header">
                                        <div className="common-header-start">
                                             <button type="button" onClick={()=>setShowInfo(!ShowInfo)}  className="u-flex js-side-info-button">
                                                <img className="profile-image" src={profileAvatar(authUser?.image, authUser?.social_image)} alt={authUser?.name} />
                                                <div className="common-header-content">
                                                    <h2 className="common-header-title">{authUser?.name}</h2>
                                                    <p className="common-header-status">Online</p> 
                                                </div>
                                            </button> 
                                        </div>
                                    </div> */}
                                    <section className="common-alerts">

                                    </section>
                                    <section className="common-search">
                                        <div className="search-form">
                                            <form action="#">
                                                <div className="top-search-bar">
                                                    <input type="email" placeholder="Search..." />
                                                    <button className="btn-link"><i className="lb lb-search-icon"></i></button>
                                                </div>
                                            </form>
                                        </div>
                                    </section>
                                    <section className="chats">
                                        {Conversations?.length > 0 ? <ul className="chats-list">
                                            {Conversations.map((res) =>
                                                <li className="chats-item" onClick={() => handleCurrentRoomUser(res)}>
                                                    <div className={`chats-item-button js-chat-button  ${RoomId===res?.group_id||res?.is_new==1?'active':''}`} role="button" tabIndex="0">
                                                        <img className="profile-image" src={profileAvatar(res?.image, res?.social_image)} alt={res?.name} />
                                                        <header className="chats-item-header">
                                                            <h3 className="chats-item-title">{res?.name}</h3>
                                                            <time className="chats-item-time">{moment(res?.createdAt).calendar()}</time>
                                                        </header>
                                                        <div className="chats-item-content">
                                                            <p className="chats-item-last">{res?.message}</p>
                                                            {/* <ul className="chats-item-info">
                                                            <li className="chats-item-info-item"><span className="unread-messsages">1</span></li>
                                                        </ul> */}
                                                        </div>
                                                    </div>
                                                </li>)}
                                        </ul> :<ChatNotFound />}
                                    </section>
                                </aside>
                                <div className="main-content">
                                {/* <div id="preloader">
                                    <div className="preloader"> <span></span> <span></span> </div>
                                </div> */}
                                    <div className={`common-header ${CurrentUser?'':'d-none'}`}>
                                        <div className="common-header-start">
                                            <button type="button" onClick={() => setShowInfo(!ShowInfo)} className="common-button is-only-mobile u-margin-end js-back"><span className="icon icon-back"><i className="lb lb-back-icon"></i></span></button>
                                            <button onClick={() => setShowInfo(!ShowInfo)} className="u-flex js-side-info-button">
                                                <img className="profile-image" src={profileAvatar(CurrentUser?.image, CurrentUser?.social_image)} alt={CurrentUser?.name} />
                                                <div className="common-header-content">
                                                    <h2 className="common-header-title">{CurrentUser?.name}</h2>
                                                    <p className="common-header-status">{CurrentUser ? moment(CurrentUser?.createdAt).calendar() : 'Online'}</p>
                                                </div>
                                            </button>
                                        </div>
                                        <div className="common-nav">
                                            <div className="filter-right">
                                                <ul className="d-inline-block ul-row">
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
                                                    {/* <li>
                                                        <div className="dropdown dd-right-side my-account-dd"><a className="link-btn dropdown-toggle" href="#" role="button" id="my-account-dd" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="lb lb-horizontal-more-icon"></i></a>
                                                            <div className="dropdown-menu" aria-labelledby="my-account-dd">
                                                                <div className="side-nav-bx">
                                                                    <ul>
                                                                        <li><a href="#"><i className="lb lb-notification-icon"></i> Mute Notification</a></li>
                                                                        <li><a href="#"><i className="lb lb-user-icon"></i> Block User </a></li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li> */}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="messanger " onScroll={(e)=>console.log(e,'scroll')} >

                                        {/* <ScrollToBottom initialScrollBehavior="smooth"> */}
                                            <ol className="messanger-list" 
                                            // ref={messagesEndRef}
                                            >
                                                {/* <TimeLap/> */}
                                                {CurrentUser&&RoomId!=''?CurrentUserChatList.map((res) => <MessagesList key={res?.id} className={authUser?.id == res?.sender_id ? 'is-you' : 'is-other'} message={res?.message} time={moment(res?.createdAt).format('h:mm A')} />)
                                                : <ChatNotFound />}
                                                <div ref={messagesEndRef} />
                                            </ol>
                                        {/* </ScrollToBottom> */}
                                        {/* <div style={{ float:"left", clear: "both" }}
                                            ref={messagesEndRef}>
                                        </div> */}
                                    </div> 
                                    
                                    <form onSubmit={handleMessageSubmit}>
                                        <div className={`message-box ${CurrentUser?'':'d-none'}`}>
                                            <input type="text" className="text-input" ref={messageInputs} id="message-box" onChange={messageHandle} placeholder="Type your message..." value={CurrentMessage} />
                                            <div className="btns-a-e-send">
                                                {/* <button className="common-button"><span className="icon"><i className="lb lb-attachment-icon"></i></span></button>  */}
                                                {/* <button type="button" onClick={()=>messageHandle(!showEmoji)} className="common-button"><span className="icon"><i className="lb lb-emoji-icon"></i></span></button> */}
                                                <button type="submit" className="common-button chat-send-btn"><span className="icon"><i className="lb lb-send-icon"></i></span></button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className={`main-info ${ShowInfo ? '' : 'u-hide'}`}>
                                    <div className="common-header">
                                        <button type="button" onClick={() => setShowInfo(false)} className="common-button js-close-main-info"><span className="icon"><i className="lb lb-cancel-icon"></i></span></button>
                                        <div className="common-header-content">
                                            <h3 className="common-header-title">Info</h3>
                                        </div>
                                    </div>
                                    <div className="main-info-content">
                                        <section className="common-box">
                                            <img className="main-info-image" src={profileAvatar(CurrentUser?.image, CurrentUser?.social_image)} alt={CurrentUser?.name} />
                                            <h4 className="big-title">{CurrentUser?.name}</h4>
                                            <p className="info-text">Created {moment(CurrentUser?.user_created_at).calendar()}</p>
                                        </section>
                                        {/* <section className="common-box">
                                            <h5 className="section-title">About Me</h5>
                                            <p>{CurrentUser?.aboutMe}</p>
                                        </section> */}
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

export default Messages;