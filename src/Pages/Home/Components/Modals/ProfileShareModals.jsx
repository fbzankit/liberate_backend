import React, { useContext } from 'react';
import images from '../../../../Utility/Images';
import Context from '../../Context/Context';
import { toast } from 'react-toastify';
const ProfileShareModals = () => {
    const [state,dispatch] = useContext(Context);
    const copyToClipBoard=()=>{
        var copyText = document.getElementById("copy-clip-board");
        copyText.select();
        copyText.setSelectionRange(0, 99999);
        navigator.clipboard.writeText(copyText.value);
        toast.success("Text Copy")
    }
    return (
        <>
            <div className="modal bg-shape-popup invite-users-popup" id="share-event-popup" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2 className="modal-heading">Share Profile</h2>
                            <button type="button" className="close" data-dismiss="modal"><i className="lb lb-cancel-icon"></i></button>
                        </div>
                        <div className="modal-body">
                            <div className="info-popup-content">
                                <div className="share-service-input">
                                    <div className="form-group">
                                        <div className="share-with-smo">
                                            <div className="portfolio-footer-social text-center"> 
                                                <a href="https://www.instagram.com/" target="_blank">
                                                <img src={images.instagram_icon} alt="" /></a> 
                                                <a href="https://www.facebook.com/" target="_blank">
                                                    <img src={images.facebook_icon} alt="" />
                                                </a> 
                                                <a href="https://twitter.com/" target="_blank">
                                                    <img src={images.twitter_icon} alt="" />
                                                </a> 
                                            </div>
                                        </div>
                                    </div>
                                    <div className="btn-input">
                                        <input type="text" className="form-control" id="copy-clip-board" value={state.userProfileUrl} readOnly={true}/>
                                        <button className="btn input-btn" type="button" onClick={copyToClipBoard}>Copy</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProfileShareModals;