import { getStringListOfIds } from "./Helper"

export const states = [
    {
        id: "1",
        name: "Alabama",
        abbreviation: "AL"
    },
    {
        id: "2",
        name: "Alaska",
        abbreviation: "AK"
    },
    {
        id: "3",
        name: "Arizona",
        abbreviation: "AZ"
    },
    {
        id: "4",
        name: "Arkansas",
        abbreviation: "AR"
    },
    {
        id: "5",
        name: "California",
        abbreviation: "CA"
    },
    {
        id: "6",
        name: "Colorado",
        abbreviation: "CO"
    },
    {
        id: "7",
        name: "Connecticut",
        abbreviation: "CT"
    },
    {
        id: "8",
        name: "Delaware",
        abbreviation: "DE"
    },
    {
        id: "9",
        name: "Florida",
        abbreviation: "FL"
    },
    {
        id: "10",
        name: "Georgia",
        abbreviation: "GA"
    },
    {
        id: "11",
        name: "Hawaii",
        abbreviation: "HI"
    },
    {
        id: "12",
        name: "Idaho",
        abbreviation: "ID"
    },
    {
        id: "13",
        name: "Illinois",
        abbreviation: "IL"
    },
    {
        id: "14",
        name: "Indiana",
        abbreviation: "IN"
    },
    {
        id: "15",
        name: "Iowa",
        abbreviation: "IA"
    },
    {
        id: "16",
        name: "Kansas",
        abbreviation: "KS"
    },
    {
        id: "17",
        name: "Kentucky",
        abbreviation: "KY"
    },
    {
        id: "18",
        name: "Louisiana",
        abbreviation: "LA"
    },
    {
        id: "19",
        name: "Maine",
        abbreviation: "ME"
    },
    {
        id: "20",
        name: "Maryland",
        abbreviation: "MD"
    },
    {
        id: "21",
        name: "Massachusetts",
        abbreviation: "MA"
    },
    {
        id: "22",
        name: "Michigan",
        abbreviation: "MI"
    },
    {
        id: "23",
        name: "Minnesota",
        abbreviation: "MN"
    },
    {
        id: "24",
        name: "Mississippi",
        abbreviation: "MS"
    },
    {
        id: "25",
        name: "Missouri",
        abbreviation: "MO"
    },
    {
        id: "26",
        name: "Montana",
        abbreviation: "MT"
    },
    {
        id: "27",
        name: "Nebraska",
        abbreviation: "NE"
    },
    {
        id: "28",
        name: "Nevada",
        abbreviation: "NV"
    },
    {
        id: "29",
        name: "New Hampshire",
        abbreviation: "NH"
    },
    {
        id: "30",
        name: "New Jersey",
        abbreviation: "NJ"
    },
    {
        id: "31",
        name: "New Mexico",
        abbreviation: "NM"
    },
    {
        id: "32",
        name: "New York",
        abbreviation: "NY"
    },
    {
        id: "33",
        name: "North Carolina",
        abbreviation: "NC"
    },
    {
        id: "34",
        name: "North Dakota",
        abbreviation: "ND"
    },
    {
        id: "35",
        name: "Ohio",
        abbreviation: "OH"
    },
    {
        id: "36",
        name: "Oklahoma",
        abbreviation: "OK"
    },
    {
        id: "37",
        name: "Oregon",
        abbreviation: "OR"
    },
    {
        id: "38",
        name: "Pennsylvania",
        abbreviation: "PA"
    },
    {
        id: "39",
        name: "Rhode Island",
        abbreviation: "RI"
    },
    {
        id: "40",
        name: "South Carolina",
        abbreviation: "SC"
    },
    {
        id: "41",
        name: "South Dakota",
        abbreviation: "SD"
    },
    {
        id: "42",
        name: "Tennessee",
        abbreviation: "TN"
    },
    {
        id: "43",
        name: "Texas",
        abbreviation: "TX"
    },
    {
        id: "44",
        name: "Utah",
        abbreviation: "UT"
    },
    {
        id: "45",
        name: "Vermont",
        abbreviation: "VT"
    },
    {
        id: "46",
        name: "Virginia",
        abbreviation: "VA"
    },
    {
        id: "47",
        name: "Washington",
        abbreviation: "WA"
    },
    {
        id: "48",
        name: "West Virginia",
        abbreviation: "WV"
    },
    {
        id: "49",
        name: "Wisconsin",
        abbreviation: "WI"
    },
    {
        id: "50",
        name: "Wyoming",
        abbreviation: "WY"
    }
];

export const timeZones = [
    {
        id: "PT",
        name: "Pacific"
    },
    {
        id: "MT",
        name: "Mountain"
    },
    {
        id: "CT",
        name: "Central"
    },
    {
        id: "ET",
        name: "Eastern"
    }
];


export const coachTypes = [
    'Area Coach',
    'Position Coach',
    'Coordinator'
]

export const postTo = [
    'Area Coach',
    'Position Coach',
]

export const getCoachValue = (coachLabel) => {
    switch (coachLabel) {
        case 'Area Coach': return 'area'
        case 'Position Coach': return 'recruiting'
        case 'Coordinator': return 'coordinator'
        default: return 'area'
    }
}

export const getCoachLabel = (coachLabel) => {
    switch (coachLabel) {
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
        if (selected === type) {
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

    if (selection.privateBoards) {
        boards = boards.concat(selection.privateBoards)
    }

    if (selection.teamBoards) {
        boards = boards.concat(selection.teamBoards)
    }

    return getStringListOfIds(boards)
}

export const getRecipientSelectedContacts = (selection) => {
    let contacts = selection.contacts || []
    let recipients = selection.recipients || []

    return getStringListOfIds(contacts.concat(recipients))
}

