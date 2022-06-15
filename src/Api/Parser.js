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

export const getFilterMediasCriteria = (filters) => {
    // console.log(filters)
    if (!filters)
        return null

    let criteria = {}

    if (filters.name) {
        criteria['name'] = filters.name
    }

    // OK
    if (filters.type)
        criteria['type'] = filters.type[0].id || filters.fileType

    // OK 
    if (filters.tag_id) {
        criteria['tag_id'] = filters.tag_id.map(tag => tag.id)
    }

    if (filters.placeholder)
        criteria['placeholder_id'] = filters.placeholder

    if (filters.owner_id) {
        criteria['owner_id'] = filters.owner_id.map(owner => owner.id)
    }
    if (filters.created_at) {
        criteria['created_at'] = filters.created_at[0].map(date => format(new Date(date), 'yyyy-MM-dd'))
    }
    if (filters.contact_id)
        criteria['contact_id'] = filters.contact_id.map(contact => contact.id)

    if (Object.keys(criteria).length === 0)
        return null

    return criteria
}

export const getQueryStringCriteria = (queryString) => {
    if (!queryString)
        return null

    const criteria = {}

    if (queryString.name) {
        criteria['name'] = queryString.name[0]
    }

    // OK
    if (queryString.type)
        criteria['type'] = queryString.type[0]

    // OK 
    if (queryString.tag_id) {
        criteria['tag_id'] = queryString.tag_id
    }

    if (queryString.placeholder)
        criteria['placeholder_id'] = queryString.placeholder

    if (queryString.owner_id) {
        criteria['owner_id'] = queryString.owner_id
    }
    if (queryString.created_at) {
        criteria['created_at'] = queryString.created_at
    }
    if (queryString.contact_id)
        criteria['contact_id'] = queryString.contact_id

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