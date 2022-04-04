import { getStringListOfIds } from "./Helper"

export const states = [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
];


export const coachTypes = [
    'Area Coach',
    'Position Coach',
    'Coordinator'
]

export const getCoachValue = (coachLabel) => {
    switch(coachLabel) {
        case 'Area Coach': return 'area'
        case 'Position Coach': return 'recruiting'
        case 'Coordinator': return 'coordinator'
        default: return 'area'
    }
}

export const getCoachLabel = (coachLabel) => {
    switch(coachLabel) {
        case 'area': return 'Area Coach'
        case 'recruiting': return 'Position Coach'
        case 'coordinator': return 'Coordinator'
        default: return ''
    }
}

// const platforms = [
//     { name: 'Twitter Dm', icon: FaTwitter },
//     { name: 'Personal Text', icon: FaPhone },
//     { name: 'Rs Text', icon: FaComment }
// ]

export const isSelectedCoachType = (selected) => {
    let isSelected = false

    coachTypes.every(type => {
        if(selected === type) {
            isSelected = true
            return false
        }

        return true
    })

    return isSelected
}

/**
 * 
 * @param {Object} selection { privateBoards: array, teamBoards: array } 
 * @returns comma delimited list of strings of board/filter ids
 */
export const getRecipientSelectedBoards = (selection) => {
    let boards = []

    if(selection.privateBoards) {
        boards = boards.concat(selection.privateBoards)
    }

    if(selection.teamBoards) {
        boards = boards.concat(selection.teamBoards)
    }

    return getStringListOfIds(boards)
}

export const getRecipientSelectedContacts = (selection) => {
    let contacts = selection.contacts || []
    let recipients = selection.recipients || []

    return getStringListOfIds(contacts.concat(recipients))
}

