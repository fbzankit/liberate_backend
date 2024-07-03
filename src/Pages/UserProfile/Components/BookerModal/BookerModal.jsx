import React, { useContext, useEffect, useRef } from 'react';
import { APIService } from '../../../../ApiServices/Apis/APIServices';
import moment from 'moment';
import ReadMoreReact from 'read-more-react';
import { getTimeFromMins, getTimeFromHours } from '../../../../Utility/Utility';
import { toast, ToastContainer } from 'react-toastify';
import $ from 'jquery';
import images from '../../../../Utility/Images';
import Context from '../../../Home/Context/Context';
// $(".selectBox").on("click", function(e) {
//     $(this).toggleClass("show");
//     var dropdownItem = e.target;
//     var container = $(this).find(".selectBox__value");
//     container.text(dropdownItem.text);
//     $(dropdownItem)
//       .addClass("active")
//       .siblings()
//       .removeClass("active");
//   });
const BookerModal = () => {
    const selectBox = (e) => {
        $('.selectBox').toggleClass("show");
        var dropdownItem = e.target;
        var container = $('.selectBox').find(".selectBox__value");
        container.text(dropdownItem.text);
        $(dropdownItem)
            .addClass("active")
            .siblings()
            .removeClass("active");
    }

    const [state, dispatch] = useContext(Context)
    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        dispatch({ type: name, payload: { Type: name, [name]: value } });
    }
    const loadingButton = useRef(null);


    useEffect(() => {
        if (state.eventType === "Appointments") {
            dispatch({ type: 'serviceDescription', payload: { Type: 'serviceDescription', serviceDescription: state.bookingDetails?.services.find((res) => res.id == parseInt(state.selectServiceId))?.description } });
        }
        return;
    }, [state.selectServiceId])
    const handleChangeServices = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        let index = e.nativeEvent.target.selectedIndex;
        dispatch({ type: name, payload: { Type: name, selectServiceText: e.nativeEvent.target[index].text, [name]: value, packages: [] } });
        if (formValidation()) {
            let data = {
                serviceId: value,
            }
            APIService.servicePackageList(data).then((res) => {
                if (res.data.status == 200) {
                    // let costVariation=[];
                    //     state.bookingDetails?.service?.map((res)=>
                    //         parseInt(res.id)==parseInt(state.selectServiceId)?res.cost_variation==null?'':costVariation.push(res.cost_variation):costVariation=[]
                    //     );
                    dispatch({
                        type: 'packages',
                        payload: {
                            Type: 'packages',
                            costVariationList: res.data.data?.cost_variation != null ? JSON.parse(res.data.data?.cost_variation) : [],
                            packages: res.data.data?.packages
                        }
                    });
                } else {

                }
            }).catch((error) => {

            })
        } else {
            toast.error('not verified')
        }
        userPackages(value);
    }
    const handleChangeCostVariation = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        if (value == 'none') {
            dispatch({ type: 'ChangeCostVariation', payload: { Type: 'ChangeCostVariation', costVariationValue: value, duration: 0, cost: 0 } })
        } else {
            dispatch({ type: 'ChangeCostVariation', payload: { Type: 'ChangeCostVariation', costVariationValue: value, packagesValue: 'none', duration: parseInt(value.split(',')[0]), cost: parseInt(value.split(',')[1]) } })
        }
    }
    const handlePackagesChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        if (value === 'none') {
            dispatch({ type: 'handlePackagesChange', payload: { Type: 'handlePackagesChange', packagesValue: value, duration: 0, packagesId: '', session: 0, cost: 0 } })
        } else {
            dispatch({
                type: 'handlePackagesChange',
                payload: {
                    Type: 'handlePackagesChange',
                    packagesValue: value,
                    costVariationValue: 'none',
                    packagesId: parseInt(value.split(',')[0]) == NaN ? 0 : parseInt(value.split(',')[0]),
                    session: parseInt(value.split(',')[1]) == NaN ? 0 : parseInt(value.split(',')[1]),
                    cost: parseInt(value.split(',')[2]) == NaN ? 0 : parseInt(value.split(',')[2]),
                    duration: parseInt(value.split(',')[3]) == NaN ? 0 : parseInt(value.split(',')[3])
                }
            })
        }
    }
    const handlePackagesChangeDOM = (e) => {
        let value = e;
         if(value!=undefined){ 
        if (value === 'none') {
            dispatch({ type: 'handlePackagesChange', payload: { Type: 'handlePackagesChange', packagesValue: value, duration: 0, packagesId: '', session: 0, cost: 0 } })
        } else {
            dispatch({
                type: 'handlePackagesChange',
                payload: {
                    Type: 'handlePackagesChange',
                    packagesValue: value.toString(),
                    costVariationValue: 'none',
                    packagesId: parseInt(value[0]) == NaN ? 0 : parseInt(value[0]),
                    session: parseInt(value[1]) == NaN ? 0 : parseInt(value[1]),
                    cost: parseInt(value[2]) == NaN ? 0 : parseInt(value[2]),
                    duration: parseInt(value[3]) == NaN ? 0 : parseInt(value[3])
                }
            })
        }
      }else{
        toast.error('please choose a session')
      }
    }
    const userPackages = (id) => {
        let data = {
            service_id: id,
        }
        APIService.userPackages(data).then((res) => {
            if (res.data.status == 200) {
                dispatch({ type: 'currentPackages', payload: { Type: 'currentPackages', currentPackages: res.data.data } });
            }
        }).catch((error) => {

        })
    }
    const formValidation = () => {
        var condition = true;
        if (state.selectServiceId) {
            condition = true
        }
        return condition;
    }
    const handleBookingForm = (e) => {
        e.preventDefault()
        if (handleBookingFormValidation()) {
            let data = {
                event_id: state.eventId,
                service_id: state.selectServiceId,
                date: moment(state.startEventDate).format('DD-MM-YYYY'),
                time: state.startEventTime,
                strip_payment_id: null,
                service_name: state.selectServiceText,
                cost: state.cost,
                package_id: state.packagesId,
                duration: state.duration,
            }
            APIService.eventBooking(data).then((res) => {
                if (res.data.status == 200) {
                    // dispatch({type:'eventBooking',payload:{Type:'eventBooking',}})
                    $('.modal').modal('hide');
                    toast.success(res.data.message)
                } else {
                    toast.error(res.data.message)
                }
            }).catch((error) => {

            })
        }
    }
    const handleBookingFormValidation = () => {
        let condition = true;
        if (state.eventType === "Appointments") {
            if (state.selectServiceId == '') {
                condition = false
                toast.error('please choose 1 service...');
            }
            if (state.packagesValue == 'none' && state.costVariationValue == "none") {
                condition = false
                toast.error('please choose package or cost variation...');
            }
            if (state.appointmentStartEventDate == "" && state.appointmentStartEventTime === "") {
                condition = false
                toast.error('please click on Appointment date & time');
            }
        } else {
            if (state.selectServiceId == '' || state.selectServiceId === "none") {
                condition = false
                toast.error('please choose 1 service...');
            }
            if (state.cost == "") {
                condition = false
                toast.error('please enter cost variation...');
            }
        }
        return condition;
    }
    const bookedPay = () => {
        if (handleBookingFormValidation()) {
            $('#booker-modal').modal('hide');
            $('#payment-modal').modal('show');
        }
    }
    return (
        <>
            <form onSubmit={handleBookingForm}>
                <div className="modal right fade modal-sidebar booker-modal" id="booker-modal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h2 className="modal-heading">Book {state.eventType || 'Event'}</h2>
                                <button type="button" className="close" data-dismiss="modal"><i className="lb lb-cancel-icon"></i></button>
                            </div>
                            <div className="modal-body">
                                <div className="booker-service-list">
                                    <div className="add-service-box">
                                        <div className="up-gray-heading">
                                            <strong>Date / Time</strong>
                                            &nbsp;
                                            <span className="q-mark-tt"
                                                // onMouseOver={(e)=>alert('onMouseOver')}
                                                // onMouseOut={()=>alert('onMouseOut')}
                                                data-toggle="tooltip"
                                                title="This will be the date and time of your next session."
                                            >
                                                <img src={images.tooltipIcon} alt="" />
                                            </span>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-12 col-md-12 col-lg-12 form-group">
                                                <div className="add-input-bx">
                                                    <ul className="ul-row">
                                                        <li>
                                                            <div className="input-left-icon left-calender-icon">
                                                                <input type="text" className="form-control" id="service-name" placeholder="" value={moment(state.startEventDate, 'DD-MM-YYYY').format('D MMM YYYY')} disabled />
                                                            </div>
                                                        </li>
                                                        <li><span className="minus-arrow">-</span></li>
                                                        <li>
                                                            <div className="input-left-icon left-calender-icon left-time-icon">
                                                                <input type="text" className="form-control" id="service-name" placeholder="" value={moment(state.startEventTime, 'HH:mm:ss').format('hh:mm A')} disabled />
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label for="service-name" className="form-label">{state.eventType === 'Appointments' ? 'Choose service' : 'Service'}<span className="text-danger">*</span>
                                            <span className="q-mark-tt"
                                                // onMouseOver={(e)=>alert('onMouseOver')}
                                                // onMouseOut={()=>alert('onMouseOut')}
                                                data-toggle="tooltip"
                                                title="This will be the date and time of your next session."
                                            >
                                                &nbsp;&nbsp;<img src={images.tooltipIcon} alt="" />
                                            </span>
                                        </label>

                                        {state.eventType === 'Appointments' ? <select className="bdr-radius-five" disabled={state.eventType === 'Appointments' ? false : true} onChange={handleChangeServices} value={state.selectServiceId} name="selectServiceId">
                                            <option selected={true} value="none">None</option>
                                            {state.bookingDetails?.services?.length > 0 ? state.bookingDetails?.services.map((res) =>
                                                <option key={res.id} value={res.id} selected={res.id === state.selectServiceId ? true : false}>{res?.service?.name}</option>
                                            ) : ''}
                                        </select> : state.bookingDetails ? <div className="c-e-bx ce-lft-rit services-list-tag"><span className="service-name-tag">{state.bookingDetails?.services.map((res) => res?.service?.name)} </span></div> : ''}
                                    </div>
                                    <div className="selected-service-bx">
                                        {state.bookingDetails ? <div className="add-service-box bdr-btm">
                                            <div className="up-gray-heading">
                                                <strong>{state.eventType === 'Appointments' ? 'Service Description' : 'Event Description'}</strong>
                                            </div>
                                            <div className="row">
                                                <div className="col-sm-12 col-md-12 col-lg-12 form-group">
                                                    <div className="review-more-less">
                                                        <span className="more">
                                                            <ReadMoreReact
                                                            min={50}
                                                            max={5000}
                                                            text={state.bookingDetails?.description||state?.serviceDescription}
                                                            readMoreText={<a href={void (0)} className="morelink" style={{ cursor: 'pointer' }}>Read more</a>}
                                                        />

                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> : ''}
                                        {state.eventType === "Appointments" ? <>

                                            {/* <div className="add-service-box">
                                                <div className="up-gray-heading">
                                                    <strong>Packages
                                                <span className="q-mark-tt" data-toggle="tooltip"
                                                            title="Select a package if you wish to buy multiple sessions of the chosen service from this practitioner.">
                                                            &nbsp;&nbsp; <img src={images.tooltipIcon} alt="" />
                                                        </span>
                                                    </strong>
                                                    <span className="purchased-text">(Purchased remaining sessions 5/10)</span>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-12 col-md-12 col-lg-12 form-group">
                                                        <div className="add-input-bx">
                                                            <select className="bdr-radius-five" onChange={handlePackagesChange} value={state.packagesValue} name="packagesId">
                                                                <option selected={true} value="none">None</option>
                                                                {
                                                                    state.packages?.map((res, i) =>
                                                                        <option key={i} value={[res.id, res.sessions, res.cost, res?.time]}>
                                                                            &nbsp;Duration: {getTimeFromHours(parseInt(res?.time))} hr {moment(getTimeFromMins(parseInt(res?.time)), "hh:mm A").format('m')} min
                                                                    &nbsp;Cost: ${res.cost}
                                                                            &nbsp;Sessions: {res.sessions}
                                                                            &nbsp;Remaining: {res.sessions}
                                                                        </option>
                                                                    )
                                                                }

                                                            </select>


                                                        </div>
                                                    </div>
                                                </div>
                                            </div> */}
                                            <div className="form-group packages-select-sec">
                                                <div className="up-gray-heading">
                                                <strong>Packages
                                                <span className="q-mark-tt" data-toggle="tooltip"
                                                            title="Select a package if you wish to buy multiple sessions of the chosen service from this practitioner.">
                                                            &nbsp;&nbsp; <img src={images.tooltipIcon} alt="" />
                                                        </span>
                                                    </strong>
                                                    <span className="purchased-text">(Purchased remaining sessions 5/10)</span>
                                                </div>
                                                <div className="selectBox" onClick={selectBox}>
                                                    <div className="selectBox__value ">{`${state.packagesValue==='none'?'Choose Your Package':`Duration: ${getTimeFromHours(parseInt(state?.packagesValue.split(',')[3]))} hr ${moment(getTimeFromMins(parseInt(state?.packagesValue.split(',')[3])), "hh:mm A").format('m')} min Cost: $${state?.packagesValue.split(',')[2]} Sessions: ${state?.packagesValue.split(',')[1]} Remaining: ${state?.packagesValue.split(',')[1]}`}`}</div>
                                                    <div className="dropdown-menu">
                                                        <a href="#" className="dropdown-item " onClick={()=>handlePackagesChangeDOM('none')}>None</a>

                                                        {state.packages?.map((res, i) =>
                                                            <a href="#" key={i} className={`dropdown-item ${state.packagesId==res.id?'active':''} ${parseInt(res?.time)>state.appointmentDurationRange?'disabled':''}`} onClick={()=>handlePackagesChangeDOM([res.id, res.sessions, res.cost, res?.time])}>
                                                                <div className="select-package-bx">
                                                                    <div className="p-in-bx">Duration: <strong>{getTimeFromHours(parseInt(res?.time))} hr {moment(getTimeFromMins(parseInt(res?.time)), "hh:mm A").format('m')} min</strong></div>
                                                                    <div className="p-in-bx">Cost: <strong>${res.cost}</strong></div>
                                                                    <div className="p-in-bx">Sessions: <strong>{res.sessions}</strong></div>
                                                                    <div className="p-in-bx">Remaining: <strong>{res.sessions}</strong></div>
                                                                </div>
                                                            </a>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            
                                        </> : ''}
                                        <div className="service-total-book side-next-back-btn">
                                            <strong className="float-left">Total ${state.cost}</strong>
                                            <div className="float-right">
                                                {state.cost == 0 ?
                                                    // <button type="submit" className="ladda-button animate-btn zoom-out"><span className="label">Book</span> <span className="spinner"></span></button>
                                                    <button type="submit" className="btn default-btn"> Book </button>
                                                    :
                                                    // <a href="#payment-modal" className="btn default-btn" data-toggle="modal" data-dismiss="modal" onClick={bookedPay} >Book</a> 
                                                    <button type="button" className="btn default-btn" onClick={bookedPay} >Book</button>

                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

        </>
    );
}


export default BookerModal;