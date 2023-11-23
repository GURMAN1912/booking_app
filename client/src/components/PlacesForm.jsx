import React, { useEffect } from 'react'
import Perks from "./Perks.jsx";
import axios from "axios";
import PhotoUploader from './PhotoUploader.jsx';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { useState } from 'react';
import AccountNav from './AccountNav.jsx';

export default function PlacesForm() {
  const {id}=useParams();
  console.log(id);
    // console.log(actionOrId);
    const[title,setTitle]=useState("");
    const[address,setAddress]=useState("");
    const[addedPhotos,setAddedphoto]=useState("")
    const[description,setDescription]=useState("");
    const[perks,setPerks]=useState("");
    const[extraInfo,setExtraInfo]=useState("");
    const[checkIn,setCheckIn]=useState("");
    const[checkOut,setCheckOut]=useState("");
    const[maxGuests,setMaxGuests]=useState(1);
    const[photoLink,SetPhotoLink]=useState("");
    const[price,setPrice]=useState(100)
  
    const[redirectToPlaceList,setRedirectToPlaceList]=useState(false)
    useEffect(()=>{
      if(!id){
        return
      }
      axios.get('/places/'+id).then(response=>{
        const {data}=response;
        setTitle(data.title);
        setAddress(data.address);
        setAddedphoto(data.photos)
        setDescription(data.description);
        setPerks(data.perks);
        setExtraInfo(data.extraInfo)
        setCheckIn(data.checkIn);
        setCheckOut(data.checkOut)
        setMaxGuests(data.maxGuests)
        setPrice(data.price)
      })
    },[id])

    async function addPhotoByLink( ev ){
        ev.preventDefault();
        const{data:filename}=await axios.post("/upload-by-link",{link:photoLink})
        setAddedphoto(prev=>{
          return[...prev,filename]
        })
        SetPhotoLink("");
      }
    
      function uploadPhoto(ev){
        const files=ev.target.files;
        const data=new FormData()
        for(let i=0;i< files.length;i++){
          data.append('photos',files[i]);
        }
        axios.post("/upload",data,{
          headers:{"Content-Type":"multipart/form-data"}
        }).then((response)=>{
          const {data:filenames}=response;
          setAddedphoto(prev=>{
            return[...prev,...filenames]; 
          })
        })
      }
  
    
  
      async function addNewPlace(ev){
        ev.preventDefault();
        const placeData={title,address,addedPhotos,description,perks,extraInfo ,checkIn,checkOut,maxGuests,price}
        if(id){
          //update
          await axios.put('/places',{
            id,...placeData
          })
          setRedirectToPlaceList(true)

        }
        else{

          await axios.post('/places',{...placeData})
          setRedirectToPlaceList(true)
        }
      
      }

      function removePhoto(filename,ev)
      {
        ev.preventDefault();
        setAddedphoto([...addedPhotos.filter(photo=>photo!==filename)])

      }
      function SelectAsMain(filename,ev)
      {
        ev.preventDefault();
        console.log("clicked")
        setAddedphoto([filename,...addedPhotos.filter(photo=>photo!==filename)])
      }


  
      if(redirectToPlaceList){
        return <Navigate to={"/account/places"} />
      }
  
  return (
    <div animate={{ x: 100 }} transition={{ delay: 1 }} className="p-5">
      <AccountNav></AccountNav>
    <form onSubmit={addNewPlace}>
      <h2 className="text-2xl mt-4">Title</h2>
      <p className="text-gray-500 text-sm">title for your place</p>
      <input type="text" placeholder="title, for example:my lovely apt" value={title} onChange={ev=>setTitle(ev.target.value)} />
      <h2 className="text-2xl mt-4">Address</h2>
      <p className="text-gray-500 text-sm">address to your place</p>
      <input type="text" placeholder="address" value={address} onChange={ev=>setAddress (ev.target.value)}  />


      <h2 className="text-2xl mt-4">Photos</h2>
      <p className="text-gray-500 text-sm">more=better</p>
      <div className="flex gap-2">
        <input type="text" placeholder="Add using Link ...jpg" value={photoLink} onChange={ev=>SetPhotoLink(ev.target.value)}  />
        <button onClick={addPhotoByLink} className="bg-gray-300 px-4 rounded-full">
          Add Photos
        </button>
      </div>
      <div className=" grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {addedPhotos.length>0 && addedPhotos.map(link=>(
          <div className='flex h-32 relative'>
            <img className="w-full object-cover rounded-2xl" src={'http://127.0.0.1:4000/uploads/'+link} alt="" />
          <button onClick={ev=>removePhoto(link,ev)}  >
            <div className='absolute bottom-1 right-1 text-white bg-black bg-opacity-70 p-2 rounded-xl'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
</svg>
            </div>
          </button>

          <button onClick={ev=>SelectAsMain(link,ev)}>
            <div className='absolute bottom-1 left-1 text-white bg-black bg-opacity-70 p-2 rounded-xl'>
            {link!==addedPhotos[0]&&(
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
</svg>
            )}
            {link ===addedPhotos[0]&&(
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
            </svg>            
            )
            }
            </div>
          </button>
          </div>
        ))}
        <label className=" flex items-center justify-center border bg-transparent rounded-2xl p-2 text-xl text-gray-500">
          <input type="file" className="hidden"  onChange={uploadPhoto}/>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              strokeLinejcap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
          Upload
        </label>
      </div>
      {/* <PhotoUploader addedPhotos={addedPhotos} onChange={setAddedphoto} ></PhotoUploader> */}

      <h2 className="text-2xl mt-4">Description</h2>
      <p className="text-gray-500 text-sm">
        add a description to your place
      </p>
      <textarea value={description} onChange={ev=>setDescription(ev.target.value)} />

      <h2 className="text-2xl mt-4">Perks</h2>
      <p className="text-gray-500 text-sm">select all the perks</p>
      <Perks selected={perks} onChange={setPerks}></Perks>
     
      <h2 className="text-2xl mt-4">Extra info</h2>
      <p className="text-gray-500 text-sm">house rules etc..</p>
      <textarea  value={extraInfo} onChange={ev=>setExtraInfo(ev.target.value)}></textarea>
      <h2 className="text-2xl mt-4">Check in and out time</h2>
      <p className="text-gray-500 text-sm">
        add check in and check out time
      </p>
      <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <h3 className="mt-2 -mb=1">Check in time</h3>
          <input type="text" placeholder="14:00"  value={checkIn} onChange={ev=>setCheckIn(ev.target.value)}/>
        </div>
        <div>
          <h3 className="mt-2 -mb=1">Check out time</h3>
          <input type="text" placeholder="10:00"  value={checkOut} onChange={ev=>setCheckOut(ev.target.value)} />
        </div>
        <div>
          <h3 className="mt-2 -mb=1">Max number of guest</h3>
          <input type="number" placeholder="2"  value={maxGuests} onChange={ev=>setMaxGuests(ev.target.value)} />
        </div>
        <div>
          <h3 className="mt-2 -mb=1">Price per night</h3>
          <input type="text" placeholder="10:00"  value={price} onChange={ev=>setPrice(ev.target.value)} />
        </div>
      </div>
      <div>
        <button className="primary my-4">Save</button>
      </div>
    </form>
  </div>
  )
}
