import React, { useState } from 'react';
import ButtonB from '../ButtonB/ButtonB';
import ButtonA from '../ButtonA/ButtonA';

export default function SearchResultUserCard({ item, chat, cUser }) {
    function handleClick() {
        chat(true);
        cUser(item.id);
    }
    return (
        <div className='flex w-full items-center justify-between'>

            <div>
                <h3>{item.nickname} (ID: {item.id})</h3>
            </div>
            <div className='flex gap-2'>
                <ButtonB text={'Message'} click={() => { handleClick() }} />
                <ButtonA text={'Invite'} click={() => { }} />
            </div>
        </div>
    )
}
