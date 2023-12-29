import React from 'react'
import Header from '../../Header/Header'
import LandingLinks from '../../LandingLinks/LandingLinks'
import Footer from '../../Footer/Footer'
import { bgColor } from '../../../colors'

export default function PrivacyPolicy() {

    //TODO Privacy Text
    return (<>
        <Header />
        <div className={`${bgColor} min-h-screen text-white px-12`}>PrivacyPolicy</div>
        <LandingLinks />
        <Footer />
    </>
    )
}
