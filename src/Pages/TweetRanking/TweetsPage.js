
import { useState, useEffect, useRef, useContext } from 'react'

import { Stack, Divider } from '@mui/material'

import { collection, onSnapshot, query, where, orderBy, limit } from 'firebase/firestore'

import { db, functions } from 'Api/Firebase'

import SearchBar from 'UI/Widgets/SearchBar'
import Button from 'UI/Widgets/Buttons/Button'
import LoadingPanel from 'UI/Widgets/LoadingPanel'
import RenderIf from 'UI/Widgets/RenderIf'
import TweetPage from '../Tweet/TweetPage'

import TweetDetails from './Components/TweetDetails'

import { AppContext } from 'Context/AppProvider'
import { AuthContext } from 'Context/Auth/AuthProvider'

import { tweetRankingRoutes } from 'Routes/Routes'

const TweetsPage = (props) => {
    const { redirect } = useContext(AppContext)

    const { user } = useContext(AuthContext)

    const [loading, setLoading] = useState(true)
    const [tweets, setTweets] = useState(null)

    const listener = useRef(null)
    const listener2 = useRef(null)

    // console.log(user)

    useEffect(() => {
        const q = query(collection(db, 'orgs', user.team.org.id, 'tweet-ranking'),
            where('archived', '==', false),
            where('error', '==', false),
            orderBy('timestamp', 'desc'),
            // limit(10))
        )
        // , where("state", "==", "CA")

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let tweets = []

            querySnapshot.forEach((doc) => {
                tweets.push(doc.data())
            })
            console.log(tweets)

            setLoading(false)
            setTweets(tweets)
        });

        return () => unsubscribe()
    }, [])

    useEffect(() => {
        if (!listener.current)
            return

        return () => {
            if (listener.curent)
                listener.current()
            if (listener2.current)
                listener2.current()
        }
    }, [listener.current])

    const onNewSearchClick = (e) => {
        redirect(tweetRankingRoutes.ranking)
    }

    return (
        <TweetPage
            title="Tweet Reports"
        >
            <Stack spacing={3}>
                <Divider />

                <RenderIf condition={loading}>
                    <LoadingPanel />
                </RenderIf>

                <RenderIf condition={tweets && tweets.length > 0}>
                    {tweets && tweets.map(tweet => (
                        <Stack
                            key={tweet.id}
                            style={{
                                border: '1px solid #ddd'
                            }}
                        >
                            <TweetDetails
                                tweetId={tweet.tweetId}
                                loading={false}
                                details={tweet}
                            />
                        </Stack>
                    ))}
                </RenderIf>

                <RenderIf condition={tweets && tweets.length == 0}>
                    <Stack sx={{}} alignItems="center" justifyContent="center">
                        <p style={{ fontWeight: 'bold', marginTop: 20 }}>
                            You have no Tweet Reports at the moment
                        </p>
                        <p style={{ fontSize: 16, margin: 0 }}>
                            Click on the button bellow to take your next step
                        </p>
                        <p style={{ fontSize: 16, margin: 0 }}>
                            on building an engaging audience!
                        </p>

                        <Button
                            variant="contained"
                            color="primary"
                            name='+ New Search'
                            sx={{ minWidth: 120, marginTop: 5 }}
                            onClick={onNewSearchClick}
                        />
                    </Stack>
                </RenderIf>
            </Stack >
        </TweetPage >
    )
}

export default TweetsPage