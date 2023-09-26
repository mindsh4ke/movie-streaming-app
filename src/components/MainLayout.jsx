import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from './NavBar';

export default function MainLayout() {

  return (
    <div className=''>
      <NavBar/>
      <div className='w-screen overflow-hidden bg-neutral-900 select-none'>
        <Outlet />
      </div>
    </div>
  )
}
