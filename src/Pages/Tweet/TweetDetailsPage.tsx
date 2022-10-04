import React, { useContext } from 'react';

import { BaseTweetPage } from "./BaseTweetPage";
import ErrorPanel from 'UI/Layouts/ErrorPanel'

import CheckIcon from '@mui/icons-material/Check';
import SendIcon from '@mui/icons-material/Send';
import EventAvailableIcon from '@mui/icons-material/EventAvailable'
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { Divider } from '@mui/material';

import { RouteComponentProps } from 'react-router-dom';
import { useTweet, useTweetMutation } from 'Api/ReactQuery';
import RenderIf from 'UI/Widgets/RenderIf';
import { tweetRoutes } from 'Routes/Routes';
import { AppContext } from 'Context/AppProvider';
import { TweetPost } from 'UI/Widgets/Tweet/TweetPost';
import TweetDisplay from 'UI/Widgets/Tweet/TweetDisplay';

interface TweetDetailsPageProps extends RouteComponentProps<{ id: string }> { }

export const TweetDetailsPage: React.FC<TweetDetailsPageProps> = (props) => {
    const app = useContext(AppContext)
    const { update: updateTweet } = useTweetMutation()
    const tweet = useTweet(props.match.params.id)

    const actions = [
        {
            name: 'Edit',
            icon: EditRoundedIcon,
            variant: 'outlined',
            type: "link",
            to: `${tweetRoutes.edit}/${tweet.item?.id}`,
        },
        {
            name: 'Save and Close',
            icon: CheckIcon,
            variant: 'outlined',
            onClick: () => app.redirect(tweetRoutes.all),
        },
    ]

    if (new Date().getTime() >= (tweet.item?.send_at ? new Date(tweet.item.send_at).getTime() : new Date().getTime())) {
        actions.push({ name: 'Send', variant: 'contained', icon: SendIcon, onClick: () => changeStatus('pending') })
    } else {
        actions.push({ name: 'Schedule', variant: 'contained', icon: EventAvailableIcon, onClick: () => changeStatus('pending') })
    }

    if (tweet.item?.status === 'published')
        actions.splice(0, actions.length)

    console.log(tweet.item)

    const changeStatus = (status: 'draft' | 'pending') => {
        if (tweet.item?.id) {
            const sendAt = tweet.item?.send_at || new Date()
            updateTweet({ id: tweet.item?.id, data: { status: status, send_at: sendAt } }, {
                onSuccess: (res) => {
                    console.log("update", res)
                    app.alert.setSuccess("Send message")
                    app.redirect(tweetRoutes.all)
                }
            })
        }
    }

    return (
        <BaseTweetPage
            title="Tweet Preview"
            actions={actions}

        >
            <Divider />
            <RenderIf condition={tweet.isError}>
                <ErrorPanel
                    title={`${tweet.error?.response?.status} ${tweet.error?.response?.statusText}`}
                    body={tweet.error?.response?.data?.errors[0]?.message}
                />
            </RenderIf>

            <RenderIf condition={tweet.item || tweet.loading}>
                <TweetDisplay tweet={tweet.item} loading={tweet.loading} />
            </RenderIf>
        </BaseTweetPage>
    )
}

export default TweetDetailsPage;
