import React from 'react'
import { bgColor } from '../../colors'
import { Link } from 'react-router-dom'

export default function LandingLinks() {
    return (
        <div className={`${bgColor} px-12 py-20 text-gray-600 font-bold uppercase flex items-center justify-center border-t-[1px] border-white`}>
            <table>
                <tbody>
                    <tr>
                        <td><Link to={'/contact'} className='hover:text-cyan-600'>Contact</Link></td>
                        <td className='px-4'><Link to={'/privacy'} className='hover:text-cyan-600'>Privacy Policy</Link></td>
                        <td><Link to={'https://github.com'} className='hover:text-cyan-600' target='blank'>Github</Link></td>
                    </tr>
                    <tr>
                        <td><Link to={'/carrer'} className='hover:text-cyan-600'>Carrer</Link></td>
                        <td className='px-4'><Link to={'/faq'} className='hover:text-cyan-600'>FAQ</Link></td>
                        <td><Link to={'/'} className='hover:text-cyan-600'></Link></td>
                    </tr>
                </tbody>
            </table >
        </div >
    )
}
