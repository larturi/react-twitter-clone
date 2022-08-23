import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { isEmpty } from 'lodash';
import queryString from 'query-string';
import { Spinner, ButtonGroup, Button } from 'react-bootstrap';
import { getFollowsApi } from '../../api/follow';
import ListUsers from '../../components/User/ListUsers';

import './Users.scss';

const Users = () => {
   let location = useLocation();
   const navigate = useNavigate();

   const { page, type, search } = useUserQuery(location);

   const [users, setUsers] = useState(null);
   const [typeUser, setTypeUser] = useState('follow');

   useEffect(() => {
      getFollowsApi({ page, type, search })
         .then((results) => {
            if (isEmpty(results)) {
               setUsers([]);
            } else {
               setUsers(results);
            }
         })
         .catch(() => {
            setUsers([]);
         });
   }, [location]);

   const onChangeType = (type) => {
      setUsers(null);

      if (type === 'new') {
         setTypeUser('new');
      } else {
         setTypeUser('follow');
      }

      navigate({
         pathname: location.pathname,
         search: queryString.stringify({
            type: type,
            page: 1,
            search: ""
         })
      });
   };

   return (
      <>
         <div className='users__title'>
            <h2>Usuarios</h2>
            <input type='text' placeholder='Busca un usuario...' />
         </div>

         <ButtonGroup className='users__options'>
            <Button 
               className={ typeUser === 'follow' && 'active' }
               onClick={() => onChangeType('follow')}
            >Siguiendo</Button>
            <Button 
               className={ typeUser === 'new' && 'active' }
               onClick={() => onChangeType('new')} 
            >Nuevos</Button>
         </ButtonGroup>

         {!users ? (
            <div className='users__loading'>
               <Spinner animation='border' variant='info' />
               Cargando...
            </div>
         ) : (
            <ListUsers users={users} />
         )}
      </>
   );
};

function useUserQuery(location) {
   const {
      page = 1,
      type = 'follow',
      search = '',
   } = queryString.parse(location.search);
   return { page, type, search };
}

export default Users;
