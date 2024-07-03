import React from 'react';
import images from '../../../Utility/Images';

const AddMusicModal = () => {
    return (
        <>
            <div class="modal cmn-popup add-music-popup" id="add-music-popup" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h2 class="modal-heading">Add New Music</h2>
                            <button type="button" class="close" data-dismiss="modal"><i class="lb lb-cancel-icon"></i></button>
                        </div>
                        <div class="modal-body">
                            <div class="cmn-form">
                                <form>
                                    <div class="row">
                                        <div class="col-sm-12 col-md-12 col-lg-12 form-group">
                                            <label for="title" class="form-label">Music Title</label>
                                            <input type="text" class="form-control" id="title" placeholder="Type here" value="" />
                                        </div>
                                        <div class="col-12 upload-images-form">
                                            <div class="row">
                                                <div class="col-sm-12 col-md-12 col-lg-12 form-group">
                                                    <div class="upload-file">
                                                        <label class="file-upload" for="file-upload"><strong>Attached Music File</strong> <span><i class="lb lb-attachment-icon"></i></span><input type="file" id="file-upload" /></label>
                                                    </div>
                                                </div>
                                                <div class="col-sm-12 col-md-12 col-lg-12 form-group">
                                                    <div class="uploaded-files-list">
                                                        <ul class="ul-row">
                                                            <li><figure class="upload-s-img"><img src={images.pp_banner_img1} alt="" />
                                                                <a class="remove-file-btn" href="#"><i class="lb lb-delete-icon"></i></a></figure></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="save-cancel-btns">
                                                <ul class="ul-row">
                                                    <li><button class="btn bdr-btn">Cancel</button></li>
                                                    <li><button class="btn solid-btn">Submit</button></li>
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


export default AddMusicModal;