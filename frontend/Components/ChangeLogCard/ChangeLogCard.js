import React, { useEffect, useState } from 'react'
import ButtonA from '../ButtonA/ButtonA'
import readJsonFromServer from '../../Functions/readJsonFromServer/readJsonFromServer'
import ChangeLogCardAdminMenu from '../ChangeLogCardAdminMenu/ChangeLogCardAdminMenu';

export default function ChangeLogCard({ object, updateScreen }) {
    const [user, setUser] = useState();
    function deleteItem(id) {
        readJsonFromServer(`http://localhost:8801/changelog/delete/${id}`, (r) => {
            //console.log(r);
            updateScreen();
        })
    }
    useEffect(() => {
        let u = JSON.parse(sessionStorage.getItem('user'))
        setUser(u);
    }, []);
    return (
        <div className='flex items-center justify-between p-2 w-full relative'>
            {user?.id === object.addby ? <div className={'absolute right-2 top-2 z-10'} ><ButtonA text={'Delete'} click={() => deleteItem(object.id)} /></div> : <></>}
            <div className='w-full '>
                <h3 className='uppercase text-lg py-2 '>{object.name}</h3>
                <hr />
                <div className='flex items-center gap-2'>
                    <label>Path:</label>
                    <p>{object.path}</p>
                </div>
                <div className='flex gap-2'>
                    <label>Description:</label>
                    <p>{object.message}</p>
                </div>
                <div className='flex items-center gap-2'>
                    <label>Add by:</label>
                    <p>{object.addby}</p>
                </div>
                <div className='flex items-center gap-2'>
                    <label>Status: </label>
                    <p>{object.status === 0 ? "Waiting..." : object.status === 1 ? "In progress..." : "Done"}</p>
                </div>
                {user?.role === 'admin' ? <ChangeLogCardAdminMenu itemId={object.id} /> : <></>}
            </div>

        </div>
    )
}
