import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PlaceGallery from '../components/PlaceGallery'
import { format } from "date-fns";
import BookingDetail from '../components/BookingDetail';
export default function BookingPage() {
    const {id}=useParams()
    const[booking,setBooking]=useState(null)
    useEffect(()=>{
      if(id){
        axios.get("/bookings").then(response=>{
          const foundBooking=response.data.find(({_id})=>_id===id);
          if(foundBooking){
            setBooking(foundBooking)
          }
        })
      }
    },[id])
    if(!booking){
      return '';
    }
    console.log(booking)
  return (
      <div className="mt-4 bg-gray-100 p-8">
      <h1 className="text-3xl">{booking.place.title}</h1>
      <a
        target="_blank"
        className="my-2 block font-semibold underline"
        href={"http://maps.google.com/?q=" + booking.place.address}
      >
        {booking.place.address}
      </a>
      <div  className='bg-gray-200 rounded-2xl flex justify-between p-4'>
        <div>
          <h2 className='text-xl'>Your Booking Information:</h2>
        <BookingDetail booking={booking}></BookingDetail>
        </div>
        <div className='bg-primary text-white p-2 rounded-2xl'>
          Total Price:{booking.price}
        </div>

      </div>
      <PlaceGallery place={booking.place}></PlaceGallery>
      
    </div>
  )
}
