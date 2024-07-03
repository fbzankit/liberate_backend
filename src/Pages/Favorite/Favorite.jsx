import React, { useReducer, useRef } from 'react';
import SideBar from '../SideBar/DashboardSideBar';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import images from '../../Utility/Images';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { APIService } from '../../ApiServices/Apis/APIServices';
import Reducer from '../../Utility/Reducer';
import { toast } from 'react-toastify';
import config from '../../ApiServices/Apis/config';
import moment from 'moment';
import NoDataFound from '../../Common/NoDataFound';


const initialState={
   favoriteUsersList:[]
}
const Favorite = () => {
    const [state, dispatch] = useReducer(Reducer, initialState);
 //use for favorite heart click 
    useEffect(() => {
        favoriteUsersList();
        
      
        return;
    }, []);
    const favoriteUsersList=()=>{
        APIService.favoriteUsers().then((res)=>{
            if(res.data.status==200){
                dispatch({type:'Response',payload:{Type:'Response',favoriteUsersList:res.data.data}});
            }else{
                toast.error(res.data.message);
            }
        }).catch((error)=>{

        })
    }
    const favoriteToggle=(id,favID)=>{
        let data={
            pracId:id
        }
        APIService.favoritePractitioner(data).then((res)=>{
            if(res.data.status==200){
                dispatch({type:'Response',payload:{Type:'Response',favoriteUsersList:state.favoriteUsersList.filter((res)=>res.id!=favID)}});
            }else{
                toast.error(res.data.message)
            }
        }).catch((error)=>{

        })
    }

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
                                        <h2>Favorites</h2>
                                        <p>Your favorite practitioners</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="account-settings-content">
                            <div className="lft-as-sec">
                                <SideBar />
                            </div>
                            <div className="rit-as-sec p-30">
                                <div className="all-noti-panel">
                                    <div className="bdr-heading">
                                        <h2>Favorite</h2>
                                        <div className="search-form">
                                            <form action="#">
                                                <div className="top-search-bar">
                                                    <input type="text" placeholder="Search..." />
                                                    <button className="btn-link"><i className="lb lb-search-icon"></i></button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="favorite-content">
                                        <div className="cmn-table-sec">
                                            <table className="rwd-table">
                                                <tbody>
                                                    {state.favoriteUsersList?.length>0?state.favoriteUsersList.map((res,i)=>
                                                        <tr key={i}>
                                                            <td>
                                                                <div className="favorite-noti">
                                                                    <div className="fav-btn open"  onClick={()=>favoriteToggle(res?.pracId,res.id)}>
                                                                        <button className="btn-link" >
                                                                            <i className="fa fa-heart"></i> 
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                                <div className="cricle-pic-name">
                                                                    <Link to={`/profile/${res.practitioners[0]?.user?.id}`}>
                                                                        <figure>
                                                                            <img src={res.practitioners[0]?.user?.image==null?res.practitioners[0]?.user?.social_image:config.imageBaseurl+res.practitioners[0]?.user?.image} alt={res.practitioners[0]?.user?.name} />
                                                                        </figure>
                                                                        <span>{res.practitioners[0]?.user?.name}</span>
                                                                    </Link>
                                                                </div>
                                                            </td>
                                                        <td>
                                                            {moment(res.createdAt).format('D MMM YYYY hh:mm:ss A')}
                                                        </td>
                                                    </tr>):<NoDataFound
                                                                        image={images.no_webinars_right_now_img}
                                                                        title={'No Favorites Right Now!'}
                                                                        description={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem."}
                                                                        buttonTitle="Go Back to Home"
                                                                        buttonPath="/home"/>
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                        {/* <div className="row">
                                            <div className="col-12">
                                                <div className="load-more-btn text-center"> <a href="#" className="btn"><i className="lb lb-refresh-icon"></i> Load More</a> </div>
                                            </div>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}

export default Favorite;