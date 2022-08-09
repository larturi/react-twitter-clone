import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { getUserApi } from '../../api/user';

import './User.scss';

const User = () => {
    let { user_id } = useParams();
    const [userNameTitle, setUserNameTitle] = useState('...');

    useEffect(() => {
        getUserApi(user_id).then(response => {
            console.log(response)

            if(response.error) {
                setUserNameTitle('El usuario no existe');
                toast.error('El usuario no existe');
            } else {
                if(response?.name !== '') {
                    setUserNameTitle(response.name + ' ' + response.last_name);
                } 
            }
           
        })
    }, [user_id]);

    return (
        <>
            <div className='user__title'>
                <h2>
                    {userNameTitle}
                </h2>
            </div>
            <div>
                BannerUser
            </div>
            <div>
                Info User
            </div>
            <div className='user__tweets'>Lista de Tweets</div>
        </>
    );
}

export default User;
