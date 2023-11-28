import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
export default function Indexpage(){
    const [places,setPlaces]=useState([]);
    useEffect(()=>{
        axios.get("/places").then(response=>{
            setPlaces(response.data)
        })
    },[])
    return(
    <div className="m-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {places.length>0 &&places.map(place=>(
            <Link key={place._id} to={"/place/"+place._id} className= " rounded-xl p-2 hover:bg-white hover:scale-105 ">
                <div className="bg-grey-500 mb-2 rounded-2xl flex">
                    {place.photos?.[0] &&(
                        <img className="rounded-2xl object-cover aspect-square "    
                            src={"http://localhost:4000/uploads/"+place.photos?.[0]}></img>
                    )}

                </div>
                <h2 className="font-bold leading-3">
                    {place.address}
                </h2>
                <h3 className="text-sm text-gray-500">
                {place.title}
                </h3>
                <div className="mt-1">
                    <span className="font-bold">${place.price}</span>
                </div>
            </Link>
        ))}    
   </div>
    )
}