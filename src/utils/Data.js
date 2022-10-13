import { getStringListOfIds } from "./Helper"

export const states = [
    {
        id: "1",
        name: "Alabama",
        abbreviation: "AL",
        label: "Alabama",
        value: "AL"
        
    },
    {
        id: "2",
        name: "Alaska",
        abbreviation: "AK",
        label: "Alaska",
        value: "AK",

    },
    {
        id: "3",
        name: "Arizona",
        abbreviation: "AZ",
        label: "Arizona",
        value: "AZ",
    },
    {
        id: "4",
        name: "Arkansas",
        abbreviation: "AR",
        label: "Arkansas",
        value: "AR",
    },
    {
        id: "5",
        name: "California",
        abbreviation: "CA",
        label: "California",
        value: "CA",
    },
    {
        id: "6",
        name: "Colorado",
        label: "Colorado",
        abbreviation: "CO",
        value: "CO"
    },
    {
        id: "7",
        name: "Connecticut",
        label: "Connecticut",
        abbreviation: "CT",
        value: "CT"
    },
    {
        id: "8",
        name: "Delaware",
        label: "Delaware",
        abbreviation: "DE",
        value: "DE"
    },
    {
        id: "9",
        name: "Florida",
        label: "Florida",
        abbreviation: "FL",
        value: "FL"
    },
    {
        id: "10",
        name: "Georgia",
        label: "Georgia",
        abbreviation: "GA",
        value: "GA"
    },
    {
        id: "11",
        name: "Hawaii",
        label: "Hawaii",
        abbreviation: "HI",
        value: "HI"
    },
    {
        id: "12",
        name: "Idaho",
        label: "Idaho",
        abbreviation: "ID",
        value: "ID"
    },
    {
        id: "13",
        name: "Illinois",
        label: "Illinois",
        abbreviation: "IL",
        value: "IL"
    },
    {
        id: "14",
        name: "Indiana",
        label: "Indiana",
        abbreviation: "IN",
        value: "IN"
    },
    {
        id: "15",
        name: "Iowa",
        label: "Iowa",
        abbreviation: "IA",
        value: "IA"
    },
    {
        id: "16",
        name: "Kansas",
        label: "Kansas",
        abbreviation: "KS",
        value: "KS"
    },
    {
        id: "17",
        name: "Kentucky",
        label: "Kentucky",
        abbreviation: "KY",
        value: "KY"
    },
    {
        id: "18",
        name: "Louisiana",
        label: "Louisiana",
        abbreviation: "LA",
        value: "LA"
    },
    {
        id: "19",
        name: "Maine",
        label: "Maine",
        abbreviation: "ME",
        value: "ME"
    },
    {
        id: "20",
        name: "Maryland",
        label: "Maryland",
        abbreviation: "MD",
        value: "MD"
    },
    {
        id: "21",
        name: "Massachusetts",
        label: "Massachusetts",
        abbreviation: "MA",
        value: "MA"
    },
    {
        id: "22",
        name: "Michigan",
        label: "Michigan",
        abbreviation: "MI",
        value: "MI"
    },
    {
        id: "23",
        name: "Minnesota",
        label: "Minnesota",
        abbreviation: "MN",
        value: "MN"
    },
    {
        id: "24",
        name: "Mississippi",
        label: "Mississippi",
        abbreviation: "MS",
        value: "MS"
    },
    {
        id: "25",
        name: "Missouri",
        label: "Missouri",
        abbreviation: "MO",
        value: "MO"
    },
    {
        id: "26",
        name: "Montana",
        label: "Montana",
        abbreviation: "MT",
        value: "MT"
    },
    {
        id: "27",
        name: "Nebraska",
        label: "Nebraska",
        abbreviation: "NE",
        value: "NE"
    },
    {
        id: "28",
        name: "Nevada",
        label: "Nevada",
        abbreviation: "NV",
        value: "NV"
    },
    {
        id: "29",
        name: "New Hampshire",
        label: "New Hampshire",
        abbreviation: "NH",
        value: "NH"
    },
    {
        id: "30",
        name: "New Jersey",
        label: "New Jersey",
        abbreviation: "NJ",
        value: "NJ"
    },
    {
        id: "31",
        name: "New Mexico",
        label: "New Mexico",
        abbreviation: "NM",
        value: "NM"
    },
    {
        id: "32",
        name: "New York",
        label: "New York",
        abbreviation: "NY",
        value: "NY"
    },
    {
        id: "33",
        name: "North Carolina",
        label: "North Carolina",
        abbreviation: "NC",
        value: "NC"
    },
    {
        id: "34",
        name: "North Dakota",
        label: "North Dakota",
        abbreviation: "ND",
        value: "ND"
    },
    {
        id: "35",
        name: "Ohio",
        label: "Ohio",
        abbreviation: "OH",
        value: "OH"
    },
    {
        id: "36",
        name: "Oklahoma",
        label: "Oklahoma",
        abbreviation: "OK",
        value: "OK"
    },
    {
        id: "37",
        name: "Oregon",
        label: "Oregon",
        abbreviation: "OR",
        value: "OR"
    },
    {
        id: "38",
        name: "Pennsylvania",
        label: "Pennsylvania",
        abbreviation: "PA",
        value: "PA"
    },
    {
        id: "39",
        name: "Rhode Island",
        label: "Rhode Island",
        abbreviation: "RI",
        value: "RI"
    },
    {
        id: "40",
        name: "South Carolina",
        label: "South Carolina",
        abbreviation: "SC",
        value: "SC"
    },
    {
        id: "41",
        name: "South Dakota",
        label: "South Dakota",
        abbreviation: "SD",
        value: "SD"
    },
    {
        id: "42",
        name: "Tennessee",
        label: "Tennessee",
        abbreviation: "TN",
        value: "TN"
    },
    {
        id: "43",
        name: "Texas",
        label: "Texas",
        abbreviation: "TX",
        value: "TX"
    },
    {
        id: "44",
        name: "Utah",
        label: "Utah",
        abbreviation: "UT",
        value: "UT"
    },
    {
        id: "45",
        name: "Vermont",
        label: "Vermont",
        abbreviation: "VT",
        value: "VT"
    },
    {
        id: "46",
        name: "Virginia",
        label: "Virginia",
        abbreviation: "VA",
        value: "VA"
    },
    {
        id: "47",
        name: "Washington",
        label: "Washington",
        abbreviation: "WA",
        value: "WA"
    },
    {
        id: "48",
        name: "West Virginia",
        label: "West Virginia",
        abbreviation: "WV",
        value: "WV"
    },
    {
        id: "49",
        name: "Wisconsin",
        label: "Wisconsin",
        abbreviation: "WI",
        value: "WI"
    },
    {
        id: "50",
        name: "Wyoming",
        label: "Wyoming",
        abbreviation: "WY",
        value: "WY"
    }
];

export const timeZones = [
    {
        id: "EST",
        value: "EST",
        name: "Eastern",
        label: "Eastern"
    },
    {
        id: "CST",
        value: "CST",
        name: "Central",
        label: "Central"
    },
    {
        id: "MST",
        value: "MST",
        name: "Mountain",
        label: "Mountain"
    },
    {
        id: "PST",
        value: "PST",
        name: "Pacific",
        label: "Pacific"
    },
    {
        id: "AKST",
        value: "AKST",
        name: "Alaska",
        label: "Alaska"
    },
    {
        id: "HST",
        value: "HST",
        name: "Hawaiian",
        label: "Hawaiian"
    }
];


export const coachTypes = [
    'Area Coach',
    'Position Coach',
    'Coordinator'
]

export const postTo = [
    //'Send on the behalf of',
    'Area Recruiting Coach',
    'Position Coach'
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

