import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PlaceGallery from "../components/PlaceGallery";
import BookingWigjit from "../components/BookingWigjit";

export default function PlacePage() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  // const [showAllPlaces, setShowAllPlaces] = useState(false);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/places/${id}`).then((response) => {
      setPlace(response.data);
    });
  }, [id]);

  if (!place) return "";
  // const len=place.photo.length();
  // console.log(len)
 
  return (
    <div className="mt-4 bg-gray-100 p-8">
      <h1 className="text-3xl">{place.title}</h1>
      <a
        target="_blank"
        className="my-2 block font-semibold underline"
        href={"http://maps.google.com/?q=" + place.address}
      >
        {place.address}
      </a>
      <PlaceGallery place={place}></PlaceGallery>
      <div className="mt-8 grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr]">
        <div className="">
          <h2 className="text-2xl font-semibold mb-5 ">Description</h2>
          {place.description}
          <div className="mt-2">
            Check-in:{place.checkIn}
            <br />
            Check-Out:{place.checkOut}
            <br />
            Max number of guests:{place.maxGuests}
          </div>
        </div>

          <div className="bg-white shadow p-4 rounded-2xl">
            <BookingWigjit place={place}></BookingWigjit>
          </div>
      </div>
        <div>
          <div>
          <h2 className="text-2xl font-semibold mb-5 ">Extra info </h2>
          </div>
          <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">
          {place.extraInfo}
          </div>
        </div>
    </div>
  );
}
