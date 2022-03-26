import { useState, useEffect } from 'react'


import { getAllColumns, getAllContactsEnd, getAllStatus, getBoards, getGradeYears, getPositions, getBoardFiltersById, getTeamContacts, getTagsWithContacts, archiveContacts, getUser, getTags, getRanks, getTeamMembers, getTagsWithMessages, getBoard, getMessages, getSnippets, getContact } from './Endpoints'



export const useUser = () => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        getUser()
            .then(([user]) => {
                console.log('ApiHooks: getUser -----')
                console.log(user)
                setUser(user)
            })
            .catch(error => console.log(error))
    }, [])

    return user
}
export const useBoards = () => {
    const [boards, setBoards] = useState(null)

    useEffect(() => {
        getBoards()
            .then(([board]) => {
                console.log('ApiHooks: getBoards -----')
                console.log(board)
                setBoards(board)
            })
            .catch(error => console.log(error))
    }, [])

    return boards
}
export const useMedia = () => {
    const [media, setMedia] = useState(null)

    useEffect(() => {
        getMedia()
            .then(([m]) => {
                console.log('ApiHooks: getBoards -----')
                console.log(m)
                setMedia(m)
            })
            .catch(error => console.log(error))
    }, [])

    return media
}
export const usePlatform = () => {
    const [platform, setPlatform] = useState(null)

    useEffect(() => {
        getBoards()
            .then(([platforms]) => {
                console.log('ApiHooks: getPlatform -----')
                console.log(platforms)
                setPlatform(platforms)
            })
            .catch(error => console.log(error))
    }, [])

    return platform
}
export const useTagsWithContacts = () => {
    const [tags, setTags] = useState(null)

    useEffect(() => {
        getTagsWithMessages()
            .then(([tag]) => {
                console.log('ApiHooks: getTagsWithContacts -----')
                console.log(tag)
                setTags(tag)
            })
            .catch(error => console.log(error))
    }, [])

    return tags
}
export const useBoard = (id) => {
    const [boardContacts, setBoardContacts] = useState(null)

    useEffect(() => {
        getBoard(id)
            .then(([contacts]) => {
                console.log('ApiHooks: getBoardByid -----')
                console.log(contacts)
                setBoardContacts(contacts)
            })
            .catch(error => console.log(error))
    }, [])

    return boardContacts
}
export const useMessages = () => {
    const [message, setMessage] = useState(null)

    useEffect(() => {
        getMessages()
            .then(([message]) => {
                console.log('ApiHooks: getMessages -----', message)
                setMessage(message)

            })
            .catch(error => console.log('ApiHooks: getMessages -----', error))
    }, [])

    return message
}
export const useSnippets = () => {
    const [snippet, setSnippet] = useState(null)

    useEffect(() => {
        getSnippets()
            .then(([snippets]) => {
                console.log('ApiHooks: getMessages -----', snippets)
                setSnippet(snippets)

            })
            .catch(error => console.log('ApiHooks: getMessages -----', error))
    }, [])

    return snippet
}
export const addUser = (body) => {
    const [user, setUser] = useState(null)


    const createUser = () => {
        CreateUser(body)
            .then((res) => {
                // const response = await CreateUser(body);
                //const json = await response.json()
                console.log('ApiHooks: CreateUser -----', res)
                //   setUser(res.data)
            })
            .catch(e => console.log('ApiHooks: CreateUser ----- error', e))
    }
    return user
}
export const useTags = () => {
    const [tags, setTags] = useState(null)

    useEffect(() => {
        getTags()
            .then(([tags]) => {
                console.log('ApiHooks: getTags -----')
                console.log(tags)
                setTags(tags)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    return tags
}
export const useContact = (id) => {
    const [contact, setContact] = useState(null)

    useEffect(() => {
        getContact(id)
            .then(([contact]) => {
                //console.log('ApiHooks: getContact -----')
                //console.log(contact)
                setContact(contact)
            })
            .catch(error => {
                console.log(error)
            })
    }, [id])

    return contact
}


export const usearchiveContacts = (id) => {
    const [archivecontact, setarchiveContact] = useState(null)


    archiveContacts(id)
        .then(([archivecontact]) => {
            console.log('ApiHooks: archivecontact -----')
            console.log(archivecontact)
            setarchiveContact(archivecontact)
        })
        .catch(error => {
            console.log(error)
        })


    return archivecontact
}






// export const usearchiveContact = (id) => {
//     const [res, setres] = useState(null)

//     useEffect(() => {
//         archiveContact(id)
//             .then(([res]) => {
//                 //console.log('ApiHooks: getres -----')
//                 //console.log(res)
//                 setres(res)
//             })
//             .catch(error => {
//                 console.log(error)
//             })
//     }, [id])

//     return res
// }



export const useTeamMembers = () => {
    const [teamMembers, setTeamMembers] = useState(null)

    useEffect(() => {
        getTeamMembers()
            .then(([members, pagination]) => {
                //console.log('ApiHooks: getTeamMembers')
                //console.log(members)
                //console.log(pagination)
                setTeamMembers(members)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    const filter = (param) => {
        let filtered = teamMembers.filter(member => (`${member.first_name} ${member.last_name}`).includes(param))
        setTeamMembers(filtered)
    }

    return [teamMembers, filter]
}
export const useRanks = () => {
    const [ranks, setRanks] = useState(null)

    useEffect(() => {
        getRanks()
            .then(([ranks]) => {
                //console.log('ApiHooks: getRanks -----')
                if (ranks) {

                    setRanks(ranks)
                }
                //console.log(ranks)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    return ranks
}
export const useAllColumns = () => {
    const [Columns, setColumns] = useState(null)

    useEffect(() => {
        getAllColumns()
            .then(([Columns]) => {
                //console.log('ApiHooks: getColumns -----')
                if (Columns) {

                    setColumns(Columns)
                }
                //console.log(Columns)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    return Columns
}

// 
export const useTagWithContact = () => {
    const [Contacts, setContacts] = useState(null)

    useEffect(() => {
        getTagsWithContacts()
            .then(([Contacts]) => {
                //console.log('ApiHooks: getContacts -----')


                setContacts(Contacts)

                //console.log(Contacts)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    return Contacts
}
export const useTeamContact = () => {
    const [Contacts, setContacts] = useState(null)

    useEffect(() => {
        getTeamContacts()
            .then(([Contacts]) => {
                //console.log('ApiHooks: getContacts -----')
                if (Contacts) {

                    setContacts(Contacts)
                }
                //console.log(Contacts)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    return Contacts
}
// getTeamContacts
export const useBoardById = (id) => {
    const [board, setBoard] = useState(null)

    useEffect(() => {
        getBoardFiltersById(id)
            .then(([board]) => {
                //console.log('ApiHooks: getboard -----')
                //console.log(board)
                setBoard(board)
            })
            .catch(error => {
                console.log(error)
            })
    }, [id])

    return board
}
// getBoardFiltersById
export const useStatus = () => {
    const [status, setstatus] = useState(null)

    useEffect(() => {
        getAllStatus()
            .then(([status]) => {
                //console.log('ApiHooks: getstatus -----')
                //console.log(status)
                setstatus(status)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    return status
}


export const useGradeYears = () => {
    const [GradeYears, setGradeYears] = useState(null)

    useEffect(() => {
        getGradeYears()
            .then(([GradeYears]) => {
                //console.log('ApiHooks: getGradeYears -----')
                //console.log(GradeYears)
                setGradeYears(GradeYears)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    return GradeYears
}



export const usePositions = () => {
    const [Positions, setPositions] = useState(null)

    useEffect(() => {
        getPositions()
            .then(([Positions]) => {
                //console.log('ApiHooks: getPositions -----')
                //console.log(Positions)
                setPositions(Positions)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    return Positions
}


export const useCoaches = () => {
    // const [ranks, setRanks] = useState(null)

    // useEffect(() => {
    //     getRanksNew()
    //         .then(ranks => {
    //             console.log('ApiHooks: getRanks -----')
    //             console.log(ranks)
    //             setRanks(ranks.data)
    //         })
    //         .catch(error => {
    //             console.log(error)
    //         })
    // }, [])

    // return ranks
}





///////////////////////*********************/////////////////
//                          Contact Page 
///////////////////////*********************/////////////////
export const useMyContacts = (page) => {


    const [contacts, setContacts] = useState(null)

    useEffect(() => {
        getAllContactsEnd(page)
            .then(([contacts]) => {

                var temp = Object.assign([], contacts);
                temp = temp.concat(contacts);

                console.log("*********** CONTACTS **********")
                console.log(res)
                console.log("*********** CONTACTS **********")




                setContacts(temp);
                setuseLessState(uselessState + 1);
                console.log("These are all new contacts", contacts);
                setFetching(false);

                //console.log('ApiHooks: getContact -----')
                //console.log(contact)
                // setContact(contact)
            })
            .catch(error => {
                console.log(error)




            })
    }, [])

    return contacts
}


// export const usePeople = () => {
//     const [ranks, setRanks] = useState(null)

//     useEffect(() => {
//         getRanksNew()
//             .then(ranks => {
//                 console.log('ApiHooks: getRanks -----')
//                 console.log(ranks)
//                 setRanks(ranks.data)
//             })
//             .catch(error => {
//                 console.log(error)
//             })
//     }, [])

//     return ranks
// }

// export const useOpponents = () => {
//     const [ranks, setRanks] = useState(null)

//     useEffect(() => {
//         getRanksNew()
//             .then(ranks => {
//                 console.log('ApiHooks: getRanks -----')
//                 console.log(ranks)
//                 setRanks(ranks.data)
//             })
//             .catch(error => {
//                 console.log(error)
//             })
//     }, [])

//     return ranks
// }


// curl --location --request GET 'https://api.recruitsuite.co/api/contacts/APKlNTjoAegv'
// --header 'Accept: application/json; version=1' \
// --header 'Authorization: RecruitSuiteAuthKey key=7b64dc29-ee30-4bb4-90b4-af2e877b6452' \
// --header 'X-Auth-Token: eyJhbGciOiJIUzI1NiJ9.eyJpZCI6NSwiZW1haWwiOiJub24uYWRtaW5Ac3RhY2tlZHNwb3J0cy5jb20iLCJleHAiOjE2NDc5NTU1MjN9.1PFhMdX2qz2-T5d88sP2q069oTG7ktdl-db7ZJZE8pI' \
// --header 'Cookie: ahoy_visitor=9ed0658b-aeb7-4590-b919-6b9e2ac080fe; ahoy_visit=be028ec4-d074-4dde-8218-f166f678ee87; _memcache-recruitsuite_session=d8ee35c9e0cd796c691901ada77a8bf6' \
// --header 'Content-Type: application/json'


// curl -X PUT "https://api.recruitsuite.co/api/contacts/APKlNTjoAegv"
// -H "Content-Type:application/json"
// -H "Accept:application/json; version=1"
// -H "Authorization:RecruitSuiteAuthKey key=7b64dc29-ee30-4bb4-90b4-af2e877b6452"
// -H "X-Auth-Token:eyJhbGciOiJIUzI1NiJ9.eyJpZCI6NSwiZW1haWwiOiJub24uYWRtaW5Ac3RhY2tlZHNwb3J0cy5jb20iLCJleHAiOjE2NDc5NTU1MjN9.1PFhMdX2qz2-T5d88sP2q069oTG7ktdl-db7ZJZE8pI"
// -H "Cookie:ahoy_visit=be028ec4-d074-4dde-8218-f166f678ee87; _memcache-recruitsuite_session=d8ee35c9e0cd796c691901ada77a8bf6"
// --data '{"contact":{"graduation_year":2022}}'