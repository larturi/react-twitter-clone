import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import avatarNotFound from '../../../assets/png/avatar-no-found.png';
import ConfigModal from '../../Modal/ConfigModal';
import EditUserForm from '../EditUserForm/EditUserForm';
import { checkFollowApi, followUserApi, unfollowUserApi } from '../../../api/follow';

import './BannerAvatar.scss';

const BannerAvatar = ({ user, loggedUser }) => {
   const [showModal, setShowModal] = useState(false);
   const [isFollowing, setIsFollowing] = useState(null);
   const [reloadFollow, setReloadFollow] = useState(false)

   const bannerUrl = user?.banner
      ? `${import.meta.env.VITE_APP_API_URL}/getBanner?id=${user?.id}`
      : null;
   const avatarUrl =
      user?.avatar != 'Mi Avatar' && user?.avatar != undefined
         ? `${import.meta.env.VITE_APP_API_URL}/getAvatar?id=${user?.id}`
         : avatarNotFound;

   useEffect(() => {
      if(user) {
        checkFollowApi(user?.id).then((response) => {
            if (response?.status) {
               setIsFollowing(true);
            } else {
               setIsFollowing(false);
            }
         });
         setReloadFollow(false);
      }
   }, [user, reloadFollow]);

   const onFollow = () => {
      followUserApi(user?.id).then(() => {
        setReloadFollow(true);
      });
   };

   const onUnFollow = () => {
      unfollowUserApi(user?.id).then(() => {
        setReloadFollow(true);
      });
   };

   return (
      <div
         className='banner-avatar'
         style={{ backgroundImage: `url('${bannerUrl}')` }}
      >
         <div
            className='avatar'
            style={{ backgroundImage: `url('${avatarUrl}')` }}
         />

         {user && (
            <div className='options'>
               {loggedUser.user._id === user.id && (
                  <Button onClick={() => setShowModal(true)}>
                     Editar Perfil
                  </Button>
               )}

               {loggedUser.user._id !== user.id && isFollowing !== null &&
                  (isFollowing ? (
                     <Button onClick={onUnFollow} className="unfollow"><span>Siguiendo</span></Button>
                  ) : (
                     <Button onClick={onFollow}>Seguir</Button>
                  ))}
            </div>
         )}

         <ConfigModal
            show={showModal}
            setShow={setShowModal}
            title='Editar Perfil'
         >
            <EditUserForm user={user} setShowModal={setShowModal} />
         </ConfigModal>
      </div>
   );
};

export default BannerAvatar;
