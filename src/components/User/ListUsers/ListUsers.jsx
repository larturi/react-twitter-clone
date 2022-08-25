import React from 'react';
import { map } from 'lodash';

import './ListUsers.scss';
import User from './User';

const ListUsers = ({ users, isLoading }) => {

    if(!users && !isLoading) return (
        <div className="emptyResults">
            <h2>No se han encontrado resultados</h2>
        </div>
    );

    return (
        <ul className='list-users'>
            { map(users, (user) => (
              <User user={user} key={user.id}/>
            ))}
        </ul>
    );
}

export default ListUsers;
