
import { useState, useEffect, useRef, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { Stack, Avatar, Box, Card, CardContent, CardHeader, CardMedia, Divider, Typography } from '@mui/material'

import { addDoc, setDoc, getDoc, getDocs, collection, doc, onSnapshot, updateDoc, query, where } from 'firebase/firestore'
import { httpsCallable } from 'firebase/functions'

import { db, functions } from 'Api/Firebase'

import SearchBar from 'UI/Widgets/SearchBar'
import Button from 'UI/Widgets/Buttons/Button'
import RenderIf from 'UI/Widgets/RenderIf'

import TweetDetails from './Components/TweetDetails'

import { AuthContext } from 'Context/Auth/AuthProvider'
import { BaseTweetRankingPage } from './BaseTweetRankingPage'

const TweetRankingDetailsPage = (props) => {
	const { user } = useContext(AuthContext)
    const { tweetId } = useParams()

	const [analyzesLoading, setAnalyzesLoading] = useState(true)
	const [analyzesDetails, setAnalyzesDetails] = useState(false)


	useEffect(() => {
		if(!tweetId)
            return

        console.log(typeof tweetId)

        setAnalyzesLoading(true)

        let once = true

        const resultRef = doc(db, 'orgs', user.team.org.id, 'tweet-ranking', tweetId)
		const unsub = onSnapshot(resultRef,	snapshot => {
			const data = snapshot.data()
			// console.log(data)

			if(data) {
				setAnalyzesDetails(data)   
			} else if(once) {
                once = false
                analyzeTweet(tweetId, resultRef)
            }
		})

        return () => unsub()
	}, [tweetId])

    useEffect(() => {
        if(!analyzesDetails)
            return

        if(analyzesLoading) setAnalyzesLoading(false)
    }, [analyzesDetails, analyzesLoading])

	const analyzeTweet = (tweetId, requestRef) => {
		const orgId = user.team.org.id

		setDoc(requestRef, { tweetId, id: tweetId, orgId, userRSToken: user.token })
			.then(() => {
				console.log('analyzes request made')
				setAnalyzesLoading(true)
			})
			.catch(err => console.log(err))
	}

	return (
		<BaseTweetRankingPage
		title="Post Deep Dive"
		>
			<Stack spacing={3}>

				{/* <SearchBar
				  style={{
					width: "100%",
					maxWidth: '100%'
					// border: '1px solid #ddd'
					}}
				  value={input}
				  searchOnChange
				  onChange={onSearchChange}
				  cursorClearIcon="pointer"
				  placeholder="Search Tweet"
				  onSearch={onSearchTweet}
				/>

				<RenderIf condition={input !== ''}>
					<Button
					  variant="contained"
					  name="Analyze Tweet"
					  onClick={onAnalyzeClick}
					  style={{
						alignSelf: "end",
						width: "max-content",
					  }}
					/>
				</RenderIf>

				<RenderIf condition={!tweetId || tweetId === ''}>
					<Stack sx={{  }} alignItems="center" justifyContent="center">
                        <p style={{ fontWeight: 'bold', marginTop: 20 }}> 
                            Paste a Tweet link above to get started
                        </p>
                        <p style={{ fontSize: 16, margin: 0 }}>
                            We will analyze your tweet against your Contacts
                        </p>
                        <p style={{ fontSize: 16, margin: 0 }}>
                            so you can see who is engaging with your content
                        </p>
                    </Stack>
				</RenderIf> */}

				<RenderIf condition={tweetId && tweetId !== ''}>
					<Stack
						// in={openTweet}
					  style={{
						border: '1px solid #ddd'
					  }}
					>
						<TweetDetails 
						  tweetId={tweetId}
						  loading={analyzesLoading}
						  details={analyzesDetails}
						//   saving={savingTweet}
						//   onSaveTweet={onSaveTweet}
						//   showSaveButton
						/>
					</Stack>
				</RenderIf>
			</Stack >
		</BaseTweetRankingPage >
	)
}

export default TweetRankingDetailsPage;