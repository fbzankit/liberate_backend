import React, { useReducer, useEffect, useContext } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SideBar from '../SideBar/DashboardSideBar';
import FilterModals from './Modals/FilterModals';
import Reducer from '../../Utility/Reducer';
import { APIService } from '../../ApiServices/Apis/APIServices';
import { toast } from 'react-toastify';
import AuthUserContext from '../../AuthUser/AuthUserContext';
import moment from 'moment';
import NoDataFound from '../../Common/NoDataFound';
import images from '../../Utility/Images';
import GlobalContext from '../../Global/GlobalContext';
import { Link } from 'react-router-dom';
import { ModalPreloader } from '../../Common/ModalComponents/ModalComponents';
import Invoice from './Invoice/Invoice';
import Context from '../Home/Context/Context';
import TablePreloader from '../../Common/TablePreloader';
const initialState = {
    allPaymentsList: [],
    paymentInvoiceDetail:'',
    query:'',
    page: 0,
    loadMore: true,
    response: false,
}

const status = {
    Pending: " status-btn red-status" ,
    Released: " status-btn grey-status" ,
    Default:" status-btn blue-status" ,
    Completed: " status-btn green-status" 
}
const Payments = () => {
    const [state, dispatch] = useReducer(Reducer, initialState)
    const [globalState, globalDispatch] = useContext(GlobalContext)
    const authUser = useContext(AuthUserContext);
     
    useEffect(() => {
        getUserPayments();
    }, [])

    const getUserPaymentsSearch = () => {
        let data = {
            query:state.query
        }
        APIService.getUserPayments(data).then((res) => {
            if (res.data.status == 200) {
                if (res.data.data) {
                    dispatch({ type: 'getUserPayments', payload: { Type: 'getUserPayments', allPaymentsList: res.data.data, response: true } })
                } else {
                    dispatch({ type: 'getUserPayments', payload: { Type: 'getUserPayments', loadMore: false, allPaymentsList: [], response: true } })
                }
                // toast.success(res.data.message);
            } else {
                dispatch({ type: 'getUserPayments', payload: { Type: 'getUserPayments', response: true } })

                toast.error(res.data.message);
            }
        }).catch((error) => {
            dispatch({ type: 'getUserPayments', payload: { Type: 'getUserPayments', response: true } })
            if (error.response.data.status == 401) {
                localStorage.clear();
                sessionStorage.clear();
                toast.error('Please login first');
            } else {
                toast.error(error?.response?.data?.message);
            }
        })
    }
    const getUserPayments = () => {
        let data = {
            page: state.page,
            query:state.query
        }
        APIService.getUserPayments(data).then((res) => {
            if (res.data.status == 200) {
                if (res.data.data) {
                    dispatch({ type: 'getUserPayments', payload: { Type: 'getUserPayments', allPaymentsList: res.data.data, response: true } })
                } else {
                    dispatch({ type: 'getUserPayments', payload: { Type: 'getUserPayments', loadMore: false, allPaymentsList: [], response: true } })
                }
                // toast.success(res.data.message);
            } else {
                dispatch({ type: 'getUserPayments', payload: { Type: 'getUserPayments', response: true } })

                toast.error(res.data.message);
            }
        }).catch((error) => {
            dispatch({ type: 'getUserPayments', payload: { Type: 'getUserPayments', response: true } })
            if (error.response.data.status == 401) {
                localStorage.clear();
                sessionStorage.clear();
                toast.error('Please login first');
            } else {
                toast.error(error?.response?.data?.message);
            }
        })
    }
    const loadMore = () => {
        let data = {
            page: state.page
        }
        APIService.getUserPayments(data).then((res) => {
            if (res.data.status == 200) {
                if (res.data.data) {
                    dispatch({ type: 'getUserPayments', payload: { Type: 'getUserPayments', page: state.page + 1, allPaymentsList: [...state.allPaymentsList, ...res.data.data] } })
                } else {
                    dispatch({ type: 'getUserPayments', payload: { Type: 'getUserPayments', loadMore: false } })
                }
                // toast.success(res.data.message);
            } else {
                toast.error(res.data.message);
            }
        }).catch((error) => {
            if (error.response.data.status == 401) {
                localStorage.clear();
                sessionStorage.clear();
                toast.error('Please login first');
            } else {
                toast.error(error?.response?.data?.message);
            }
        })
    }

    const handleSearch=(e)=>{
        dispatch({type:'query',payload:{Type:'query',query:e.target.value}})
            if(e.target.value==null||e.target.value=='')
            setTimeout(() => {
                getUserPaymentsSearch();         
            }, 2000);
            
        }
    const onChangeStatus=(e)=>{
        getUserPaymentsSearch();
        dispatch({type:'query',payload:{Type:'query',query:e.target.value}})
        
    }

    console.log(state);
    return (
        <>
            <Header />
            <main>
                <section className="account-settings-area">
                    <div className="container">
                        <div className="p-sec-heading">
                            <div className="row">
                                <div className="col-12">
                                    <div className="section-title">
                                        <h2>Payments</h2>
                                        <p>View your payments and download invoice.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="account-settings-content">
                            <SideBar />
                            <div className="rit-as-sec p-30">
                                <div className="all-payments-panel">
                                    <div className="payment-status-sec">
                                        <ul className="cmn-ul-list">
                                            <li>
                                                <div className="pay-status-bx total-received">
                                                    <div className="pay-s-rit-text">
                                                        <strong>540</strong>
                                                        <span>Total Received</span>
                                                    </div>
                                                    <div className="pay-s-lft-img"><i className="lb lb-received-icon"></i></div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="pay-status-bx total-sent">
                                                    <div className="pay-s-rit-text">
                                                        <strong>845</strong>
                                                        <span>Total Sent</span>
                                                    </div>
                                                    <div className="pay-s-lft-img"><i className="lb lb-sent-1-icon"></i></div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="pay-status-bx total-awaiting">
                                                    <div className="pay-s-rit-text">
                                                        <strong>895</strong>
                                                        <span>Total Awaiting</span>
                                                    </div>
                                                    <div className="pay-s-lft-img"><i className="lb lb-awaiting-icon"></i></div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="pay-status-bx total-withdraw">
                                                    <div className="pay-s-rit-text">
                                                        <strong>900</strong>
                                                        <span>Total Withdraw</span>
                                                    </div>
                                                    <div className="pay-s-lft-img"><i className="lb lb-withdraw-icon"></i></div>
                                                </div>
                                            </li>

                                        </ul>
                                    </div>
                                    <div className="bdr-heading filter-select-search-bx">
                                        <ul className="ul-list">
                                            <li><div className="search-form">
                                                <form action="#">
                                                    <div className="select-search">
                                                        <select name='options' onChange={onChangeStatus}>
                                                            <option value='' selected={true}>All</option>
                                                            <option value='Received'>Received</option>
                                                            <option value='Sent'>Sent</option>
                                                            <option value='Awaiting'>Awaiting</option>
                                                            <option value='Withdraw'>Withdraw</option>
                                                        </select>
                                                    </div>
                                                    <div className="top-search-bar">
                                                        <input type="email" placeholder="Search..."  onChange={handleSearch} value={state.query}/>
                                                        <button className="btn-link" type="button" onClick={()=>getUserPaymentsSearch()} disabled={state.query?false:true}><i className="lb lb-search-icon"></i></button>
                                                    </div>
                                                </form>
                                            </div>
                                            </li>
                                            <li>
                                                <a className="filter-btn" href="#payment-filter-modal" data-toggle="modal"><i className="lb lb-filter-icon"></i></a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="cmn-table-sec">
                                        <table className="rwd-table">
                                            <tbody>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Date & Time</th>
                                                    <th>Amount</th>
                                                    {/* <th>Transactions</th> */}
                                                    <th>Status</th>
                                                    <th>Invoice</th>
                                                </tr>
                                                {state.allPaymentsList?.length > 0 ?

                                                    state.allPaymentsList.map((res, i) =>
                                                        <tr key={i}>
                                                            <td data-th="Name" className="payment-usr-name">
                                                                <div className="payment-sent-rec-bx">
                                                                    <span className="received-sent-icon">
                                                                        {res.from == authUser?.id
                                                                            ?
                                                                            <i className="lb lb-sent-1-icon text-danger"></i>
                                                                            : res.to == authUser?.id
                                                                                ? <i className="lb lb-receive-icon text-success"></i>
                                                                                : ''}
                                                                    </span>
                                                                    <span className="r-s-text"><Link to={`/profile/${res?.user?.id}`}>{res?.user?.name}</Link></span>
                                                                </div>
                                                            </td>
                                                            <td data-th="Date & Time">
                                                                {moment.utc(res.createdAt).local().format('D MMM YYYY  H:m A')}
                                                            </td>
                                                            <td data-th="Amount">
                                                                ${res.amount}
                                                            </td>
                                                            
                                                            <td data-th="Status">
                                                                <button className={`btn ${status[res?.status]}`}>{res?.status}</button>
                                                            </td>
                                                            <td data-th="Transactions" className="transactions-td">
                                                                        
                                                                        <Link className={`btn default-btn`} to={`/payments/invoice/${res?.id}`}><i className="lb lb-billinginfo-icon"></i></Link>
                                                            </td>
                                                        </tr>
                                                    ) : ''
                                                }

                                            </tbody>
                                        </table>
                                    </div>
                                    {state.allPaymentsList?.length > 0 ? state.loadMore ? <div className="row">
                                        <div className="col-12">
                                            <div className="load-more-btn text-center"> <a href="#" className="btn" onClick={loadMore}><i className="lb lb-refresh-icon"></i> Load More</a> </div>
                                        </div>
                                    </div> : '' : state.response ? <NoDataFound
                                        image={images.no_webinars_right_now_img}
                                        title={'No Payments Right Now!'}
                                        description={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem."}
                                        buttonTitle="Go Back to Home"
                                        buttonPath="/home"
                                    /> : <TablePreloader/>                                          
                                        }
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <FilterModals />
            <Footer />
        </>
    );
}


export default Payments;