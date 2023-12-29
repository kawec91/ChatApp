import React from 'react'

export default function NotMyMsg({ text }) {
    return (
        <div className='w-full flex justify-start'>
            <div className='max-w-lg p-2 border border-cyan-600 rounded-t rounded-bl'>{text}</div>
        </div>
    )
}
