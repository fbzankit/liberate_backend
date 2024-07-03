import React,{ useContext, useState } from 'react';
import images from '../../../Utility/Images';
import AuthUserContext from '../../../AuthUser/AuthUserContext';
import { APIService } from '../../../ApiServices/Apis/APIServices';

const ConnectStripe = () => {
  const  authUser=useContext(AuthUserContext);

  const Connect=()=>{
    APIService.stripeConnect({page:0}).then((res)=>{
        if(res.data.status==200){
            window.open(res.data.data,"_blank");
        }
    }).catch((error)=>{

    })
  }
  return (
        <>
            <div className="bank-details-content">
                <div className="a-c-added-sec">
                <div class="bdr-heading"><h2>Your Banks List</h2></div>
                    <div className="cmn-table-sec">
                        <table className="rwd-table">
                            <tbody>
                                 <tr>
                                        <td >
                                            <div className="cricle-pic-name">
                                                <figure><img src={images.bankIcon} /></figure><span>Please Connect with stripe to verifying bank details </span>
                                            </div>
                                        </td>
                                        
                                        <td>
                                            <div className="table-verfiy-bx">
                                                
                                                    {authUser?.strip_verified?<button className="btn" type="button" disabled={true}  > Successfully Connected</button>:authUser?.strip_account&&authUser?.strip_verified==null?<button className="btn" type="button" onClick={Connect} >Click to Verify</button>:<button className="btn" type="button" onClick={Connect}  > Connect</button>}
                                                
                                            </div>
                                        </td>
                                        <td>
                                            {/* <div className="table-verfiy-bx">
  {authUser?.strip_verified?'':<span className={`verfiy-status unverified`}>Verification Pending</span>}
                                            </div> */}
                                        </td>
                                        {/* <td className="text-right">
                                            <button type="button" 
                                            // onClick={() => DeleteBank(res.id)}
                                            // onClick={()=>dispatch({type:'deleteId',payload:{Type:'deleteId',deleteId:res.id}})}
                                             data-toggle="modal"  data-target="#delete-service-popup" className="btn-link"><i className="lb lb-delete-icon"></i></button>
                                        </td> */}
                                    </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            
        </>
    );
}
export default ConnectStripe;