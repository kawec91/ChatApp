import React from 'react'
import { bgColor } from '../../colors'
import OnlineUsers from '../OnlineUsers/OnlineUsers'

export default function AppRightNav() {
    return (
        <div className={`${bgColor} border-l-[1px] border-white col-span-2`}>
            <div></div>
            <OnlineUsers />
        </div>
    )
}
