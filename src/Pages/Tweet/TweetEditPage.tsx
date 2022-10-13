import React from 'react'
import { useTweet } from 'Api/ReactQuery';
import TweetCreatePage from './TweetCreatePage';
import { RouteComponentProps } from 'react-router-dom';

export const TweetEditPage: React.FC<RouteComponentProps<{ id: string }>> = (props) => {
    const tweet = useTweet(props.match.params.id)

    return (
        <TweetCreatePage edit={tweet.item} />
    )
}
