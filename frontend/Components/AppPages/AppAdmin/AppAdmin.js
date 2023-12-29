import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import { bgColor } from '../../../colors'

export default function AppAdmin() {
    const adminMenu = [
        { link: '/app/admin', name: 'Jobs' }
    ]
    return (
        <div className='h-screen flex flex-col'>
            <div className={`${bgColor} border-b-[1px] border-white text-white`}>
                <ul className='list-none flex gap-2 p-2'>
                    {adminMenu.map((item) => <li><Link to={item.link}>{item.name}</Link></li>)}
                </ul>
            </div>
            <Outlet />
        </div>
    )
}
