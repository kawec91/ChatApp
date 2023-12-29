import React from 'react';
import { bgColor } from '../../colors';
import screen1 from '../../Assets/images/06.jpg'
import screen2 from '../../Assets/images/07.jpg'
import screen3 from '../../Assets/images/01.jpg'
import screen4 from '../../Assets/images/05.jpg'
import screen5 from '../../Assets/images/04.jpg'
import screen6 from '../../Assets/images/02.jpg'

export default function Gallery() {
    return (
        <div className={`text-white h-screen ${bgColor} px-12 flex justify-center items-center`}>
            <div className='grid grid-cols-3 grid-rows-3 w-4/5 h-4/5 gap-4'>
                <img src={screen1} alt='screen-1' className='col-start-1 col-end-1 row-start-1 row-end-1 object-cover w-full h-full rounded' />
                <img src={screen2} alt='screen-1' className='col-start-2 col-end-4 row-start-1 row-end-1 object-cover w-full h-full rounded' />
                <img src={screen3} alt='screen-1' className='col-start-1 col-end-3 row-start-2 row-end-2 object-cover w-full h-full rounded' />
                <img src={screen4} alt='screen-1' className='col-start-3 col-end-4 row-start-2 row-end-4 object-cover w-full h-full rounded' />
                <img src={screen5} alt='screen-1' className='col-start-1 col-end-2 row-start-3 row-end-4 object-cover w-full h-full rounded' />
                <img src={screen6} alt='screen-1' className='col-start-2 col-end-3 row-start-3 row-end-4 object-cover w-full h-full rounded' />
            </div>
        </div>
    )
}
