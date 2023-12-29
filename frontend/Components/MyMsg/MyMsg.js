import React from 'react'

export default function MyMsg({ text }) {
    return (
        <div className='w-full flex justify-end'>
            <div className='max-w-lg bg-cyan-600 p-2 rounded-t rounded-br'>{text}</div>
        </div>
    )
}
