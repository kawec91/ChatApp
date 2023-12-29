import React, { useEffect } from 'react';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import LandingLinks from '../../LandingLinks/LandingLinks';
import Hero from '../../Hero/Hero';
import Gallery from '../../Gallery/Gallery';
import LandingUserStats from '../../LandingUserStats/LandingUserStats';
import LandingGeneralStats from '../../LandingGeneralStats/LandingGeneralStats';
import AppLayout from '../../AppPages/AppLayout/AppLayout';

export default function LandingPage() {
    useEffect(() => {

    });
    return (
        sessionStorage.getItem('logged') !== "1" ?
            <>
                <Header />
                <Hero />
                <LandingGeneralStats />
                <Gallery />
                <LandingLinks />
                <Footer />
            </> : <AppLayout />
    )
}
