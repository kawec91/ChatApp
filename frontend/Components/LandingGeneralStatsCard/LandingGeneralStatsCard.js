import React from 'react'

export default function LandingGeneralStatsCard({ text, img, number }) {
    return (
        <div className={`flex items-center justify-center gap-2`}>
            <img src={img} alt={'icon'} />
            <p className='uppercase font-bold'>{number} {text}</p>
        </div>
    )
}
