import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Context from '../../Home/Context/Context';

const Specialties = () => {
    const [state,dispatch] = useContext(Context);
    return (
        <>
            <div className="pp-single-bx">
                <div className="lft-pp-icon">
                    <i className="lb lb-specialities-icon"></i>
                </div>
                <div className="rit-pp-info">
                    <div className="first-pp-bx">
                        <strong>Specialties</strong>
                        <div className="sidebar-tag">
                            <ul className="ul-row">
                            {state.UserProfile?.speciality?state.UserProfile?.speciality.split(',').map((res,i)=>
                                <li key={i}><Link to="#" title={res}>{res}</Link></li>
                            ):''}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


export default Specialties;