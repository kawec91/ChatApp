import React, { useEffect, useState } from 'react'
import { bgColor, inputClasses } from '../../../colors'
import ButtonB from '../../ButtonB/ButtonB'
import readJsonFromServer from '../../../Functions/readJsonFromServer/readJsonFromServer';
import MyMsg from '../../MyMsg/MyMsg';
import NotMyMsg from '../../NotMyMsg/NotMyMsg';

export default function AppChat() {
    const [messages, setMessages] = useState([]);
    const [msg, setMsg] = useState({ message: '', uid: 0, date: '' });
    //
    function handleChenges(e) {

        setMsg({
            ...msg,
            [e.target.name]: e.target.value,
            date: '-',
        })
    }
    //Send MSG
    function sendMessage() {
        let myO = msg;
        let user = JSON.parse(sessionStorage.getItem('user'));
        myO.uid = user.id;
        readJsonFromServer(`http://localhost:8801/chat/message/${JSON.stringify(myO)}`, (r) => {
            //console.log(r);
        })
    }

    useEffect(() => {
        let user = JSON.parse(sessionStorage.getItem('user'));
        readJsonFromServer(`http://localhost:8801/chat/all`, (r) => {
            let myL = [];
            r.forEach((item) => item.uid === user.id ? myL.push(<MyMsg text={item.message} key={`msg-${item.message}`} />) : myL.push(<NotMyMsg text={item.message} key={`msg-${item.message}`} />));
            setMessages(myL);
        });
    }, []);

    return (
        <div className={`p-4 ${bgColor} h-screen flex flex-col gap-4`}>
            <div className='w-full h-full text-white border border-cyan-600 p-4 flex flex-col gap-2 overflow-y-auto'>
                {messages}
            </div>
            <div>
                <form className='flex gap-2' onSubmit={() => { sendMessage() }}>
                    <input type='text' className={`${inputClasses} w-full`} name='message' onChange={(e) => {
                        handleChenges(e);
                    }} />
                    <ButtonB text={'Send'} />
                </form>
            </div>
        </div>
    )
}
