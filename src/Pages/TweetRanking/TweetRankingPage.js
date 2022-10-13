
import { useState, useContext } from 'react'

import { Stack, Divider } from '@mui/material'

import SearchBar from 'UI/Widgets/SearchBar'
import Button from 'UI/Widgets/Buttons/Button'
import RenderIf from 'UI/Widgets/RenderIf'

import { AuthContext } from 'Context/Auth/AuthProvider'
import { AppContext } from 'Context/AppProvider'
import { tweetRankingRoutes } from 'Routes/Routes'
import { BaseTweetRankingPage } from './BaseTweetRankingPage'

const TweetRankingPage = (props) => {
	const { user } = useContext(AuthContext)
    const { redirect } = useContext(AppContext)

	const [input, setInput] = useState('')
	const [tweetId, setTweetId] = useState(null)

	const onSearchChange = (input) => {
		setInput(input)
	}

	const onAnalyzeClick = (e) => {
		if(input === '')
			return
	
		// Getting TweetId from Tweet Url
		let queryParams = input.split('/').slice(-1)
		let inputTweetId = queryParams[0].split('?')[0]

		console.log(inputTweetId)

		redirect(`${tweetRankingRoutes.details}/${inputTweetId}`)
	}

	return (
		<BaseTweetRankingPage
		  title="Post Deep Dive"
		>
			<Stack spacing={3} pt={3}>

				<SearchBar
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
				  onSearch={onAnalyzeClick}
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
			</Stack>
		</BaseTweetRankingPage>
	)
}

export default TweetRankingPage;