import { useState, useEffect } from "react"
import { useQuery, useQueryClient, useMutation } from "react-query"
import { getInboxes, getInbox, getInboxConversation } from "Api/Endpoints"
import { usePagination } from "Api/Pagination"
import { IPaginationApi, ITeamInboxItem, ITeamInboxAPI, IUserInboxItem, IUserInboxAPI } from "Interfaces"

export const useTeamInboxes = () => {
    const reactQuery = useQuery('team_inboxes', () => getInboxes(), {
        select: (data: [ITeamInboxAPI[], IPaginationApi]): ITeamInboxItem[] => data[0]
            .map((inbox: ITeamInboxAPI) => {
                if(inbox.twitter_enable)
                    return {
                        id: inbox.id,
                        name: inbox.full_name,
                        channel: '',
                        type: 'dm'
                    }
                
                else //if(inbox.phone_number)
                    return {
                    id: inbox.id,
                    name: inbox.full_name,
                    channel: inbox.phone_number,
                    type: 'sms'
                }
            })
    })

    return {
        ...reactQuery,
        items: reactQuery.data,
        loading: reactQuery.isLoading
    }

}

export const useUserInbox = () => {
    const reactQuery = useQuery('user_inbox', () => getInbox(), {
        select: (data: [IUserInboxAPI[], IPaginationApi]): IUserInboxItem[] => data[0]
            .map((inbox: IUserInboxAPI) => ({
                id: inbox.team_contact.team_contact_id,
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
}