import React, { useState } from 'react'
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import { bgColor, inputClasses } from '../../../colors';
import ButtonA from '../../ButtonA/ButtonA';
import readJsonFromServer from '../../../Functions/readJsonFromServer/readJsonFromServer';
import codePasswordV2 from '../../../Functions/encodeText/encodeText';
import AppLayout from '../../AppPages/AppLayout/AppLayout';
import lastOnlineUpdateByEmail from '../../../Functions/lastOnlineUpdateByEmail/lastOnlineUpdateByEmail';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const [user, setUser] = useState({ email: '', password: '', time: 0 });
    const navigate = useNavigate();
    //
    function handleChenges(e) {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        })

    }

    //Login
    function loginHandle() {
        let myO = { email: user.email, password: codePasswordV2(user.password) }
        //
        lastOnlineUpdateByEmail(user.email);
        //
        readJsonFromServer(`http://localhost:8801/users/login/${JSON.stringify(myO)}`, (r) => {
            if (r.length > 0) {
                sessionStorage.setItem('logged', "1");
                let inputUser = r[0];
                let user = {
                    id: inputUser.id,
                    login: inputUser.login,
                    nickname: inputUser.nickname,
                    email: inputUser.email,
                    role: inputUser.role,
                    profilePic: inputUser.profilePic
                }
                sessionStorage.setItem('user', JSON.stringify(user));

            }
        });
    }

    //TODO: Password recovery
    return (
        sessionStorage.getItem('logged') !== "1" ?
            <>
                <Header />
                <div className={`${bgColor} h-screen flex flex-col items-center justify-center`}>
                    <form onSubmit={() => { loginHandle() }} className='flex flex-col items-center justify-center gap-4 border border-cyan-600 p-8'>
                        <h3 className='uppercase text-3xl text-cyan-600'>Login</h3>
                        <input type='text' placeholder='Email' name='email' className={`${inputClasses}`} onChange={(e) => { handleChenges(e) }} />
                        <input type='password' placeholder='Password' name='password' onChange={(e) => { handleChenges(e) }} className={`${inputClasses}`} />
                        <ButtonA type='submit' text={'Login'} click={() => { }} />
                    </form>
                </div >
                <Footer />
            </> : <AppLayout />
    )
}
