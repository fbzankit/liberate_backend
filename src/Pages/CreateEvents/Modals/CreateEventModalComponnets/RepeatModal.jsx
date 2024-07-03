import React, { useState, useEffect, useContext, useRef } from 'react';
import moment from 'moment';
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel"
import CreateEventContext from '../../CreateEventContext/CreateEventContext';
const RepeatModal = () => {
    const [state,dispatch] = useContext(CreateEventContext)
    
    useEffect(() => {
        // {MultipleChoose.map((date, index) => ( 
        //     dispatch({type:"availableDate",payload:{Type:'availableDate',availableDate:[...state.availableDate,...[{from:date.format('YYYY-MM-D'),to:date.format('YYYY-MM-D')}]]}})
        // ))}
        
        findDateByWeek();
        console.log('repeatDa',state);

        return;
    }, [state])
    const handleWeekly = (day) => {
       alert('sorry!');
    }
    const setMultipleChoose=(e)=>{
        var dataObj=[]
        if(e?.length>0){
            e.map((res)=>
                dataObj.push({from:moment(res.format()).format('YYYY-MM-DD'),to:moment(res.format()).format('YYYY-MM-DD')})   
            )
        }
        console.log(dataObj,'res') 
        dispatch({ type: 'AvailableDate', payload: { Type: 'AvailableDate', availableDate:dataObj}})
    }
    const setTillDate=(e)=>{
        console.log(e);
        // let dataObj={from:moment(e.format()).format('YYYY-MM-DD'),to:moment(e.format()).format('YYYY-MM-DD')}   
        // dispatch({ type: 'AvailableDate', payload: { Type: 'AvailableDate', availableDate:[dataObj]}})
    }
    //start find date by week days
    const findDateByWeek=()=>{
        let newDate = new Date();
        let now = new Date();
        now.setDate(now.getDate() + parseInt(state.numberOfWeek) * 7);
        var daysOfYear = [];
        for (var d = new Date(2021,9,12); d <= newDate; d.setDate(d.getDate() + 1)) {
            // if(state.weekDays.find((find)=>find===d.toLocaleDateString('en-US', { weekday: 'long' }))){
            //     daysOfYear.push(new Date(d).toUTCString());
            // }
            // console.log(new Date(d).toUTCString());
           
        }
        
        // console.log('repeatNow',new Date(now.getFullYear(),now.getMonth(),now.getDate()),newDate,daysOfYear);
        // console.log(daysOfYear);
    }
    //end  find date by week days
    const handleWeekDays = (day) => {
        
        if(state.weekDays.find((res)=>res==day)){
            let weekDaysFilter=state.weekDays.filter((res)=>res!=day);
             dispatch({type:'WeekDays',payload:{Type:'WeekDays',weekDays:weekDaysFilter}})
        }else{
            dispatch({type:'WeekDays',payload:{Type:'WeekDays',weekDays:[...state.weekDays,day]}})
        }
        
     }
    const handleRadioButton=(e)=>{
        let name=e.target.name;
        let value=e.target.value;
        dispatch({type:name,payload:{Type:name,[name]:value}});
    }

    const resetRepeat=()=>{
        dispatch({
        type:'resetRepeat',
        payload:{
            Type:'resetRepeat',
            startDate:state.defaultStartDate,
            repeatBy:'',
            endDate:state.defaultEndDate,
            availableDate:[{from:state.defaultStartDate,to:state.defaultStartDate}],
        }});
    }
    const multipleDateValue=[]
    if(state.availableDate?.length>0){
        state.availableDate.map((res)=>
            multipleDateValue.push(moment(res.from,'YYYY-MM-DD').format('D MMM YY'))
        )   
    }
    return (
        <>
            <div className="modal does-not-repeat-popup" id="does-not-repeat-popup" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <a href="#create-event-modal" 
                        // onClick={resetRepeat} 
                        className="close" data-toggle="modal" data-dismiss="modal"><i className="lb lb-cancel-icon"></i></a>
                        <div className="modal-body">
                            <div className="repeat-popup-content">
                                <div className="all-day-ck-bx">
                                    {/* <div className="repeat-bx">
                                        <div className="repeat-every-bx">
                                            <ul className="ul-row">
                                                <li>
                                                    <label className="radiobox" 
                                                    >Repeat For
                                                    <input type="radio" checked={state.repeatBy=="Weeks"?true:false} name="repeatBy" onChange={handleRadioButton} value="Weeks" />
                                                    <span className="checkmark"></span>
                                                </label>
                                                </li>
                                                <li>
                                                <select name="numberOfWeek" onChange={handleRadioButton} disabled={state.repeatBy=="Weeks"?false:true} value={state.numberOfWeek}>
                                                        <option value="1" disabled={state.repeatBy=="Weeks"?false:true}>1</option>
                                                        <option value="2" disabled={state.repeatBy=="Weeks"?false:true}>2</option>
                                                        <option value="3" disabled={state.repeatBy=="Weeks"?false:true}>3</option>
                                                        <option value="4" disabled={state.repeatBy=="Weeks"?false:true}>4</option>
                                                </select>
                                                </li>
                                                <li>
                                                    <select name="options" onChange={handleWeekly} disabled={state.repeatBy==="Weeks"?false:true}>
                                                        <option value="Weeks">{state.numberOfWeek>1?'Weeks':'Week'}</option>
                                                    </select>
                                                </li>
                                                <li className="repeat-days-list">
                                                    <div className="r-d-list">
                                                        <span className={`r-day-btn ${state.weekDays.find((res)=>res=="Sunday")?'active':''}`}  ><button type="button" onClick={()=>handleWeekDays('Sunday')} disabled={state.repeatBy=="Weeks"?false:true} className="btn gray-btn">S</button></span>
                                                        <span className={`r-day-btn ${state.weekDays.find((res)=>res=="Monday")?'active':''}`}  ><button type="button" onClick={()=>handleWeekDays('Monday')} disabled={state.repeatBy=="Weeks"?false:true} className="btn gray-btn">M</button></span>
                                                        <span className={`r-day-btn ${state.weekDays.find((res)=>res=="Tuesday")?'active':''}`} ><button type="button" onClick={()=>handleWeekDays('Tuesday')} disabled={state.repeatBy=="Weeks"?false:true} className="btn gray-btn">T</button></span>
                                                        <span className={`r-day-btn ${state.weekDays.find((res)=>res=="Wednesday")?'active':''}`} ><button type="button" onClick={()=>handleWeekDays('Wednesday')} disabled={state.repeatBy=="Weeks"?false:true} className="btn gray-btn">W</button></span>
                                                        <span className={`r-day-btn ${state.weekDays.find((res)=>res=="Thursday")?'active':''}`} ><button type="button" onClick={()=>handleWeekDays('Thursday')} disabled={state.repeatBy=="Weeks"?false:true} className="btn gray-btn">T</button></span>
                                                        <span className={`r-day-btn ${state.weekDays.find((res)=>res=="Friday")?'active':''}`} ><button type="button" onClick={()=>handleWeekDays('Friday')} disabled={state.repeatBy=="Weeks"?false:true} className="btn gray-btn">F</button></span>
                                                        <span className={`r-day-btn ${state.weekDays.find((res)=>res=="Saturday")?'active':''}`} ><button type="button" onClick={()=>handleWeekDays('Saturday')} disabled={state.repeatBy=="Weeks"?false:true} className="btn gray-btn">S</button></span>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div> */}
                                    {/* <div className="repeat-bx">
                                        <ul className="ul-row">
                                            <li>
                                                <label className="radiobox" 
                                                // onClick={()=>handleRadioButton("tillDate")}
                                                >Till Date
                                                    <input type="radio" checked={state.repeatBy=="tillDate"?true:false} name="repeatBy" onChange={handleRadioButton} value="tillDate"/>
                                                    <span className="checkmark"></span>
                                                </label>
                                            </li>
                                            <li>
                                                <div className="input-left-icon left-calender-icon">
                                                    <DatePicker
                                                        minDate={new Date()}
                                                        // value={tillDate}
                                                        onChange={setTillDate}
                                                        inputClass="form-control"
                                                        format="D MMM YY"
                                                        disabled={state.repeatBy=="tillDate"?false:true}
                                                        
                                                    />
                                                </div>
                                            </li>
                                        </ul>
                                    </div> */}
                                    <div className="repeat-bx">
                                        <ul className="ul-row">
                                            <li>
                                                <label className="radiobox"
                                                //  onClick={()=>handleRadioButton("chooseDate")}
                                                 >Choose Date(S)
                                                    <input type="radio" checked={state.repeatBy=="chooseDate"?true:false} name="repeatBy" onChange={handleRadioButton} value="chooseDate" />
                                                    <span className="checkmark"></span>
                                                </label>
                                            </li>
                                            <li>
                                                <div className="input-left-icon left-calender-icon">

                                                    <DatePicker
                                                        multiple
                                                        minDate={new Date()}
                                                        value={multipleDateValue}
                                                        onChange={setMultipleChoose}
                                                        inputClass="form-control"
                                                        format="D MMM YY"
                                                        plugins={[<DatePanel />]}
                                                        disabled={state.repeatBy=="chooseDate"?false:true}
                                                    />
                                                    
                                                    {/* <input type="text" className="form-control" placeholder="" value="10 Jan 2020" /> */}
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="repeat-bx repeat-btns">
                                        <div className="both-btns">
                                            <ul className="ul-list">
                                                <li><a href="#does-not-repeat-popup" className="link" onClick={resetRepeat} data-toggle="modal">Reset</a></li>
                                                <li><a href="#create-event-modal" className="btn default-btn" data-toggle="modal" data-dismiss="modal">Save</a></li>
                                            </ul>
                                        </div>
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


export default RepeatModal;

