import React, { useEffect, useState } from 'react'
import { bgColor } from '../../colors'
import LandingGeneralStatsCard from '../LandingGeneralStatsCard/LandingGeneralStatsCard';
import userIcon from '../../Assets/icons/user.png'
import guildsIcon from '../../Assets/icons/guilds.png'
import achivIcon from '../../Assets/icons/star-half.png'
import readJsonFromServer from '../../Functions/readJsonFromServer/readJsonFromServer';

export default function LandingGeneralStats() {
    const [usersNo, setUsersNo] = useState(0);
    const [guildsNo, setGuildsNo] = useState(0);
    const [achivNo, setAchivNo] = useState(0);

    //
    useEffect(() => {
        readJsonFromServer(`http://localhost:8801/users/all/length`, (r) => setUsersNo(r.usersLength));
        readJsonFromServer(`http://localhost:8801/guilds/all/length`, (r) => setGuildsNo(r.guildsLength));
        readJsonFromServer(`http://localhost:8801/achivments/all/length`, (r) => setAchivNo(r.achivmentsLength));
    }, []);
    return (
        <div className={`${bgColor} text-white border-t-[1px] border-b-[1px] border-white flex items-center justify-center gap-12 py-8`}>
            <LandingGeneralStatsCard number={usersNo} text={'Users'} img={userIcon} />
            <LandingGeneralStatsCard number={guildsNo} text={'Guilds'} img={guildsIcon} />
            <LandingGeneralStatsCard number={achivNo} text={'Achivments'} img={achivIcon} />
        </div>
    )
}
