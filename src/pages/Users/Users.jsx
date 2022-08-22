import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import queryString from 'query-string';
import { Spinner, ButtonGroup, Button } from 'react-bootstrap';
import { getFollowsApi } from '../../api/follow';

import './Users.scss';

const Users = () => {

    const [users, setUsers] = useState(null);
    
    let location = useLocation();
    const { page, type, search } = useUserQuery(location);

    useEffect(() => {
        getFollowsApi({ page, type, search })
            .then(results => {
                console.log(results);
            })
            .catch(() => {setUsers([])});
    }, []);

   return (
      <>
         <div className='users__title'>
            <h2>Usuarios</h2>
            <input type='text' placeholder='Busca un usuario...' />
         </div>

         <ButtonGroup className='users__options'>
            <Button className='active'>Siguiendo</Button>
            <Button>Nuevos</Button>
         </ButtonGroup>
      </>
   );
};

function useUserQuery(location) {
    const { page = 1, type = 'new', search = '' } = queryString.parse(location.search);
    return { page, type, search };
}

export default Users;
