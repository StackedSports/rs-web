import { 
    Box,
    Divider, 
    Typography } from '@material-ui/core';
import { Stack } from '@mui/material';

import Button from 'UI/Widgets/Buttons/Button';
import RenderIf from 'UI/Widgets/RenderIf'

import TweetDisplay from './TweetDisplay'

const round = (num) => {
    let m = Number((Math.abs(num) * 100).toPrecision(15))
    return Math.round(m) / 100 * Math.sign(num)
}

const Stat = (props) => (
    <Stack>
        <Typography
            variant="h6"
            style={{ width: "100%", textAlign: "center", fontWeight: 'bold' }}
        >
            {`${round(props.value / props.total * 100)}%`}
        </Typography>
        <Typography
            variant="subtitle2"
            style={{ width: "100%", textAlign: "center" }}
        >
            {`${props.label} (${props.value}/${props.total})`}
        </Typography>
    </Stack>
)

const TweetDetails = (props) => {
    const onSaveTweet = () => {
		console.log("onSaveTweet")
	}

    const { metrics, likers, retweeters } = props.details

    return (
        <Stack ml={10} direction="row">
            <Stack
              sx={{
                borderLeft: "1px solid #ddd",
                borderRight: "1px solid #ddd",
                }}
              p={5}
              flex={1}
              spacing={4}
            >
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Typography
                      variant="info-bold"
                      style={{ textAlign: "center", fontWeight: 'bold' }}
                    >
                        Tweet Details
                    </Typography>

                    <Button
                    variant="contained"
                    name="+ Save"
                    onClick={onSaveTweet}
                    style={{
                        width: "max-content",
                    }}
                    />
                </Stack>

                <TweetDisplay tweetId={props.tweetId}/>

            </Stack>

            <Stack flex={.5}>
                <Box sx={{ width: "100%" }} p={2}>
                    <Typography
                      variant="subtitle1"
                      style={{ width: "100%", textAlign: "center", fontWeight: 'bold' }}
                    >
                        Contact Engagment Stats
                    </Typography>
                </Box>

                <Divider/>

                <Stack spacing={3} p={2}>
                    <Stat
                      label="Retweet Rate"
                      value={retweeters?.found || 0}
                      total={metrics?.retweets || 0}
                    />
                    {/* <Stat
                      label="Quote Tweet Rate"
                      value={10}
                      total={86}
                    /> */}
                    <Stat
                      label="Likes Rate"
                      value={likers?.found || 0}
                      total={metrics?.likes || 0}
                    />

                    <RenderIf condition={likers}>
                        <Typography
                            variant="subtitle2"
                            style={{ width: "100%", textAlign: "center" }}
                        >
                            {`Fetched: ${likers?.fetched}, analyzed: ${likers?.analyzed}, found: ${likers?.found}`}
                        </Typography>
                    </RenderIf>
                    
                    
                </Stack>

                <Divider/>

                

                {/* <Box sx={{ width: "100%" }}>
                    <Divider />
                    <Typography
                    variant="subtitle1"
                    style={{ width: "100%", textAlign: "center" }}
                    >
                    Board Engagment Status
                    </Typography>
                    <Divider />
                </Box> */}
            </Stack>
        </Stack>
    )
}

export default TweetDetails