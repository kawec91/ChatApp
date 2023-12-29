import React, { useEffect } from 'react'
import { bgColor } from '../../colors'
import readJsonFromServer from '../../Functions/readJsonFromServer/readJsonFromServer';

export default function LandingUserStats() {
    useEffect(() => {
        readJsonFromServer(`http://localhost:8801/changelog/stats/byuserid`, (r) => {
            console.log(r)
        });
    }, [])
    //TODO This Component
    return (
        <div className={`${bgColor} h-screen text-white px-12 flex flex-col items-center`}>
            <p className='border-t-[1px] border-b-[1px] border-white text-center font-bold text-2xl w-4/5 py-4'>USER STATS</p>
            <div className='flex flex-col'>
                <div></div>
                <div className='w-full min-h-10 bg-white'></div>
            </div>
        </div>
    )
}
