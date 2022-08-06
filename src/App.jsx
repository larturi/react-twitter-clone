import React, { useState, useEffect } from 'react';
import SignInSignOut from './pages/SignInSignUp';
import { ToastContainer } from 'react-toastify'
import { AuthContext } from './context/context';
import { isUserAutenticatedApi } from './api/auth';

export default function App() {
   const [user, setUser] = useState(null);

   useEffect(() => {
     setUser(isUserAutenticatedApi());
   }, [])
   

   return (
      <AuthContext.Provider
         value={{user}}
      >
         {
            user ? (
               <div>
                  <p>Estas logueado</p>
               </div>
            ) : (
               <SignInSignOut />
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
      </AuthContext.Provider>
   )
}
