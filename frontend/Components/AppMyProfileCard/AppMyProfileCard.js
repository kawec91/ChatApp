import React, { useEffect, useState } from 'react'
import decodePasswordV2 from '../../Functions/decodeText/decodeText';

export default function AppMyProfileCard() {
    const [nickname, setNickname] = useState('');
    const [uid, setUid] = useState(0);
    const [proPic, setProPic] = useState("");
    useEffect(() => {
        let user = JSON.parse(sessionStorage.getItem('user'));
        setUid(user.id);
        setNickname(user.nickname)
        user.profilePic === null ? setProPic("") : setProPic(decodePasswordV2(user.profilePic));

    }, []);
    return (
        <div className='flex flex-col items-center p-2 cursor-pointer'>
            <img src={proPic} alt='User Pic' className='rounded-full h-20 w-20 object-cover' />
            <p className='text-xs'>{nickname}</p>
            <p className='text-sm'>ID: {uid}</p>
        </div>
    )
}
