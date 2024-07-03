import React, { useContext } from 'react';
import Context from '../Pages/Home/Context/Context';

const DeleteConfirmationModal = ({deleteItem,title}) => {
    const [state,dispatch] = useContext(Context)
    return (
        <>
            <div className="modal bg-shape-popup delete-service-popup" id="delete-service-popup" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-body">
                        <div className="info-popup-content">
                            <div className="info-icon"><i className="lb lb-delete-icon"></i></div>
                            <div className="info-heading"><h1>{title}</h1></div>
                            <div className="both-btns">
                                <ul className="ul-list">
                                    <li><button type="button" className="btn bdr-btn" data-dismiss="modal">No</button></li>
                                    <li><button type="button" onClick={()=>deleteItem(state?.deleteId)} className="btn">Yes</button></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            </>
            );
}


export default DeleteConfirmationModal;