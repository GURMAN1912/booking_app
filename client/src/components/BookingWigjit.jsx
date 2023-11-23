import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays'
import { Navigate } from 'react-router-dom';
import axios from "axios";
import { UserContext } from '../UserContext';


export default function BookingWigjit({place}) {
    const[checkIn,setCheckIn]=useState("");
    const[checkOut,setCheckOut]=useState("");
    const[maxGuests,setMaxGuests]=useState(1);
    const[name,setName]=useState("");
    const[phone,setPhone]=useState("")
    const [redirect,setRedirect]=useState("")
    const {user}=useContext(UserContext);
    useEffect(()=>{
      if(user){
        setName(user.name)
      }
    },[user])
    let numberOfDays=0;
    if(checkIn && checkOut){
      numberOfDays=differenceInCalendarDays(new Date(checkOut),new Date(checkIn))
    }
    async function BookThisPlace(){
      console.log("clicked")
      const response=await axios.post("/bookings",{
        checkIn,checkOut,maxGuests,name,phone,
        place:place._id,
        price:numberOfDays*place.price,
      })
      const bookingId=response.data._id;      
      setRedirect(`/account/bookings/${bookingId}`)
    }
    if(redirect){
      return <Navigate to={redirect} /> 
    }

  return (   <>
          <div className="text-2xl text-center">
            Price:{place.price}rs/per night
          </div>
          <div className="border rounded-2xl mt-4">
            <div className="flex">
              <div className="py-3 px-4">
                <label htmlFor="">Check in:</label>
                <input type="date" value={checkIn} onChange={ev=>setCheckIn(ev.target.value)} />
              </div>
              <div className="py-3 px-4">
                <label htmlFor="">Check out:</label>
                <input type="date" value={checkOut} onChange={ev=>setCheckOut(ev.target.value)} />
              </div>
            </div>
              <div className="py-3 px-4">
                <label htmlFor="">Number of guests</label>
                <input type="Number" value={maxGuests} onChange={ev=>setMaxGuests(ev.target.value)} />
              </div>
              {numberOfDays>0 && (
                 <div className="py-3 px-4">
                 <label htmlFor="">Your Name</label>
                 <input type="text" value={name} onChange={ev=>setName(ev.target.value)} />
                <label htmlFor="">Mobile</label>
                <input type="number" value={phone} onChange={ev=>setPhone(ev.target.value)} />

               </div>
              )}
              <button onClick={BookThisPlace} className="primary">Book now
              {numberOfDays>0 &&(
                <span className='px-3'>{numberOfDays*place.price}rs </span>
              )}
              </button>
          </div>
  </> 
  )
}
