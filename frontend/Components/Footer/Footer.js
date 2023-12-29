import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { bgColor } from '../../colors'
import discord from '../../Assets/icons/discord.png'
import github from '../../Assets/icons/github.png'

export default function Footer() {
    return (
        <>
            <Outlet />
            <footer className={`flex ${bgColor} px-12 py-4 items-center justify-between`}>
                <p className='text-gray-600'>&copy; 2023 Lukasz Lukawczyk</p>
                <div className='flex gap-4'>
                    <Link target='blank' to={'https://discord.com'}><img src={discord} alt='discord-icon' /></Link>
                    <Link target='blank' to={'https://github.com'}><img src={github} alt='github-icon' /></Link>
                </div>
            </footer>
        </>
    )
}
