import React from 'react'
import { useState } from 'react';

export default function PhotoUploader({addedPhotos,onChange}) {
    const[photoLink,SetPhotoLink]=useState("");
    async function addPhotoByLink( ev ){
        ev.preventDefault();
        const{data:filename}=await axios.post("/upload-by-link",{link:photoLink})
        onChange(prev=>{
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
          onChange(prev=>{
            return[...prev,...filenames]; 
          })
        })
      }
    
  return (
    <div>
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
                <div >
                  <img className="w-36 h-36 rounded-2xl" src={'http://127.0.0.1:4000/uploads/'+link} alt="" />
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
      
    </div>
  )
}
