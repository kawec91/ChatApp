import React from 'react'

export default function ButtonText({ text, click }) {
    return (
        <button className='text-cyan-600 uppercase' onClick={click}>{text}</button>
    )
}
