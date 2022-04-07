import { useState, useEffect, useRef } from 'react';

import {
    getUser,
    getTags,
    getContact,
    getContacts,
    getRanks,
    getTeamMembers,
    getBoard,
    CreateUser,
    getTagsWithMessages,
    getPlatform,
    getMedia,
    getBoards,
    getPlaceholder,
    getPlaceholders,
    getSnippets,
    getCoachTypes,
    getTextPlaceholders,
    getMessage,
    getMessageRecipients,
    getMessages,
    getAllColumns,
    getAllContactsEnd,
    getAllStatus,
    getGradeYears,
    getPositions,
    getStatuses,
    getPeopleTypes,
    getBoardFiltersById,
    getTeamContacts,
    getTagsWithContacts,
    getTagsWithMedia,
    archiveContacts,
    filterContacts,
} from 'Api/Endpoints'

import { usePagination } from './Pagination'

import { objectNotNull } from 'utils/Validation'

export const useUser = () => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        getUser()
            .then(([user]) => {
                // console.log('ApiHooks: getUser -----')
                // console.log(user)
                setUser(user)
            })
            .catch(error => console.log(error))
    }, [])

    return user
}

export const usePlatform = () => {
    const [platform, setPlatform] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        getBoards()
            .then(([platforms]) => {
                console.log('ApiHooks: getPlatform -----')
                console.log(platforms)
                setPlatform(platforms)
            })
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }, [])

    return {
        items: platform,
        loading
    }
}
export const useTagsWithContacts = () => {
    const [tags, setTags] = useState(null)

    useEffect(() => {
        getTagsWithContacts()
            .then(([tag]) => {
                // console.log('ApiHooks: getTagsWithContacts -----', tag)
                // console.log(tag)
                setTags(tag)
            })
            .catch(error => console.log(error))
    }, [])

    return tags
}

export const useTagsWithMedia = () => {
    const [tags, setTags] = useState(null)

    useEffect(() => {
        getTagsWithMedia()
            .then(([tags]) => {
                setTags(tags)
            })
            .catch(error => console.log(error))
    }, [])

    return tags
}

// Custom Hook
export const useBoard = (id) => {
    const [board, setBoard] = useState(null)

    useEffect(() => {
        getBoard(id)
            .then(([board]) => {
                console.log('ApiHooks: getBoardByid -----')
                console.log(board)
                setBoard(board)
            })
            .catch(error => console.log(error))
    }, [])

    return board
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
                // console.log('ApiHooks: getTags -----')
                // console.log(tags)
                setTags(tags)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    return tags
}

export const useTags2 = () => {
    const [tags, setTags] = useState(null)
    const [loading, setLoading] = useState(true)

    const tagsRes = useRef()

    useEffect(() => {
        setLoading(true)

        getTags()
            .then(([tags, pagination]) => {
                // console.log('ApiHooks: getTags -----')
                // console.log(tags)
                // console.log(pagination)
                setTags(tags)
                tagsRes.current = tags
            })
            .catch(error => {
                console.log(error)
            })
            .finally(() => setLoading(false))
    }, [])

    const search = (value) => {
        let tmp = []

        tagsRes.current.forEach(tag => {
            if (tag.name.toLowerCase().includes(value.toLowerCase()))
                tmp.push(tag)
        })

        setTags(tmp)
    }

    const clearSearch = () => {
        setTags(tagsRes.current)
    }

    return {
        items: tags,
        loading,
        search,
        clearSearch
    }
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

export const useContacts = (currentPage = 1, itemsPerPage = 50) => {
    const [loading, setLoading] = useState(true)
    const [contacts, setContacts] = useState(null)
    const [pagination, setPagination] = usePagination(currentPage, itemsPerPage)

    // TODO: testing filter
    const [filters, setFilters] = useState(null)

    useEffect(() => {
        setLoading(true)

        const get = objectNotNull(filters) ? filterContacts : getContacts

        get(pagination.currentPage, 50, filters)
            .then(([contacts, pag]) => {
                //console.log('ApiHooks: getContact -----')
                //console.log(contact)
                setContacts(contacts)
                setPagination(pag)
            })
            .catch(error => {
                console.log(error)
            })
            .finally(() => {
                setLoading(false)
            })

    }, [pagination.currentPage, filters])

    const filter = (filters) => {
        pagination.getPage(1)
        setFilters(filters)
    }

    const clearFilter = () => {
        setFilters(null)
    }

    return {
        items: contacts,
        pagination,
        loading,
        filter,
        clearFilter
    }
}

// TODO: this should not be a hook
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

export const useTeamMembers = () => {
    const [teamMembers, setTeamMembers] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)

        getTeamMembers()
            .then(([members, pagination]) => {
                // console.log('ApiHooks: getTeamMembers')
                // console.log(members)
                //console.log(pagination)
                setTeamMembers(members)
            })
            .catch(error => {
                console.log(error)
            })
            .finally(() => setLoading(false))
    }, [])

    const filter = (param) => {
        let filtered = teamMembers.filter(member => (`${member.first_name} ${member.last_name}`).includes(param))
        setTeamMembers(filtered)
    }

    return {
        items: teamMembers,
        loading,
        filter
    }
}



export const useRanks = () => {
    const [ranks, setRanks] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        getRanks()
            .then(([ranks]) => {
                //console.log('ApiHooks: getRanks -----')
                if (ranks) {

                    setRanks(ranks)
                }
                console.log(ranks)
            })
            .catch(error => {
                console.log(error)
            }).finally(() => setLoading(false))
    }, [])

    return {
        items: ranks,
        loading,
    }
}

// TODO: what is this?
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

// TODO: what is this?
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

// TODO: is this getting contacts?
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

export const useBoards = () => {
    const [boards, setBoards] = useState(null)

    useEffect(() => {
        getBoards()
            .then(([boards]) => {
                //console.log('ApiHooks: getRanks -----')
                //console.log(ranks)
                setBoards(boards)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    return boards
}

// Get filters by id
// TODO: is this useBoard?
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

// TODO:
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

// TODO:
export const useGradeYears = () => {
    const [GradeYears, setGradeYears] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        getGradeYears()
            .then(([GradeYears]) => {
                //console.log('ApiHooks: getGradeYears -----')
                //console.log(GradeYears)

                setGradeYears(GradeYears)
            })
            .catch(error => {
                console.log(error)
            }).finally(() => setLoading(false))
    }, [])

    return {
        items: GradeYears,
        loading,
    }
}

export const useTextPlaceholders = () => {
    const [placeholders, setPlaceholders] = useState(null)

    useEffect(() => {
        getTextPlaceholders()
            .then(([placeholders]) => {
                //console.log('ApiHooks: getRanks -----')
                //console.log(ranks)
                setPlaceholders(placeholders)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    return placeholders
}

// TODO:
export const usePositions = () => {
    const [Positions, setPositions] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        getPositions()
            .then(([Positions]) => {
                //console.log('ApiHooks: getPositions -----')
                // console.log(Positions)
                setPositions(Positions)
            })
            .catch(error => {
                console.log(error)
            }).finally(() => setLoading(false))
    }, [])

    return {
        items: Positions,
        loading
    }
}

export const useStatuses = () => {
    const [statuses, setStatuses] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        getStatuses()
            .then(([statuses]) => {
                //console.log('ApiHooks: getPositions -----')
                console.log(statuses)
                setStatuses(statuses)
            })
            .catch(error => {
                console.log(error)
            }).finally(() => setLoading(false))
    }, [])

    return {
        items: statuses,
        loading,
    }
}

export const useSnippets = () => {
    const [snippets, setSnippets] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        getSnippets()
            .then(([snippets]) => {
                //console.log('ApiHooks: getRanks -----')
                console.log(setSnippets)
                setSnippets(snippets)
            })
            .catch(error => {
                console.log(error)
            }).finally(() => setLoading(false))
    }, [])

    return {
        items: snippets,
        loading
    }
}

export const usePlaceholder = (id) => {
    const [placeholder, setPlaceholder] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)

        getPlaceholder(id)
            .then(([placeholder, pagination]) => {
                console.log('API placeholder')
                console.log(placeholder)
                setPlaceholder(placeholder)
            })
            .catch(error => {
                console.log(error)
            })
            .finally(() => setLoading(false))
    }, [id])

    return {
        item: placeholder,
        loading
    }
}

export const usePlaceholders = (currentPage, itemsPerPage) => {
    const [loading, setLoading] = useState(true)
    const [placeholders, setPlaceholders] = useState(null)
    const [pagination, setPagination] = usePagination(currentPage, itemsPerPage)

    useEffect(() => {
        setLoading(true)

        getPlaceholders(pagination.currentPage, pagination.itemsPerPage)
            .then(([placeholders, pagination]) => {
                //console.log('ApiHooks: getContact -----')
                // console.log(pagination)
                setPlaceholders(placeholders)
                setPagination(pagination)
            })
            .catch(error => {
                console.log(error)
            })
            .finally(() => setLoading(false))
    }, [pagination.currentPage])

    return {
        items: placeholders,
        pagination,//: {...pagination, getPage: paginationUtils.getPage },
        loading
    }
}

export const useMedia = (currentPage, itemsPerPage) => {
    const [loading, setLoading] = useState(true)
    const [media, setMedia] = useState(null)
    const [pagination, setPagination] = usePagination(currentPage, itemsPerPage)

    useEffect(() => {
        setLoading(true)

        getMedia(pagination.currentPage, pagination.itemsPerPage)
            .then(([media, pagination]) => {
                //console.log('ApiHooks: getContact -----')
                // console.log(pagination)
                setMedia(media)
                setPagination(pagination)
            })
            .catch(error => {
                console.log(error)
            })
            .finally(() => setLoading(false))

    }, [pagination.currentPage])

    return {
        items: media,
        pagination,//: {...pagination, getPage: paginationUtils.getPage },
        loading
    }
}


// getMessage

export const useMessage = (id, refresh) => {
    const [message, setMessage] = useState(null)
    const [loading, setLoading] = useState(true)

    // console.log(refresh)

    useEffect(() => {
        // console.log('getting message')
        setLoading(true)

        getMessage(id)
            .then(([message]) => {
                //console.log('ApiHooks: getMessage -----')
                //console.log(message)
                setMessage(message)
                setLoading(false)
            })
            .catch(error => {
                console.log(error)
            })
            .finally(() => setLoading(false))

    }, [id, refresh])

    return {
        item: message,
        loading
    }
}

export const useMessageRecipients = (id, refresh) => {
    const [loading, setLoading] = useState(true)
    const [recipients, setRecipients] = useState(null)

    useEffect(() => {
        setLoading(true)

        getMessageRecipients(id)
            .then(([recipients, pagination]) => {
                setRecipients(recipients)
            })
            .catch(error => {
                console.log(error)
            })
            .finally(() => setLoading(false))
    }, [id, refresh])

    return {
        items: recipients,
        loading
    }
}

// getMessages

export const useMessages = (currentPage, itemsPerPage) => {
    const [loading, setLoading] = useState(true)
    const [messages, setMessages] = useState(null)
    const [pagination, setPagination] = usePagination(currentPage, itemsPerPage)

    useEffect(() => {
        setLoading(true)

        getMessages(pagination.currentPage, pagination.itemsPerPage)
            .then(([messages, pagination]) => {
                //console.log('ApiHooks: getContact -----')
                // console.log(pagination)
                setMessages(messages)
                setPagination(pagination)
            })
            .catch(error => {
                console.log(error)
            })
            .finally(() => setLoading(false))

    }, [pagination.currentPage])

    return {
        items: messages,
        pagination,//: {...pagination, getPage: paginationUtils.getPage },
        loading
    }
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

export const useCoachesTypes = () => {
    const [coachesTypes, setCoachesTypes] = useState(null)
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        setLoading(true)

        getCoachTypes()
            .then(([coachesTypes]) => {
                // console.log('ApiHooks: getRanks -----')
                // console.log(coachesTypes)
                setCoachesTypes(coachesTypes.types)
            })
            .catch(error => {
                console.log(error)
            })
            .finally(() => setLoading(false))

    }, [])

    return {
        items: coachesTypes,
        loading
    }
}


export const usePeopleTypes = () => {
    const [peopleTypes, setPeopleTypes] = useState(null)
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        setLoading(true)

        getPeopleTypes()
            .then(([PeopleTypes]) => {

                console.log(PeopleTypes)
                setPeopleTypes(PeopleTypes)
            })
            .catch(error => {
                console.log(error)
            })
            .finally(() => setLoading(false))

    }, [])

    return {
        items: peopleTypes,
        loading
    }
}


// TODO:

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