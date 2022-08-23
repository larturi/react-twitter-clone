import React, { useState, useEffect } from 'react';
import { Image, Media } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { getUserApi } from '../../../api/user';
import AvatarNoFound from '../../../assets/png/avatar-no-found.png';
import { capitalize } from '../../../helpers/strings';

export default function User({ user }) {

  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    getUserApi(user.id).then((response) => {
        setUserInfo(response);
    });
  }, [user]);

  return (
    <Media as={Link} to={`/${user.id}`} className="list-users__user">
      <Image
        width={64}
        height={64}
        roundedCircle
        className="mr-3"
        src={
          userInfo?.avatar && userInfo?.avatar !== 'Mi Avatar'
            ? `${import.meta.env.VITE_APP_API_URL}/getAvatar?id=${user.id}`
            : AvatarNoFound
        }
        alt={`${user.name} ${user.last_name}`}
      />
      <Media.Body>
        <h5>
          {capitalize(user.name)} {capitalize(user.last_name)}
        </h5>
        <p>{userInfo?.biography}</p>
      </Media.Body>
    </Media>
  );
}
