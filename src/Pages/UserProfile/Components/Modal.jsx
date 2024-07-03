import React from 'react';
import { useContext } from 'react';
import config from '../../../ApiServices/Apis/config';
import Context from '../../Home/Context/Context';

const ServiceModal = () => {
    const [state,dispatch] = useContext(Context);
    return (
        <>
            <div className="modal cmn-popup service-info-popup" id="service1" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2 className="modal-heading"><i className="lb lb-host-icon"></i> {state.ModelServiceName} <span>({state.ModelCategoryName})</span></h2>
                            <button type="button" className="close" data-dismiss="modal"><i className="lb lb-cancel-icon"></i></button>
                        </div>
                        <div className="modal-body">
                            <div className="certificate-c-body">
                                <div className="certificate-list-box">
                                    <div className="section-title">
                                        <h2>Certifications </h2>
                                    </div>
                                    <ul className="ul-list">
                                    {state.ModelCertification?.length>0?state.ModelCertification.map(res=>
                                         <li key={res.id}>
                                             <div className="certificate-img-bx">
                                                 <img src={config.imageBaseurl+res.name} alt="img" />
                                            </div>
                                        </li>
                                    ):''}
                                    </ul>
                                </div>
                                <div className="service-description">
                                    <div className="section-title">
                                        <h2>Description</h2>
                                    </div>
                                    <div className="full-bio-content">
                                        <p>
                                        {state.ModelDescription}
                                        </p>

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
export default ServiceModal;



