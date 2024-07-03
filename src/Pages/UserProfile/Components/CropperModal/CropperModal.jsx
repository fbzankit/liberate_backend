import React, { useContext, useEffect, useState, useRef } from 'react';
import Croppie from "croppie"
import $ from 'jquery';
import { getFileExtension } from '../../../../Utility/Utility';
import { toast } from 'react-toastify';
import images from '../../../../Utility/Images';
var c;

const CropperModal = ({ response, viewport,size, boundary,ModalTitle,type,croppieImage,croppieVideo,dispatchHandle}) => {
    const [InputFile, setInputFile] = useState('')
    useEffect(() => {
        const croppieOptions = {
            showZoomer: true,
            enableOrientation: true,
            // mouseWheelZoom: "ctrl",
            enableResize: false,
            viewport: viewport,
            boundary: boundary
        };
        var croppie = document.getElementById('croppie-container');
        c = new Croppie(croppie, croppieOptions);
    }, [])
    useEffect(() => {
        if (croppieImage?.length > 0) {
            handleCropping(croppieImage)
        }
    }, [croppieImage])
    const handleFileInput = (e) => {
        setInputFile(e.target.value);
        for (let file of e.target.files) {
            if (getFileExtension(file.name) === 'mp4') {
                if (file.size <= 20971520) {

                    dispatchHandle({
                        type: 'croppieImageVideo',
                        payload: {
                            Type: 'croppieImageVideo',
                            croppieImage: [],
                            croppieVideo: e.target.files,
                        }
                    })
                } else {
                    toast.error('maximum video upload size 20 MB')
                    dispatchHandle({
                        type: 'croppieImageVideo',
                        payload: {
                            Type: 'croppieImageVideo',
                            croppieImage: [],
                            croppieVideo: [],
                        }
                    })
                }
            } else {
                if (file.size <= 5242880) {

                    dispatchHandle({
                        type: 'croppieImageVideo',
                        payload: {
                            Type: 'croppieImageVideo',
                            croppieImage: e.target.files,
                            croppieVideo: [],
                        }
                    })
                } else {
                    toast.error('maximum image upload size 5 MB')
                    dispatchHandle({
                        type: 'croppieImageVideo',
                        payload: {
                            Type: 'croppieImageVideo',
                            croppieImage: [],
                            croppieVideo: [],
                        }
                    })
                }
            }
        }

    }
    const rotate = (deg) => {
        c.rotate(deg)
    }
    const handleCropping = (input) => {
        const reader = new FileReader();
        const file = input[0];
        reader.readAsDataURL(file);
        reader.onload = () => {
            c.bind({ url: reader.result });
        };
        reader.onerror = function (error) {
            console.log("Error: ", error);
        };
    }
    const handleCropper = (e) => {
        e.preventDefault();
        if (croppieImage?.length > 0) {
            c.result({ type: "blob", format: "jpeg",size: size}).then(base64 => {
                var file = new File([base64], `${(Math.random() + 1).toString(36).substring(7) + new Date().getTime()}.jpeg`);
                
                response(file, 'Image');
            });
            c.result('base64').then(base64 => {
                dispatchHandle({
                    type: 'croppieImageBase64',
                    payload: {
                        Type: 'croppieImageBase64',
                        croppieImageBase64:base64
                    }
                })
            });
            cancelUpload();
        } else if (croppieVideo?.length > 0) {
            response(croppieVideo, 'Video');
            cancelUpload();
        } else {
            toast.error('please select minimum 1 file')
        }
    }
    const cancelUpload = () => {
        setInputFile('')
        dispatchHandle({
            type: 'croppieImageBase64',
            payload: {
                Type: 'croppieImageBase64',
                croppieImageBase64:null,
                croppieImage: [],
                croppieVideo: [],
            }
        })
    }
    return (
        <>
            <div class="modal cmn-popup booking-reschedule-popup" id="upload-images-popup" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <form onSubmit={handleCropper}>
                            <div class="modal-header">
                                <h2 class="modal-heading">{ModalTitle}</h2>
                                <button type="button" class="close" onClick={cancelUpload} data-dismiss="modal"><i class="lb lb-cancel-icon"></i></button>
                            </div>
                            <div class="modal-body">
                                <div class="cmn-form">

                                    <div class="row">
                                        <div class={`col-sm-12 col-md-12 col-lg-12 form-group ${croppieImage?.length > 0 ? 'd-block' : 'd-none'}`}>
                                            <div id="croppie-container" ></div>
                                        </div>
                                        {/* <div class={`d-none col-sm-6 col-md-6 col-lg-6 form-group ${croppieImageBase64 ? 'd-block' : 'd-none'}`}>
                                            <img style={{ maxWidth: '60%' }} src={croppieImageBase64} alt="cropped image" />
                                        </div> */}
                                        <div class={`col-sm-6 col-md-6 col-lg-6 form-group ${croppieImage?.length > 0 ? 'd-block' : 'd-none'}`}>
                                            <button type="button" className="btn btn-default" disabled={croppieImage?.length > 0 ? false : true} onClick={() => rotate(90)}>

                                                <img src={images.rotate_left} alt="rotate" />
                                            </button>
                                            <button type="button" className="btn btn-default" disabled={croppieImage?.length > 0 ? false : true} onClick={() => rotate(-90)}>
                                                <img src={images.rotate_right} alt="rotate" />
                                            </button>
                                            {/* <button type="button" className="btn btn-default" disabled={croppieImage?.length>0?false:true} onClick={onResult}>
                                            <img src={images.crop} alt="rotate" />
                                                
                                            </button> */}
                                        </div>

                                        <div className={`btn mr-auto ml-auto ${croppieImage?.length > 0 ? 'd-block' : 'd-block'}`}>
                                            <input type="file" accept={type} onChange={handleFileInput} value={InputFile}/>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div class="modal-footer">
                                <div class="both-btns">
                                    <ul class="ul-list">
                                        <li><button type="button" onClick={cancelUpload} class="btn bdr-btn" data-dismiss="modal">Cancel</button></li>
                                        <li><button type="submit" disabled={croppieImage?.length > 0 || croppieVideo?.length > 0 ? false : true} class="btn">Upload</button></li>
                                    </ul>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </>
    );
}
export default CropperModal;