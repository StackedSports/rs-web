import { useState, useRef, useEffect } from 'react'

import TweetEmbed from 'react-tweet-embed'
import './TweetDisplay.css'

import { Box, TextField, Stack } from '@mui/material'

import RenderIf from 'UI/Widgets/RenderIf'
import LoadingPanel from 'UI/Widgets/LoadingPanel'

const TweetDisplay = (props) => {
    const [loading, setLoading] = useState(false)

    const [tweetId, setTweetId] = useState('')
    const lastId = useRef(props.tweetId)
    
    const tweetContainer = useRef(null)
	const [tweetWidget, setTweetWidget] = useState(null)

    const [refresh, setRefresh] = useState(false)
    
    // console.log(tweetWidget)

    useEffect(() => {
        if(!props.tweetId || (props.tweetId === lastId.current && tweetWidget))
            return
        
        if(props.tweetId === '') {
            lastId.current = props.tweetId
            return
        }

        setLoading(true)
        setTweetId(props.tweetId)

    }, [props.tweetId])

    const onTweetLoadSuccess = (widget) => {
		//console.log(widget)

		setLoading(false)
		setTweetWidget(widget)

		if(tweetContainer.current) {
			// tweetContainer.current.innerHTML = widget
			//console.log('set inner html')

            setTimeout(() => setRefresh(oldValue => !oldValue), 200)
		}
	}

	const onTweetLoadError = (error) => {
		console.log(error)
		setLoading(false)
	}

    // console.log(tweetContainer.current?.offsetWidth)
    // console.log(tweetContainer.current?.offsetWidth || 0)
    // console.log(((tweetContainer.current?.offsetWidth || 0) - 500 ))
    // console.log((tweetContainer.current?.offsetWidth || 0 - 500 ) / 2)

    return (
        <Box alignItems="center" justifyContent="center">
            <RenderIf condition={loading}>
                <LoadingPanel/>
            </RenderIf>
            {loading && (
                <TweetEmbed 
                  // className={tweetLoading ? '' : 'TweetEmbed'}
                  id={tweetId} 
                  options={{ align: 'center' }}
                  onTweetLoadSuccess={onTweetLoadSuccess}
                  onTweetLoadError={onTweetLoadError}
                />
            )}
            {refresh && <div></div>}
            <div 
              ref={tweetContainer} 
              style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                paddingLeft: ((tweetContainer.current?.offsetWidth || 0) - 500 ) / 4
              }}
              dangerouslySetInnerHTML={{ __html: tweetWidget?.innerHTML }}
            />
        </Box>
    )
}

export default TweetDisplay