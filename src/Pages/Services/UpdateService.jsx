import React, { useContext, useEffect } from 'react';
import SideBar from '../SideBar/DashboardSideBar';
import AddServiceQuestion from './AddServiceQuestion';
import ServicesContext from './ServicesContext/ServicesContext';
import { showHideDiv } from '../../Utility/Utility';
import { APIService } from '../../ApiServices/Apis/APIServices';
import { toast, ToastContainer } from 'react-toastify';
import images from '../../Utility/Images';

const UpdateService = ({getServiceList}) => {
  const [state, dispatch] = useContext(ServicesContext)
  useEffect(() => {
    getServiceDetails();
    return;
  }, [state.editServiceId])

  const getServiceDetails = () => {
    let data = {
      serviceId: state.editServiceId
    }
    APIService.dashboardEditServicesDetails(data).then((res) => {
      if (res.data.status == 200) {
        // toast.success(res.data.message)
        dispatch({
           type: 'ediServiceDetails',
           payload: {
              Type: "ediServiceDetails",
              editDescription:res.data.data?.description, 
              ediServiceDetails: res.data.data,
              editPackagesIds:[],
              editPackages:res?.data?.data?.packages,
              bufferTime:res?.data?.data?.buffer_time
             } });
      } else {
        toast.error(res.data.message)
      }
    }).catch((error) => {

    })
  }
  const handleChange=(e)=>{
    let name =e.target.name;
    let value =e.target.value;
    dispatch({ type:name, payload: { Type:name, [name]: value} });
  }
  const handleFormSubmit=(e)=>{
      e.preventDefault();
      if(handleFromValidation()){
          let data={
            serviceId:state.editServiceId,
            buffer_time:state.bufferTime,
            extend_duration:JSON.stringify(state.editExtendDuration),
            cost_variation:JSON.stringify(state.editVariationCost),
            packages:state.editPackagesIds.toString(),
            description:state.editDescription,
          }
          APIService.dashboardUpdateServices(data).then((res)=>{
              if(res.data.status==200){
                toast.success(res.data.message);
                dispatch({type:'initialState',payload:{Type:'initialState',currentAction:'Service'}})
              }else{
                toast.error(res.data.message);
              }
          }).catch((error)=>{

          })
      }
  }
  const handleFromValidation=()=>{
    let condition=true;
    
    if(state.editPackages?.length<1){
      toast.error('Packages required')
      condition=false;
    }
    if(state.editDescription?.length<1){
      toast.error('Description is required')
      condition=false;
    }
    return condition;
  }
  // Packages
  const packageValidation=()=>{
    let condition=true;
    if(state.editPackagesCost==null||state.editPackagesCost==''){
      toast.error('Package cost required')
      condition=false;
    }
    if(state.editPackagesDuration==null|| state.editPackagesDuration<1){
      toast.error('min 15 minutes package duration is required!')
      condition=false;
    }
   
    if(parseInt(state.editPackagesCost)<1){
      toast.error('Package cost min 1$')
      condition=false;
    }
    if(state.editPackagesSessions ==null || state.editPackagesSessions==''){
      toast.error('Package sessions required')
      condition=false
    }
    if(parseInt(state.editPackagesSessions)<1){
      toast.error('min 1 sessions is required')
      condition=false
    }
    return condition;
  }
  const AddPackage=()=>{
      if(packageValidation()){
      let data={
          sessions:state.editPackagesSessions,
          cost:state.editPackagesCost,
          time:state.editPackagesDuration,
          serviceId:state.editServiceId,
        }
        APIService.dashboardAddPackages(data).then((res)=>{
          if(res.data.status==200){
            // toast.success(res.data.message);
            dispatch({type:'editPackages',payload:{Type:'editPackages',editPackagesDuration:0,editPackagesSessions:1,editPackagesCost:1,editPackagesIds:[...state.editPackagesIds,res.data.data.id],editPackages:[...state.editPackages,res.data.data]}})
          }else{
            toast.error(res.data.message);
          }
        })
      }
  }
  const removePackage=(id)=>{
    let data={id:id}
    APIService.dashboardRemovePackages(data).then((res)=>{
        if(res.data.status==200){
          // toast.success(res.data.message)
          let PackagesIds=  state.editPackagesIds.filter((re)=>re!=id)
          let Packages=  state.editPackages.filter((re)=>re.id!=id)
          dispatch({type:'editPackages',payload:{Type:'editPackages',editPackagesIds:PackagesIds,editPackages:Packages}})
        }else{
          toast.error(res.data.message);
        }
    })
  }
  const handleChangePackage=(e)=>{
    let name =e.target.name;
    let value =e.target.value;
    dispatch({ type:name, payload: { Type:name, [name]: value} });
  }

  // extendDuration
const ValidationExtendDuration=()=>{
    let condition=true;
    if(state.editExtendDurationTime==''||state.editExtendDurationTime==null){
      toast.error('please select the time');
      condition=false;
    }
    if(state.editExtendDurationCost==''|| state.editExtendDurationCost==null){
      toast.error('Extend duration cost is required');
      condition=false;
    }
   if(state.editExtendDuration.find((res)=>res.cost==state.editExtendDurationCost)&&state.editExtendDuration.find((res)=>res.time==state.editExtendDurationTime)){
    toast.error('Same duration and cost already added');
    condition=false;
   }
    return condition;
}
const ExtendDurationChange=(e)=>{
  let name =e.target.name;
  let value =e.target.value;
  dispatch({ type:name, payload: { Type:name, [name]: value} });
}
const addExtendDuration=()=>{
    if(ValidationExtendDuration()){
       let time=state.editExtendDurationTime;
       let cost=state.editExtendDurationCost;
       let obj={time:time,cost:cost};
      dispatch({ type:'editExtendDuration', payload: { Type:'editExtendDuration', editExtendDurationTime:'30',editExtendDurationCost:'0',editExtendDuration:[...state.editExtendDuration,obj]} });
    }
}
const removeExtendDuration=(index)=>{
  
    let obj=  state.editExtendDuration.filter((_, i)=>index!=i);
  
    dispatch({type:'editExtendDurationObj', payload: { Type:'editExtendDurationObj',editExtendDuration:obj} });
}
// cost and variation

 // extendDuration
 const ValidationVariationCost=()=>{
  let condition=true;
  if(state.editVariationCostTime==''||state.editVariationCostTime==null){
    toast.error('please select the time');
    condition=false;
  }
  if(state.editVariationCostCost<1){
    toast.error('cost min $1 is required');
    condition=false;
  }
 if(state.editPackagesSessions<1){
  toast.error('min 1 session required...');
  condition=false;
 }
if(state.editVariationCost.find((res)=>res.time==state.editVariationCostTime)){
    toast.error('same duration already added...');
    condition=false;
}
if(state.editVariationCostTime<15){
  toast.error('select minimum 15 minutes durations');
  condition=false;
}

 
 
  return condition;
}
const VariationCostChange=(e)=>{
let name =e.target.name;
let value =e.target.value;
dispatch({ type:name, payload: { Type:name, [name]: value} });
}

const addVariationCost=()=>{
  if(ValidationVariationCost()){
     let time=state.editVariationCostTime;
     let cost=state.editVariationCostCost;
     let obj={time:time,cost:cost,sessions:state.editPackagesSessions};
     
    dispatch({ 
      type:'editVariationCost',
        payload: { 
        Type:'editVariationCost',
        editVariationCostTime:'0',
        editPackagesSessions:1,
        editVariationCostCost:'1',
        editVariationCost:[...state.editVariationCost,obj]
        }
     });
  }
}
const removeVariationCost=(index)=>{
  let obj=  state.editVariationCost.filter((_, i)=>index!=i);
  dispatch({type:'editVariationCostObj', payload: { Type:'editVariationCostObj',editVariationCost:obj} });
}

const noneChange=(e)=>{
    alert('Only you can remove')
}
  return (
    <>
      <section className="account-settings-area">
        <div className="container">
          <div className="p-sec-heading">
            <div className="row">
              <div className="col-12">
                <div className="section-title">
                  <h2>Edit service</h2>
                  <p>Change your servie info.</p>

                </div>
              </div>
            </div>
          </div>
          <div className="account-settings-content">
            <SideBar />
            <div className="rit-as-sec">
              <div className="add-service-bx eidt-service-bx">
                <div className="bdr-heading">
                  <div className="row">
                    <div className="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-8">
                      <h2><a href={void (0)} onClick={() => dispatch({ type: 'editService', payload: { Type: "editService", currentAction: 'Service' } })} className="btn cricle-btn" ><i className="lb lb-back-icon"></i></a> Edit Service</h2>
                    </div>
                    {/* <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4">
                      <div className="float-right">
                        <a href={void (0)} onClick={() => dispatch({ type: 'editService', payload: { Type: "editService", currentAction: 'addService' } })} className="btn"><i className="lb lb-plush-icon"></i> Add Service</a>
                      </div>
                    </div> */}
                  </div>
                </div>
                <div className="cmn-form">
                  <form onSubmit={handleFormSubmit}>
                    <div className="add-service-box bdr-btm">
                      <div className="row">
                        <div className="col-sm-12 col-md-12 col-lg-6 form-group">
                          <label for="service-name" className="form-label">Service Name</label>
                          <input type="text" className="form-control" placeholder="" value={state.ediServiceDetails?.service?.name} disabled={true} />
                        </div>

                        <div className="col-sm-12 col-md-12 col-lg-6 form-group">
                          <label for="service-name" className="form-label">Category Name</label>
                          <input type="text" className="form-control" placeholder="" value={state.ediServiceDetails?.category?.name} disabled={true} />
                        </div>
                      </div>
                    </div>
                    <div className="up-gray-heading">
                      <strong>Description <span className="text-danger">*</span></strong>
                    </div>
                    <div className="row">
                      <div className="col-12 form-group">
                        <textarea className={`form-control ${state.errorDescription ? state.editDescription?.length <= 0 ? "is-invalid" : '' : ''} ${state.editDescription?.length == 0 ? '' : state.editDescription?.length >= 150 ? 'border-success' : 'border-danger'}`}   placeholder="" name="editDescription" onChange={handleChange} value={state.editDescription}></textarea>
                        <div className="input-btm-note">
                          <span className="float-left">Minimum 150 Characters</span>
                          <span className="float-right">150/{state.editDescription?.length>0?state.editDescription?.length:0} </span>
                        </div>
                      </div>
                    </div>
                    {/* start cost Variations */}
                    {/* <div className="add-service-box bdr-btm">
                      <div className="up-gray-heading">
                        <strong>
                         Session & Cost Variations <span className="text-danger">*</span>

                          &nbsp;
                          <span className="q-mark-tt"
                               // onMouseOver={(e)=>alert('onMouseOver')}
                              // onMouseOut={()=>alert('onMouseOut')}
                              data-toggle="tooltip" 
                              title="You can set up different costs for different time durations of your appointments."
                          >
                                <img src={images.tooltipIcon} alt=""/>
                        </span>
                         </strong>
                      </div>
                      <div className="row">
                        {state.editVariationCost.length<8?<div className="col-sm-12 col-md-12 col-lg-8 form-group">
                          <div className="add-input-bx">
                            <ul className="ul-row">
                              <li> <label for="service-name" className="form-label">Duration</label>
                                <select className="bdr-radius-five" onChange={VariationCostChange} name="editVariationCostTime" value={state.editVariationCostTime}>
                                  <option value="0" selected={state.editVariationCost.find(res=>res.time==0)} disabled={state.editVariationCost.find(res=>res.time==0)}>Choose Duration</option>
                                  <option value="15" disabled={state.editVariationCost.find(res=>res.time==15)}>15 min </option>
                                  <option value="30" disabled={state.editVariationCost.find(res=>res.time==30)}>30 min</option>
                                  <option value="45" disabled={state.editVariationCost.find(res=>res.time==45)}>45 min</option>
                                  <option value="60" disabled={state.editVariationCost.find(res=>res.time==60)}>1 hr</option>
                                  <option value="75" disabled={state.editVariationCost.find(res=>res.time==75)}>1 hr 15 min</option>
                                  <option value="90" disabled={state.editVariationCost.find(res=>res.time==90)}>1 hr 30 min</option>
                                  <option value="105" disabled={state.editVariationCost.find(res=>res.time==105)}>1 hr 45 min</option>
                                  <option value="120" disabled={state.editVariationCost.find(res=>res.time==120)}>2 hr 00 min</option>
                                </select>
                              </li>
                              <li><span className="minus-arrow">-</span></li>
                              <li>
                                <label for="service-name" className="form-label">Number Of Session</label>
                                <input type="number" className="form-control" name="editPackagesSessions" onChange={handleChangePackage} placeholder="" min="1" value={state.editPackagesSessions} />
                              </li>
                              <li><span className="minus-arrow">-</span></li>
                              <li> <label for="service-name" className="form-label">Cost</label>
                                <div className="input-left-icon">
                                  <input type="number" min='1' className="form-control" placeholder="" onChange={VariationCostChange} name="editVariationCostCost" value={state.editVariationCostCost} />
                                </div>
                              </li>
                              <li><button type="button" onClick={addVariationCost} className="btn gray-btn"><i className="lb lb-plush-icon"></i></button></li>
                            </ul>
                          </div>
                        </div>:''}
                        {state.editVariationCost?.length>0?
                        state.editVariationCost.map((res,i)=>
                        <div key={i} className="col-sm-12 col-md-12 col-lg-8 form-group">
                          <div className="add-input-bx">
                            <ul className="ul-row">
                              <li>
                                <label for="service-name" className="form-label">Duration</label>
                                <select className="bdr-radius-five" name="options" onChange={noneChange} value={res?.time} disabled={true}>
                                <option value="15">15 min </option>
                                  <option value="30" >30 min</option>
                                  <option value="45" >45 min</option>
                                  <option value="60" >1 hr</option>
                                  <option value="75" >1 hr 15 min</option>
                                  <option value="90" >1 hr 30 min</option>
                                  <option value="105" >1 hr 45 min</option>
                                  <option value="120" >2 hr 00 min</option>
                                </select>
                              </li>
                              <li><span className="minus-arrow">-</span></li>
                              <li>
                                <label for="service-name" className="form-label">Number Of Session</label>
                                <input type="number" className="form-control" name="editPackagesSessions" onChange={noneChange} placeholder="" value={res.sessions} disabled={true} />
                              </li>
                              <li><span className="minus-arrow">-</span></li>
                              <li> <label for="service-name" className="form-label">Cost</label>
                                <div className="input-left-icon">
                                  <input type="text" className="form-control" placeholder="" onChange={noneChange} value={res?.cost} disabled={true}/>
                                </div>
                              </li>
                              <li><button type="button" onClick={()=>removeVariationCost(i)} className="btn gray-btn "><i className="lb lb-delete-icon"></i></button></li>
                            </ul>
                          </div>
                        </div>):''}
                      </div>
                    </div> */}
                    {/* end cost Variations */}
                    <div className="add-service-box bdr-btm">
                      <div className="up-gray-heading">
                        <strong>Buffer time 
                        &nbsp;
                          <span 
                          className="q-mark-tt" 
                          data-toggle="tooltip" 
                          title="Specified buffer time will be added automatically after an appointment with this particular service, during which no user will be able to book an appointment with you."
                          ><img src={images.tooltipIcon} alt=""/></span></strong>
                      </div>
                      <div className="row">
                        <div className="col-sm-12 col-md-12 col-lg-6 form-group">
                          <select className="bdr-radius-five" name="bufferTime" onChange={handleChange} value={state.bufferTime}>
                            <option value="0">None</option>
                            <option value="15">15 Minutes</option>
                            <option value="30">30 Minutes</option>
                            <option value="45">45 Minutes</option>
                            <option value="60">01 Hour</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    {/* <div className="add-service-box bdr-btm">
                      <div className="up-gray-heading">
                        <strong>Extend Duration 
                          &nbsp;
                          <span className="q-mark-tt" data-toggle="tooltip" 
                        title="You can specify the cost and time for an appointment if the meeting needs to be extended in the meeting room."><img src={images.tooltipIcon} alt=""/></span></strong>
                      </div>
                      <div className="row">
                        <div className="col-sm-12 col-md-12 col-lg-6 form-group">
                          <div className="add-input-bx">
                            <ul className="ul-row">
                              <li>
                                <label for="service-name" className="form-label">Time</label>
                                <select className="bdr-radius-five" name="editExtendDurationTime" onChange={ExtendDurationChange} value={state.editExtendDurationTime} >
                                  <option value="30">30 Minutes</option>
                                  <option value="45">45 Minutes</option>
                                  <option value="60">01 Hour</option>
                                  <option value="90">01hr 30min</option>
                                </select>
                              </li>
                              <li><span className="minus-arrow">-</span></li>
                              <li> <label for="service-name" className="form-label">Cost</label>
                                <div className="input-left-icon dollar-input-icon">
                                  <input type="number" min='0' name="editExtendDurationCost" onChange={ExtendDurationChange} className="form-control" placeholder="$1" value={state.editExtendDurationCost} />
                                </div>
                              </li>
                              <li><button type="button" onClick={addExtendDuration} className="btn gray-btn"><i className="lb lb-plush-icon"></i></button></li>
                            </ul>
                          </div>
                        </div>
                        {state.editExtendDuration?.length>0?state.editExtendDuration.map((res,i)=>
                        <div key={i} className="col-sm-12 col-md-12 col-lg-6 form-group">
                          <div className="add-input-bx">
                            <ul className="ul-row">
                              <li>
                                <label for="service-name" className="form-label">Time</label>
                                <select className="bdr-radius-five" onChange={noneChange}  name="durationTime" value={res.time} disabled={true}>
                                  <option value="30">30 Minutes</option>
                                  <option value="45">45 Minutes</option>
                                  <option value="60">01 Hour</option>
                                  <option value="90">01hr 30min</option>
                                </select>
                              </li>
                              <li>
                                <span className="minus-arrow">-</span>
                              </li>
                              <li>
                                <label for="service-name" className="form-label">Cost</label>
                                <div className="input-left-icon dollar-input-icon">
                                  <input type="number" className="form-control" onChange={noneChange} placeholder="$5" value={res.cost} disabled={true}/>
                                </div>
                              </li>
                              <li>
                                <button type="button" onClick={()=>removeExtendDuration(i)} className="btn gray-btn"><i className="lb lb-delete-icon"></i></button>
                              </li>
                            </ul>
                          </div>
                        </div>):''}
                      </div>
                    </div> */}
                    <div className="add-service-box bdr-btm">
                      <div className="up-gray-heading">
                        <strong>Add package (Max 8)
                        &nbsp;
                        <span className="text-danger">*</span>
                        &nbsp;
                          <span 
                          className="q-mark-tt" 
                          data-toggle="tooltip" 
                          title="You can create packages for users to buy multiple sessions at one cost. The sessions would then keep getting deducted from the user's dashboard as they book further appointments with you." 
                          data-original-title="You can create packages for users to buy multiple sessions at one cost. The sessions would then keep getting deducted from the user's dashboard as they book further appointments with you.">
                            <img src={images.tooltipIcon} alt=""/></span>
                          </strong>
                      </div>
                      
                      <div className="row">
                      {state.editPackages?.length<8?
                        <div className="col-sm-12 col-md-12 col-lg-12 form-group">
                          <div className="add-input-bx">
                            <ul className="ul-row">
                              <li>
                                <label for="service-name" className="form-label">Number Of Session</label>
                                <input type="number" className="form-control" name="editPackagesSessions" min="1" onChange={handleChangePackage} placeholder="" value={state.editPackagesSessions} />
                              </li>
                              <li><span className="minus-arrow">-</span></li>

                              <li>
                              <label for="service-name" className="form-label">Duration </label>

                              <select className="bdr-radius-five" onChange={VariationCostChange} name="editPackagesDuration" value={state.editPackagesDuration}>
                                  <option value="0" selected={state.editPackages.find(res=>res.time==0)} disabled={state.editPackages.find(res=>res.time==0)}>Choose Duration</option>
                                  <option value="15" disabled={state.editPackages.find(res=>res.time==15)}>15 min </option>
                                  <option value="30" disabled={state.editPackages.find(res=>res.time==30)}>30 min</option>
                                  <option value="45" disabled={state.editPackages.find(res=>res.time==45)}>45 min</option>
                                  <option value="60" disabled={state.editPackages.find(res=>res.time==60)}>1 hr</option>
                                  <option value="75" disabled={state.editPackages.find(res=>res.time==75)}>1 hr 15 min</option>
                                  <option value="90" disabled={state.editPackages.find(res=>res.time==90)}>1 hr 30 min</option>
                                  <option value="105" disabled={state.editPackages.find(res=>res.time==105)}>1 hr 45 min</option>
                                  <option value="120" disabled={state.editPackages.find(res=>res.time==120)}>2 hr 00 min</option>
                                </select>
                              </li>
                              <li><span className="minus-arrow">-</span></li>
                              <li><label for="service-name" className="form-label">Cost</label>
                                <div className="input-left-icon dollar-input-icon">
                                  <input type="number"  className="form-control" min="1" name="editPackagesCost" onChange={handleChangePackage} placeholder="" value={state.editPackagesCost} />
                                </div>
                              </li>
                              <li><button type="button" onClick={()=>AddPackage()} className="btn gray-btn"><i className="lb lb-plush-icon"></i></button></li>
                            </ul>
                          </div>
                        </div>:""}
                        {state.editPackages?.length>0? state.editPackages.map((res,i)=>
                        <div key={res.id} className="col-sm-12 col-md-12 col-lg-12 form-group">
                          <div  className="add-input-bx">
                            <ul className="ul-row">
                              <li>
                                <label for="service-name" className="form-label">Number Of Session</label>
                                <input type="number" className="form-control" placeholder="" value={res?.sessions} disabled={true} />
                              </li>
                              <li><span className="minus-arrow">-</span></li>

                              <li>
                              <label for="service-name" className="form-label">Duration</label>
                              <select className="bdr-radius-five" onChange={VariationCostChange} disabled={true} name="editVariationCostTime" value={res.time}>
                                  <option value="15" disabled={true}>15 min </option>
                                  <option value="30" disabled={true}>30 min</option>
                                  <option value="45" disabled={true}>45 min</option>
                                  <option value="60" disabled={true}>1 hr</option>
                                  <option value="75" disabled={true}>1 hr 15 min</option>
                                  <option value="90" disabled={true}>1 hr 30 min</option>
                                  <option value="105" disabled={true}>1 hr 45 min</option>
                                  <option value="120" disabled={true}>2 hr 00 min</option>
                                </select>
                              </li>
                              <li><span className="minus-arrow">-</span></li>
                              <li><label for="service-name" className="form-label">Cost</label>
                                <div className="input-left-icon dollar-input-icon">
                                  <input type="number" className="form-control" placeholder="" value={res?.cost} disabled={true} />
                                </div>
                              </li>
                              <li>
                                <button type="button" onClick={()=>removePackage(res.id)}  className="btn gray-btn"><i className="lb lb-delete-icon"></i></button>
                              </li>
                            </ul>
                          </div>
                        </div>):''}

                      </div>
                    </div>
                    <div className="add-service-box">
                      <div className="payment-card-add">
                        <div className="cmn-new-toggle">
                          {/* <button type="button" className="btn bdr-btn" onClick={() => showHideDiv('add-form')} disabled={true}> Add Form ?</button> */}
                          <AddServiceQuestion />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <div className="text-center">
                          <button className="btn solid-btn">Save</button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section >
    </>
  );
}
export default UpdateService;