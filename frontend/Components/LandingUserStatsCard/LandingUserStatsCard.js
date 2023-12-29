import React from 'react'

export default function LandingUserStatsCard({ item }) {
    return (
        <div>
            <h3>{item.statsName}</h3>
            <div className='flex gap-4'>
                <div>
                    <div>
                        <img src={item.profilePic} className='w-12 h-12 object-cover border border-white' />
                        <p>{item.nickname} (ID: {item.id})</p>
                    </div>
                </div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}
