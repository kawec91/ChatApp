import React, { useEffect, useState } from 'react';
import { bgColor } from '../../../colors';
import readJsonFromServer from '../../../Functions/readJsonFromServer/readJsonFromServer';
import PrivChatCard from '../../PrivChatCard/PrivChatCard';
import PrivChat from '../../PrivChat/PrivChat';

export default function AppMessages() {
    const [chatsList, setChatsList] = useState([]);
    const [showChat, setShowChat] = useState(false);
    const [choosenChat, setChosenChat] = useState(0);

    useEffect(() => {
        let user = JSON.parse(sessionStorage.getItem('user'));
        readJsonFromServer(`http://localhost:8801/mychats/${user.id}`, (r) => {
            if (r.message) setChatsList(r.message);
            if (r.length > 0) {
                let myL = [];
                r.forEach((item) => { myL.push(<PrivChatCard object={item} openChat={setShowChat} choice={setChosenChat} key={`priv-chat-${item.uid1}-${item.uid2}`} />) });
                setChatsList(myL);
            }
        });
    }, []);
    return (
        <div className={`${bgColor} h-screen flex flex-col text-white p-4 relative`}>
            {showChat === true ? <PrivChat userId={choosenChat} /> : <></>}
            {chatsList}
        </div>
    )
}
