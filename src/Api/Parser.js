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