import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { bgColor } from '../../colors';
import { IoMdHome } from "react-icons/io";
import { IoMdSettings } from "react-icons/io";
import { FaEnvelope } from "react-icons/fa";
import { IoMdChatboxes } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { MdAdminPanelSettings } from "react-icons/md";
import AppLeftNavButton from '../AppLeftNavButton/AppLeftNavButton';
import AppMyProfileCard from '../AppMyProfileCard/AppMyProfileCard';
import lastOnlineUpdateByUID from '../../Functions/lastOnlineUpdateByUID/lastOnlineUpdateByUID';

export default function AppLeftNav() {
    const [userRole, setUserRole] = useState('member')
    const [user, setUser] = useState();
    let iconSize = 34;
    let iconStyle = `group-hover:fill-cyan-600`
    const menu = [
        { icon: <IoSearch size={iconSize} className={iconStyle} />, name: 'search', nav: '/app/search' },
        { icon: <IoMdHome size={iconSize} className={iconStyle} />, name: 'home', nav: '/app/' },
        {
            icon: <FaEnvelope size={iconSize} className={iconStyle} />, name: 'messages', nav: '/app/messages'
        },
        { icon: <IoMdChatboxes size={iconSize} className={iconStyle} />, name: 'chat', nav: '/app/chat' },
        {
            icon: <IoMdSettings size={iconSize} className={iconStyle} />, name: 'settings', nav: '/app/settings'
        },
    ]

    const logoutObject = { icon: <IoIosLogOut size={iconSize} className={iconStyle} />, name: 'logout', nav: '/logout' }

    useEffect(() => {
        let user = JSON.parse(sessionStorage.getItem('user'));
        setUser(user);
        setUserRole(user.role);
    }, [sessionStorage.getItem('user')]);
    return (
        <>
            <nav className={`auto-cols-max ${bgColor} h-screen text-white flex flex-col justify-between border-r-[1px] border-white w-full`}>
                <div>
                    <AppMyProfileCard />
                    <hr />
                </div>
                <ul className='list-none flex flex-col gap-2 p-4'>
                    {menu.map((item) => <li key={`li-${item.name}`}><Link to={item.nav} onClick={() => { lastOnlineUpdateByUID(user?.id) }}><AppLeftNavButton img={item.icon} name={item.name} key={item.name} /></Link></li>)}
                </ul>
                <div>
                    <hr className='w-full' />
                    <div className='p-2 flex flex-col gap-2'>
                        <Link to={logoutObject.nav} onClick={() => { lastOnlineUpdateByUID(user?.id) }}>
                            <AppLeftNavButton img={logoutObject.icon} name={logoutObject.name} key={logoutObject.name} />
                        </Link>
                        {userRole === 'admin' ? <Link to='/app/admin' onClick={() => { lastOnlineUpdateByUID(user?.id) }}>
                            <AppLeftNavButton img={<MdAdminPanelSettings size={iconSize} className={iconStyle} />} name={'Admin'} key={'admin'} />
                        </Link> : <></>}
                    </div>
                </div>
            </nav>

        </>
    )
}
