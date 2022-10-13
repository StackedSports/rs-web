
import { useState, useEffect, useRef, useContext } from 'react'

import { Stack,Avatar, Box, Card, CardContent, CardHeader, CardMedia, Divider, Typography } from '@mui/material'
import Collapse from '@mui/material/Collapse'

import { collection, onSnapshot, query, where, orderBy, limit } from 'firebase/firestore'
import { httpsCallable } from 'firebase/functions'

import { db, functions } from 'Api/Firebase'

import SearchBar from 'UI/Widgets/SearchBar'
import Button from 'UI/Widgets/Buttons/Button'
import LoadingPanel from 'UI/Widgets/LoadingPanel'
import RenderIf from 'UI/Widgets/RenderIf'

import TweetDetails from './Components/TweetDetails'

import { AppContext } from 'Context/AppProvider'
import { AuthContext } from 'Context/Auth/AuthProvider'

import { tweetPostRoutes } from 'Routes/Routes'
import { BaseTweetRankingPage } from './BaseTweetRankingPage'

const TweetsArchivedPage = (props) => {
    const { redirect } = useContext(AppContext)

	const { user } = useContext(AuthContext)

	const [loading, setLoading] = useState(true)
    const [tweets, setTweets] = useState(null)

	const listener = useRef(null)
	const listener2 = useRef(null)

	// console.log(user)

	useEffect(() => {
		const q = query(collection(db, 'orgs', user.team.org.id, 'tweet-ranking'),
            where('archived', '==', true),
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
		if(!listener.current)
			return

		return () => {
			if(listener.curent)
				listener.current()
			if(listener2.current)
				listener2.current()
		}
	}, [listener.current])
	
	const onNewSearchClick = (e) => {
        redirect(tweetPostRoutes.ranking)
    }

	return (
		<BaseTweetRankingPage
		  title="Tweet Reports"
		>
			<Stack spacing={3}>

				<RenderIf condition={loading}>
                    <LoadingPanel/>
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
                    <Stack sx={{  }} alignItems="center" justifyContent="center">
                        <p style={{ fontWeight: 'bold', marginTop: 20 }}> 
                            You have no archived Tweet Reports at the moment.
                        </p>
                        {/* <p style={{ fontSize: 16, margin: 0 }}>
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
                        /> */}
                    </Stack>
                </RenderIf>
			</Stack >
		</BaseTweetRankingPage >
	)
}

export default TweetsArchivedPage