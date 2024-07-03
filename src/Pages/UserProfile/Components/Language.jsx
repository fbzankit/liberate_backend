import React from 'react';
import images from '../../../Utility/Images';

const Language = ({language}) => {
    return (
        <>
            <div className="pp-single-bx language-bx">
                <div className="lft-pp-icon">
                    <img src={images.languageIcon} alt=""/>
                </div>
                <div className="rit-pp-info">
                    <div className="first-pp-bx">
                        <strong>Language</strong>
                        <ul className="ul-row">
                             {language.map((res,i)=>
                                <li key={i}><a href="#" >{res.value}</a>
                             </li>  
                            )}
                        </ul>

                    </div>
                </div>
            </div>
        </>
    );
}

export default Language;