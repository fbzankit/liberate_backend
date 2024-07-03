import React, { useEffect, useReducer } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SideBar from '../SideBar/DashboardSideBar';
import images from '../../Utility/Images';
import { showHideDiv } from '../../Utility/Utility';
import Reducer from '../../Utility/Reducer';
import { APIService } from '../../ApiServices/Apis/APIServices';
import AddCards from './Components/AddCards';
import { toast, ToastContainer } from 'react-toastify';
import AddBankAccounts from './Components/AddBankAccounts';
import Context from '../Home/Context/Context';
import DeleteConfirmationModal from '../../Common/DeleteConfirmationModal';
import $ from 'jquery';
import BankVerify from './Components/Modals/BankVerify';
import { useContext } from 'react';
import AuthUserContext from '../../AuthUser/AuthUserContext';
import ConnectStripe from './Components/ConnectStripe';
import NoDataFound from '../../Common/NoDataFound';

const initialState = {
    saveCardsList: [],
    accountHolderName:'',
    accountNumber:'',
    conformAccountNumber:'',
    routingNumber:'',
    country:'US',
    deleteId:'',
    verifyId:'',
    accountHolderType:'individual',
    bankAccountList: [],
    deleteDisable: false,
}

const BillingInfo = () => {
    const [state, dispatch] = useReducer(Reducer, initialState)
    const authUser=useContext(AuthUserContext)
    useEffect(() => {
        saveCardsLists();
        bankAccountLists()
    }, [])
    const addBankAccount=(e)=>{
        e.preventDefault();
        if(addBankValidation()){
            let data = {
            account_holder_name:state.accountHolderName,
            account_holder_type:state.accountHolderType,
            routing_number:state.routingNumber,
            account_number:state.accountNumber,
        }
        APIService.addBankAccount(data).then((res) => {
            if (res.data.status == 200) {
                dispatch({type:"response",payload:{Type:'response',
                    accountHolderName:'',
                    accountNumber:'',
                    conformAccountNumber:'',
                    routingNumber:'',
                    country:'US',
                    accountHolderType:'individual',
                }})
                document.getElementById('b-d-add-card').style.display='none'
                bankAccountLists();
            }else{
                toast.error(res.data.message)
            }
        }).catch((error)=>{
            toast.error(error.response.data.message);
        })
    }
}
   const addBankValidation=()=>{
        let condition=true
        if(state.accountNumber!=state.conformAccountNumber){
            condition=false;
            toast.error('Account number not match...');
        }
        return condition;
    }
    const setDefaultBankAccount=(id)=>{
        let data = {
            stripe_bank_id:id,
        }
        APIService.setDefaultBankAccount(data).then((res) => {
            if (res.data.status == 200) {
                bankAccountLists();
                dispatch({type:"response",payload:{
                    Type:'response',
                    accountHolderName:'',
                    accountNumber:'',
                    conformAccountNumber:'',
                    routingNumber:'',
                    country:'US',
                    accountHolderType:'individual',
                }})
                toast.success(res.data.message);

            }else{
                toast.error(res.data.message)

            }
        }).catch((error)=>{
            toast.error(error.response.data.message);
        })
    }
    const deleteBankAccount=(id)=>{
        let data = {
            stripe_bank_id:id,
        }
        APIService.deleteBankAccount(data).then((res) => {
            console.log(res);
            if (res.data.status == 200) {
                bankAccountLists();
                dispatch({type:"response",payload:{Type:'response',
                    accountHolderName:'',
                    accountNumber:'',
                    conformAccountNumber:'',
                    routingNumber:'',
                    country:'US',
                    accountHolderType:'individual',
                }})
                toast.success(res.data.message);
                $('#delete-service-popup').modal('hide');
            }else{
                toast.error(res.data.message)
                $('#delete-service-popup').modal('hide');
            }
        }).catch((error)=>{
            toast.error(error.response.data.message);
            $('#delete-service-popup').modal('hide');
        })
    }
    const verifyBank=(id)=>{ 
        if(state.verifyId){
        let data = {
            stripe_bank_id:id,
        }
        APIService.verifyBankAccount(data).then((res) => {
            if (res.data.status == 200) {
                bankAccountLists();
                dispatch({type:"response",payload:{Type:'response',
                    accountHolderName:'',
                    accountNumber:'',
                    deleteId:'',
                    verifyId:'',
                    conformAccountNumber:'',
                    routingNumber:'',
                    country:'US',
                    accountHolderType:'individual',
                }})
                toast.success(res.data.message)
                $('#verify-bank-account-popup').modal('hide');
            }else{
                $('#verify-bank-account-popup').modal('hide');

                toast.error(res.data.message)
            }
        }).catch((error)=>{
            $('#verify-bank-account-popup').modal('hide');
        })
    }else{
            toast.error('click to verify')
            $('#verify-bank-account-popup').modal('hide');

        }
    }
    const bankAccountLists=()=>{
        let data = {}
        APIService.getBankAccounts(data).then((res) => {
            if (res.data.status == 200) {
                dispatch({ type: 'bankAccountList', payload: { Type: 'bankAccountList', bankAccountList: res.data?.data == undefined ? [] : res.data?.data } })
            }else{
                toast.error(res.data.message)
            }
        })
    }

    const saveCardsLists = () => {
        let data = {}
        APIService.stripCardList(data).then((res) => {
            if (res.data.status == 200) {
                showHideDiv('add-card')
                dispatch({ type: 'saveCardsList', payload: { Type: 'saveCardsList', saveCardsList: res.data?.data?.data == undefined ? [] : res.data?.data?.data } })
            }else{
                toast.error(res.data.message)
            }
        })
    }
    const deleteCards = (id) => {
        dispatch({ type: "deleteDisable", payload: { Type: 'deleteDisable', deleteDisable: true } })
        let data = {
            paymentMethod_id: id
        }
        APIService.detachCard(data).then((res) => {
            if (res.data.status == 200) {
                saveCardsLists()
                dispatch({ type: "deleteDisable", payload: { Type: 'deleteDisable', deleteDisable: false } })
                toast.success(res.data.message)
            } else {
                dispatch({ type: "deleteDisable", payload: { Type: 'deleteDisable', deleteDisable: false } })
                toast.error(res.data.message)
            }
        }).catch((error) => {
            dispatch({ type: "deleteDisable", payload: { Type: 'deleteDisable', deleteDisable: false } })
        })
    }
    console.log(state);
    return (
        <>
        <Context.Provider value={[state,dispatch]}>
            <Header />
            <main>
                <section className="account-settings-area">
                    <div className="container">
                        <div className="p-sec-heading">
                            <div className="row">
                                <div className="col-12">
                                    <div className="section-title">
                                        <h2>Bllling Info</h2>
                                        <p>Update your billing info to make/receive payments.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="account-settings-content">
                            <SideBar />
                            <div className="rit-as-sec">

                                <div className="basic-info-bx">

                                    <div className="billing-info-content">
                                        <div className="default-tabing">
                                            <div className="default-tabs-list">
                                                <ul className="nav nav-pills">
                                                    <li className="nav-item">
                                                        <a className="nav-link active" data-toggle="pill" href="#sent-review">Card Detail</a>
                                                    </li>
                                                    {authUser?.is_parctitioner==='1'?<li className="nav-item">
                                                        <a className="nav-link" data-toggle="pill" href="#received-review">Bank Details</a>
                                                    </li>:''}
                                                    {/* <li className="nav-item">
                                                        <a className="nav-link" data-toggle="pill" href="#reviews"><img src={images.paypal_logo_icon} alt="" /> </a>
                                                    </li> */}
                                                </ul>
                                            </div>
                                            <div className="tab-content">
                                                <div className="tab-pane active" id="sent-review">
                                                    <div className="sent-review-content">
                                                        <div className="cmn-form">
                                                            {state.saveCardsList?.length > 0 ? <div className="saved-card-list">

                                                                <div className="all-noti-panel">
                                                                    <div className="bdr-heading">
                                                                        <h2>Your Saved Card{state.saveCardsList?.length<=1?'':'s'}</h2>
                                                                        
                                                                    </div>
                                                                    <div className="cmn-table-sec">
                                                                        <table className="rwd-table">
                                                                            <tbody>
                                                                                {state.saveCardsList.map((res, i) =>
                                                                                    <tr key={i}>
                                                                                        <td>
                                                                                            <div className="cricle-pic-name">
                                                                                                <figure><img src={images.bank_card_img} /></figure>
                                                                                                <span>{res?.card?.brand}</span>
                                                                                            </div>
                                                                                        </td>
                                                                                        <td>
                                                                                            * * * * * * * * {res?.card.last4}
                                                                                        </td>
                                                                                        <td className="text-right">
                                                                                            <button className="btn-link" type="button" onClick={() => deleteCards(res?.id)} disable={state.deleteDisable}><i className="lb lb-delete-icon"></i></button>
                                                                                        </td>
                                                                                    </tr>)}

                                                                            </tbody>
                                                                        </table>
                                                                    </div>

                                                                </div>
                                                            </div> :''}

                                                            <div className="payment-card-add">
                                                                <div className="cmn-new-toggle">
                                                                    <button type="button" className="btn bdr-btn" onClick={() => showHideDiv('add-card')}> <i className="lb lb-plush-icon"></i> Add Card</button>
                                                                    <div id="add-card" className="add-card-form" style={state.saveCardsList?.length == 0 ? { display: 'block' } : { display: 'none' }}>
                                                                        <AddCards response={saveCardsLists} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="tab-pane fade" id="received-review">
                                                  {authUser?.strip_account&&authUser?.strip_verified? <AddBankAccounts addBank={addBankAccount} DeleteBank={deleteBankAccount} makeDefault={setDefaultBankAccount} verifiedBank={verifyBank}/>:<ConnectStripe/>}
                                                </div>
                                                {/* <div className="tab-pane fade" id="reviews">
                                                    <div className="recive-review-content">dfsdfds</div>
                                                </div> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <DeleteConfirmationModal
             title="Do you want to delete this bank account?"
             deleteItem={deleteBankAccount}
             />
             <BankVerify
                verifyBank={verifyBank}
             />
            <Footer />
            </Context.Provider>
        </>
    );
}

export default BillingInfo;