import React, { useEffect, useState } from 'react';
import LandingLinks from '../../LandingLinks/LandingLinks';
import Footer from '../../Footer/Footer';
import Header from '../../Header/Header';
import { bgColor } from '../../../colors';
import readJsonFromServer from '../../../Functions/readJsonFromServer/readJsonFromServer';

export default function Carrer() {
    const [offerts, setOfferts] = useState([]);
    //
    useEffect(() => {
        readJsonFromServer(`http://localhost:8801/carrer/all`, (r) => {
            let myList = [];
            r.forEach((item) => myList.push(<tr>
                <td>{item.date}</td>
                <td>{item.position}</td>
                <td>{item.shortDetails}</td>
                <td>[ ASK FOR MORE ]</td>
            </tr>))

            setOfferts(myList);
        });
    }, []);
    return (
        <>
            <Header />
            <div className={`${bgColor} min-h-screen text-white px-12 py-6`}>
                <h3 className='text-3xl uppercase text-center border-white border-t-[1px] border-b-[1px] py-6'>Carrer</h3>
                <table className='w-full my-2'>
                    <thead>
                        <tr>
                            <td>Data</td>
                            <td>Positon</td>
                            <td>Info</td>
                            <td>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        {offerts}
                    </tbody>
                </table>
            </div>
            <LandingLinks />
            <Footer />
        </>
    )
}
