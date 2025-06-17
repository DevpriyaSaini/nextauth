'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router';
import Link from 'next/link';

function page() {
    const [token,setToken]=useState("");
    const[verified,setVerified]=useState(false);
    const [error,setError]=useState(false);   

     async function verifymail() {
    
    try {
        await axios.post("/api/user/verifyemail",{token});
        setVerified(true);
        setError(false);
    } catch (error:any) {
setError(true);
        
    }
    
   }
   
   useEffect(()=>{
    setError(false);
    const urltoken=window.location.search.split("=")[1]
    setToken(urltoken||"");
   },[])



   useEffect(()=>{
    setError(false);
    if(token.length>0){
        verifymail()
    }
   },[token])
  return (
   <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
  <h1 className="text-3xl font-bold text-gray-800 mb-6">Verify Email</h1>
  <h2 className="text-xl text-gray-600 mb-8">{token ? `${token}` : "no token"}</h2>
  
  {verified && (
    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
      <h2 className="font-bold">Verified</h2>
      <Link 
        href="/login"
        className="mt-2 inline-block bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Go to Login
      </Link>
    </div>
  )}
  
  {error && (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
      <h2 className="font-bold">Error</h2>
      <p className="text-sm">{ "An error occurred during verification"}</p>
    </div>
  )}
</div>
  )
}

export default page