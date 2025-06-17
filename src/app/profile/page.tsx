"use client"
import React, { useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { Toast } from 'react-hot-toast'

import toast from 'react-hot-toast/headless'
import { useRouter } from 'next/navigation'



function page() {
  const [data,setData]=useState("nothing");
    const router=useRouter();
  async function getuser() {
   const response= await axios.post("/api/user/me");
   setData(response.data.data._id);
 
   
    
  }


  async function logout() {
    try {
      await axios.get("/api/user/logout");
      toast.success("Logout success");
      router.push("/login");

    } catch (error:any) {
      console.log(error.message);
      toast.error(error.message);
      
    }
  }
  return (
    
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
  <h1 className="text-2xl font-bold text-gray-800 mb-4">Profile Page</h1>
  
  <hr className="my-4 border-gray-200" />
  <div className="mb-6">
    <h2 className="text-lg font-medium text-gray-700">
      {data === "nothing" ? (
        "Nothing"
      ) : (
        <Link 
          href={`/profile/${data}`}
          className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
        >
          {data}
        </Link>
      )}
    </h2>
  </div>
  
  <hr className="my-4 border-gray-200" />
  
  <div className="flex space-x-4">
    <button
      onClick={logout}
      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
    >
      Logout
    </button>
    
    <button
      onClick={getuser}
      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
    >
      Get User
    </button>
  </div>
</div>
  )
}

export default page