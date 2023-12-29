import React, { useState } from 'react';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import { bgColor, inputClasses } from '../../../colors';
import ButtonA from '../../ButtonA/ButtonA';
import readJsonFromServer from '../../../Functions/readJsonFromServer/readJsonFromServer';
import codePasswordV2 from '../../../Functions/encodeText/encodeText';

export default function RegisterPage() {
    const [user, setUser] = useState({ email: '', login: '', nickname: '', password: '' });
    //Handle Changes
    function handleChenges(e) {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    }
    //Insert Data to DB
    function saveData() {
        let obj = {
            email: user.email,
            login: user.login,
            nickname: user.nickname,
            password: codePasswordV2(user.password),
            role: 'member',
            profilePic: '',
            gloryPoints: 0,
        }

        readJsonFromServer(`http://localhost:8801/users/new/${JSON.stringify(obj)}`, (r) => {
            //console.log(r);
        });
    }
    return (
        <>
            <Header />
            <div className={`h-screen ${bgColor} flex flex-col items-center justify-center`}>
                <form onSubmit={() => { saveData() }} className='flex flex-col border border-cyan-600 items-center gap-4 py-4 px-8'>
                    <h3 className='text-cyan-600 text-3xl uppercase'>Register</h3>
                    <input type='email' name='email' placeholder='Email' onChange={(e) => { handleChenges(e) }} className={inputClasses} />
                    <input type='text' name='login' placeholder='Login' onChange={(e) => { handleChenges(e) }} className={inputClasses} />
                    <input type='text' name='nickname' placeholder='Nickname' onChange={(e) => { handleChenges(e) }} className={inputClasses} />
                    <input type='password' name='password' placeholder='Password' onChange={(e) => { handleChenges(e) }} className={inputClasses} />
                    <input type='password' name='password' placeholder='Confirm Password' onChange={(e) => { handleChenges(e) }} className={inputClasses} />
                    <ButtonA text={'Register'} click={() => { }} />
                </form>
            </div>
            <Footer />
        </>
    )
}
