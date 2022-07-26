import React, { useState } from 'react';
import SignInSignOut from './pages/SignInSignUp';

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
      </div>
   )
}
