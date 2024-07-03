import React, { useReducer, useEffect } from 'react';
import SideBar from '../SideBar/DashboardSideBar';
import images from '../../Utility/Images';
import Header from '../Header/Header';
import Reducer from '../../Utility/Reducer';
import PackagesContext from './PackagesContext/PackagesContext';
import Footer from '../Footer/Footer';
import moment from 'moment';
import NoDataFound from '../../Common/NoDataFound';
import { APIService } from '../../ApiServices/Apis/APIServices';
import { profileAvatar } from '../../Utility/Utility';
import { Link } from 'react-router-dom';
const initialState = {
    packagesList: [],
    packagesResponse: false,
    packagesUpdateResponse: false,
    page:0,
    limit:20,
    loadMore:true,
}
const Packages = () => {
    const [state, dispatch] = useReducer(Reducer, initialState)

    useEffect(() => {
        getAllPackages();
        return;
    }, [])
    const getAllPackages=()=>{
        let data={
            page:state.page,
            limit:state.limit
            }
            APIService.userPackages(data).then((res)=>{
                if(res.data.status==200){
                    dispatch({type:'packagesList',payload:{Type:'packagesList',packagesList:res.data.data,packagesResponse:true}})
                }else{
                    dispatch({type:'packagesList',payload:{Type:'packagesList',packagesResponse:true}})
                }
            }).catch((error)=>{
                dispatch({type:'packagesList',payload:{Type:'packagesList',packagesResponse:true}})
            })
    }
    // 
    const LoadMore=(page)=>{
        let data={
            page:page,
            limit:state.limit
            }
            APIService.userPackages(data).then((res)=>{
                if(res.data.status==200){
                    if(res.data.data?.length>0){
                        dispatch({type:'packagesList',payload:{Type:'packagesList',page:page,packagesList:[...state.packagesList,res.data.data]}})
                    }else{
                        dispatch({type:'packagesList',payload:{Type:'packagesList',loadMore:false}})
                    }
                }else{
                    dispatch({type:'packagesList',payload:{Type:'packagesList',loadMore:false}})
                }
            }).catch((error)=>{
            })
    }
    console.log(state)
    return (
        <>
            <PackagesContext.Provider value={[state, dispatch]}>
                <Header />
                <main>
                    <section className="account-settings-area">
                        <div className="container">
                            <div className="p-sec-heading">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="section-title">
                                            <h2>Packages</h2>
                                            <p>View your current/expired packages.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="account-settings-content">
                                <SideBar />
                                <div className="rit-as-sec p-30">
                                    <div className="packages-content">
                                        <div className="bdr-heading">
                                            <h2>Packages</h2>
                                        </div>
                                        <div className="cmn-table-sec">
                                            <table className="rwd-table">
                                                <tbody>
                                                    {state.packagesList?.length > 0 ? <tr>
                                                        <th>Host Name</th>
                                                        <th>Purchase Date</th>
                                                        <th>Service Name</th>
                                                        <th>Used</th>
                                                        <th>Last Used</th>
                                                        {/* <th>Action</th> */}
                                                    </tr> : ''}
                                                    {state.packagesList?.length > 0 ? state.packagesList.map((res, i) =>
                                                        <tr key={i}>
                                                            <td data-th="Host Name">
                                                                <div className="cricle-pic-name">
                                                                    <Link to={`/profile/${res?.practitionerService?.user?.id}`}> <figure><img src={profileAvatar(res?.practitionerService?.user?.image,res?.practitionerService?.user?.social_image)} alt={res?.practitionerService?.user?.name} /></figure><span>{res?.practitionerService?.user?.name}</span></Link>
                                                                </div>
                                                            </td>
                                                            <td data-th="Purchase Date">
                                                                {moment(res?.createdAt).format('D MMM, YYYY')}
                                                            </td>
                                                            <td data-th="Service Name">
                                                                {res?.practitionerService?.service?.name}
                                                        </td>
                                                            <td data-th="Used">
                                                                {res?.pending_sessions}/{res?.sessions}
                                                        </td>
                                                            <td data-th="Last User">
                                                                Last Used {moment(res?.updatedAt).format('D MMM, YYYY')}
                                                        </td>
                                                            {/* <td data-th="Action">
                                                                <button className="btn">Book</button>
                                                            </td> */}
                                                        </tr>) :state.packagesResponse? <NoDataFound
                                                            image={images.no_webinars_right_now_img}
                                                            title={'No Packages Right Now!'}
                                                            description={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem."}
                                                            buttonTitle="Go Back to Home"
                                                            buttonPath="/home"
                                                        />:<div className="spinner-border text-primary" role="status">
                                                        <span className="sr-only">Loading...</span>
                                                    </div>}

                                                </tbody>
                                            </table>
                                        </div>
                                        {state.packagesList?.length > 0?<div className="row">
                                            <div className="col-12">
                                                <div className="load-more-btn text-center"> <button className="btn" type="button" disabled={state.loadMore&&state.packagesList?.length>=state.limit?false:true} onClick={()=>LoadMore(state.page+1)}><i className="lb lb-refresh-icon"></i> {state.loadMore&&state.packagesList?.length>=state.limit?'Load More':'No More Packages'}</button> </div>
                                            </div>
                                        </div>:''}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                </main>
                <Footer />
            </PackagesContext.Provider>
        </>
    );
}
export default Packages;