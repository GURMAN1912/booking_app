import React, { useEffect, useState } from "react";
import AccountNav from "../components/AccountNav";
import PlaceImg from "../components/PlaceImg";
import BookingDetail from "../components/BookingDetail";
import { format } from "date-fns";

import axios from "axios";
import { Link } from "react-router-dom";
export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    axios.get("/bookings").then((response) => {
      setBookings(response.data);
    });
  }, []);
  return (
    <div>
      <AccountNav />
      <div className="px-4 flex flex-col gap-3">
        {bookings.length > 0 &&
          bookings.map((booking) => (
            <Link key={booking._id}
              to={`/account/bookings/${booking._id}`}
              className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden"
            >
              <div className="w-48">
                <PlaceImg place={booking.place} />
              </div>
              <div className="py-3 text-sm">
                <h2 className="text-xl mb-2 border-gray-400 border-b-2">
                  {booking.place.title}
                </h2>
                <BookingDetail booking={booking}></BookingDetail>

                <div className="py-3">Total price:{booking.price}rs</div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
