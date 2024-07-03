import React from 'react';
import images from '../Utility/Images';

const AverageRating = ({avgRating}) => {
    return <div className="rating-star">
    <ul className="ul-row">
        <li><span>{avgRating}</span></li>
        <li><img src={avgRating>0?images.star_rating:images.un_rating_img} alt={avgRating} /></li>
        <li><img src={avgRating>1?images.star_rating:images.un_rating_img} alt={avgRating} /></li>
        <li><img src={avgRating>2?images.star_rating:images.un_rating_img} alt={avgRating} /></li>
        <li><img src={avgRating>3?images.star_rating:images.un_rating_img} alt={avgRating} /></li>
        <li><img src={avgRating>4?images.star_rating:images.un_rating_img} alt={avgRating} /></li>
    </ul>
</div>;
}
export default AverageRating;