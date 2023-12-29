import React, { useCallback, useEffect, useState } from 'react'
import readJsonFromServer from '../../Functions/readJsonFromServer/readJsonFromServer';
import OnlineUserCard from '../OnlineUserCard/OnlineUserCard';

export default function OnlineUsers() {
    const [onlineUserList, setOnlineUserList] = useState([]);
    useEffect(() => {
        readJsonFromServer(`http://localhost:8801/onlinePlayers`, (r) => {
            let myTime = Date.now();
            let myL = []
            for (let i of r) {
                let diff = myTime - i.lastOnline
                let selectedTime = new Date(diff).getUTCMinutes()
                if (selectedTime < 5) {
                    myL.push(<OnlineUserCard item={i} key={`ou-${i.nickname}-${i.id}`} />)
                }
            }
            setOnlineUserList(myL);
        });
    }, [onlineUserList]);
    return (
        <div className='text-white text-center'>
            <h3>Online</h3>
            <hr />
            <div>
                {onlineUserList}
            </div>
        </div>
    )
}
