import React, { useState } from "react";
import axios from "axios"
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Login = ({setToken}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(backendUrl + '/api/user/admin',{email,password})
      if(response.data.success) {
        setToken(response.data.token)
      }else {
          toast.error(response.data.message)                      
      }

    } catch (error) {
      console.error("Error:", error);
      toast.error(error.message)
    }
  };

  return (
    <div className="p-56">
      <form
        onSubmit={onSubmitHandler}
        className="flex w-96 flex-col space-y-5 rounded-lg border py-10 px-5 shadow-xl mx-auto"
      >
        <div className="mx-auto mb-2 space-y-3">
          <h1 className="text-3xl font-bold text-gray-700">
            Enchantique Jewelio
          </h1>
          <p className="text-gray-500">
            Login Enchantique Jewelio Admin Panel
          </p>
        </div>

        <div>
          <div className="relative mt-2 w-full">
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              id="email"
              className="peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
              placeholder=" "
              required
            />
            <label
              htmlFor="email"
              className="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600"
            >
              Enter Your Email
            </label>
          </div>
        </div>

        <div>
          <div className="relative mt-2 w-full">
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              id="password"
              className="peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
              placeholder=" "
              required
            />
            <label
              htmlFor="password"
              className="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600"
            >
              Enter Your Password
            </label>
          </div>
        </div>

        <button className="rounded-lg bg-blue-600 py-3 font-bold text-white">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
