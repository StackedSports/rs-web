import { capitalize } from 'utils/Parser'
import { format } from 'date-fns'
import lodash from 'lodash'

export const getFilterContactsCriteria = (filters) => {
    if (!filters) return null
    //console.log(filters)

    let criteria = {}
    if (filters.search) {
        criteria['search'] = filters.search
    }

    if (filters.status) {
        criteria['status'] = filters.status.map(status => status.id)
    }

    if (filters.ranks) {
        criteria['ranks'] = filters.ranks.map(rank => rank.id)
    }

    if (filters.years) {
        criteria['years'] = filters.years.map(year => year.value)
    }

    if (filters.tags) {
        criteria['tags'] = []

        filters.tags.forEach(tag => {
            criteria.tags.push(tag.name)
        })
    }

    if (filters.positions) {
        criteria['positions'] = []

        filters.positions.forEach(position => {
            criteria.positions.push(position.abbreviation)
        })
    }

    if (filters.area_coaches) {
        criteria['area_coaches'] = []

        filters.area_coaches.forEach(areaCoach => {
            criteria.area_coaches.push(areaCoach.id)
        })
    }

    if (filters.position_coaches) {
        criteria['position_coaches'] = []

        filters.position_coaches.forEach(positionCoach => {
            criteria.position_coaches.push(positionCoach.id)
        })
    }

    if (filters.states) {
        criteria['states'] = []

        filters.states.forEach(state => {
            criteria.states.push(state.abbreviation)
        })
    }

    if (filters.timezones) {
        criteria['timezones'] = []

        filters.timezones.forEach(timezone => {
            criteria.timezones.push(timezone.name)
        })
    }

    if (filters.dob) {
        //console.log(filters.birthday[0])
        criteria['dob'] = filters.dob[0].value
    }

    if (filters.status_2) {
        //console.log(filters.status_2)
        criteria['status_2'] = filters.status_2.map(status => status.value)
    }

    // "criteria": {
    //     "search": "",
    //     "tags": [], //comma delimited list of tags
    //     "dob": ["1979-07-01", "1980-01-01"], //If passing in dob, both a start and end date are required
    //     "years": [ ], //comma delimited list of years
    //     "states": [ "TN" ], //comma delimited list of states
    //     "positions": [], //comma delimited list of positions
    //     "position_type": [], //comma delimited list of position types
    //     "status": [], //comma delimited list of statuses
    //     "status_2": [], //comma delimited list of status_2s
    //     "area_coaches":[], //comma delimited list of area coach ids
    //     "position_coaches":[], //comma delimited list of position coach ids
    //     "coordinators": [], //comma delimited list of coordinator coach ids
    //     "advisors": [], //comma delimited list of advisor coach ids
    //     "ranks": [], //comma delimited list of ranks
    //     "timezones":[] //comma delimited list of time zones
    // }

    return criteria
}

const getStatus = (status) => {
    // console.log(status)
    switch (status) {
        case 'drafts': return 'draft'
        case 'in_progress': return 'in progress'
        case 'finished': return 'sent'
        case 'scheduled': return 'pending'
        // case 'pending'
        default: return status
    }
}

export const getFilterMessagesCriteria = (filters) => {
    if (!filters)
        return null

    let criteria = {}

    //console.log(filters)

    if (filters.status) {
        criteria['message_status'] = []

        if (filters.status === 'all') {
            criteria['message_status'] = [`Error`, `Preview`, `In Progress`, `Sent`,
                `Rejected`, `Completed`, `Cancelled`, `Pending`]
        } else if (filters.status === 'finished') {
            criteria['message_status'] = [`Error`, `Sent`, `Completed`, `Cancelled`]
            // criteria['message_status'] = [`Sent`]
        } else {
            criteria['message_status'].push(getStatus(filters.status))
        }
    }

    if (filters.sender) {
        criteria['sender'] = filters.sender
    }
    if (filters.platform) {
        criteria['platform'] = filters.platform
    }
    if (filters.recipient_status) {
        criteria['recipient_status'] = filters.recipient_status
    }
    if (filters.tags) {
        criteria['tags'] = filters.tags
    }
    if (filters.send_at_dates) {
        if (filters.send_at_dates[0][0] != null && filters.send_at_dates[0][1] != null)
            criteria['send_at_dates'] = filters.send_at_dates[0].map(date => format(new Date(date), 'yyyy-MM-dd'))
    }
    if (filters.sent_at_dates) {
        if (filters.send_at_dates[0][0] != null && filters.send_at_dates[0][1] != null)
            criteria['sent_at_dates'] = filters.send_at_dates[0].map(date => format(new Date(date), 'yyyy-MM-dd'))
    }
    if (filters.message_status) {
        criteria['message_status'] = filters.message_status
    }

    // {
    //     "criteria":{
    //         "include_archived": "false" //Defaults to false
    //         ,"include_expired": "false" //Defaults to false
    //         ,"include_team": "false" //Defaults to false, set to true to return all team messages, if user is a team_admin
    //         ,"message_status": ["draft"] //Array of message statuses, 
    //              Available options: `Error`, `Preview`, `Deleted`, `In Progress`, `Sent`,
    //                              `Rejected`, `Archived`, `Completed`, `Cancelled`, `Pending`, `Draft`
    //         ,"recipient_status": ["pending"] //Array of recipients statuses,
    //              Available options: `cancelled`, `error`, `ignored`, `skipped`, `sent`, `pending`
    //         ,"platform": [] //Array of platforms, Available options: `Twitter`, `Personal Text`, `RS Text`
    //         ,"sender": [] //Array of user ids
    //         ,"tags": [] //Array of tag names
    //         ,"send_at_dates": [] // Filter by send at, If passing in send_at_dates, both a start and end date are required
    //         ,"sent_at_dates": [] //Filter by sent at, If passing in sent_at_dates, both a start and end date are required
    //     }
    // }

    return criteria
}

export const getMessagesQueryCriteriaObjFromFilters = (filters) => {
    if (!filters)
        return null
    const criteria = {}

    if (filters.message_status)
        criteria.message_status = filters.message_status.map(status => ({ label: status.label, value: status.name || status.value }))
    if (filters.platform)
        criteria.platform = filters.platform.map(platform => ({ label: platform.label, value: platform.name || platform.value }))
    if (filters.sender)
        criteria.sender = filters.sender.map(sender => ({ label: sender.label, value: sender.id || sender.value }))
    if (filters.recipient_status)
        criteria.recipient_status = filters.recipient_status.map(status => ({ label: status.label, value: status.name || status.value }))
    if (filters.tags)
        criteria.tags = filters.tags.map(tag => ({ label: tag.label, value: tag.name || tag.value }))
    if (filters.send_at_dates) {
        const { label, value } = filters.send_at_dates[0]
        criteria.send_at_dates = [{ label: label, value: value.map(date => format(new Date(date.replace(/-/g, '\/')), 'yyyy-MM-dd')) }]
    }
    if (filters.sent_at_dates) {
        const { label, value } = filters.sent_at_dates[0]
        criteria.sent_at_dates = [{ label: label, value: value.map(date => format(new Date(date.replace(/-/g, '\/')), 'yyyy-MM-dd')) }]
    }
    return criteria
}

// this function parse url params to the api criteria values
export const getMessagesCriteriaFromQueryString = (queryString) => {
    const criteria = Object.assign({}, queryString)

    const messageStatus = queryString?.message_status ? queryString.message_status[0]?.value : null

    switch (messageStatus) {
        case 'Drafts': criteria.message_status = ['Draft']
            break;
        case 'In Progress': criteria.message_status = ['In Progress']
            break;
        case 'Scheduled': criteria.message_status = ['pending']
            break;
        case 'Archived': criteria.message_status = ['Archived']
            break;
        case 'Finished': criteria.message_status = [`Error`, `Sent`, `Completed`, `Cancelled`]
            break;
        default: criteria.message_status = [`Error`, `Preview`, `In Progress`, `Sent`, `Rejected`, `Completed`, `Cancelled`, `Pending`]
    }

    if (queryString?.platform)
        criteria.platform = queryString.platform.map(platform => platform.value)
    if (queryString?.sender)
        criteria.sender = queryString.sender.map(sender => sender.value)
    if (queryString?.recipient_status)
        criteria.recipient_status = queryString.recipient_status.map(status => status.value)
    if (queryString?.tags)
        criteria.tags = queryString.tags.map(tag => tag.value)
    if (queryString?.status)
        criteria.status = queryString.status.value
    if (queryString?.send_at_dates)
        criteria.send_at_dates = queryString.send_at_dates[0]?.value
    if (queryString?.sent_at_dates)
        criteria.sent_at_dates = queryString.sent_at_dates[0]?.value

    return criteria
}

export const getFilterMediasCriteria = (filters) => {
    // console.log(filters)
    if (!filters)
        return null

    let criteria = {}

    if (filters.name) {
        criteria['name'] = filters.name
    }

    // OK
    if (filters.fileType)
        criteria['type'] = filters.fileType[0].id

    // OK 
    if (filters.tag) {
        criteria['tag_id'] = []

        filters.tag.forEach(tag => {
            criteria['tag_id'].push(tag.id)
        })
    }

    if (filters.placeholder)
        criteria['placeholder_id'] = filters.placeholder

    if (filters.owner) {
        criteria['owner_id'] = filters.owner.map(owner => owner.id)
    }
    if (filters.dateUploaded) {
        criteria['created_at'] = filters.dateUploaded[0].map(date => format(new Date(date), 'yyyy-MM-dd'))
    }
    if (filters.contact_id)
        criteria['contact_id'] = filters.contact_id.map(contact => contact.id)

    if (Object.keys(criteria).length === 0)
        return null

    return criteria
}

// this function is used to normalize the data between the api criteria filters and url params {label,value}
export const getMediaQueryCriteriaObjFromFilters = (filters) => {
    if (!filters)
        return null

    let criteria = {}

    if (filters.name) {
        criteria['name'] = { label: filters.label, value: filters.name }
    }

    if (filters.type)
        criteria['type'] = filters.type.map(type => ({ label: type.label, value: type.id || type.value }))

    if (filters.tag_id) {
        criteria['tag_id'] = filters.tag_id.map(tag => ({ label: tag.label, value: tag.id || tag.value }))
    }

    if (filters.placeholder)
        criteria['placeholder_id'] = filters.placeholder.map(placeholder => ({ label: placeholder.label, value: placeholder.id || placeholder.value }))

    if (filters.owner_id) {
        criteria['owner_id'] = filters.owner_id.map(owner => ({ label: owner.label, value: owner.id || owner.value }))
    }

    if (filters.created_at) {
        const { label, value } = filters.created_at[0]
        criteria['created_at'] = [{ label: label, value: value.map(date => format(new Date(date.replace(/-/g, '\/')), 'yyyy-MM-dd')) }]
    }

    // TODO: need add it on the server side
    /*     if (filters.contact_id)
            criteria['contact_id'] = { label: filters.label, value: filters.contact_id.map(contact => contact.id) } */

    if (Object.keys(criteria).length === 0)
        return null

    return criteria
}

// this function parse url params to the api criteria values
export const getMediaCriteriaFromQueryString = (queryString) => {
    if (!queryString)
        return null

    const criteria = {}

    if (queryString.name) {
        criteria['name'] = queryString.name.value
    }

    if (queryString.type)
        criteria['type'] = queryString.type.map(type => type.value)[0]

    if (queryString.tag_id) {
        criteria['tag_id'] = queryString.tag_id.map(tag => tag.value)
    }

    if (queryString.placeholder)
        criteria['placeholder_id'] = queryString.placeholder.value

    if (queryString.owner_id) {
        criteria['owner_id'] = queryString.owner_id.map(owner => owner.value)
    }
    if (queryString.created_at) {
        criteria['created_at'] = queryString.created_at[0].value
    }
    //TODO
    /*  if (queryString.contact_id)
         criteria['contact_id'] = queryString.contact_id.value */

    if (Object.keys(criteria).length === 0)
        return null
    return criteria
}

export const getFilterPlaceholdersCriteria = (filters) => {
    if (!filters)
        return null

    let criteria = {}

    if (filters.name) {
        criteria['name'] = filters.name
    }

    return criteria
}