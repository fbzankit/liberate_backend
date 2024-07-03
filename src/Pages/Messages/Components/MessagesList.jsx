import React from 'react';
import TimeLap from './TimeLap';

const MessagesList = (props) => {
    return (
        <>

            <li className={`common-message ${props?.className}`}>
                <p className="common-message-content">
                    {props?.message}
                                                </p>
                <time datetime>
                {props?.time}
                </time>
            </li>

        </>
    );
}

export default MessagesList;