import React, { useContext, useRef, useState, useEffect } from 'react';
import CreateEventContext from '../../../CreateEventContext/CreateEventContext';
import DatePicker, { DateObject } from "react-multi-date-picker";
import { APIService } from '../../../../../ApiServices/Apis/APIServices';
import { toast, ToastContainer } from 'react-toastify';
import moment from 'moment';
import Select from 'react-select';
import config from '../../../../../ApiServices/Apis/config'
import $ from 'jquery';
import AuthUserContext from '../../../../../AuthUser/AuthUserContext';
import images from '../../../../../Utility/Images';
import CustomTooltip from '../../../../../Common/CustomTooltip';

const WebinarModal = () => {
    const [state, dispatch] = useContext(CreateEventContext)
    const authUser = useContext(AuthUserContext);
    const [progress, setProgress] = useState(0)
    const loadingButton = useRef(null);
    const loadingButtonTwo = useRef(null);
    // var date;
    // useEffect(() => {
    //     date = new DateObject(`${moment(state.startDate,'YYYY-MM-DD').format('DD-MM-YYYY')}`);
    // },)
    const [startDate, setStartDate] = useState();
    const uploadFileRef = useRef(null)

    const uploadFileRefFunction = () => {
        // uploadFileRef.current.click();
    }

    useEffect(() => {
        fetchAllEvent();
        practitionerServiceList();
    }, [])

    const practitionerServiceList = () => {
        let data = {
            prac_id: authUser?.id
        }
        APIService.practitionerServiceList(data).then((res) => {
            if(res.data.status == 200) {
                let OptionsArray = []
                res.data.data.map((res) =>
                    OptionsArray.push({ value: res.id, label: res?.service?.name })
                )
                dispatch({ type: 'practitionerServiceList', payload: { Type: 'practitionerServiceList', practitionerServiceList: OptionsArray } });
            }
        }).catch((error) => {

        })
    }
    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        if(name == "startDate") {
            dispatch({ type: name, payload: { Type: name, endDate: value, [name]: value } });
        } else {
            dispatch({ type: name, payload: { Type: name, [name]: value } });
        }
    }
    const CertificationHandleChange = (e) => {
        const form_data = new FormData();
        for (const file of e.target.files) {
            form_data.append('documents', file);
        }
        dispatch({ type: 'documentsValue', payload: { Type: 'documentsValue', documentsValue: e.target.value } })
        form_data.append('isDoc', 2);
        APIService.ApplyForPractitionerUploadDocs(form_data,setProgress).then((res) => {
            if(res.data.status == 200 && res.data.success) {
                setProgress(0)
                toast.success(res.data.message)
                const FileIds = []
                // dispatch({ type: 'certificationsAll', payload: { Type: 'certificationsAll', documentsAll: [...state.documentsAll, ...res.data.data] } })
                dispatch({ type: 'certificationsAll', payload: { Type: 'certificationsAll', documentsValue: '', documentsAll: res.data.data } })
                res.data.data.map(res => {
                    FileIds.push(res.id);
                })
                // dispatch({ type: 'certificationsIds', payload: { Type: 'certificationsIds', documents: [...state.documents, ...FileIds] } })
                dispatch({ type: 'certificationsIds', payload: { Type: 'certificationsIds', documents: FileIds,docs:res.data.data[0]?.name } })
            } else {
                dispatch({ type: 'fileUploadPreloader', payload: { Type: 'fileUploadPreloader', documentsValue: '', fileUploadPreloader: false } })
                toast.error('something wrong')
            }

        })
    }
    const DeleteDocFile = (ids) => {
        let data = {
            docId: ids
        }
        APIService.ApplyForPractitionerDeleteDocs(data).then((res) => {
            if(res.data.status == 200) {
                const docAll = state.documentsAll.filter((re) => re.id != ids);
                const doc = state.documents.filter((re) => re != ids);
                dispatch({ type: 'delete', payload: { Type: 'delete', documentsAll: docAll, documents: doc } })
                toast.success(res.data.message)
            }
        })
    }
    const handleDate = (e) => {
        let dataObj={from:moment(e.format()).format('YYYY-MM-DD'),to:moment(e.format()).format('YYYY-MM-DD')}   
        dispatch({ type: 'AvailableDate', payload: { Type: 'AvailableDate', availableDate:[dataObj]}})
    }
    const addAvailableTime = () => {
        if(handleAddTimeValidation()) {
            let TimeObj = [{ from: state.fromTime, to: state.toTime }];
            dispatch({
                type: 'AddTime',
                payload: {
                    Type: 'AddTime',
                    availableTime: [...state.availableTime, ...TimeObj],
                    fromTime: '',
                    toTime: '',
                }
            });
        }
    }
    const removeTimeSlot = (i) => {
        let rmObj = state.availableTime.filter((_, index) => i != index);
        dispatch({ type: "removeObj", payload: { Type: 'removeObj', availableTime: rmObj } });
    }
    const handleAddTimeValidation = () => {
        let condition = true;
        if(state.availableTime.find((res) => res.from == state.fromTime && res.to == state.toTime)) {
            toast.error("same availability already available");
            condition = false;
        }
        if(state.fromTime === '' && state.toTime === '') {
            condition = false;
            toast.error("please enter from and to time availability...");

        }
        if(state.fromTime === '') {
            condition = false;
            toast.error("please enter start time availability...");
        }
        if(state.toTime === '') {
            condition = false;
            toast.error("please enter end time availability...");
        }
        return condition;
    }
    const handleFormSubmit = (e) => {
        e.preventDefault();
        if(handleFormValidation()) {
            loadingButton.current.setAttribute('data-loading','true')
            loadingButton.current.disabled = true;
            let data = {
                title: state.title,
                type: state.eventType,
                available_date: JSON.stringify(state.availableDate),
                available_time: JSON.stringify(state.availableTime),
                cost: state.cost,
                services: state.service.toString(),
                description: state.description,
                seats: state.seats,
                docs: state.docs,
            }
            let Appointment = {
                type: state.eventType,
                available_date: JSON.stringify(state.availableDate),
                available_time: JSON.stringify(state.availableTime),
                services: state.service.toString(),
            }
            APIService.createEvent(state.eventType === "Appointment" ? Appointment : data).then((res) => {
                if(res.data.status == 200) {
                    $('.modal').modal('hide');
                    loadingButton.current.removeAttribute('data-loading')
                    loadingButton.current.disabled = false;
                    toast.success('Your meeting room link would be generated for this event once a user books it');
                    fetchAllEvent();
                } else {
                    loadingButton.current.removeAttribute('data-loading')
                    loadingButton.current.disabled = false;
                    toast.error(res.data.message);
                }
            }).catch((error)=>{
                loadingButton.current.removeAttribute('data-loading')
                loadingButton.current.disabled = false;
            })
        }
    }
    const handleFormValidation = () => {
        let condition = true;
        if(state.eventType === "Appointments") {
            if(state.availableDate?.length == 0) {
                condition = false;
                toast.error("please choose date");
            }
            if(state.availableTime?.length == 0) {
                condition = false;
                toast.error("please choose time");
            }
            if(state.service == '' || state.service?.length == 0) {
                condition = false;
                toast.error("please choose min 1 service");
            }
        } else {
            if(state.availableDate?.length == 0) {
                condition = false;
                toast.error("please choose date");
            }
            if(state.availableTime?.length == 0) {
                condition = false;
                toast.error("please choose time");
            }
            if(state.service == '' || state.service?.length == 0) {
                condition = false;
                toast.error("please choose min 1 service");
            }
            if(parseInt(state.seats) == 0) {
                condition = false;
                toast.error("please enter min 1 seat");
            }
            if(parseInt(state.cost) == 0) {
                condition = false;
                toast.error("please enter min 1$ cost");
            }
            if(state.eventType != 'Appointments' && state.title == "") {
                condition = false;
                toast.error(`title is required for ${state.eventType}`);
            }
            if(state.eventType != 'Appointments' && state.description == "") {
                condition = false;
                toast.error(`description is required for ${state.eventType}`);
            }
            if(state.eventType != 'Appointments' && state.description?.length < 150) {
                condition = false;
                toast.error(`description min 150 is required`);
            }
            if(state.eventType != 'Appointments' && state.documents?.length ===0) {
                condition = false;
                toast.error(`Event image is required...`);
            }
        }
        if(condition) {
            $('#successfully-action-popup').modal('show');
        }
        return condition;
    }
    // services section 
    const handleServicesInputChange = (obj) => {
        if(obj?.length > 0) {
            var arrayService = []
            obj.map((res) =>
                arrayService.push(res.value)
            )
            dispatch({ type: 'ServiceChange', payload: { Type: 'ServiceChange', practitionerServiceListValue: obj, service: arrayService } })
        } else if(obj?.value != undefined) {
            dispatch({ type: 'ServiceChange', payload: { Type: 'ServiceChange', practitionerServiceListValue: obj, service: [obj?.value] } })
        } else {
            dispatch({ type: 'ServiceChange', payload: { Type: 'ServiceChange', practitionerServiceListValue: obj, service: obj } })
        }
    }
    function fetchAllEvent() {
        let data = {
            prac_id: authUser?.id,
            page: 0,
        }
        APIService.fetchEventAllCurrentUser(data).then((res) => {
            if(res.data.status == 200) {
                var responseCollection = [];
                res.data.myBookedEvents.map((res) =>
                res?.event?.available_date&&res?.event?.type!="Appointments"?JSON.parse(res?.event?.available_date)?.map((date) =>
                        JSON.parse(res?.event?.available_time)?.map((time) =>
                            responseCollection = [...responseCollection, {
                                title: res?.event?.title,
                                userId: res?.userId,
                                description: res?.description,
                                extendedProps: {
                                    eventType: res?.event?.type
                                },
                                display:res?.event?.type==="Appointments"?'background':'',
                                color:res?.event?.type==="Appointments"?'#09bd48':"#19AEFF",
                                cost: res?.cost,
                                id: res?.event_id,
                                start: moment(`${date?.from} ${time?.from}`, 'YYYY-MM-DD HH:mm').format('YYYY-MM-DD HH:mm:ss'),
                                end: moment(`${date?.to} ${time?.to}`, 'YYYY-MM-DD HH:mm').format('YYYY-MM-DD HH:mm:ss'),
                            }]  
                        )
                    ):res?.event?.available_date?JSON.parse(res?.event?.available_date)?.map((date) =>
                    JSON.parse(res?.event?.available_time)?.map((time) =>
                        responseCollection = [...responseCollection, {
                            title: res?.event?.type,
                            userId: res?.userId,
                            description: res?.description,
                            extendedProps: {
                                eventType: res?.event?.type
                            },
                            // display:res?.event?.type==="Appointments"?'background':'',
                            color:"#19AEFF",
                            cost: res?.cost,
                            id: res?.event_id,
                            start: moment(moment(res?.date +' '+ res?.time,"DD-MM-YYYY hh:mm A"), 'YYYY-MM-DD HH:mm').format('YYYY-MM-DD HH:mm:ss'),
                            end: moment(moment(moment(res?.date +' '+ res?.time,"DD-MM-YYYY hh:mm A")).add(parseInt(res?.duration), 'minutes'), 'YYYY-MM-DD HH:mm').format('YYYY-MM-DD HH:mm:ss'),
                        }]  
                    )
                ):''

                );
                res.data.data.map((res) =>
                res?.available_date?JSON.parse(res?.available_date)?.map((date) =>
                        JSON.parse(res.available_time)?.map((time) =>
                            responseCollection = [...responseCollection, {
                                title: res?.title,
                                // updatedAt: res?.updatedAt,
                                userId: res?.userId,
                                // createdAt: res?.createdAt,
                                description: res?.description,
                                // docs: res?.docs,
                                extendedProps: {
                                    eventType: res?.type
                                },
                                display:res?.type==="Appointments"?'background':'',
                                color:res?.type==="Appointments"?'#09bd48':res?.isBooked==1?"#19AEFF":"#FF5F1F",
                                // eventBackgroundColor:res?.type==="Appointments"?'#09bd48':'',
                                cost: res?.cost,
                                id: res?.id,
                                start: moment(`${date?.from} ${time?.from}`, 'YYYY-MM-DD HH:mm').format('YYYY-MM-DD HH:mm:ss'),
                                end: moment(`${date?.to} ${time?.to}`, 'YYYY-MM-DD HH:mm').format('YYYY-MM-DD HH:mm:ss'),
                                // startDate:moment(`${date?.from} ${time?.from}`,'YYYY-MM-DD HH:mm').format('DD-MM-YYYY HH:mm'),
                                // endDate:  moment(`${date?.to} ${time?.to}`, 'YYYY-MM-DD HH:mm').format('DD-MM-YYYY HH:mm')
                            }]  
                        )
                    ):''
                );
                res.data.data.map((res) =>
                res?.type==="Appointments"?
                res?.eventBookings?.length>0?res.eventBookings?.map((booking) =>
                            responseCollection = [...responseCollection, {
                                title:booking.eventUser==authUser?.id?'Booked Me':booking.bookerId==authUser?.id?'Booked':'Blocked',
                                // updatedAt: res?.updatedAt,
                                userId:res?.userId,
                                // createdAt: res?.createdAt,
                                description: res?.description,
                                // docs: res?.docs,
                                cost:res?.cost,
                                extendedProps: {
                                    eventType: 'None'
                                },
                                isBooked:res?.isBooked,
                                // isBooked:res.eventBookings.find((find)=> moment(`${find.date} ${find.time}`,'DD-MM-YYYY HH:mm a').format('YYYY-MM-DD HH:mm')===moment(`${date?.from} ${time?.from}`,'YYYY-MM-DD HH:mm').format('YYYY-MM-DD HH:mm')&&find.bookerId==authUser?.id),
                                // color:booking.eventUser==authUser?.id)?"#1acd28":"#000111",
                                color:booking.eventUser==authUser?.id?'#1CAF00':booking.bookerId==authUser?.id?'#19AEFF':'#3A3A3A',
                                display:'',
                                id:res?.id,
                                start: moment(`${booking?.date} ${booking?.time}`,'DD-MM-YYYY HH:mm A').format('YYYY-MM-DD HH:mm:ss'),
                                end: moment(`${booking?.date} ${booking?.time}`,'DD-MM-YYYY HH:mm A').add(parseInt(booking?.duration==undefined?0:booking?.duration), 'minutes').format('YYYY-MM-DD HH:mm:ss'),
                                
                            }] 
      
                    ):'':''
                );
                dispatch({ type: 'allEventsData', payload: { Type: 'allEventsData', allEventsData: responseCollection } })
            }
        })
    }

    // console.log(state,'state')
    
    return (
        <>
            <form onSubmit={handleFormSubmit}>
                <div className="modal right fade modal-sidebar create-event-modal" id="webinar-create-event-modal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h2 className="modal-heading">{state.eventType}</h2>
                                <button type="button" className="close" data-dismiss="modal"><i className="lb lb-cancel-icon"></i></button>
                            </div>
                            <div className="modal-body">
                                <div className="add-service-box bdr-btm">
                                    <div className="up-gray-heading">
                                        <strong>Date <label className="text-danger">*</label></strong>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-12 col-md-12 col-lg-12 form-group">
                                            <div className="add-input-bx repeat-status-bx">
                                                <ul className="ul-row">
                                                    <li>
                                                        <div className="input-left-icon left-calender-icon">

                                                            <DatePicker
                                                                minDate={new Date()}
                                                                value={moment(state.startDate,'YYYY-MM-DD').format('D MMM YY')}
                                                                onChange={handleDate}
                                                                inputClass="form-control"
                                                                format="D MMM YY"
                                                                disabled={state.repeatBy=="tillDate"||state.repeatBy=="chooseDate"||state.repeatBy=="Weeks"?true:false}
                                                            />
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <a href="#does-not-repeat-popup" className="btn gray-btn" data-toggle="modal" data-backdrop="static" data-keyboard="false"> <i className="lb lb-refresh-icon"></i></a>
                                                    </li>
                                                    {state.availableDate?.length>1?<li>
                                                        <p>Repeating Date</p>
                                                    </li>:''}

                                                </ul>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div className="add-service-box bdr-btm">
                                    <div className="up-gray-heading">
                                                <strong>Available Time <label className="text-danger">*</label>
                                                &nbsp;
                                                
                                                 <CustomTooltip 
                                                    placement={'top'} 
                                                    description={state.eventType==="Appointments"?"Please give range(s) of time in a day in which people are able to book an appointment with you.":"Duration"}
                                                />
                                                </strong>
                                    </div>
                                    <div className="row">
                                        
                                        {state.availableTime?.length > 0 ? state.availableTime.map((res, index) =>
                                            <div key={index} className={`col-sm-12 col-md-12 col-lg-12 form-group ${state.availableTime?.length > 0?'added-delete':''}`}>
                                                <div className="add-input-bx">
                                                    <ul className="ul-row">
                                                        <li>
                                                            <label htmlFor="service-name" className="form-label">From</label>
                                                            <input type="time" className="form-control" value={res.from}  disabled={true}/>
                                                        </li>
                                                        <li>
                                                            <span className="minus-arrow">-</span>
                                                        </li>
                                                        <li>
                                                            <label htmlFor="service-name" className="form-label">To</label>
                                                            <input type="time" className="form-control" value={res.to}  disabled={true}/>
                                                        </li>
                                                        <li>
                                                        {state.availableTime?.length > 0?
                                                            <button type="button" onClick={() => removeTimeSlot(index)} className="btn gray-btn"><i className="lb lb-delete-icon"></i></button>:
                                                            <button type="button" className="btn gray-btn" onClick={addAvailableTime}><i className="lb lb-plush-icon"></i> </button>
                                                            
                                                            }
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>)
                                            : ''}
                                            <div className="col-sm-12 col-md-12 col-lg-12 form-group">
                                            <div className="add-input-bx">
                                                <ul className="ul-row">
                                                    <li>
                                                        <label htmlFor="service-name" className="form-label">From</label>
                                                        <input type="time" className="form-control" name="fromTime" onChange={handleChange} value={state.fromTime} />
                                                    </li>
                                                    <li><span className="minus-arrow">-</span></li>
                                                    <li>
                                                        <label htmlFor="service-name" className="form-label">To</label>
                                                        <input type="time" className="form-control" name="toTime" onChange={handleChange} value={state.toTime} />
                                                    </li>
                                                    <li>
                                                        <button type="button" className="btn gray-btn" onClick={addAvailableTime}><i className="lb lb-plush-icon"></i> </button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {state.eventType === "Appointments" ?
                                    "" :
                                    <div className="add-service-box bdr-btm">
                                        <div className="row">
                                            <div className="col-sm-12 col-md-12 col-lg-12 form-group">
                                                <div className="add-input-bx">
                                                    <ul className="ul-row">
                                                        <li>
                                                            <label htmlFor="service-name" className="form-label">Per Seat Cost <label className="text-danger">*</label></label>
                                                            <div className="input-left-icon dollar-input-icon">
                                                                <input type="number" name="cost" onChange={handleChange} min="0" className="form-control" placeholder="0" value={state.cost} />
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <label htmlFor="service-name" className="form-label">No. of seats <label className="text-danger">*</label></label>
                                                            <input type="number" name="seats" onChange={handleChange} min="0" className="form-control" placeholder="0" value={state.seats} />
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                                <div className="add-service-box">
                                    <div className="up-gray-heading">
                                        <strong>Service 

                                        <label className="text-danger"> *</label>
                                                &nbsp;
                                        
                                        <CustomTooltip 
                                                    placement={'top'} 
                                                    description={state.eventType==="Appointments"?"Choose the service(s) you would like to provide to users during these appointment range(s).":"Choose your service in which you would be giving this (webinar, class, group)"}
                                                />
                                        </strong>
                                        
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-12 col-md-12 col-lg-12">
                                            <div className="form-group">
                                                <label className="control-label" htmlFor="rolename" >Choose Your Service <label className="text-danger">*</label></label>
                                                {/* <select className="bdr-radius-five" name="services" onChange={handleChange} value={state.services}  multiple={state.eventType === "Appointments" ? true : false}>
                                                <option selected={true} disabled={true}>- Select Service -</option>
                                                <option value="1">Service Name 01</option>
                                                <option value="2">Service Name 02</option>
                                                <option value="3">Service Name 03</option>
                                                <option value="4">Service Name 04</option>
                                                <option value="5">Service Name 05</option>
                                                <option value="6">Service Name 06</option>
                                            </select> */}
                                                <Select
                                                    value={state.practitionerServiceListValue}
                                                    isMulti={state.eventType === "Appointments" ? true : false}
                                                    name="colors"
                                                    options={state.practitionerServiceList}
                                                    className="bdr-radius-five"
                                                    classNamePrefix="Choose Service"
                                                    onChange={handleServicesInputChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-sm-12 col-md-12 col-lg-12">
                                            <div className="step-line-bdr">
                                                <ul className="cmn-ul-list">

                                                    {state.eventType === "Appointments" ?
                                                        <li className="active"><span>&nbsp;</span></li> :
                                                        <>
                                                            <li className="active"><span>&nbsp;</span></li>
                                                            <li><span>&nbsp;</span></li>
                                                        </>
                                                    }
                                                </ul>
                                            </div>
                                            <div className="side-next-back-btn">
                                                {/* <a href="#event-type-popup" className="btn default-btn float-left" data-toggle="modal" data-dismiss="modal">Back</a> */}
                                                {state.eventType === "Appointments"
                                                    ?
                                                    // <button type="submit" className="btn default-btn float-right" onClick={handleFormValidation}>Finish</button>
                                                    <button type="submit" class="ladda-button animate-btn float-right zoom-out" onClick={handleFormValidation} ref={loadingButton}> 
                                                    <span class="label">Finish</span> <span class="spinner"></span>
                                                    </button>
                                                    //  <a href="#successfully-action-popup" className="btn default-btn float-right" data-toggle="modal" data-dismiss="modal">Finish</a>
                                                    : <a href='#webinar-create-event-step3-modal' className="btn default-btn float-right" data-toggle="modal" data-dismiss="modal">Next</a>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* event webinar step 3 */}
                <div className="modal right fade modal-sidebar webinar-create-event-step3-modal" id="webinar-create-event-step3-modal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h2 className="modal-heading">{state.eventType}</h2>
                                <a href="#event-type-popup" className="close" data-toggle="modal" data-dismiss="modal"><i className="lb lb-cancel-icon"></i></a>
                            </div>
                            <div className="modal-body">

                                <div className="row">
                                    <div className="col-sm-12 col-md-12 col-lg-12">
                                        <div className="form-group">
                                            <label htmlFor="email-address" className="form-label">Title <label className="text-danger">*</label></label>
                                            <input type="text" className="form-control" onChange={handleChange} name="title" placeholder="Add Title" value={state.title} />
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-12 col-lg-12">
                                        <div className="form-group">
                                            <label htmlFor="email-address" className="form-label">Add Description <label className="text-danger">*</label></label>
                                            <textarea className={`form-control  ${state.description?.length>0&&state.description?.length<150?'is-invalid':state.description?.length===0?'':'is-valid'}`} id="about-me" onChange={handleChange} name="description" placeholder="Type Hare..." value={state.description}></textarea>
                                            <div className="input-btm-note">
                                                <span className="float-left">Minimum 150 Characters</span>
                                                <span className="float-right">150/{state.description?.length} </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <div className="form-group">
                                            <div className="upload-file" onClick={uploadFileRefFunction}>
                                                <label className="file-upload" htmlFor="file-upload">

                                                    <strong>Upload Image</strong>
                                                    <span>
                                                        {/* <i className="lb lb-attachment-icon"></i> */}
                                                        <button type="button" data-backdrop="static" data-keyboard="false" data-toggle="modal" data-target="#upload-images-popup" className="btn btn-default profile-pic-update-btn"><i className="fa fa-camera"></i></button>
                                                    </span>

                                                    {/* <input type="file" accept="image/*" ref={uploadFileRef} style={{ display: "none" }} onChange={CertificationHandleChange} value={state.documentsValue} /> */}
                                                    </label>
                                            </div>
                                            <div className="uploaded-files-list">
                                            {state.progress>0?<div class="progress image-uploading-progress">
                                                        <div class="progress-done" id="progress-one" data-done={`${state.progress}%`} style={{opacity: 1, width: `${state.progress}%`}}>
                                                        {`${state.progress}%`}
                                                        </div>
                                                    </div>:''}
                                                <ul className="ul-row">
                                                    {state.documentsAll.map((res) =>
                                                        <li key={res.id}>
                                                            <figure className="upload-s-img">
                                                                <img src={config.imageBaseurl + res.file} alt="" />
                                                                <a className="remove-file-btn" href={void (0)} onClick={() => DeleteDocFile(res.id)}>
                                                                    <i className="lb lb-delete-icon"></i>
                                                                </a>
                                                            </figure>
                                                        </li>
                                                    )}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <div className="step-line-bdr">
                                            <ul className="cmn-ul-list">
                                                <li className="active"><span>&nbsp;</span></li>
                                                <li className="active"><span>&nbsp;</span></li>
                                            </ul>
                                        </div>
                                        <div className="side-next-back-btn">
                                            <a href="#webinar-create-event-modal" className="btn default-btn float-left" data-toggle="modal" data-dismiss="modal">Back</a>
                                            {/* <button type="submit" className="btn default-btn float-right" onClick={handleFormValidation} ref={loadingButton}>Finish</button> */}
                                            <button type="submit" class="ladda-button animate-btn float-right zoom-out" onClick={handleFormValidation} ref={loadingButton}> 
                                                    <span class="label">Finish</span> <span class="spinner"></span>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </form>
            {/* Event Successfully Created Popup*/}
            {/* <div className="modal bg-shape-popup successfully-action-popup" id="successfully-action-popup" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            
                                <div className="info-popup-content">
                                
                                    <div className="info-icon"><i className="lb lb-file-icon"></i></div>
                                    <div className="info-heading"><h1>Successfully Created Your Events</h1></div>
                                    <form onSubmit={handleFormSubmit}>
                                    <div className="both-btns">
                                    
                                        <ul className="ul-list">
                                            <li>
                                                <button type="button"  className="btn bdr-btn" data-dismiss="modal">No</button>
                                            </li>
                                            <li>
                                                <button type="submit"  className="btn">Yes</button>
                                            </li>
                                        </ul>
                                    </div>
                                    </form>                                  
                                </div>
                            
                        </div>
                    </div>
                </div>
            </div> */}

            

            {/* event webinar step 3 */}
        </>
    );
}


export default WebinarModal;