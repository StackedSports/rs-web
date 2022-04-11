import { capitalize } from 'utils/Parser'

export const getFilterContactsCriteria = (filters) => {
    let criteria = {}

    console.log(filters)

    if(filters.status) {
        criteria['status'] = []

        filters.status.forEach(status => {
            criteria.status.push(status.name)
        })
    }

    if(filters.rank) {
        criteria['ranks'] = []

        filters.rank.forEach(rank => {
            criteria.ranks.push(rank.name)
        })
    }

    if(filters.gradeYear) {
        criteria['years'] = []

        filters.gradeYear.forEach(year => {
            criteria.years.push(year.name)
        })
    }

    if(filters.tags) {
        criteria['tags'] = []

        filters.tags.forEach(tag => {
            criteria.tags.push(tag.name)
        })
    }

    if(filters.position) {
        criteria['positions'] = []

        filters.position.forEach(position => {
            criteria.positions.push(position.abbreviation)
        })
    }

    if(filters.areaCoach) {
        criteria['area_coaches'] = []

        filters.areaCoach.forEach(areaCoach => {
            criteria.area_coaches.push(areaCoach.id)
        })
    }

    if(filters.positionCoach) {
        criteria['position_coaches'] = []

        filters.positionCoach.forEach(positionCoach => {
            criteria.position_coaches.push(positionCoach.id)
        })
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

export const getFilterMessagesCriteria = (filters) => {
    if(!filters)
        return null
    
    let criteria = {}

    console.log(filters)

    if(filters.status) {
        criteria['message_status'] = []

        filters.status.forEach(status => {
            criteria['message_status'].push(status.name)
        })
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