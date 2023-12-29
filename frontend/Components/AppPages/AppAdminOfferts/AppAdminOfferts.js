import React, { useEffect, useState } from 'react'
import { bgColor } from '../../../colors'
import ButtonB from '../../ButtonB/ButtonB'
import readJsonFromServer from '../../../Functions/readJsonFromServer/readJsonFromServer';

export default function AppAdminOfferts() {
    const [offer, setOffer] = useState({ date: '', position: '', shortDetails: '' });
    const [offerts, setOfferts] = useState([]);
    //
    function handleChenges(e) {
        setOffer({
            ...offer,
            [e.target.name]: e.target.value,
        })
    }
    function sendOffer() {
        let myO = JSON.stringify(offer);

        readJsonFromServer(`http://localhost:8801/carrer/add/${myO}`, (r) => {
            // console.log(r)
        })
    }
    useEffect(() => {
        readJsonFromServer(`http://localhost:8801/carrer/all`, (r) => {
            let myList = [];
            r.forEach((item) => myList.push(<tr key={`carr-li-${item.date}-${item.position}`}>
                <td>{item.date}</td>
                <td>{item.position}</td>
                <td>{item.shortDetails}</td>
                <td>[ ASK FOR MORE ]</td>
            </tr>))

            setOfferts(myList);
        });
    }, []);
    return (
        <div className={`${bgColor} flex flex-col h-full`}>
            <form onSubmit={() => { sendOffer() }} className='p-4 flex gap-2'>
                <input type='date' name='date' onChange={(e) => { handleChenges(e) }} />
                <input type='text' placeholder='Position' name='position' onChange={(e) => { handleChenges(e) }} />
                <input type='text' placeholder='Short Details' className='w-full' name='shortDetails' onChange={(e) => { handleChenges(e) }} />
                <ButtonB text={'Add'} />
            </form>
            <div className='p-4'>
                <table className='w-full my-2 text-white'>
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
        </div>
    )
}
