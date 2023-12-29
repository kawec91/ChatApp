import React from 'react';
import Accordion from '../../Accordion/Accordion';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import { bgColor } from '../../../colors';
import LandingLinks from '../../LandingLinks/LandingLinks';

export default function Faq() {
    return (
        <>
            <Header />
            <div className={`${bgColor} min-h-screen px-12 py-6 flex flex-col gap-4 items-center justify-center`}>
                <Accordion question={"Question 1?"} answer={'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'} />
                <Accordion question={"Question 2?"} answer={'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea'} />
                <Accordion question={"Question 3?"} answer={'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At'} />
                <Accordion question={"Question 4?"} answer={'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt'} />
            </div>
            <LandingLinks />
            <Footer />
        </>
    )
}
