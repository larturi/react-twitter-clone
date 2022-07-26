import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

export default function App() {
   const [user, setUser] = useState(null);

   if (user) {
      return (
         <div>
            <h1>Logueado</h1>
         </div>
      );
   } else {
      return (
         <div>
            <h1>Login</h1>
            <Button variant="primary">Primary</Button>{' '}
         </div>
      );
   }
}
