import React, { useState } from 'react';
import Header from '../../Header/Header';
import LandingLinks from '../../LandingLinks/LandingLinks';
import Footer from '../../Footer/Footer';
import { bgColor, inputClasses } from '../../../colors';
import ButtonA from '../../ButtonA/ButtonA';
import readJsonFromServer from '../../../Functions/readJsonFromServer/readJsonFromServer';

export default function Contact() {
    const [mail, setMail] = useState({ email: '', thema: '', message: '' })
    //
    function handleChenges(e) {
        setMail({
            ...mail,
            [e.target.name]: e.target.value,
        })
    }
    //
    function sendMessage() {
        let myO = JSON.stringify(mail);

        readJsonFromServer(`http://localhost:8801/contact/send/${myO}`, (r) => {
            // console.log(r);
        })
    }
    return (
        <>
            <Header />
            <div className={`${bgColor} min-h-screen text-white px-12 flex flex-col items-center justify-center`}>
                <form onSubmit={() => { sendMessage() }} className='flex flex-col items-center justify-center gap-4 border border-cyan-600 p-8'>
                    <h3 className='uppercase text-3xl text-cyan-600'>Contact</h3>
                    <input type='text' placeholder='Email' name='email' onChange={(e) => { handleChenges(e) }} className={`${inputClasses}`} />
                    <input type='text' placeholder='Thema' name='thema' onChange={(e) => { handleChenges(e) }} className={`${inputClasses}`} />
                    <textarea placeholder='Message' name='message' onChange={(e) => { handleChenges(e) }} className={`${inputClasses}`}></textarea>
                    <ButtonA text={'Send'} />
                </form>
            </div>
            <LandingLinks />
            <Footer />
        </>
    )
}
