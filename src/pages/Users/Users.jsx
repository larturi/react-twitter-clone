import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { useDebouncedCallback } from 'use-debounce';
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
   const [btnLoading, setBtnLoading] = useState(false);
   const [pageNumber, setPageNumber] = useState(1);
   const [isLoading, setIsLoading] = useState(false);

   const onSearch = useDebouncedCallback(value => {
      setUsers(null);
      navigate({
         pathname: location.pathname,
         search: queryString.stringify({
            type: type,
            page: 1,
            search: value
         })
      });
   }, 200);

   useEffect(() => {
      setIsLoading(true);
      getFollowsApi({ page, type, search })
         .then((results) => {
            if(pageNumber == 1) {
               if (isEmpty(results)) {
                  setUsers([]);
               } else {
                  setUsers(results);
               }
            } else {
               if(!results || isEmpty(results)) {
                  setBtnLoading(0);
               } else {
                  setUsers([...users, ...results]);
                  setBtnLoading(false);
               }
            }
         })
         .catch((e) => {
            setUsers([]);
         })
         .finally(() => setIsLoading(false));
   }, [location]);

   const onChangeType = (type) => {
      setUsers([]);

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

   const moreData = () => {
      setBtnLoading(true);
      const pageAux = pageNumber + 1;

      setPageNumber(pageNumber + 1);

      navigate({
         pathname: location.pathname,
         search: queryString.stringify({
            type: type,
            page: pageAux,
            search: ""
         })
      });

      //setBtnLoading(false);
   }

   return (
      <>
         <div className='users__title'>
            <h2>Usuarios</h2>
            <input 
               type='text' 
               placeholder='Busca un usuario...'
               onChange={(e) => onSearch(e.target.value)}
            />
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
            <>
               <ListUsers users={users} isLoading={btnLoading} />
               <Button onClick={moreData} className="load-more">
                  { !btnLoading ? (
                     btnLoading !== 0 && "Cargar mas usuarios"
                  ) : (
                     <Spinner as='span' animation='grow' size='sm' role='status' aria-hidden='true' />
                  )}
               </Button>
            </>
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
