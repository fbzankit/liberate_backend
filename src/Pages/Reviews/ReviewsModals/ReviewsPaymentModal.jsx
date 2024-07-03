import React, { useState, useEffect, useRef } from 'react';
import { showHideDiv } from '../../../Utility/Utility';
import images from '../../../Utility/Images';
import {CardElement, useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement, Elements} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { toast, ToastContainer } from 'react-toastify';
import $ from 'jquery';
import { APIService } from '../../../ApiServices/Apis/APIServices';
import moment from 'moment';
import config from '../../../ApiServices/Apis/config'
import { useContext } from 'react';
const CARD_OPTIONS = {

};
const ELEMENTS_OPTIONS = {
    fonts: [
      {
        cssSrc: 'https://fonts.googleapis.com/css?family=Roboto',
      },
    ],
  };
  const stripePromise = loadStripe(config.stripePublicKey);
const ReviewsPaymentModal = ({response,tip,rating,pracId,validation,bookingId,comment}) => {
    const [saveCardList, setSaveList] = useState([]);
    useEffect(() => {
        saveCardsLists();
    }, [])
    const saveCardsLists=()=>{
        let data={}
        APIService.stripCardList(data).then((res)=>{
            if(res.data.status==200){
                setSaveList(res.data?.data?.data);
            }else{

            }

        })
    }
    

    return (
        <>
          <Elements 
          stripe={stripePromise} 
          options={ELEMENTS_OPTIONS}>
            <StripeCheckoutFrom  
            saveCardList={saveCardList} 
            saveCardsLists={saveCardsLists}
            tip={tip}
            rating={rating}
            comment={comment}
            pracId={pracId}
            bookingId={bookingId}
            response={response} 
            validation={validation}
            />
            
          </Elements>
        </>
    );
}
export default ReviewsPaymentModal;
const StripeCheckoutFrom=({response,saveCardsLists,saveCardList,validation,tip,rating,pracId,bookingId,comment})=>{
  const stripe = useStripe();
  const elements = useElements();
  const loadingButton = useRef(null);
  const [error, setError] = useState(null);
  const [cardComplete, setCardComplete] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [paymentMethodID, setPaymentMethodID] = useState(null);
  const [isSubmit, setIsSubmit] = useState(false);
  const [saveCard, setSaveCard] = useState(false);
  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();
    if(window.processing){
        return;
    }
    window.processing = true;
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }
    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardNumberElement);
    // Use your card Element with other Stripe.js APIs
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });
    if (error) {

        if(paymentMethodID!=null){
            saveCards(paymentMethodID);
        }else{
            window.processing = false;
            toast.error(error.message); 
            setPaymentMethodID(null);
            elements.getElement(CardNumberElement).clear();
            elements.getElement(CardExpiryElement).clear();
            elements.getElement(CardCvcElement).clear();     
        }
    } else {    
        //window.processing = false;
  
        saveCards(paymentMethodID!=null?paymentMethodID:paymentMethod.id);
    
// console.log(paymentMethod,'paymentMethod');
    }
    return false;
  };
 const selectCards=(Card)=>{
    document.getElementById('add-card').style.display = "none"
    elements.getElement(CardNumberElement).clear();
    elements.getElement(CardExpiryElement).clear();
    elements.getElement(CardCvcElement).clear();
    setPaymentMethodID(Card)
 }
 const addOrRemoveCard=(show)=>{
    setPaymentMethodID(null)
    showHideDiv(show);
 }
  const saveCards= async (pmID)=>{
    let data={
        paymentMethod_id:pmID
    }
    APIService.attachedCard(data).then((res)=>{
        if(res.data.status==200){
         handleBookingForm(pmID)
         // saveCardsLists  after attached the cards use for Payment 
         saveCardsLists()
        }else{
            window.processing = false;
            toast.error(res.data.message);
        }
    }).catch((error)=>{
        window.processing = false;
    })
}

// HandleBookingForm  function use for Payment 
  const handleBookingForm=(pmId)=>{

    loadingButton.current.setAttribute('data-loading','true')
    loadingButton.current.disabled = true;
    if(validation()){
        let data={
                prac_id: pracId,
                rating: rating,
                tip:tip,
                comment: comment,
                booking_id: bookingId,
                tip_stripe_id: pmId,
        }
        APIService.submitReview(data).then((res)=>{
            
            if(res.data.status==200){
                window.processing = false;
                loadingButton.current.removeAttribute('data-loading')
                loadingButton.current.disabled = false;
                // dispatch({type:'eventBooking',payload:{Type:'eventBooking',}})
                $('.modal').modal('hide');
                elements.getElement(CardNumberElement).clear();
                elements.getElement(CardExpiryElement).clear();
                elements.getElement(CardCvcElement).clear();
                setPaymentMethodID(null)
                response();
                toast.success(res.data.message)
            }else{
                window.processing = false;
                loadingButton.current.removeAttribute('data-loading')
                loadingButton.current.disabled = false;
                toast.error(res.data.message)
            }
        }).catch((error)=>{
            window.processing = false;
            loadingButton.current.removeAttribute('data-loading')
            loadingButton.current.disabled = false;
        })
    }else{
        window.processing = false;
        loadingButton.current.removeAttribute('data-loading')
        loadingButton.current.disabled = false;
    }
    
}

    return(
        <>
        <div className="modal right fade modal-sidebar payment-modal" id="reviews-payment-modal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2 className="modal-heading">Payment</h2>
                            <button type="button" className="close" data-dismiss="modal"><i className="lb lb-cancel-icon"></i></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                            <div className="add-service-box">
                                <div className="up-gray-heading">
                                    <strong>{saveCardList?.length>1?"Cards":'Card'}</strong>
                                </div>
                                <div className="card-or-paypal">
                                    
                                    <div className="saved-cards-list">
                                        <div className="row">
                                            {saveCardList!=undefined?saveCardList.map((res,i)=>
                                            <div className="col-sm-12" key={i}>
                                                <div className="saved-card-bx">
                                                    <label className="radiobox">************{res?.card?.last4}
                                                        <input type="radio"  name="radio" onChange={()=>selectCards(res.id,'add-card')} checked={res.id===paymentMethodID?true:false} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </div>
                                            </div>
                                            ):''}
                                            {/* <div className="col-sm-12">
                                                <div className="saved-card-bx">
                                                    <label className="radiobox">
                                                        <strong className="bank-name">Bank of America</strong>9874*******32154
                                                        <input type="radio" name="radio" />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </div>
                                            </div> */}
                                        </div>
                                    </div>
                                    <div className="payment-card-add">
                                        <div className="cmn-new-toggle">
                                            <button type="button" className="btn bdr-btn" onClick={()=>addOrRemoveCard('add-card')}> <i className="lb lb-plush-icon"></i> Add Card</button>
                                            <div id="add-card" className="add-card-form" style={{ display: 'block' }}>
                                                <div className="row name_payment_section">
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <label className="form-label" htmlFor="firstName">Name</label>
                                                            <input type="text" className="form-control" id="firstName" placeholder="Name" required="" />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <label className="form-label" htmlFor="CardNumber">Card Number</label>
                                                            <CardNumberElement options={CARD_OPTIONS} className="form-control"/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <label className="form-label" htmlFor="CardExpiryDate">Card Expiry Date</label>
                                                            <CardExpiryElement options={CARD_OPTIONS} className="form-control" />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <label className="form-label" htmlFor="Cvv">CVV</label>
                                                            <CardCvcElement options={CARD_OPTIONS}  className="form-control"/>
                                                        </div>
                                                    </div>
                                                    {/* <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <label className="lm-ck-bx">Save card.<input type="checkbox" onChange={()=>setSaveCard(!saveCard)} value={saveCard} checked={saveCard} />
                                                                <span className="checkmark"></span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <button type="submit" className="btn solid-btn">Save</button>
                                                        </div>
                                                    </div> */}
                                                    <div className="col-sm-12">
                                                        <p><strong>Your card would be automatically saved to your billing info. If you wish you can remove it from there.</strong></p>
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="side-next-back-btn"> <a href="#booker-modal" className="btn default-btn float-left" data-toggle="modal" data-dismiss="modal">Back</a>
                                     {/* <button type="submit" className="btn default-btn float-right">Pay (${cost})</button>  */}
                                     <button type="submit" class="ladda-button animate-btn float-right zoom-out"  ref={loadingButton}> 
                                     <span class="label">Pay (${tip})</span> <span class="spinner"></span>
                                     </button>
                                    </div>
                                </div>
                            </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

