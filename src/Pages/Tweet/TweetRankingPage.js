
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'

import { Avatar, Box, Card, CardContent, CardHeader, CardMedia, Divider, Typography } from '@material-ui/core';
import { Stack } from '@mui/material'
import Collapse from '@mui/material/Collapse'

import { addDoc, setDoc, collection, doc, onSnapshot } from 'firebase/firestore'

import { db } from 'Api/Firebase'

import SearchBar from 'UI/Widgets/SearchBar'
import Button from 'UI/Widgets/Buttons/Button'
import RenderIf from 'UI/Widgets/RenderIf'
import TweetPage from './TweetPage'

import TweetDetails from './Components/TweetDetails'

const TweetRankingPage = (props) => {
	const [input, setInput] = useState('https://twitter.com/willy_lowry/status/1521517935155679237?s=20&t=d6QUaCurDkLz_Cwooh0f1A')
	const [tweetId, setTweetId] = useState('1521517935155679237')
	
	const [tweet, setTweet] = useState({})
	const [openTweet, setOpenTweet] = useState(true)

	const listener = useRef(null)

	useEffect(() => {
		if(!tweetId || tweetId === '')
			return

		// console.log('testing firestore')

		// addDoc(collection(db, 'logs'), {
		// 		message: 'Hey test success'
		// 	})
		// 	.then(res => {
		// 		console.log(res)
		// 	})
		// 	.catch(err => {
		// 		console.log(err)
		// 	})

	}, [tweetId])

	useEffect(() => {
		if(!listener.current)
			return

		return () => listener.current()
	}, [listener.current])

	const onTopActionClick = () => {
		console.log("onTopActionClick")
	}

	const onTweetSearch = () => {
		console.log("onTweetSearch")
		console.log(input)
		setOpenTweet(!openTweet)
	}

	const onSearchChange = (input) => {
		setInput(input)
	}

	const onSearchTweet = (value) => {
		// TODO

		let parts = value.split('/')
		console.log(parts)

		// https://twitter.com/willy_lowry/status/1521517935155679237?s=20&t=d6QUaCurDkLz_Cwooh0f1A

		let queryParams = value.split('/').slice(-1)
		// console.log(queryParams[0])
		let tweetId = queryParams[0].split('?')[0]

		console.log(tweetId)
		setTweetId(tweetId)
		setOpenTweet(true)

		const requestRef = doc(collection(db, 'requests'))
		setDoc(requestRef, { tweetId, id: requestRef.id })
			.then(() => {
				console.log('request made')
			})
			.catch(err => console.log(err))

		const unsub = onSnapshot(doc(db, 'tweet_logs', requestRef.id), (logRef) => {
			const log = logRef.data()

			console.log(log)
		})

		listener.current = unsub
	}

	const onAnalyzeClick = (e) => {
		onSearchTweet(input)
	}

	const onAddAnotherTweet = () => {
		console.log("onAddAnotherTweet")
	}


	return (
		<TweetPage
		  title="Post Deep Dive"
		  topActionName="+ New Search"
		  onTopActionClick={onTopActionClick}
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

				<Collapse
				  in={openTweet}
				  style={{
					border: '1px solid #ddd'
				  }}
				>
				  	<TweetDetails tweetId={tweetId}/>
				</Collapse>

			</Stack >
		</TweetPage >
	)
}

export default TweetRankingPage;