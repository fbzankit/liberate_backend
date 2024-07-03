import React, { useContext } from 'react';
import SideBar from '../SideBar/DashboardSideBar';
import ServicesContext from './ServicesContext/ServicesContext';
import ReadMoreReact from 'read-more-react';
const status = {
    Pending: " status-btn red-status",
    Released: " status-btn grey-status",
    Setup: " status-btn blue-status",
    Active: " status-btn green-status"
}
const ServiceLists = () => {
    const [state, dispatch] = useContext(ServicesContext)
    

    return (
        <>
            <main>
                <section className="account-settings-area">
                    <div className="container">
                        <div className="p-sec-heading">
                            <div className="row">
                                <div className="col-12">
                                    <div className="section-title">
                                        <h2>Service(s)</h2>
                                        <p>View/Add/Edit services to offer to users.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="account-settings-content">
                            <SideBar />
                            <div className="rit-as-sec p-30">
                                <div className="filter-select-search-bx service-list">
                                    <div className="bdr-heading">
                                        <div className="row">
                                            <div className="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-8">
                                                <div className="search-form float-left">
                                                    <form action="#">
                                                        <div className="top-f-btn"></div>
                                                        <div className="top-search-bar">
                                                            <input type="email" placeholder="Search..." />
                                                            <button className="btn-link"><i className="lb lb-search-icon"></i></button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4">
                                                <div className="float-right">
                                                    <button type="button" onClick={() => dispatch({ type: 'addService', payload: { Type: 'addService', currentAction: 'addService' } })} className="btn"><i className="lb lb-plush-icon"></i> Add Service</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="cmn-table-sec">
                                        <table className="rwd-table">
                                            <thead>
                                                <tr>
                                                    <th>Service Name</th>
                                                    <th>Category</th>
                                                    <th>Description</th>
                                                    <th>Status</th>
                                                    <th className="text-right">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {state.serviceLists.map((res, i) =>
                                                    <tr key={res.id}>
                                                        <td className="t-service" data-th="Service">
                                                            <div className="cricle-pic-name">
                                                                <span>{res.service?.name}</span>
                                                            </div>
                                                        </td>
                                                        <td className="t-cost" data-th="Category"> {res.category?.name}</td>
                                                        <td className="t-description" data-th="Description">
                                                            <span className="more" >
                                                                <ReadMoreReact
                                                                    min={50}
                                                                    max={5000}
                                                                    text={res.description}
                                                                    readMoreText={<a href={void (0)} className="morelink" style={{ cursor: 'pointer' }}>Read more</a>}
                                                                />
                                                            </span>
                                                        </td>

                                                        <td className="t-cost" data-th="Status">
                                                            <button className={`btn ${status[res?.is_approved === "0" ? 'Pending' : res?.is_approved === "1" && res?.package ? 'Active' : 'Setup']}`}>{res?.is_approved === "0" ? 'Pending' : res?.is_approved === "1" && res?.package ? 'Active' : 'Setup'}</button>

                                                        </td>

                                                        <td className="t-action" data-th="Action">
                                                            <div className="l-g-bx dot-dd-bx">
                                                            
                                                                <div className="dropdown dd-right-side my-account-dd">
                                                                {res?.is_approved === "0" ? '' :
                                                                    <>
                                                                    <a className="link-btn dropdown-toggle" href="#" role="button" id="my-account-dd" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="lb lb-horizontal-more-icon"></i></a>
                                                                    
                                                                     <div className="dropdown-menu" aria-labelledby="my-account-dd">
                                                                        <div className="side-nav-bx">
                                                                            <ul>
                                                                                <li><a href={void (0)} onClick={() => dispatch({ type: 'editService', payload: { Type: "editService", editServiceId: res.id, currentAction: 'editService' } })} style={{ cursor: 'pointer' }}><i className="lb lb-edit-icon"></i> Edit</a></li>
                                                                                <li><a href={void (0)} data-toggle="modal" data-target="#delete-service-popup" style={{ cursor: 'pointer' }}><i className="lb lb-delete-icon"></i> Disable</a></li>
                                                                                <li><a href={void (0)} data-toggle="modal" data-target="#delete-service-popup" style={{ cursor: 'pointer' }}><i className="lb lb-delete-icon"></i> Delete</a></li>
                                                                            </ul>
                                                                        </div>
                                                                    </div></>}
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )}

                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="load-more-btn text-center">
                                                <button href="#" onClick={() => state.getServiceList()} className="btn" disabled={state.pagination ? false : true}><i className="lb lb-refresh-icon"></i> {state.pagination ? "Load More" : "No More Data"}</button> </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}

export default ServiceLists;