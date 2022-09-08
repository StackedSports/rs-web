import { useState, useEffect, useContext, useMemo } from 'react';

import {
    Box,
    Divider,
    Typography,
    Stack
} from '@mui/material';
import { AuthContext } from 'Context/Auth/AuthProvider';

import RenderIf from 'UI/Widgets/RenderIf'
import Button from 'UI/Widgets/Buttons/Button';
import DropdownButton from 'UI/Widgets/Buttons/DropdownButton'
import { TweetRankingDialog } from 'UI/Widgets/Dialogs/TweetRankingDialog';
import LoadingPanel from 'UI/Widgets/LoadingPanel'
import TweetDisplay from './TweetDisplay'
import { db } from 'Api/Firebase'
import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";

import { formatDate } from 'utils/Parser'

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
            {`${props.value === 0 ? 0 : round(props.value / props.total * 100)}%`}
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
            style={{ width: "100%", textAlign: "center", fontWeight: 'bold', fontSize: 14, marginBottom: 1 }}
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
        {/* <Typography
            variant="subtitle2"
            style={{ width: "100%", textAlign: "center" }}
        >
            {`Message: ${status?.message}`}
        </Typography> */}
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

    const { user } = useContext(AuthContext)
    const [openDialog, setOpenDialog] = useState(false)
    const { metrics, likes, retweets } = props.details
    const [contactsLikes, setContactsLikes] = useState([])
    const [contactsRetweets, setContactsRetweets] = useState([])

    // console.log(props.details)

    useEffect(() => {
        const likesColRef = collection(db, `orgs/${user.team.org.id}/tweet-ranking/${props.tweetId}/contacts-likes`)
        const unsub = onSnapshot(likesColRef, (snapshot) => {
                setContactsLikes(snapshot.docs.map(doc => doc.data()))
            })

        return () => unsub()
    }, [])

    useEffect(() => {
        const retweetsColRef = collection(db, `orgs/${user.team.org.id}/tweet-ranking/${props.tweetId}/contacts-retweets`)
        const unsub = onSnapshot(retweetsColRef, (snapshot) => {
                setContactsRetweets(snapshot.docs.map(doc => doc.data()))
            })
            
        return () => unsub()
    }, [])

    const onArchive = (e) => {
        updateDoc(
            doc(db, `orgs/${user.team.org.id}/tweet-ranking/${props.tweetId}`), 
            { archived: !props.details.archived }
        )
    }

    const onDelete = (e) => {

    }

    const reportDate = useMemo(() => {
        if(!props.details | !props.details.timestamp)
            return ''

        return formatDate(new Date(props.details.timestamp))
    }, [props.details])

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

                    <DropdownButton
                      id={`tweet-details-more-btn-${props.tweetId}`}
                      actions={[
                        { label: props.details.archived ? 'Unarchive' : 'Archive', onClick: onArchive }
                        // { label: 'Delete', onClick: onDelete }
                      ]}
                    />

                </Stack>

                <TweetDisplay tweetId={props.tweetId} />

                <Typography
                    variant="body"
                    // style={{ fontWeight: 'bold' }}
                >
                    Created at: {reportDate}
                </Typography>
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

                <Divider />

                <RenderIf condition={props.loading}>
                    <LoadingPanel/>
                </RenderIf>

                <RenderIf condition={!props.loading}>
                    <Stack spacing={3} p={2}>
                        <Stat
                            label="Likes Rate"
                            value={likes?.found || 0}
                            total={metrics?.likes || 0}
                        />

                        <RenderIf condition={likes}>
                            <Status status={likes} />
                        </RenderIf>

                        <RenderIf condition={!likes}>
                            <LoadingPanel height={100}/>
                        </RenderIf>

                        <Stat
                            label="Retweet Rate"
                            value={retweets?.found || 0}
                            total={metrics?.retweets || 0}
                        />

                        <RenderIf condition={retweets}>
                            <Status status={retweets} />
                        </RenderIf>

                        <RenderIf condition={!retweets}>
                            <LoadingPanel height={100}/>
                        </RenderIf>
                    </Stack>

                    <Divider />

                    <RenderIf condition={metrics}>
                        <Stack mt={2} mb={2} direction="row" justifyContent="space-around">
                            <Count label="Likes" value={metrics?.likes} />
                            <Count label="Retweets" value={metrics?.retweets} />
                            <Count label="Quotes" value={metrics?.quotes} />
                            <Count label="Replies" value={metrics?.replies} />
                        </Stack>
                    </RenderIf>

                    <Divider />

                    {/* <Stack direction="row" flex={1}>
                        <RenderIf condition={true}>
                            <Button
                                variant="contained"
                                name="View Contacts"
                                onClick={props.onSaveTweet}
                            />
                        </RenderIf>
                    </Stack> */}

                    <Box flex={1} sx={{ width: "100%", display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }} p={2}>
                        <Button
                            variant="contained"
                            name="View Contacts"
                            onClick={() => setOpenDialog(true)}
                        />
                    </Box>
                </RenderIf>

                
            </Stack>
            <TweetRankingDialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                contactsLikes={contactsLikes}
                contactsRetweets={contactsRetweets}
            />
        </Stack>
    )
}

export default TweetDetails