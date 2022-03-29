import { useState, useEffect, useRef } from 'react'

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
    getPlaceholders,
    getSnippets,
    getTextPlaceholders,
    getMessage,
    getMessages
} from 'Api/Endpoints'

import { usePagination } from './Pagination'

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


export const addUser  = (body) => {
    const [user, setUser] = useState(null)
    
 
      const createUser =()=>{
        CreateUser(body)
            .then((res) => {
           // const response = await CreateUser(body);
            //const json = await response.json()
            console.log('ApiHooks: CreateUser -----',res)
         //   setUser(res.data)
            })
           .catch (e => console.log('ApiHooks: CreateUser ----- error', e))           
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



export const useContacts = (initialConfig) => {
    const [loading, setLoading] = useState(true)
    const [contacts, setContacts] = useState(null)
    //const pagination = usePagination(null)
    const [pagination, setPagination] = useState({
        currentPage: initialConfig ? initialConfig.currentPage : 1,
        itemsPerPage: initialConfig ? initialConfig.itemsPerPage : 50,
        totalItems: 0,
        totalPages: 0,
    })
    // const lastUpdate = useRef(pagination.shouldUpdate)
    const lastPage = useRef(initialConfig ? initialConfig.currentPage : -1)

    useEffect(() => {
        if(lastPage.current === pagination.currentPage)
            return
        
        // lastUpdate.current = pagination.shouldUpdate
        lastPage.current = pagination.currentPage

        // console.log('fetching contacts')

        setLoading(true)

        getContacts(pagination.currentPage, 50)
            .then(([contacts, pag]) => {
                //console.log('ApiHooks: getContact -----')
                //console.log(contact)
                setContacts(contacts)
                // pagination.updateResult(pag.totalItems, pag.totalPages)
                // pagination.setTotalPages(pag.totalPages)
                setPagination(pag)
            })
            .catch(error => {
                console.log(error)
            })
            .finally(() => {
                setLoading(false)
            })

    }, [pagination.currentPage]) // [pagination.shouldUpdate])

    const getPage = (page) => {
        setPagination({
            ...pagination,
            currentPage: page
        })

    }

    return [contacts, {...pagination, getPage}, loading]
}

export const useTeamMembers = () => {
    const [teamMembers, setTeamMembers] = useState(null)
    
    useEffect(() => {
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
                //console.log(ranks)
                setRanks(ranks)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    return ranks
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

export const useSnippets = () => {
    const [snippets, setSnippets] = useState(null)

    useEffect(() => {
        getSnippets()
            .then(([snippets]) => {
                //console.log('ApiHooks: getRanks -----')
                //console.log(ranks)
                setSnippets(snippets)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    return snippets
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
        console.log('getting message')
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