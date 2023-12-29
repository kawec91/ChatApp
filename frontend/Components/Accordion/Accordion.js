import React, { useState } from 'react';
import arrowDown from '../../Assets/icons/arrowdown.png'
import arrowUp from '../../Assets/icons/arrowup.png'

export default function Accordion({ question, answer }) {
    const [isOpen, setOpen] = useState(false);

    function handleClick() {
        setOpen(!isOpen);
    }
    return (
        <div className='flex flex-col gap-4 text-white w-full transition ease-in-out duration-200'>
            <div className='cursor-pointer bg-gray-600 rounded p-4 flex items-center justify-between' onClick={() => { handleClick() }}>
                <div>{question}</div>
                <div>{isOpen === false ? <img src={arrowDown} alt='arrow-down' className='w-6' /> : <img src={arrowUp} alt='arrow-up' className='w-6' />}</div>
            </div>
            {isOpen === true ? <p className='bg-gray-600 p-4 rounded'>{answer}</p> : <></>}
        </div>
    )
}
