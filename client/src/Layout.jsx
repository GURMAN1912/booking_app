import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div className=' bg-gray-100 flex flex-col  min-h-screen '>
      <Header/>
      <Outlet/>
    </div>
  )
}
