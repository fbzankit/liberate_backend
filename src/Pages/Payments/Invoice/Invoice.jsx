import React, { useEffect, useContext, useReducer } from 'react';

import '../../../assets/css/bootstrap.min.css'
import '../../../assets/css/app-invoice-print.css'

import images from '../../../Utility/Images';
import { useParams } from 'react-router';
import { APIService } from '../../../ApiServices/Apis/APIServices';
import moment from 'moment';
import AuthUserContext from '../../../AuthUser/AuthUserContext';
import Context from '../../Home/Context/Context';
import Reducer from '../../../Utility/Reducer';
const initialState={
    paymentInvoiceDetail:''
}
const Invoice = () => {
   const {id} =useParams();
   const authUser=useContext(AuthUserContext);
   const [state, dispatch]=useReducer(Reducer,initialState)
   useEffect(() => {
    getPaymentDetailForInvoice(id)
   }, [id])
   const getPaymentDetailForInvoice =(payment_id)=>{
     APIService.getPaymentDetailForInvoice({payment_id}).then((res)=>{
        if(res.data.status==200){
            dispatch({type:'paymentInvoiceDetail',payload:{Type:'paymentInvoiceDetail',paymentInvoiceDetail:res.data.data}});
        }else{

        }
     }).catch((error)=>{

     })
   }
   console.log(state,authUser);
    return (
        <>
        <div className="app-content content ">
        <div className="content-overlay"></div>
        <div className="header-navbar-shadow"></div>
        <div className="content-wrapper">
            <div className="content-header row">
            </div>
            <div className="content-body">
                <div className="invoice-print">
                    <div className="d-flex justify-content-between flex-md-row flex-column pb-2">
                        <div>
                            <div className="d-flex mb-1">
                                <span className="brand-logo">
                            <img className="round" src={images.logo} alt="Liberate" height="40" width="40"/>
							</span>
                            <h3 className="text-primary invoice-logo">Liberate</h3>
                            </div>
                            <p className="mb-25">Office 149, 450 South Brand Brooklyn</p>
                            <p className="mb-25">San Diego County, CA 91905, USA</p>
                            <p className="mb-0">+1 (123) 456 7891, +44 (876) 543 2198</p>
                        </div>
                        <div className="mt-md-0 mt-2">
						   <div className="print-btn-outer"> <button className="btn print-btn" onClick={()=>window.print()}><img src={images.printer_icon} alt=""/> Print</button></div>
                            <h4 className="fw-bold text-end mb-1">INVOICE #Lib-{id}</h4>
                            <div className="invoice-date-wrapper mb-50">
                                <span className="invoice-date-title">Date Issued:</span>
                                <span className="fw-bold"> {moment(state?.paymentInvoiceDetail?.createdAt).format('D MMM, YYYY')}</span>
                            </div>                          
                        </div>
                    </div>

                    <hr className="my-2" />

                    <div className="row pb-2">
                        <div className="col-sm-12">
                            <h6 className="mb-1">Invoice to:</h6>
                            <p className="mb-25">{state?.paymentInvoiceDetail?.user?.name}</p>
                            <p className="mb-25">{state?.paymentInvoiceDetail?.user?.phone}</p>
                            <p className="mb-0">{state?.paymentInvoiceDetail?.user?.email}</p>
                        </div>                       
                    </div>

                    <div className="table-responsive mt-2">
                        <table className="table m-0">
                            <thead>
                                <tr>
                                    <th className="py-1 ps-4">Task description</th>
                                    <th className="py-1">Cost</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-bottom">
                                    <td className="py-1 ps-4">
                                        <p className="fw-semibold mb-25">{state?.paymentInvoiceDetail?.type}</p>                                        
                                    </td>                                    
                                    <td className="py-1">
                                        <strong>${state?.paymentInvoiceDetail?.amount}</strong>
                                    </td>
                                </tr>                               
                            </tbody>
                        </table>
                    </div>

                    <div className="row invoice-sales-total-wrapper mt-3">
                        <div className="col-md-6 order-md-1 order-2 mt-md-0 mt-3">
                            <p className="card-text mb-0"><span className="fw-bold">Transaction Id: </span> <span className="ms-75">{state?.paymentInvoiceDetail?.stripe_id}</span></p>
                        </div>
                        <div className="col-md-6 d-flex justify-content-end order-md-2 order-1">
                            <div className="invoice-total-wrapper">  
                                <div className="invoice-total-item">
                                    <p className="invoice-total-title">Total:</p>
                                    <p className="invoice-total-amount">${state?.paymentInvoiceDetail?.amount}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr className="my-2" />
                    <div className="row">
                        <div className="col-12">
                            <span className="fw-bold">Note:</span>
                            <span>It was a pleasure working with you and your team. We hope you will keep us in mind for future freelance
                                projects. Thank You!</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
        </>
        );
}
export default Invoice;