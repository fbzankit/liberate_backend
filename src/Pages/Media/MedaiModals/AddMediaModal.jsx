import React from 'react';
import images from '../../../Utility/Images';

const AddMediaModal = () => {
    return (
        <>
            <div className="modal cmn-popup add-new-media-popup" id="add-new-media-popup" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2 className="modal-heading">Add New Media</h2>
                            <button type="button" className="close" data-dismiss="modal"><i className="lb lb-cancel-icon"></i></button>
                        </div>
                        <div className="modal-body">
                            <div className="cmn-form">
                                <form>
                                    <div className="row">
                                        <div className="col-sm-6 col-md-6 col-lg-6 form-group">
                                            <label for="title" className="form-label">Title</label>
                                            <input type="text" className="form-control" id="title" placeholder="Type here" value="" />
                                        </div>
                                        <div className="col-sm-6 col-md-6 col-lg-6 form-group">
                                            <label for="title" className="form-label">Cost</label>
                                            <input type="text" className="form-control" id="cost" placeholder="" value="$ 100" />
                                        </div>
                                        <div className="col-sm-12 col-md-12 col-lg-12 form-group">
                                            <label for="email-address" className="form-label">Category</label>
                                            <input className="form-control input-tags" type="text" data-role="tagsinput" placeholder="Type here" value="" />
                                        </div>
                                        <div className="col-12 form-group">
                                            <label for="email-address" className="form-label">About Me</label>
                                            <textarea className="form-control" id="about-me" placeholder="Type Hare..." value=""></textarea>
                                            <div className="input-btm-note">
                                                <span className="float-left">Minimum 25 Words</span>
                                                <span className="float-right">0/25 </span>
                                            </div>
                                        </div>
                                        <div className="col-12 upload-images-form">
                                            <div className="bdr-heading">
                                                <h2>Upload Media</h2>
                                            </div>
                                            <div className="row">
                                                <div className="col-sm-12 col-md-12 col-lg-12 form-group">
                                                    <div className="upload-file">
                                                        <label className="file-upload" for="file-upload"><strong>Uploading Media</strong> <span><i className="lb lb-attachment-icon"></i></span><input type="file" id="file-upload" /></label>
                                                    </div>
                                                </div>
                                                <div className="col-sm-12 col-md-12 col-lg-12 form-group">
                                                    <div className="uploaded-files-list">
                                                        <ul className="ul-row">
                                                            <li><figure className="upload-s-img"><img src={images.pp_banner_img1} alt="" />
                                                                <a className="remove-file-btn" href="#"><i className="lb lb-delete-icon"></i></a></figure></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="save-cancel-btns">
                                                <ul className="ul-row">
                                                    <li><button className="btn bdr-btn">Cancel</button></li>
                                                    <li><button className="btn solid-btn">Submit</button></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


export default AddMediaModal;