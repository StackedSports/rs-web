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
            style={{ width: "100%", textAlign: "center", fontWeight: 'bold', fontSize: 36 }}
        >
            {`${round(props.value / props.total * 100)}%`}
        </Typography>
        <Typography
            variant="subtitle2"
            style={{ width: "100%", textAlign: "center", fontWeight: 'bold', fontSize: 18 }}
        >
            {`${props.label} (${props.value}/${props.total})`}
        </Typography>
    </Stack>
)

const Count = (props) => (
    <Stack>
        <Typography
            variant="h6"
            style={{ width: "100%", textAlign: "center", fontWeight: 'bold', fontSize: 16 }}
        >
            {props.value}
        </Typography>
        <Typography
            variant="subtitle2"
            style={{ width: "100%", textAlign: "center", fontWeight: 'bold', fontSize: 14 }}
        >
            {props.label}
        </Typography>
    </Stack>
)

const Status = ({ status }) => (
    <Stack>
        <Typography
            variant="subtitle2"
            style={{ width: "100%", textAlign: "center" }}
        >
            {`Status: ${status?.status}`}
        </Typography>  
        <Typography
            variant="subtitle2"
            style={{ width: "100%", textAlign: "center" }}
        >
            {`Message: ${status?.message}`}
        </Typography>  
        <Typography
            variant="subtitle2"
            style={{ width: "100%", textAlign: "center" }}
        >
            {`Fetched: ${status?.fetched}`}
        </Typography>   
        <Typography
            variant="subtitle2"
            style={{ width: "100%", textAlign: "center" }}
        >
            {`Analyzed: ${status?.analyzed}`}
        </Typography>   
        <Typography
            variant="subtitle2"
            style={{ width: "100%", textAlign: "center" }}
        >
            {`Found: ${status?.found}`}
        </Typography> 
    </Stack>
)

const TweetDetails = (props) => {
    const onSaveTweet = () => {
		console.log("onSaveTweet")
	}

    const { metrics, likes, retweets } = props.details

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

                    <RenderIf condition={props.showSaveButton}>
                        <Button
                          variant="contained"
                          name={props.details.saved ? 'Saved!' : 'Save'}
                          onClick={props.onSaveTweet}
                          loading={props.saving}
                          style={{
                            width: "max-content",
                          }}
                        />
                    </RenderIf>


                    
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
                      value={retweets?.found || 0}
                      total={metrics?.retweets || 0}
                    />

                    <RenderIf condition={retweets}>
                        <Status status={retweets}/>
                    </RenderIf>
                    {/* <Stat
                      label="Quote Tweet Rate"
                      value={10}
                      total={86}
                    /> */}
                    <Stat
                      label="Likes Rate"
                      value={likes?.found || 0}
                      total={metrics?.likes || 0}
                    />

                    <RenderIf condition={likes}>
                        <Status status={likes}/>
                    </RenderIf>
                    
                    
                </Stack>

                <Divider/>

                <RenderIf condition={metrics}>
                    <Stack mt={2} direction="row" flex={1} justifyContent="space-around">
                        <Count label="Likes" value={metrics?.likes}/>
                        <Count label="Retweets" value={metrics?.retweets}/>
                        <Count label="Quotes" value={metrics?.quotes}/>
                        <Count label="Replies" value={metrics?.replies}/>
                    </Stack>
                </RenderIf>

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