import { useState, useEffect } from "react"
import { useQuery, useQueryClient, useMutation, useInfiniteQuery } from "react-query"
import { getInboxes, getInboxConversation, getInboxSMS, getInboxDM } from "Api/Endpoints"
import { usePagination } from "Api/Pagination"
import { IPaginationApi, ITeamInboxItem, ITeamInboxAPI, IUserInboxItem, IUserInboxAPI, InboxType, IConversatitionAPI, IConversatition, IApiResponse } from "Interfaces"

export const useTeamInboxes = () => {
    const reactQuery = useQuery('team_inboxes', () => getInboxes(), {
        select: (data: [ITeamInboxAPI[], IPaginationApi]): ITeamInboxItem[] => data[0]
            .map((inbox): ITeamInboxItem => {
                if (inbox.twitter_enable)
                    return {
                        team_member_id: inbox.id,
                        name: inbox.full_name,
                        channel: '',
                        type: 'dm'
                    }

                else
                    return {
                        team_member_id: inbox.id,
                        name: inbox.full_name,
                        channel: inbox.phone_number,
                        type: 'sms'
                    }
            })
            .sort((a: ITeamInboxItem, b: ITeamInboxItem) => a.name.localeCompare(b.name))
    })

    return {
        ...reactQuery,
        items: reactQuery.data,
        loading: reactQuery.isLoading
    }

}

/* export const useUserInbox = (userId: string, inboxType: InboxType) => {
    const reactQuery = useQuery('user_inbox', () => getInbox(), {
        select: (data: [IUserInboxAPI[], IPaginationApi]): IUserInboxItem[] => data[0]
            .map((inbox: IUserInboxAPI) => ({
                contact_id: inbox.team_contact.team_contact_id,
                name: inbox.team_contact.first_name + ' ' + inbox.team_contact.last_name,
                profile_img: inbox.team_contact.profile_image,
                type: inbox.last_message.message_type === 'sms' ? 'sms' : 'dm',
                from: inbox.last_message.from,
                preview: inbox.last_message.last_message_preview,
                time: inbox.last_message.last_received_time
            }))
    })

    return {
        ...reactQuery,
        items: reactQuery.data,
        loading: reactQuery.isLoading
    }
} */

export const useInbox = (inboxId?: number | string, inboxType?: InboxType) => {

    const get = inboxType === "dm" ? getInboxDM : getInboxSMS

    const reactQuery = useQuery(['inbox', inboxId, inboxType], () => get(inboxId), {
        enabled: !!inboxId && !!inboxType,
        select: (data: IApiResponse<IUserInboxAPI>): IUserInboxItem[] => data[0]
            .map((inbox) => ({
                contact_id: inbox.team_contact.team_contact_id,
                name: inbox.team_contact.first_name + ' ' + inbox.team_contact.last_name,
                profile_img: inbox.team_contact.profile_image,
                type: inbox.last_message.message_type === 'sms_events' ? 'sms' : 'dm',
                from: inbox.last_message.from,
                preview: inbox.last_message.last_message_preview,
                time: inbox.last_message.last_received_time
            }))
    })

    return {
        ...reactQuery,
        items: reactQuery.data,
        loading: reactQuery.isLoading
    }

}

interface getInboxConversationParams {
    contact_id?: number | string,
    inbox_type?: InboxType,
    user_id?: number | string
}

export const useInboxConversation = (params: getInboxConversationParams, initialPage: number = 1, itemsPerPage: number = 20) => {
    const [conversation, setConversation] = useState<IConversatition[]>([])
    const [pagination, setPagination] = usePagination(initialPage, itemsPerPage)



    const reactQuery = useQuery(['inbox', 'conversation', params, initialPage, itemsPerPage],
        // @ts-ignore: Unreachable code error 
        () => getInboxConversation(params, initialPage, itemsPerPage),
        {
            enabled: !!params.contact_id && !!params.inbox_type,
            select: (data: IApiResponse<IConversatitionAPI>): IApiResponse<IConversatition> => {
                const parsedConversation = data[0].map(conversation => ({
                    ...conversation,
                    id: `${conversation.created_at}${conversation.message}`,
                    text: conversation.message
                }))
                return [parsedConversation, data[1]];
            }
        })

    useEffect(() => {
        if (reactQuery.isSuccess) {
            const [conversationApi, paginationApi] = reactQuery.data
            setConversation(conversationApi)
            setPagination(paginationApi)
        } else {
            console.log(reactQuery.error)
        }

    }, [reactQuery.isSuccess, reactQuery.data, reactQuery.isError])

    return {
        ...reactQuery,
        items: conversation,
        pagination,
        loading: reactQuery.isLoading
    }
}

export const useInboxConversationInfinte = (params: getInboxConversationParams, itemsPerPage: number = 20) => {
    const [conversation, setConversation] = useState<IConversatition[]>([])

    const reactQuery = useInfiniteQuery<IApiResponse<IConversatitionAPI>>(['inbox', 'conversation', params],
        // @ts-ignore: Unreachable code error 
        ({ pageParam = 1 }) => getInboxConversation(params, pageParam, itemsPerPage),
        {
            enabled: !!params.contact_id && !!params.inbox_type,
            keepPreviousData: true,
            getNextPageParam: (lasPage) => {
                return lasPage[1].currentPage >= lasPage[1].totalPages ? undefined : lasPage[1].currentPage + 1
            },
        })

    useEffect(() => {
        if (reactQuery.data) {
            const { pages } = reactQuery.data
            const conversations = pages.map(data => data[0].map(conversation => ({
                ...conversation,
                id: `${conversation.created_at}${conversation.message}`,
                text: conversation.message
            }))).flat().reverse()
            setConversation(conversations)
        } else {
            console.log("error", reactQuery.error)
        }

    }, [reactQuery.isSuccess, reactQuery.data, reactQuery.isError])

    return {
        ...reactQuery,
        items: conversation,
        loading: reactQuery.isLoading
    }
}