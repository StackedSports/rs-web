import { useState, useEffect } from "react"
import { useQuery, useInfiniteQuery, InfiniteData, useMutation, useQueryClient } from "react-query"
import { getInboxes, getInboxConversation, getInboxSMS, getInboxDM, sendConversation } from "Api/Endpoints"
import { usePagination } from "Api/Pagination"
import { IPaginationApi, ITeamInboxItem, ITeamInboxAPI, IUserInboxItem, IUserInboxAPI, InboxType, IConversatitionAPI, IConversatition, IApiResponse, ISendConversation } from "Interfaces"

export const useTeamInboxes = () => {
    const reactQuery = useQuery('team_inboxes', () => getInboxes(), {
        select: (data: [ITeamInboxAPI[], IPaginationApi]): ITeamInboxItem[] => {
            let items: ITeamInboxItem[] = []

            data[0].forEach((inbox) => {
                if (inbox.phone_number)
                    items.push({
                        team_member_id: inbox.id,
                        name: inbox.full_name,
                        channel: inbox.phone_number,
                        type: 'sms'
                    })
                if (inbox.twitter_enable)
                    items.push({
                        team_member_id: inbox.id,
                        name: inbox.full_name,
                        channel: '',
                        type: 'dm'
                    })
            })

            return items.sort((a: ITeamInboxItem, b: ITeamInboxItem) => a.name.localeCompare(b.name))
        }
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
        staleTime: 10 * 1000,
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
            staleTime: 10 * 1000,
            //keepPreviousData: true,
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

export const useInboxConversationInfinty = (params: getInboxConversationParams, itemsPerPage: number = 20) => {

    const reactQuery = useInfiniteQuery(['inbox', 'conversation', params],
        // @ts-ignore: Unreachable code error 
        ({ pageParam = 1 }) => getInboxConversation(params, pageParam, itemsPerPage),
        {
            enabled: !!params.contact_id && !!params.inbox_type,
            staleTime: 10 * 1000,
            select: (data: InfiniteData<IApiResponse<IConversatitionAPI>>): InfiniteData<IConversatition[]> => {
                const pageParams = data.pageParams
                const pages = data.pages.map((data) => data[0].map(conversation => ({
                    ...conversation,
                    id: `${conversation.created_at}${conversation.message}`,
                    text: conversation.message
                })))
                return {
                    pageParams: pageParams,
                    pages: pages
                }
            },
            getNextPageParam: (lasPage) => {
                return lasPage[1].currentPage >= lasPage[1].totalPages ? undefined : lasPage[1].currentPage + 1
            },
        })

    return {
        ...reactQuery,
        items: reactQuery.data?.pages.flat() || [],
        loading: reactQuery.isLoading
    }
}

export const useConversationMutation = () => {
    const queryClient = useQueryClient();

    // @ts-ignore: Unreachable code error 
    return useMutation((data: ISendConversation) => sendConversation(data), {
        onSuccess: () => {
            queryClient.invalidateQueries(['inbox', 'conversation'], { active: true })
        }
    })
}