// import React, { useContext } from "react";
// import { UserContext } from "../UserContext";
// import { Link, Navigate, useParams } from "react-router-dom";
// import AccountNav from "../components/AccountNav";
// import axios from "axios";
// import Placespage from "./PlacesPage";
// import { motion } from "framer-motion";
// import { useLocation } from 'react-router-dom';


// export default function Profilepage() {
//   // console.log(useLocation());
//   // let subpage=pathname.split("/")?.[2];
//   //   console.log(subpage)
//   //   if(subpage===undefined){
//   //       subpage='profile'
//   //   }
//   // const { ready, user, setUser } = useContext(UserContext);
//   // const [redirect, setRedirect] = React.useState(null);
//   // async function logout() {
//   //   await axios.post("/logout");
//   //   setUser(null);
//   // }

//   // if (!ready) {
//   //   return "loading...";
//   // }

//   // if (!user && ready && !redirect) {
//   //   <Navigate to={"/login"} />;
//   // }

//   // if (redirect) {
//   //   return <Navigate to={redirect} />;
//   // }
//   return(
//     <div>
//       <AccountNav></AccountNav>

//     </div>
//   )
//   }

import {useContext, useState} from "react";
import {UserContext} from "../UserContext.jsx";
import {Link, Navigate, useParams} from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "../components/AccountNav.jsx";

export default function ProfilePage() {
  const [redirect,setRedirect] = useState(null);
  const {ready,user,setUser} = useContext(UserContext);
  let {subpage} = useParams();
  if (subpage === undefined) {
    subpage = 'profile';
  }

  async function logout() {
    await axios.post('/logout');
    setRedirect('/');
    setUser(null);
  }

  if (!ready) {
    return 'Loading...';
  }

  if (ready && !user && !redirect) {
    return <Navigate to={'/login'} />
  }

  if (redirect) {
    return <Navigate to={redirect} />
  }
  return (
    <div>
      <AccountNav />
      {subpage === 'profile' && (
        <div className="text-center max-w-lg mx-auto">
          <div className="flex flex-row  pl-48">
            <h3 className="text-xl " >Name:</h3>
            <p className="text-xl ">{user.name}</p>
          </div>
          <div className="flex flex-row  pl-32 mb-5">
            <h3 className="text-xl " >Email:</h3>
            <p className="text-xl ">{user.email}</p>
          </div>
          Logged in as {user.name} ({user.email})<br />
          <button onClick={logout} className=" bg-rose-500 primary max-w-sm mt-2">Logout</button>
        </div>
      )}
      {subpage === 'places' && (
        <PlacesPage />
      )}
    </div>
  );
}