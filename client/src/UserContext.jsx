import axios from "axios";
import { createContext, useEffect } from "react";
import React, { useContext } from "react";

export const UserContext=createContext({})

export function UserContextProvider({children})
{
    const [user,setUser]=React.useState(null)
    const [ready,setReady]=React.useState(false)
    useEffect(()=>{
        if(!user){
           const {data}= axios.get('/profile').then(({data})=>{
            setUser(data);
            setReady(true)
           })
        }
    },[])

    return(
        <UserContext.Provider value={{user,setUser,ready}}>
            {children}
        </UserContext.Provider>
    )

}