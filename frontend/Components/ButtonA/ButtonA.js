import React from 'react'

export default function ButtonA({ text, click }) {
    return (
        <button className='px-8 py-2 text-white bg-cyan-600 rounded hover:shadow-[0_0_3px_white] ' onClick={() => { click() }}>{text}</button>
    )
}
