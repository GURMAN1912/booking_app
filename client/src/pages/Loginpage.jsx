import axios from "axios";
import React, { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import {motion} from "framer-motion"
// import { Link } from "react-router-dom";

export default function Loginpage() {
  const [email, SetEmail] = React.useState("");
  const [redirect,setRedirect]=React.useState(false)
  const [password, SetPassword] = React.useState("");
  const {setUser}=useContext(UserContext)  
  async function handleLoginSubmit(ev)
  {
    ev.preventDefault()
    try{
      const userInfo=await axios.post("/login",{email,password});
      setUser(userInfo.data)
      alert('Login successful');
      setRedirect(true);
      console.log(redirect)
    }catch(e){
      alert("Login failed")
    }

  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Login</h1>

        <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(ev) => SetEmail(ev.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(ev) => SetPassword(ev.target.value)}
          />
          <button  whileHover={{scale:1.1}} whileTap={{scale:0.9}} className="primary">Login</button>
          <div className="text-center py-2 text-gray-500 ">
            Don't have an account yet?
            <Link className="underline text-black" to={"/register"}>
              Register now
            </Link>
          </div>
        </form>
        {redirect && <Navigate to={'/'} />}
      </div>
    </div>
  );
}
