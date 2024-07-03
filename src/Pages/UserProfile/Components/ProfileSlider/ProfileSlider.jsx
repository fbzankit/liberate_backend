import React, { useContext } from 'react';
import images from '../../../../Utility/Images';
import config from '../../../../ApiServices/Apis/config';
import Context from '../../../Home/Context/Context';
import $ from 'jquery';
import { getFileExtension } from '../../../../Utility/Utility';
import AuthUserContext from '../../../../AuthUser/AuthUserContext';
import { useParams } from 'react-router';
const imageURL = config.imageBaseurl;


var Carousel = require('react-responsive-carousel').Carousel;

const ProfileSlider = ({deleteFile}) => {
 const {id} =useParams();    
const authUser =useContext(AuthUserContext);
const [state,dispatch] = useContext(Context)

const customRenderThumb = children=>
children?.length>0?children.map((item,i) => {

return <>{item?.props?.children?.props?.children?.props?.src?<img key={i} src={item?.props?.children?.props?.children?.props?.src} />:<video style={{height:'54px'}} src={item?.props?.children?.props?.src}></video>}{id==authUser?.id?<button class="remove-file-btn" type="button" onClick={()=>deleteFile(item?.props?.children?.props?.children?.props?.id ||item?.props?.children?.props?.id)} tabindex="0"><i class="lb lb-delete-icon"></i></button>:''}</>;
      }):'';



  const profileImage=state.UserProfile?.image?imageURL+state.UserProfile.image:state.UserProfile?.social_image?.replace('s96-c','s512-c')
    return (
        <>
            <Carousel
                autoPlay={true}
                showStatus={false}
                useKeyboardArrows={true}
                thumbWidth={80}
                stopOnHover
                infiniteLoop={true}
                interval={3000}
                showIndicators={false}
                renderThumbs={customRenderThumb}
            >

            {/* <div className="slider">
                <figure>
                    <img src={images.no_image_video_found} alt="One" />
                </figure>
            </div> */}
                {state.UserProfile?.userImages?.length>0?state.UserProfile?.userImages.map((res,i)=>{
                  let HTML
                  getFileExtension(res?.name)==="mp4"?
                  HTML=<video controls width="635" height="546">
                            <source src={imageURL+'/user/'+res?.name} id={res.id} userId={state.UserProfile?.id} type="video/mp4"/>
                            </video>
                            :
                            HTML=  <div key={i} className="slider">
                            <figure>
                                <img src={imageURL+'/user/'+res?.name} id={res.id} userId={state.UserProfile?.id} alt={res?.name} />
                            </figure>
                        </div>
                        return HTML;
                }):<div className="slider">
                <figure>
                    <img src={images.no_image_video_found} userId={state.UserProfile?.id} alt="One" />
                </figure>
            </div>}
                
            </Carousel>
        </>
    );
}
export default ProfileSlider;