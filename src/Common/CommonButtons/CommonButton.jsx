import React from 'react';

const CommonButtons = ({ text, ref }) => {
    return <>
        <button type="submit" className="ladda-button animate-btn float-right zoom-out" ref={ref}>
            <span className="label">{text}</span> <span class="spinner"></span>
        </button>
    </>;
}


export default CommonButtons;