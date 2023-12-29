import React, { useEffect, useState } from 'react'
import { bgColor, inputClasses } from '../../../colors'
import SectionTItle from '../../SectionTitle/SectionTItle'
import ButtonA from '../../ButtonA/ButtonA'
import readJsonFromServer from '../../../Functions/readJsonFromServer/readJsonFromServer';
import SearchResultUserCard from '../../SearchResultUserCard/SearchResultUserCard';
import PrivChat from '../../PrivChat/PrivChat';

export default function AppSearchUser() {
    const [searchItem, setSearchItem] = useState({ search: '' });
    const [searchResults, setSearchResults] = useState([]);
    const [isChatOpen, openChat] = useState(false);
    const [choosenUser, setChosenUser] = useState(0);
    function handleChanges(e) {
        setSearchItem({
            ...searchItem,
            [e.target.name]: e.target.value,
        });
        //Optional Search on typing
        //search();
    }
    function search() {
        let myO = JSON.stringify(searchItem);
        readJsonFromServer(`http://localhost:8801/search/${myO}`, (r) => {
            let myL = [];
            //TODO: Some Style
            r.forEach((item) => myL.push(<SearchResultUserCard item={item} chat={openChat} cUser={setChosenUser} />));

            setSearchResults(myL);
        });

    }

    return (
        <div className={`${bgColor} flex flex-col h-screen text-white relative`}>
            {isChatOpen === true ? <PrivChat close={openChat} userId={choosenUser} /> : <></>}
            <SectionTItle text={'Search'} />
            <hr />
            <div className='flex p-2 border-b-[1px] border-white gap-2'>
                <input type='text' className={`${inputClasses} w-full`} name='search' onChange={(e) => { handleChanges(e) }} />
                <ButtonA text={'Search'} click={() => { search() }} />
            </div>
            <div className='p-4'>
                {searchResults}
            </div>
        </div>
    )
}
