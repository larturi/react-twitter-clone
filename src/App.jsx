import React, { useState, useEffect } from 'react';
import SignInSignOut from './pages/SignInSignUp';
import { ToastContainer } from 'react-toastify'
import { AuthContext } from './context/context';
import { isUserAutenticatedApi } from './api/auth';
import Routing from './routes/Routing';

export default function App() {
   const [user, setUser] = useState(null);
   const [isLoadedUser, setIsLoadedUser] = useState(false);
   const [refreshCheckLogin, setRefreshCheckLogin] = useState(false);

   useEffect(() => {
     setUser(isUserAutenticatedApi());
     setRefreshCheckLogin(false);
     setIsLoadedUser(true);
   }, [refreshCheckLogin]);

   if(!isLoadedUser) return null;

   return (
      <AuthContext.Provider
         value={{user}}
      >
         {
            user ? (
               <Routing />
            ) : (
               <SignInSignOut setRefreshCheckLogin={setRefreshCheckLogin} />
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
