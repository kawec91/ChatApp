import React from 'react'
import { bgColor } from '../../colors'
import crown from '../../Assets/crown.jpg'
import ButtonB from '../ButtonB/ButtonB'
import { Link } from 'react-router-dom'

export default function Hero() {
    return (
        <div className={`md:h-screen ${bgColor} text-white flex flex-col md:flex-row items-center justify-center gap-12`}>
            <div className='w-96 flex flex-col gap-12 text-center pt-4 md:text-right'>
                <h3 className='text-2xl font-bold'>Welcome in Our Kingdom!</h3>
                <p className=''>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vulputate in elit ut interdum. Donec ullamcorper cursus venenatis. Proin id rhoncus diam, vitae vehicula augue. Integer lacus odio, vestibulum finibus.</p>
                <div><Link to={'/register'}><ButtonB text={'Get Started Now'} click={() => { }} /></Link></div>
            </div>
            <div><img src={crown} alt='crown' className='w-72 md:w-60 rounded mb-8' /></div>
        </div>
    )
}
