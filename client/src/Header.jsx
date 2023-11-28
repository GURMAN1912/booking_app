import React, { useContext } from 'react'
import { UserContext } from './UserContext'
import { Link } from 'react-router-dom'


export default function Header() {
  const {user}=useContext(UserContext)
  return (
    <div>
    <header className="py-4 flex justify-between bg-gray-300">
      <Link to={"/"}  className=" p-2 flex items-center gap-1">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-68">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
      <span className="font-bold text-xl" >HotelHub</span>
      </Link>
      <div className="flex gap-2 border border-gray-500 rounded-full py-2 px-4 shadow-md shadow-gray-300">
        <div>Location</div>
        <div className="border-l border-gray-500"></div>
        <div>Dates</div>
        <div className="border-l border-gray-500"></div>
        <div>Add guest</div>
        <button className="bg-rose-500 text-white p-2 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </button>
      </div>
      <Link to={user?'/account':"/login"} className="flex items-center gap-2 border border-gray-500 rounded-full py-2 px-4 ">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />

      </svg>
      <div className="">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
</svg>
      </div>
      {!!user &&(
        <div>
          {user.name}
        </div>
      )}
      </Link>
    </header>
   </div>
  )
}
