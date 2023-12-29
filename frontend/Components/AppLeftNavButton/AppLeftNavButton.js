import React from 'react'

export default function AppLeftNavButton({ img, name }) {
    return (
        <div className='group cursor-pointer flex flex-col items-center justify-center '>
            <div>{img}</div>
            <p className='group-hover:text-cyan-600 uppercase'>{name}</p>
        </div>
    )
}
