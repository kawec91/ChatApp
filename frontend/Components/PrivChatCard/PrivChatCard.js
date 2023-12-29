import React, { useEffect, useState } from 'react'
import readJsonFromServer from '../../Functions/readJsonFromServer/readJsonFromServer';
import PrivChat from '../PrivChat/PrivChat';
import decodePasswordV2 from '../../Functions/decodeText/decodeText';

export default function PrivChatCard({ object, openChat, choice }) {
    const [otheruser, setOtherUser] = useState();
    const [oImg, setOimg] = useState();

    function handleClick() {
        openChat(true);
        choice(otheruser?.id);
    }

    useEffect(() => {
        let user = JSON.parse(sessionStorage.getItem('user'));
        let ou = user.id === object.uid1 ? object.uid2 : object.uid1;
        readJsonFromServer(`http://localhost:8801/users/read/${ou}`, (r) => {
            if (r.length > 0) {
                setOtherUser(r[0]);
                r[0].profilePic === null ? setOimg("") : setOimg(decodePasswordV2(r[0].profilePic));
            }
        });
    }, []);
    return (
        <div className='flex gap-2 items-center cursor-pointer' onClick={() => { handleClick() }}>
            <div ></div>
            <img src={oImg} className='rounded-full w-20 h-20 bg-gray-600 object-cover' alt='Other User Pic' />
            <div>
                <div><p>{otheruser?.nickname} (ID: {otheruser?.id})</p></div>
                <div><p>LastMessage</p></div>
            </div>
        </div>
    )
}
