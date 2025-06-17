"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';


function Signup() {
    const router =useRouter();
    const [user,setUser]=useState({
        username:"",
        email:"",
        password:""
    })
    const [button,setButton]=useState(false);
    const [loading,setLoading]=useState(false);

    async function signuphandle() {
      try {

         setLoading(true) ;
       const response= await axios.post('/api/user/signup',user);
       console.log(response.data);
       
       router.push('/login');
      } catch (error:any) {
        toast.error(error.message);  
      }

    }

    useEffect(()=>{
         if(user.email.length>0&&user.password.length>0&& user.username.length>0){
            setButton(false);
         }
         else{
            setButton(true)
         }
    },[user])
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
  <h1 className="text-2xl font-bold text-center mb-4">
    {loading ? "Processing..." : "Sign Up"}
  </h1>
  <hr className="mb-6 border-gray-300" />
  
  <div className="space-y-4">
    <div>
      <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
        Username
      </label>
      <input
        type="text"
        id="username"
        value={user.username}
        onChange={(e) => setUser({...user, username: e.target.value})}
        placeholder="Username"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div>
      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
        Email
      </label>
      <input
        type="email"
        id="email"
        value={user.email}
        onChange={(e) => setUser({...user, email: e.target.value})}
        placeholder="Email"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div>
      <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
        Password
      </label>
      <input
        type="password"
        id="password"
        value={user.password}
        onChange={(e) => setUser({...user, password: e.target.value})}
        placeholder="Password"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <button
      onClick={signuphandle}
      disabled={loading}
      className={`w-full py-2 px-4 rounded-md text-white font-medium ${
        loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
      } transition-colors`}
    >
      {button ? "No Signup" : "Sign Up"}
    </button>

    <div className="text-center mt-4">
      <Link href="/login" className="text-blue-600 hover:text-blue-800 text-sm">
        Already have an account? Login here
      </Link>
    </div>
  </div>
</div>
  )
}

export default Signup