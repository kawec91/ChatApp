import React from 'react'
import AppLeftNav from '../../AppLeftNav/AppLeftNav';
import Main from '../../Main/Main';
import AppRightNav from '../../AppRightNav/AppRightNav';

export default function AppLayout() {
    return (
        <div className='grid grid-cols-12'>
            <AppLeftNav />
            <Main />
            <AppRightNav />
        </div>

    )
}
