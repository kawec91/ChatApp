import React, { useState } from 'react';
import ButtonA from '../ButtonA/ButtonA';
import readJsonFromServer from '../../Functions/readJsonFromServer/readJsonFromServer';
import { bgColor, inputClasses } from '../../colors';

export default function NewTicketForm({ close }) {
    const [ticket, setTicket] = useState({ name: '', path: '', message: '', status: 0, addby: '' });

    function handleChenges(e) {
        setTicket({
            ...ticket,
            [e.target.name]: e.target.value,
        });
    }
    function sendTicket() {
        let myO = ticket;
        let user = JSON.parse(sessionStorage.getItem('user'));
        ticket.addby = Number(user.id);

        readJsonFromServer(`http://localhost:8801/changelog/add/${JSON.stringify(myO)}`, (r) => {
            if (r.message === "Success.") close(false);
        });
    }


    return (
        <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center z-20 bg-black/90'>
            <form onSubmit={() => { sendTicket() }} className={`flex flex-col p-4 items-center justify-center gap-2 border border-cyan-600 ${bgColor}`}>
                <input type='text' placeholder='Title' name='name' onChange={(e) => { handleChenges(e) }} className={inputClasses} />
                <input type='text' placeholder='Error Path (Optional)' name='path' onChange={(e) => { handleChenges(e) }} className={`${inputClasses} ${bgColor}`} />
                <textarea placeholder='Message' name='message' onChange={(e) => { handleChenges(e) }} className={inputClasses}></textarea>
                <ButtonA text={'Send'} click={() => { }} />
            </form>
        </div>
    )
}
