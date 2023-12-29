import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import ButtonA from '../ButtonA/ButtonA'
import { bgColor } from '../../colors'
import crown from '../../Assets/l2.png'
import showInConsole from '../../Functions/showInConsole/showInConsole'

export default function Header() {

    return (
        <>
            <header className={`px-12 py-4 ${bgColor} flex justify-between items-center border-b-[1px] border-white`}>
                <div><Link to={'/'}><img src={crown} alt='crown-icon' /></Link></div>

                <ul><li>
                    {window.location.href === 'http://localhost:3000/login' ? <Link to={'/'}><ButtonA text='Home' click={showInConsole} /></Link> : <Link to={'/login'}><ButtonA text='Login' click={showInConsole} /></Link>}
                </li></ul>
            </header>
            <Outlet />
        </>
    )
}
