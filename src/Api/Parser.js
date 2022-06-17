import { capitalize } from 'utils/Parser'
import { format } from 'date-fns'

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

    if (filters.rank) {
        criteria['ranks'] = []

        filters.rank.forEach(rank => {
            criteria.ranks.push(rank.id)
        })
    }

    if (filters.gradYear) {
        criteria['years'] = []

        filters.gradYear.forEach(year => {
            criteria.years.push(year.name)
        })
    }

    if (filters.tags) {
        criteria['tags'] = []

        filters.tags.forEach(tag => {
            criteria.tags.push(tag.name)
        })
    }

    if (filters.position) {
        criteria['positions'] = []

        filters.position.forEach(position => {
            criteria.positions.push(position.abbreviation)
        })
    }

    if (filters.areaCoach) {
        criteria['area_coaches'] = []

        filters.areaCoach.forEach(areaCoach => {
            criteria.area_coaches.push(areaCoach.id)
        })
    }

    if (filters.positionCoach) {
        criteria['position_coaches'] = []

        filters.positionCoach.forEach(positionCoach => {
            criteria.position_coaches.push(positionCoach.id)
        })
    }

    if (filters.state) {
        criteria['states'] = []

        filters.state.forEach(state => {
            criteria.states.push(state.abbreviation)
            criteria.states.push(state.name)
        })
    }

    if (filters.timeZone) {
        criteria['timezones'] = []

        filters.timeZone.forEach(timezone => {
            criteria.timezones.push(timezone.name)
        })
    }

    if (filters.birthday) {
        //console.log(filters.birthday[0])
        criteria['dob'] = filters.birthday[0]
    }

    if (filters.status_2) {
        //console.log(filters.status_2)
        criteria['status_2'] = filters.status_2.map(status => status.name)
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

    const criteria = Object.assign({}, filters)

    if (filters.platform)
        criteria.platform = filters.platform.map(platform => ({ itemLabel: platform.itemLabel, value: platform.name }))
    if (filters.sender)
        criteria.sender = filters.sender.map(sender => ({ itemLabel: sender.itemLabel, value: sender.id }))
    if (filters.recipient_status)
        criteria.recipient_status = filters.recipient_status.map(status => ({ itemLabel: status.itemLabel, value: status.name }))
    if (filters.tags)
        criteria.tags = filters.tags.map(tag => ({ itemLabel: tag.itemLabel, value: tag.name }))
    if (filters.status) {
        const status = filters.status[0]
        criteria.status = { itemLabel: status.itemLabel, value: status.id }
    }
    if (filters.send_at_dates) {
        if (filters.send_at_dates[0][0] != null && filters.send_at_dates[0][1] != null) {
            const { itemLabel, startDate, endDate } = filters.send_at_dates[0]
            criteria.send_at_dates = { itemLabel: itemLabel, value: [startDate, endDate].map(date => format(new Date(date), 'yyyy-MM-dd')) }
        }
    }
    if (filters.sent_at_dates) {
        if (filters.send_at_dates[0][0] != null && filters.send_at_dates[0][1] != null)
            criteria.sent_at_dates = filters.send_at_dates[0].map(date => format(new Date(date), 'yyyy-MM-dd'))
    }
    return criteria
}

// this function parse url params to the api criteria values
export const getMessagesCriteriaFromQueryString = (queryString) => {
    if (!queryString)
        return null

    const criteria = Object.assign({}, queryString)

    if (queryString.platform)
        criteria.platform = queryString.platform.map(platform => platform.value)
    if (queryString.sender)
        criteria.sender = queryString.sender.map(sender => sender.value)
    if (queryString.recipient_status)
        criteria.recipient_status = queryString.recipient_status.map(status => status.value)
    if (queryString.tags)
        criteria.tags = queryString.tags.map(tag => tag.value)
    if (queryString.status)
        criteria.status = queryString.status.value
    if (queryString.send_at_dates)
        criteria.send_at_dates = queryString.send_at_dates.value
    if (queryString.sent_at_dates)
        criteria.sent_at_dates = queryString.sent_at_dates.value


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

// this function is used to normalize the data between the api criteria filters and url params {itemLabel,value}
export const getMediaQueryCriteriaObjFromFilters = (filters) => {
    if (!filters)
        return null

    let criteria = {}

    if (filters.name) {
        criteria['name'] = { itemLabel: filters.itemLabel, value: filters.name }
    }

    if (filters.type)
        criteria['type'] = filters.type.map(type => ({ itemLabel: type.itemLabel, value: type.id || type.value }))

    if (filters.tag_id) {
        criteria['tag_id'] = filters.tag_id.map(tag => ({ itemLabel: tag.itemLabel, value: tag.id || tag.value }))
    }

    if (filters.placeholder)
        criteria['placeholder_id'] = filters.placeholder.map(placeholder => ({ itemLabel: placeholder.itemLabel, value: placeholder.id || placeholder.value }))

    if (filters.owner_id) {
        criteria['owner_id'] = filters.owner_id.map(owner => ({ itemLabel: owner.itemLabel, value: owner.id || owner.value }))
    }

    if (filters.created_at) {
        console.log(filters.created_at)
        const { itemLabel,value } = filters.created_at[0]
        console.log(value)
        criteria['created_at'] = [{ itemLabel: itemLabel, value: value.map(date => format(new Date(date), 'yyyy-MM-dd')) }]
    }

    // TODO: need add it on the server side
    /*     if (filters.contact_id)
            criteria['contact_id'] = { label: filters.itemLabel, value: filters.contact_id.map(contact => contact.id) } */

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
        console.log("criteria",queryString.created_at[0].value)
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