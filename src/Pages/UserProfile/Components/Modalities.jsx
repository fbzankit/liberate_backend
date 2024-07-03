import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import Context from '../../Home/Context/Context';

const Modalities = () => {
    const [state,dispatch] = useContext(Context);
    return (
        <>
            <div className="pp-single-bx">
                <div className="lft-pp-icon">
                    <i className="lb lb-categories_2-icon"></i>
                </div>
                <div className="rit-pp-info">
                    <div className="first-pp-bx">
                        <strong>Modalities</strong>
                        <div className="sidebar-tag">
                            <ul className="ul-row">
                            {state.UserProfile?.PractitionerServices?.length>0?state.UserProfile?.PractitionerServices.map((res,i)=>
                            <li key={res.id}><Link to="#">{res.serviceId}</Link></li>  
                            ):''} 
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Modalities;