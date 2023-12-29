import React, { useEffect } from 'react'
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import { bgColor } from '../../../colors';
import LandingLinks from '../../LandingLinks/LandingLinks';

export default function AppLogout() {
    useEffect(() => {
        sessionStorage.removeItem('logged');
        sessionStorage.removeItem('user');
    }, []);
    return (
        <>
            <Header />
            <div className={`${bgColor} min-h-screen text-white flex flex-col items-center p-4`}>
                <p>Thanks for visit us. See ya later... </p>
            </div>
            <LandingLinks />
            <Footer />
        </>
    )
}
