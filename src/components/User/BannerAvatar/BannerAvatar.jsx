import React from 'react';
import avatarNotFound from '../../../assets/png/avatar-no-found.png';

import './BannerAvatar.scss';

const BannerAvatar = ({ user }) => {


    const bannerUrl = user?.banner ? `${import.meta.env.VITE_APP_API_URL}/getBanner?id=${user?.id}` : null;
    const avatarUrl = (user?.avatar != 'Mi Avatar' && user?.avatar != undefined ) ? `${import.meta.env.VITE_APP_API_URL}/getAvatar?id=${user?.id}` : avatarNotFound;
    
    console.log(avatarUrl);
    return (
        <div 
            className='banner-avatar' 
            style={{ backgroundImage: `url('${bannerUrl}')` }}
        >
            <div className='avatar'  style={{ backgroundImage: `url('${avatarUrl}')` }}>

            </div>
        </div>
    );
}

export default BannerAvatar;
