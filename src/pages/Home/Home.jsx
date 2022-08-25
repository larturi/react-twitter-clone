import React, { useState, useEffect } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { getTweetsFollowersApi } from '../../api/tweet';
import TweetsList from '../../components/TweetsList/TweetsList';

import './Home.scss';

export default function Home() {

  // const { setRefreshCheckLogin } = props;
  const [tweets, setTweets] = useState(null);
  const [page, setPage] = useState(1);
  const [loadingTweets, setLoadingTweets] = useState(false);

  useEffect(() => {
    getTweetsFollowersApi(page)
      .then((response) => {
        if (!tweets && response) {
          setTweets(formatModel(response));
        } else {
          if (!response) {
            setLoadingTweets(0);
          } else {
            const data = formatModel(response);
            setTweets([...tweets, ...data]);
            setLoadingTweets(false);
          }
        }
      })
      .catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const moreData = () => {
    setLoadingTweets(true);
    setPage(page + 1);
  };

  return (
    <>
      <div className="home__title">
        <h2>Inicio</h2>
      </div>

      { tweets && <TweetsList tweets={tweets} /> }
      <Button onClick={moreData} className="load-more">
        {!loadingTweets ? (
          loadingTweets !== 0 ? (
            "Obtener más Tweets"
          ) : (
            "No hay más tweets"
          )
        ) : (
          <Spinner
            as="span"
            animation="grow"
            size="sm"
            role="status"
            aria-hidden="true"
          />
        )}
      </Button>
    </>
  )
}

function formatModel(tweets) {
  const tweetsTemp = [];
  tweets.forEach((tweet) => {
    tweetsTemp.push({
      _id: tweet._id,
      user_id: tweet.user_relation_id,
      message: tweet.Tweet.message,
      created_at: tweet.Tweet.created_at,
    });
  });
  return tweetsTemp;
}
