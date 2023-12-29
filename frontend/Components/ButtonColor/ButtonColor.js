import React from 'react'

export default function ButtonColor({ click, text, textColor, bgColor, borderColor }) {
    return (
        <button className={`${textColor} ${bgColor} ${borderColor} border px-4 py-2`} onClick={click}>{text}</button>
    )
}
