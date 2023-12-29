import React from 'react'

export default function ButtonB({ text, click }) {
    return (
        <button onClick={() => { click() }} className='px-8 py-2 border border-cyan-600 text-cyan-600 hover:border-white hover:text-white'>{text}</button>
    )
}
