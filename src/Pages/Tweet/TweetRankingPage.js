
import { useState, useEffect, useRef, useContext } from 'react'
import axios from 'axios'

import { Avatar, Box, Card, CardContent, CardHeader, CardMedia, Divider, Typography } from '@material-ui/core';
import { Stack } from '@mui/material'
import Collapse from '@mui/material/Collapse'

import { addDoc, setDoc, getDoc, getDocs, collection, doc, onSnapshot, updateDoc, query, where } from 'firebase/firestore'
import { httpsCallable } from 'firebase/functions'

import { db, functions } from 'Api/Firebase'

import SearchBar from 'UI/Widgets/SearchBar'
import Button from 'UI/Widgets/Buttons/Button'
import RenderIf from 'UI/Widgets/RenderIf'
import TweetPage from './TweetPage'

import TweetDetails from './Components/TweetDetails'

import { AuthContext } from 'Context/Auth/AuthProvider'

const TweetRankingPage = (props) => {
	const { user } = useContext(AuthContext)

	// const [input, setInput] = useState('https://twitter.com/USC_FB/status/1523330156374282240')
	// const [tweetId, setTweetId] = useState('1523330156374282240')

	// https://twitter.com/StackedSports/status/1526584454629601282?s=20&t=FHrYYmUINuuLa5ypJDUwWg

	const [input, setInput] = useState('')
	const [tweetId, setTweetId] = useState(null)
	// const [tweetDetails, setTweetDetails] = useState(null)

	const [analyzesLoading, setAnalyzesLoading] = useState(false)
	const [analyzesDetails, setAnalyzesDetails] = useState(false)

	const [savingTweet, setSavingTweet] = useState(false)

	const [tweet, setTweet] = useState({})
	const [openTweet, setOpenTweet] = useState(true)

	const listener = useRef(null)
	const listener2 = useRef(null)

	// console.log(user)

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

	const onSearchChange = (input) => {
		setInput(input)
	}

	const onSearchTweet = (value) => {
		// Getting TweetId from Tweet Url
		let queryParams = value.split('/').slice(-1)
		let inputTweetId = queryParams[0].split('?')[0]

		console.log(inputTweetId)

		if(tweetId === inputTweetId) {
			console.log('tweet has already been requested')
			return
		}

		console.log('ids didnt match')

		// return

		setTweetId(inputTweetId)
		setOpenTweet(true)

		// Check to see if analyzes exists

		let once = true

		const resultRef = doc(db, 'orgs', user.team.org.id, 'tweet-ranking', inputTweetId)
		const unsub = onSnapshot(resultRef,	snapshot => {
			const data = snapshot.data()
			console.log(data)

			if(data) {
				setAnalyzesDetails(data)
			} else if(once) {
				once = false
				analyzeTweet(inputTweetId, resultRef)
			}
		})

		listener.current = unsub
	}
	
	const analyzeTweet = (tweetId, requestRef) => {

		// 'requests/tweet/ranking/{id}'

		// orgs/{orgId}/tweet-ranking/{requestId}

		

		const orgId = user.team.org.id

		// const requestRef = doc(collection(db, 'orgs', orgId, 'tweet-ranking'))
		// const requestRef = doc(db, 'orgs', orgId, 'tweet-ranking', tweetId)
		setDoc(requestRef, { tweetId, id: tweetId, orgId })
			.then(() => {
				console.log('analyzes request made')
				setAnalyzesLoading(true)
			})
			.catch(err => console.log(err))
	}

	const syncContacts = () => {
		const contactsRequestRef = doc(collection(db, 'requestSyncContacts'))
		setDoc(contactsRequestRef, { id: contactsRequestRef.id, userToken: user.token, orgId: user.team.org.id })
			.then(() => {
				console.log('contacts request made')
			})
			.catch(err => {
				console.log(err)
			})

		let lastStatus = ''

		const unsub = onSnapshot(doc(db, 'syncContactsResponse', contactsRequestRef.id), (snapshot) => {
			const data = snapshot.data()
			// console.log('got contacts data response')
			console.log(data)

			if(data) {
				if(lastStatus != data.status) {
					lastStatus = data.status
					console.log(data.status)
				}

				if(data.message)
					console.log(data.message)
			}
		})

		listener.current = unsub

		const unsub2 = onSnapshot(doc(db, 'logs', 'testing'), (snapshot) => {
			console.log(snapshot.data())
		})

		listener2.current = unsub2
	}

	const onAnalyzeClick = (e) => {
		onSearchTweet(input)
	}

	const onAddAnotherTweet = () => {
		console.log("onAddAnotherTweet")
	}

	const onSaveTweet = (e) => {
		return

		setSavingTweet(true)

		const tweetRef = doc(db, 'orgs', user.team.org.id, 'tweet-ranking', tweetId)
		updateDoc(tweetRef, { saved: true })
			.then(() => {

			})
			.catch(err => {

			})
			.finally(() => {
				setSavingTweet(false)
			})
	}


	return (
		<TweetPage
		  title="Post Deep Dive"
		>
			<Stack spacing={3}>
				<Divider />

				<SearchBar
				  style={{
					width: "100%",
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
				</RenderIf>
				
				{/* {input !== '' && 
					<Button
					  variant="contained"
					  name="Analyze Tweet"
					  onClick={onAnalyzeClick}
					  style={{
						alignSelf: "end",
						width: "max-content",
					  }}
					/>
				} */}

				{/* {!openTweet && <Divider />} */}

				{/* <Button
				name="+ Add Another"
				onClick={onAddAnotherTweet}
				style={{
					alignSelf: "end",
					width: "max-content",
				}}
				/> */}

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
						  saving={savingTweet}
						  onSaveTweet={onSaveTweet}
						//   showSaveButton
						/>
					</Stack>
				</RenderIf>
			</Stack >
		</TweetPage >
	)
}

export default TweetRankingPage;