import React from 'react';
import images from '../../../Utility/Images';

const ChatNotFound = () => {
    return (
        <>
            <div class="messanger">
                <div class="no-content-chat-sec no-chat-found">
                    <div class="section-title">
                        <figure>
                            <img src={images.no_message_right_now_img} alt="" />
                        </figure>
                        <h2>Sorry No Chat Found</h2>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ChatNotFound;