import React from 'react'
import ButtonColor from '../ButtonColor/ButtonColor'
import readJsonFromServer from '../../Functions/readJsonFromServer/readJsonFromServer';

export default function ChangeLogCardAdminMenu({ itemId }) {
    function handleClick(move, id) {
        switch (move) {
            case 1:
                readJsonFromServer(`http://localhost:8801/changelog/status/2/${id}`, (r) => {
                    console.log('Changelog Admin Move:', r);
                })
                window.location.reload();
                break;
            case 2:
                readJsonFromServer(`http://localhost:8801/changelog/delete/${id}`, (r) => {
                    console.log('Changelog Admin Move:', r);
                })
                window.location.reload();
                break;
            default:
                readJsonFromServer(`http://localhost:8801/changelog/status/1/${id}`, (r) => {
                    console.log('Changelog Admin Move:', r);
                })
                window.location.reload();
                break;
        }
    }
    return (
        <div className='flex gap-2 items-center pt-2'>
            <ButtonColor click={() => { handleClick(0, itemId) }} text={'Start'} bgColor={'bg-transparent'} borderColor={'border-green-500'} textColor={'text-green-500'} />
            <ButtonColor click={() => { handleClick(1, itemId) }} text={'Finish'} bgColor={'bg-transparent'} borderColor={'border-yellow-500'} textColor={'text-yellow-500'} />
            <ButtonColor click={() => { handleClick(2, itemId) }} text={'Delete'} bgColor={'bg-transparent'} borderColor={'border-red-500'} textColor={'text-red-500'} />
        </div>
    )
}
