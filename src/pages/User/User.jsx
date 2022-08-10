import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { getUserApi } from '../../api/user';
import BannerAvatar from '../../components/User/BannerAvatar/BannerAvatar';

import './User.scss';

const User = () => {
    let { user_id } = useParams();
    const [userNameTitle, setUserNameTitle] = useState('...');
    const [user, setUser] = useState(null);

    useEffect(() => {
        getUserApi(user_id).then(response => {
            if(response.error) {
                setUserNameTitle('El usuario no existe');
                toast.error('El usuario no existe');
            } else {
                if(response?.name !== '') {
                    setUserNameTitle(response.name + ' ' + response.last_name);
                    setUser(response);
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
            <BannerAvatar user={user} />
            <div>
                Info User
            </div>
            <div className='user__tweets'>Lista de Tweets</div>
        </>
    );
}

export default User;
