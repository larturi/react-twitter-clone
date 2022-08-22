import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { getUserApi } from '../../api/user';
import { getUserTweetsApi } from '../../api/tweet';
import useAuth from '../../hooks/useAuth';
import BannerAvatar from '../../components/User/BannerAvatar/BannerAvatar';
import InfoUser from '../../components/User/InfoUser/InfoUser';
import TweetsList from '../../components/TweetsList/TweetsList';

import './User.scss';

const User = () => {
    let { user_id } = useParams();
    const [userNameTitle, setUserNameTitle] = useState('...');
    const [user, setUser] = useState(null);
    const [page, setPage] = useState(1);
    const [loadingTweets, setLoadingTweets] = useState(false);
    const [tweets, setTweets] = useState(null);

    const loggedUser = useAuth();

    const moreTweets = () => {
        const pageTemp = page + 1;
        setLoadingTweets(true);

        getUserTweetsApi(user_id, pageTemp).then(response => {
            console.log(response)
            if(!response) {
                setLoadingTweets(0);
            } else {
                setTweets([...tweets, ...response]);
                setPage(pageTemp);
                setLoadingTweets(false);
            }
        });
    };

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

    useEffect(() => {
        getUserTweetsApi(user_id, 1)
            .then((response) => {
                setTweets(response);
            })
            .catch(() => {
                setTweets([])
            });
    }, [user_id]);    

    return (
        <>
            <div className='user__title'>
                <h2>
                    {userNameTitle}
                </h2>
            </div>
            <BannerAvatar user={user} loggedUser={loggedUser} />
            <InfoUser user={user} />
            <div className='user__tweets'>
                <h3>Tweets:</h3>
                { tweets?.length > 0 ? <TweetsList tweets={tweets} /> : <p>El usuario aun no a creado tweets</p> }
                <Button onClick={moreTweets}>
                    { !loadingTweets ? (
                        loadingTweets !== 0 && 'Obtener mas Tweets'
                    ) : (
                        <Spinner 
                            as='span'
                            animation='grow'
                            size='sm'
                            role='status'
                            aria-hidden='true'
                        />
                    )}
                </Button>
            </div>
        </>
    );
}

export default User;
