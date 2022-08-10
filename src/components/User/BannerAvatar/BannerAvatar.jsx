import React from 'react';
import { Button } from 'react-bootstrap';
import avatarNotFound from '../../../assets/png/avatar-no-found.png';

import './BannerAvatar.scss';

const BannerAvatar = ({ user, loggedUser }) => {


    const bannerUrl = user?.banner ? `${import.meta.env.VITE_APP_API_URL}/getBanner?id=${user?.id}` : null;
    const avatarUrl = (user?.avatar != 'Mi Avatar' && user?.avatar != undefined ) ? `${import.meta.env.VITE_APP_API_URL}/getAvatar?id=${user?.id}` : avatarNotFound;
    
    return (
        <div 
            className='banner-avatar' 
            style={{ backgroundImage: `url('${bannerUrl}')` }}
        >
            <div className='avatar'  style={{ backgroundImage: `url('${avatarUrl}')` }} />

            {
                user && (
                    <div className='options'>
                        { loggedUser.user._id === user.id && (<Button>Editar Perfil</Button>) }
                        { loggedUser.user._id !== user.id && (<Button>Seguir</Button>) }
                    </div>
                )
            }
        </div>
    );
}

export default BannerAvatar;
