import React, { useState } from 'react';
import SignInSignOut from './pages/SignInSignUp';
import { ToastContainer } from 'react-toastify'

export default function App() {
   const [user, setUser] = useState({ name: 'Lea' });

   return (
      <div>
         {
            user ? (
               <div>
                  <SignInSignOut />
               </div>
            ) : (
               <div>
                 <p>Login</p>
               </div>
            )
         }
         <ToastContainer
            position='top-right'
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnVisibilityChange
            draggable
            pauseOnHover
         /> 
      </div>
   )
}
