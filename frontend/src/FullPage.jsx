import React from 'react'
import {  SignedIn, SignedOut, UserButton } from '@clerk/clerk-react'

function FullPage() {
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