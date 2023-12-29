import React, { useCallback, useEffect, useState } from 'react'
import { bgColor } from '../../../colors'
import ButtonA from '../../ButtonA/ButtonA'
import SectionTItle from '../../SectionTitle/SectionTItle'
import NewTicketForm from '../../NewTicketForm/NewTicketForm';
import readJsonFromServer from '../../../Functions/readJsonFromServer/readJsonFromServer';
import ChangeLogCard from '../../ChangeLogCard/ChangeLogCard';

export default function ChangeLog() {
    const [showNewTicket, setShowNewTicket] = useState(false);
    const [ticketList, setTicketList] = useState([]);
    //TODO: SomeStyle
    //TODO: Features Edit Tickets By User if state is waitnig
    //TODO: Features Change state of ticket by admin
    //TODO: Features Move Ticket to Archiv
    const loadChangelogData = useCallback(() => {
        readJsonFromServer(`http://localhost:8801/changelog/all`, (r) => {
            let myL = [];
            r.forEach((item) => myL.push(<ChangeLogCard object={item} updateScreen={loadChangelogData} key={`${item.id}-${item.name}-${item.addby}`} />));
            setTicketList(myL);
        });
    }, []);

    useEffect(() => {
        console.log(Date.now())
        loadChangelogData();
    }, [loadChangelogData]);
    return (
        <div className={`max-h-screen ${bgColor} text-white relative flex flex-col`}>
            {showNewTicket === true ? <NewTicketForm close={setShowNewTicket} /> : <></>}
            <SectionTItle text={'ChangeLog'} />
            <div className='absolute right-4 top-3'><ButtonA text={'New Ticket'} click={() => { setShowNewTicket(true) }} /></div>
            <hr />
            <h3 className='uppercase p-2 text-center text-lg'>Ticket List</h3>
            <hr />
            <div className='flex flex-col overflow-y-auto'>
                {ticketList}
            </div>

        </div>
    )
}
