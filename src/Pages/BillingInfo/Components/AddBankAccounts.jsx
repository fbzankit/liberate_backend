import React, { useContext } from 'react';
import { showHideDiv } from '../../../Utility/Utility';
import images from '../../../Utility/Images';
import Context from '../../Home/Context/Context';

const AddBankAccounts = ({ addBank, DeleteBank, verifiedBank,makeDefault }) => {
    const [state, dispatch] = useContext(Context)
    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        dispatch({ type: name, payload: { Type: name, [name]: value } });
    }

    return (
        <>
            <div className="bank-details-content">
                <div className="a-c-added-sec">
                <div class="bdr-heading"><h2>Your Banks List</h2></div>
                    <div className="cmn-table-sec">
                        <table className="rwd-table">
                            <tbody>
                                {state.bankAccountList?.length > 0 ?
                                    state.bankAccountList.map((res, i) => <tr>
                                        <td key={i}>
                                            <div className="cricle-pic-name">
                                                <figure><img src={images.bankIcon} /></figure><span>{res.bank_name}</span>
                                            </div>
                                        </td>
                                        {res.status==="verified"?
                                        <td>
                                            <div className="table-verfiy-bx">
                                                {res.is_default==0
                                                    ?<button className="btn" type="button" onClick={()=>makeDefault(res.id)} > Make Primary</button>
                                                    :<button className="btn" type="button" disabled={true}>Primary</button>
                                                }
                                            </div>
                                        </td>:''}
                                        <td>
                                            XXXXXXXXXX{res.last4}
                                        </td>
                                        {/* <td>
                                            <div className="table-verfiy-bx">
                                                <span className={`verfiy-status ${res.status==="verified"?"verfiyed":"unverified"}`}>{res.status}</span> 
                                                {res.status==="verified"?'':
                                                <button className="btn" type="button" onClick={()=>dispatch({type:'verifyId',payload:{Type:'verifyId',verifyId:res.id}})}  data-toggle="modal" data-target="#verify-bank-account-popup"> verfiy</button>
                                                }
                                            </div>
                                        </td> */}
                                        <td className="text-right">
                                            <button type="button" 
                                            // onClick={() => DeleteBank(res.id)}
                                            onClick={()=>dispatch({type:'deleteId',payload:{Type:'deleteId',deleteId:res.id}})}
                                             data-toggle="modal"  data-target="#delete-service-popup" className="btn-link"><i className="lb lb-delete-icon"></i></button>
                                        </td>
                                    </tr>) : ''}
                            </tbody>
                        </table>
                    </div>
                    <div className="new-card-add-bx">
                        <div className="cmn-new-toggle">
                       {state.bankAccountList?.length > 0 ?<button type="button" className="btn" onClick={() => showHideDiv('b-d-add-card')}> <i className="lb lb-plush-icon"></i> Add Bank</button>:''}
                            <div id="b-d-add-card" className="add-card-form" style={{ display:state.bankAccountList?.length > 0?'none':'block'}}>
                                <form onSubmit={addBank}>
                                    <div className="row name_payment_section">

                                        {/* <div className="col-sm-6">
                                            <div className="form-group">
                                                <label className="form-label" for="firstName">Choose Country</label>
                                                <select className="bdr-radius-five" name="country" onChange={handleChange} value="US" disabled={true}>
                                                    <option value="-Select-">-Select-</option>
                                                    <option value="IN">India</option>
                                                    <option value="US" selected={true}>US</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label className="form-label" for="firstName">Account Holder Type</label>
                                                <select className="bdr-radius-five" name="accountHolderType" onChange={handleChange} value={state?.accountHolderType} >
                                                    <option value="individual">Individual</option>
                                                    <option value="company">Company</option>
                                                </select>
                                            </div>
                                        </div> */}
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label className="form-label" for="firstName">Bank Account Holder Name</label>
                                                <input type="text" className="form-control" id="firstName" name="accountHolderName" onChange={handleChange} value={state?.accountHolderName} placeholder="Enter Here" required={true} />
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label className="form-label" for="CardNumber">Routing Number</label>
                                                <input type="text" className="form-control" id="CardNumber" placeholder="00000000009" name="routingNumber" onChange={handleChange} value={state?.routingNumber} />
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label className="form-label" for="CardNumber">Account Number</label>
                                                <input type="text" className="form-control" id="CardNumber" placeholder="100000000010009" name="accountNumber" onChange={handleChange} value={state?.accountNumber} />
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label className="form-label" for="CardNumber">Re-Enter Account Number</label>
                                                <input type="text" className="form-control" id="CardNumber" placeholder="100000000010009" name="conformAccountNumber" onChange={handleChange} value={state?.conformAccountNumber} />
                                            </div>
                                        </div>

                                        <div className="col-sm-12">
                                            <div className="form-group">
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
            
        </>
    );
}

export default AddBankAccounts;