import React, { useContext } from 'react';
import images from '../../../Utility/Images';
import Context from '../../Home/Context/Context';
import $ from 'jquery';
const ReviewModal = ({submit}) => {
    const [state,dispatch] = useContext(Context)

   const handleChange=(e)=>{
    let name=e.target.name;
    let value=e.target.value;
        dispatch({type:name,payload:{Type:name,[name]:value}});
    }
    
    return (
        <>
            <div className="modal review-tips-popup" id="review-tips-popup" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"  aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">

                        <div className="modal-body">
                            <div className="review-tips-content">
                                <div className="bdr-heading">
                                    <h2>Tip &amp; rate to User for your event</h2>
                                </div>
                                <div className="form-group">
                                    <div className="review-tips-heading"><strong>Add a tip</strong></div>
                                    
                                    <div className="profile-gender">
                                        <ul className="ul-row">
                                            <li>
                                                <label className="radiobox">None
                                                    <input type="radio" checked={state.eventTip==0?true:false} name="eventTip" onChange={handleChange} value={0}/>
                                                    <span className="checkmark"></span>
                                                </label>
                                            </li>
                                            <li>
                                                <label className="radiobox">$5
                                                    <input type="radio" checked={state.eventTip==5?true:false} name="eventTip" onChange={handleChange} value={5}/>
                                                    <span className="checkmark"></span>
                                                </label>
                                            </li>
                                            <li>
                                                <label className="radiobox">$10
                                                        <input type="radio" checked={state.eventTip==10?true:false} name="eventTip" onChange={handleChange} value={10}/>
                                                    <span className="checkmark"></span>
                                                </label>
                                            </li>
                                            <li>
                                                <label className="radiobox">$15
                                                        <input type="radio" checked={state.eventTip==15?true:false} name="eventTip" onChange={handleChange} value={15}/>
                                                    <span className="checkmark"></span>
                                                </label>
                                            </li>
                                            <li>
                                                <label className="radiobox">$20
                                                        <input type="radio" checked={state.eventTip==20?true:false} name="eventTip" onChange={handleChange} value={20}/>
                                                    <span className="checkmark"></span>
                                                </label>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="review-tips-heading"><strong>Rate the User</strong></div>
                                    <div className="review-tips-input-bx">
                                        <ul className="ul-list">
                                            <li>
                                                <div className="give-rated">
                                                    <div className={`cmn-toggle ${state.eventRating>0?'open':''}`}>
                                                        <button type="button" onClick={()=>dispatch({type:'eventRating',payload:{Type:'eventRating',eventRating:1}})} className="btn-link"><i className="lb lb-interests-icon"></i> <img src={images.star_rating}  alt="" /> </button>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="give-rated">
                                                    <div className={`cmn-toggle ${state.eventRating>=2?'open':''}`}>
                                                        <button type="button" onClick={()=>dispatch({type:'eventRating',payload:{Type:'eventRating',eventRating:2}})} className="btn-link"><i className="lb lb-interests-icon"></i> <img src={images.star_rating}  alt="" /> </button>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="give-rated">
                                                    <div className={`cmn-toggle ${state.eventRating>=3?'open':''}`}>
                                                        <button type="button" onClick={()=>dispatch({type:'eventRating',payload:{Type:'eventRating',eventRating:3}})} className="btn-link"><i className="lb lb-interests-icon"></i> <img src={images.star_rating} alt="" /> </button>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="give-rated">
                                                    <div className={`cmn-toggle ${state.eventRating>=4?'open':''}`}>
                                                        <button type="button" onClick={()=>dispatch({type:'eventRating',payload:{Type:'eventRating',eventRating:4}})} className="btn-link"><i className="lb lb-interests-icon"></i> <img src={images.star_rating}  alt="" /> </button>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="give-rated">
                                                    <div className={`cmn-toggle ${state.eventRating>=5?'open':''}`}>
                                                        <button type="button" onClick={()=>dispatch({type:'eventRating',payload:{Type:'eventRating',eventRating:5}})} className="btn-link"><i className="lb lb-interests-icon"></i> <img src={images.star_rating}  alt="" /> </button>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <textarea className={`form-control ${state.comment?.length>=20?'is-valid':state.comment!=''?'is-invalid':''}`} name="comment" onChange={handleChange} id="about-me" placeholder="Write your commnet..." value={state.comment}></textarea>
                                        {state.comment!=''?<span>Min 20 /{state.comment?.length}</span>:''} 
                                </div>
                                <div className="both-btns">
                                    <ul className="ul-list">
                                        <li><button type="button" className="btn bdr-btn" onClick={()=>dispatch({type:'reset',payload:{Type:'reset',eventRating:0,comment:'',eventTip:0}})} data-dismiss="modal">Cancel</button></li>
                                        <li><button type="button" onClick={submit}  className="btn" disabled={state.eventRating>0&&state.comment?.length>=20?false:true}>{parseInt(state.eventTip)>0?'Pay and submit':'Submit'}</button></li>
                                    </ul>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ReviewModal;