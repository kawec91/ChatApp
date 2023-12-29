import React, { useEffect, useState } from 'react'
import decodePasswordV2 from '../../Functions/decodeText/decodeText';

export default function OnlineUserCard({ item }) {
    const [pic, setPic] = useState("");
    useEffect(() => {
        item.profilePic === null ? setPic("") : setPic(decodePasswordV2(item.profilePic));
    }, [item])
    return (
        <div className='flex items-center gap-2 px-2 py-1'>
            <div className='relative'>
                <img src={pic} alt='profile pic' className='w-12 h-12 rounded-md object-cover ' />
                <div className='h-4 w-4 rounded-full bg-green-700 absolute bottom-1 right-1 z-10 border-2 border-white'></div>
            </div>


            {item.nickname} (ID: {item.id})
        </div>
    )
}
