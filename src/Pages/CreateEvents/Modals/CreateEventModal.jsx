import React, { useContext, useRef } from 'react';
import CreateEventContext from '../CreateEventContext/CreateEventContext';
import WebinarModal from './CreateEventModalComponnets/Webinar/WebinarModal';
import RepeatModal from './CreateEventModalComponnets/RepeatModal';
import images from '../../../Utility/Images';
import { OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import CustomTooltip from '../../../Common/CustomTooltip';
const CreateEventModal = () => {
    const [state, dispatch] = useContext(CreateEventContext);
    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        dispatch({ type: name, payload: { Type: name, [name]: value } });
    }
    const inputType = (value) => {
        dispatch({
            type: 'eventType',
            payload: {
                Type: 'eventType',
                eventType: value,
                cost: 0,
                service: [],
                description: '',
                seats: 0,
                documents: [],
                documentsAll: [],
                title: '',
                practitionerServiceListValue: [],
            }
        });
        document.body.classList.add('modal-open');
    }
    return (
        <>
            <div className="modal right fade modal-sidebar event-type-popup" id="event-type-popup" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2 className="modal-heading">Create Event</h2>
                            <button type="button" className="close" data-dismiss="modal"><i className="lb lb-cancel-icon"></i></button>
                        </div>
                        <div className="modal-body">
                            <div className="choose-event-type">
                                <ul className="ul-row">
                                    <li>
                                        <button className="btn-link" type="button" onClick={() => inputType('Appointments')} data-backdrop="static" data-keyboard="false" data-toggle="modal" data-target="#webinar-create-event-modal" data-dismiss="modal">
                                            <label className="radiobox" >Appointments
                                            &nbsp;
                                                
                                                    <CustomTooltip 
                                                    placement={'bottom'} 
                                                    description={'Create a range(s) of time in a day you are available to be booked for appointments. Should be greater than your time and cost variation in the setup of your service.'}
                                                    />
                                                <input type="radio" name="eventType" onChange={handleChange} value="Appointments" checked={state.eventType === "Appointments" ? true : false} />
                                                <span className="checkmark"></span>
                                            </label>
                                        </button>
                                    </li>
                                    <li>
                                        <button className="btn-link" type="button" onClick={() => inputType('Webinar')} data-backdrop="static" data-keyboard="false" data-toggle="modal" data-target="#webinar-create-event-modal" data-dismiss="modal">
                                            <label className="radiobox" >Webinar
                                            &nbsp;
                                                <CustomTooltip 
                                                    placement={'top'} 
                                                    description={'Multiple people can join this webinar.'}
                                                />
                                                <input type="radio" name="eventType" onChange={handleChange} value="Webinar" checked={state.eventType === "Webinar" ? true : false} />
                                                <span className="checkmark"></span>
                                            </label>
                                        </button>
                                    </li>
                                    <li>
                                        <button className="btn-link" type="button" onClick={() => inputType('Group')} data-backdrop="static" data-keyboard="false" data-toggle="modal" data-target="#webinar-create-event-modal" data-dismiss="modal">
                                            <label className="radiobox" >Group
                                            &nbsp;
                                                <CustomTooltip 
                                                    placement={'top'} 
                                                    description={'Multiple people can join this group.'}
                                                />
                                                <input type="radio" name="eventType" onChange={handleChange} value="Group" checked={state.eventType === "Group" ? true : false} />
                                                <span className="checkmark"></span>
                                            </label>
                                        </button>
                                    </li>
                                    <li>
                                        <button className="btn-link" type="button" onClick={() => inputType('Class')} data-backdrop="static" data-keyboard="false" data-toggle="modal" data-target="#webinar-create-event-modal" data-dismiss="modal">
                                            <label className="radiobox" >Class
                                            &nbsp;
                                            <CustomTooltip 
                                                    placement={'top'} 
                                                    description={'Multiple people can join this class.'}
                                                />
                                                <input type="radio" name="eventType" onChange={handleChange} value="Class" checked={state.eventType === "Class" ? true : false} />
                                                <span className="checkmark"></span>
                                            </label>
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <WebinarModal />
            <RepeatModal />
        </>
    );
}

export default CreateEventModal;
