import React, { useEffect, useState } from 'react';
import ButtonA from '../ButtonA/ButtonA';
import readJsonFromServer from '../../Functions/readJsonFromServer/readJsonFromServer';
import { bgColor, inputClasses } from '../../colors';
import codePasswordV2 from '../../Functions/encodeText/encodeText'
import MyMsg from '../MyMsg/MyMsg';
import NotMyMsg from '../NotMyMsg/NotMyMsg';


export default function PrivChat({ close, userId }) {
    const [dataMessages, setDataMessages] = useState([]);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState({ message: '', uid: '' });
    const [currentUser, setCurrentUser] = useState();

    function handleChenges(e) {
        setMessage({
            ...message,
            [e.target.name]: e.target.value,
            uid: currentUser.id,
        })
    }

    function sendMessage() {
        if (messages.length === 0) {
            let myO = { uid1: currentUser.id, uid2: userId, messages: [] }
            myO.messages.push(message);
            let outputElement = codePasswordV2(JSON.stringify(myO));


            readJsonFromServer(`http://localhost:8801/chats/add/${outputElement}`, (r) => {

            });
        } else {
            dataMessages.push(message);
            let myO = { uid1: currentUser.id, uid2: userId, messages: dataMessages }
            readJsonFromServer(`http://localhost:8801/chats/update/${codePasswordV2(JSON.stringify(myO))}`, (r) => {
                loadData(currentUser.id, userId);
                setMessage({ message: '', uid: '' });
                document.getElementsByName('message')[0].value = '';
            })
        }


    }
    function loadData(myId, oId) {
        readJsonFromServer(`http://localhost:8801/privChats/${myId}/${oId}`, (r) => {
            if (r.length > 0 && r.messages !== '0 Active Chats') {

                let allMessages = JSON.parse(r[0].messages);
                setDataMessages(allMessages);
                let myL = [];
                allMessages.forEach((item) => Number(item.uid) === Number(myId) ? myL.push(<MyMsg text={item.message} key={`msg-${item.message}`} />) : myL.push(<NotMyMsg text={item.message} key={`msg-${item.message}`} />));
                setMessages(myL);
            };
            if (r.messages === '0 Active Chats') console.log('r.message useEffect');
        });
    }

    useEffect(() => {
        let usr = JSON.parse(sessionStorage.getItem("user"));
        setCurrentUser(usr);
        loadData(usr.id, userId);
    }, [userId]);
    return (
        <div className={`h-screen w-full ${bgColor} absolute left-0 top-0 p-4 flex flex-col gap-2`}>
            <div className='p-4 flex flex-col gap-2 border border-cyan-600 overflow-y-auto h-full'>
                {messages}
            </div>
            <div className='flex gap-2 items-center justify-center'>
                <input type='text' placeholder='Message' name='message' className={`${inputClasses} w-full`} onChange={(e) => { handleChenges(e) }} />
                <ButtonA text={'Send'} click={() => { sendMessage() }} key={'btn-send'} />
            </div>
        </div>
    )
}
