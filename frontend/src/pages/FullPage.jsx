import React, { useEffect } from 'react'
import {  SignedIn, SignedOut, UserButton, useUser } from '@clerk/clerk-react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



function FullPage() {
  const navigate = useNavigate();
   const { isSignedIn, user } = useUser()
   console.log(user)
   useEffect(() => {
     const registerUser = async () => {
       if (isSignedIn && user) {
         const userData = {
           clerkUserId: user.id,
           name: user.fullName || user.username || "Unknown",
           email: user.primaryEmailAddress?.emailAddress,
         };
        console.log("userData: ", userData);
         try {
           const response = await axios.post("http://localhost:3000/api/v1/users/register", userData);
           console.log(response.data.message);
           navigate("/items")
         } catch (error) {
           console.error("Error registering user:", error.response?.data || error.message);
         }
       }
     };
   
     registerUser();
   }, [isSignedIn, user]);

  return (
    <div>FullPage
        <SignedIn>
        <UserButton />
        </SignedIn>
         <SignedOut>
            <a href="/login">Login</a>
         </SignedOut>
    </div>
    
  )
}

export default FullPage