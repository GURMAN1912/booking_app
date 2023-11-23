import React from 'react'
import { useState } from 'react';
export default function PlaceGallery({place}) {
    const [showAllPlaces, setShowAllPlaces] = useState(false);
    function handleClick() {
        setShowAllPlaces(false);
      }
    
      if (showAllPlaces) {
        return (
          <div className="absolute  bg-black inset-0 min-h-screen ">
            <div className="bg-black grid p-4 gap-4 ">
              <div>
                <h2 className="text-3xl text-white">Photos of{place.title}</h2>
                <button
                  onClick={handleClick}
                  className="fixed right-12  flex gap-1 p-2 top-4 rounded-xl shadow-black shadow-xl bg-white  "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  Close Photos
                </button>
              </div>
              {place?.photos?.length > 0 &&
                place.photos.map((photo) => (
                  <div>
                    <img
                      className="bg-black"
                      src={"http://localhost:4000/uploads/" + photo}
                    ></img>
                  </div>
                ))}
            </div> 
          </div>
        );
      }
    
  return (
    <div className="relative">
        <div className="pt-1 pb-10 grid gap-2 grid-cols-[2fr_1fr] rounded-2xl">
          <div>
            {place.photos?.[0] && (
              <div className="">
                <img
                  className="object-cover aspect-square "
                  src={"http://localhost:4000/uploads/" + place.photos?.[0]}
                ></img>
              </div>
            )}
          </div>
          <div className="grid ">
            {place.photos?.[1] && (
              <img
                className="object-cover aspect-square "
                src={"http://localhost:4000/uploads/" + place.photos?.[1]}
              ></img>
            )}
            <div className="overflow-hidden">
              {place.photos?.[2] && (
                <img
                  className="relative top-2 object-cover aspect-square "
                  src={"http://localhost:4000/uploads/" + place.photos?.[2]}
                ></img>
              )}
            </div>
          </div>
        </div>
        <button
          onClick={() => setShowAllPlaces(true)}
          className="flex gap-2 absolute bottom-12 right-8 py-2 px-4 bg-white rounded-2xl shadow-md shadow-gray-500 "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5"
            />
          </svg>
          Show more photos
        </button>
      </div>
  )
}
