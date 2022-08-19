import React, { useState, useEffect } from 'react';
import { Image } from 'react-bootstrap';
import { map } from 'lodash';
import moment from 'moment';
import AvatarNoFound from '../../assets/png/avatar-no-found.png';
import { getUserApi } from '../../api/user';
import { replaceURLWithHTMLLinks } from '../../utils/functions';

import './TweetsList.scss';

const TweetsList = ({tweets}) => {

    console.log(tweets)
    return (
        <div className="list-tweets">
            {
                map(tweets, (tweet, index) => (
                    <Tweet tweet={tweet} key={index} />
                ))
            }
        </div>
    );
};

function Tweet(props) {
  const { tweet } = props;
  const [userInfo, setUserInfo] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    getUserApi(tweet.user_id).then((response) => {
      setUserInfo(response);
      setAvatarUrl(
        response?.avatar
          ? `${import.meta.env.VITE_APP_API_URL}/getAvatar?id=${response.id}`
          : AvatarNoFound
      );
    });
  }, [tweet]);

  return (
    <div className="tweet">
      <Image className="avatar" src={avatarUrl} roundedCircle />
      <div>
        <div className="name">
          {userInfo?.name} {userInfo?.last_name}
          <span>{moment(tweet.birth_date).calendar()}</span>
        </div>
        <div
          dangerouslySetInnerHTML={{
            __html: replaceURLWithHTMLLinks(tweet.message),
          }}
        />
      </div>
    </div>
  );
}

export default TweetsList;
