import { useState, useEffect, useMemo } from "react"
import { useQuery, useQueryClient, useMutation } from "react-query"
import { getInboxes, getInbox, getInboxConversation, getInboxSMS, getInboxDM } from "Api/Endpoints"
import { usePagination } from "Api/Pagination"
import { IPaginationApi, ITeamInboxItem, ITeamInboxAPI, IUserInboxItem, IUserInboxAPI, InboxType } from "Interfaces"

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

export const useUserInbox = (userId: string, inboxType: InboxType) => {
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
}

/* export const useInboxDM = (inboxId: number | string) => {
    const reactQuery = useQuery(['inbox_dm', inboxId], () => getInboxDM(), {
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
}

export const useInboxSMS = (inboxId: number | string | null) => {
    if (!inboxId)
        return null

    const reactQuery = useQuery(['inbox_dm', inboxId], () => getInboxSMS(), {
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
        select: (data: [IUserInboxAPI[], IPaginationApi]): IUserInboxItem[] => data[0]
            .map((inbox) => ({
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

}

export const useInboxConversation = (contact_id?: number | string, inboxType?: InboxType, userId?: number | string) => {

    const reactQuery = useQuery(['inbox', 'conversation', contact_id, userId, inboxType], {
        enabled: !!contact_id && !!inboxType,
        select: (data: [any, IPaginationApi]) => data[0]
    }
    )

    return {
        ...reactQuery,
        item: reactQuery.data,
        loading: reactQuery.isLoading
    }
}