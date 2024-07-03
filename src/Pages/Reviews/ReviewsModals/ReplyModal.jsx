import React, { useState } from 'react';
import { APIService } from '../../../ApiServices/Apis/APIServices';
import { toast } from 'react-toastify';
import $ from 'jquery';
const ReplyModal = ({replyId,replyComment}) => {

    const [ReplyComment, setReplyComment] = useState('')
    
    const handleSubmit=(e)=>{
        e.preventDefault();
        if(Validation()){
            let data = {
                ratingId:parseInt(replyId),
                reply:ReplyComment
            }
            APIService.replyRating(data).then((res)=>{
                if(res.data.status==200){
                    $('.modal').hide();
                    $( ".modal-backdrop" ).first().css( "display", "none" );
                    toast.error(res.data.message)
                    replyComment({type:'replyComment',payload:{Type:'replyComment',replyComment:ReplyComment}})
                    setReplyComment('');
                }else{
                    toast.error(res.data.message)
                }
            }).catch((error)=>{

                toast.error(error.response.statusText)
            })
        }
    }
   const Validation=()=>{
       let condition=true;
        if(replyId==null||replyId==''){
            condition=false;

            toast.error('Try again')
        }
        if(ReplyComment==null||ReplyComment==''){
            condition=false;
            toast.error('comment is required')
        }
        if(ReplyComment?.length<20){
            condition=false;
            toast.error('minimum 20 words required');
        }
        return condition;
    }
    return (
        <>
            <div className="modal review-tips-popup" id="review-reply-popup" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                            <div className="review-tips-content">
                                <div className="bdr-heading">
                                    <h2>Reply</h2>
                                </div>
                                <div className="form-group">
                                    <textarea className={`form-control ${ReplyComment?.length>=20?'is-valid':ReplyComment!=''?'is-invalid':''}`} onChange={(e)=>setReplyComment(e.target.value)} placeholder="Write your reply..." value={ReplyComment}></textarea>
                                    {ReplyComment!=''?<span>Min 20 /{ReplyComment?.length}</span>:''} 
                                </div>
                                <div className="both-btns">
                                    <ul className="ul-list">
                                        <li><button type="button" className="btn bdr-btn" data-dismiss="modal">Cancel</button></li>
                                        <li><button type="submit" className="btn" disabled={ReplyComment==''?true:false}>Send</button></li>
                                    </ul>
                                </div>
                            </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ReplyModal;