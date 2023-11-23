import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Registerpage() {
  const [name, SetName] = useState("");
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  async function registerUser(ev) {
    ev.preventDefault();
    try {
      await axios.post("/register", {
        name,
        email,
        password,
      });
      alert("Registration successful.Now u can login");
    } catch (e) {
      alert("Registration failed ...please try again later");
    }
  }
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Register</h1>

        <form className="max-w-md mx-auto" onSubmit={registerUser}>
          <input
            type="text"
            placeholder="enter your name"
            value={name}
            onChange={(ev) => SetName(ev.target.value)}
          />
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
          <button className="primary">Register</button>
          <div className="text-center py-2 text-gray-500 ">
            already have an account!
            <Link className="underline text-black" to={"/login"}>
              Login here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
