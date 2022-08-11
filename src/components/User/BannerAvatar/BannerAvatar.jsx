import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import avatarNotFound from '../../../assets/png/avatar-no-found.png';
import ConfigModal from '../../Modal/ConfigModal';
import EditUserForm from '../EditUserForm/EditUserForm';

import './BannerAvatar.scss';

const BannerAvatar = ({ user, loggedUser }) => {

    const [showModal, setShowModal] = useState(false);

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
                        { loggedUser.user._id === user.id && (
                            <Button onClick={() => setShowModal(true) }>Editar Perfil</Button>
                        )}
                        { loggedUser.user._id !== user.id && (<Button>Seguir</Button>) }
                    </div>
                )
            }

            <ConfigModal 
                show={showModal} 
                setShow={setShowModal}
                title='Editar Perfil' 
            >
                <EditUserForm user={user} setShowModal={setShowModal} />
            </ConfigModal>
        </div>
    );
}

export default BannerAvatar;
