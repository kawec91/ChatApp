import React from 'react'
import { Outlet } from 'react-router-dom'

export default function Main() {
    return (
        <main className='col-span-9'><Outlet /></main>
    )
}
