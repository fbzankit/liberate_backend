import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SignupHeader = () => {
    const [Preloader, setPreloader] = useState(true)
    document.addEventListener("DOMContentLoaded", function() {
        setPreloader(false);
    });
    useEffect(() => {
        setPreloader(false);
    }, [window.location.pathname])

    return (
        <>
            {Preloader?<div id="preloader">
                <div className="preloader"> <span></span> <span></span> </div>
            </div>:''}
        </>
    );
}

export default SignupHeader;
