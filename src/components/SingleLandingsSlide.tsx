import React from 'react'

import { SlideType } from '../@types/landingSlide'
import './SingleLandingsSlide.css'


const SingleLandingsSlide: React.FC<SlideType> = ({ title, image, desc }) => {
    return (
        <>
            <div className="image-container">
                <img src={image} alt={title} />
            </div>

            <div className="text-section">
                <h3 className='title'>{title}</h3>
                <p className="description">{desc}</p>
            </div>
        </>
    )
}

export default SingleLandingsSlide