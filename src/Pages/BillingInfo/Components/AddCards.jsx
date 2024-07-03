import React, { useState, useEffect, useRef } from 'react';
import { showHideDiv } from '../../../Utility/Utility';
import images from '../../../Utility/Images';
import { CardElement, useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { toast, ToastContainer } from 'react-toastify';
import $ from 'jquery';
import { APIService } from '../../../ApiServices/Apis/APIServices';
import moment from 'moment';
import { useContext } from 'react';
import config from '../../../ApiServices/Apis/config'
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
const AddCards = ({response}) => {
    return (
        <>
            <Elements
                stripe={stripePromise}
                options={ELEMENTS_OPTIONS}>
                <StripeCheckoutFrom response={response}/>
            </Elements>
        </>
    );
}
export default AddCards;
const StripeCheckoutFrom = ({response}) => {
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
        if (window.processing) {
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
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });
        if (error) {
            if (paymentMethodID != null) {
                saveCards(paymentMethodID);
            } else {
                window.processing = false;
                toast.error(error.message);
                setPaymentMethodID(null);
                elements.getElement(CardNumberElement).clear();
                elements.getElement(CardExpiryElement).clear();
                elements.getElement(CardCvcElement).clear();
            }
        } else {
            //window.processing = false;
            saveCards(paymentMethodID != null ? paymentMethodID : paymentMethod.id);
            // console.log(paymentMethod,'paymentMethod');
        }
        return false;
    };
  
    const saveCards = async (pmID) => {
        let data = {
            paymentMethod_id: pmID
        }
        APIService.attachedCard(data).then((res) => {
            if (res.data.status == 200) {
                window.processing = false;
                toast.success(res.data.message);
                elements.getElement(CardNumberElement).clear();
                elements.getElement(CardExpiryElement).clear();
                elements.getElement(CardCvcElement).clear();
                response()
            } else {
                window.processing = false;
                toast.error(res.data.message);
                elements.getElement(CardNumberElement).clear();
                elements.getElement(CardExpiryElement).clear();
                elements.getElement(CardCvcElement).clear();
            }
        }).catch((error) => {
            window.processing = false;
            elements.getElement(CardNumberElement).clear();
                elements.getElement(CardExpiryElement).clear();
                elements.getElement(CardCvcElement).clear();
        })
    }


    return (
        <>

            <form onSubmit={handleSubmit}>
                <div className="row name_payment_section">
                    <div className="col-sm-6">
                        <div className="form-group">
                            <label className="form-label" for="firstName">Name</label>
                            <input type="text" className="form-control" id="firstName" placeholder="Name"  />
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="form-group">
                            <label className="form-label" for="CardNumber">Card Number</label>
                            <CardNumberElement options={CARD_OPTIONS} className="form-control" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <div className="form-group">
                            <label className="form-label" for="CardExpiryDate">Card Expiry Date</label>
                            <CardExpiryElement options={CARD_OPTIONS} className="form-control" />
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="form-group">
                            <label className="form-label" for="Cvv">CVV</label>
                            <CardCvcElement options={CARD_OPTIONS} className="form-control" />
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="form-group">
                            <label className="lm-ck-bx">Save this card for future payments.
                            <input type="checkbox" onChange={()=>setSaveCard(!saveCard)} value={saveCard} checked={saveCard} />
                                <span className="checkmark"></span>
                            </label>
                        </div>
                    </div>

                    <div className="col-sm-6">
                        <div className="form-group">
                            <button type='submit' className="btn solid-btn" disabled={saveCard?false:true}>Save</button>
                        </div>
                    </div>
                </div>
            </form>


        </>
    )
}

