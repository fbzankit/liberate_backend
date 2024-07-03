import React from 'react';
import images from '../../Utility/Images';

const ModalDataNotFound = ({modalId,title,description}) => {
    return (
        <>
            <div class="no-network-found-page no-data-found-sec">
                <div class="l-s-in-sec">
                    <div class="section-title">
                        <figure><img src={images.no_data_found_img} alt="No Data Found" /></figure>
                        <h2>{title}</h2>
                        <p>{description}</p>
                        <a href={`${modalId}`} class="btn cmn-btn" data-toggle="modal" data-dismiss="modal">Close</a>
                    </div>
                </div>
            </div>
        </>
    );
}
const ModalPreloader=()=>{
    return(
        <>
        <div id="preloader">
            <div className="preloader"> <span></span> <span></span> </div>
        </div>
        </>
    )
}
export  {ModalDataNotFound,ModalPreloader};