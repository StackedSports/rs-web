import { useState, useEffect, useRef, useMemo } from 'react';
import { isEqual } from 'lodash'
import axios from "axios";

import {
    getUser,
    getTags,
    getContact,
    getContacts,
    getRanks,
    getTeamMembers,
    getBoard,
    CreateUser,
    getPlatform,
    getMedia,
    getMedias,
    getBoards,
    getBoardContacts,
    getPlaceholder,
    getPlaceholders,
    getPlaceholderMedia,
    getSnippets,
    getCoachTypes,
    getTextPlaceholders,
    getMessage,
    getMessageRecipients,
    getMessages,
    getAllColumns,
    getAllContactsEnd,
    getAllStatus,
    getGradYears,
    getPositions,
    getStatuses,
    getPeopleTypes,
    getBoardFiltersById,
    getTeamContacts,
    getTagsWithMedia,
    getTagsWithContacts,
    getTagsWithMessages,
    archiveContacts,
    filterContacts,
    filterMedias,
    getAllStatus2,
    getMediaTypes,
    getTeamMember,
    getTasksQueue,
    getStats,
} from 'Api/Endpoints'

import { usePagination } from './Pagination'

import { objectNotNull } from 'utils/Validation'

export const useUser = () => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        setLoading(true)
        getUser()
            .then(([user]) => {
                // console.log('ApiHooks: getUser -----')
                // console.log(user)
                setUser(user)
            })
            .catch(error => {
                console.log(error)
                setError(error)
            })
            .finally(() => setLoading(false))
    }, [refresh])

    const refreshUser = () => setRefresh(!refresh)


    return {
        item: user,
        loading,
        error,
        refresh: refreshUser,
    }
}

export const usePlatform = () => {
    const [platform, setPlatform] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        setLoading(true)
        getBoards()
            .then(([platforms]) => {
                console.log('ApiHooks: getPlatform -----')
                console.log(platforms)
                setPlatform(platforms)
            })
            .catch(error => {
                console.log(error)
                setError(error)
            })
            .finally(() => setLoading(false))
    }, [])

    return {
        items: platform,
        loading,
        error,
    }
}

export const useTagsWithMedia = () => {
    const [tags, setTags] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        setLoading(true)
        getTagsWithMedia()
            .then(([tags]) => {
                setTags(tags)
            })
            .catch(error => {
                console.log(error)
                setError(error)
            })
            .finally(() => setLoading(false))

    }, [])

    return {
        items: tags,
        loading,
        error,
    }
}

export const useTagsWithContacts = () => {
    const [tags, setTags] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        setLoading(true)
        getTagsWithContacts()
            .then(([tags]) => {
                // console.log('ApiHooks: getTagsWithContacts -----', tags)
                // console.log(tags)
                setTags(tags)
            })
            .catch(error => {
                console.log(error)
                setError(error)
            })
            .finally(() => setLoading(false))

    }, [])

    return {
        items: tags,
        loading,
        error,
    }
}

export const useTagsWithMessage = () => {
    const [tags, setTags] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        setLoading(true)
        getTagsWithMessages()
            .then(([tags]) => {
                // console.log(tags)
                setTags(tags)
            })
            .catch(error => {
                console.log(error)
                setError(error)
            })
            .finally(() => setLoading(false))

    }, [])

    return {
        items: tags,
        loading,
        error,
    }
}

// Custom Hook
export const useBoard = (id) => {
    const [board, setBoard] = useState(null)
    const [loading, setLoading] = useState(true)
    const [refresh, setRefresh] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        setLoading(true)
        getBoard(id)
            .then(([board]) => {
                // console.log('ApiHooks: getBoardByid -----')
                // console.log(board)
                setBoard(board)
            })
            .catch(error => {
                console.log(error)
                setError(error)
            })
            .finally(() => setLoading(false))
    }, [id, refresh])

    const refreshData = () => {
        setRefresh(old => !old)
    }

    return {
        item: board,
        refreshData,
        loading,
        error,
    }
}

export const useBoardContacts = (boardId, currentPage = 1, itemsPerPage = 50) => {
    const [loading, setLoading] = useState(true)
    const [contacts, setContacts] = useState(null)
    const [pagination, setPagination] = usePagination(currentPage, itemsPerPage)
    const [error, setError] = useState(null)

    // TODO: testing filter
    const [filters, setFilters] = useState(null)

    useEffect(() => {
        setLoading(true)

        // const get = objectNotNull(filters) ? filterContacts : getContacts

        getBoardContacts(boardId, pagination.currentPage, 50, filters)
            .then(([contacts, pag]) => {
                //console.log('ApiHooks: getContact -----')
                //console.log(contact)
                setContacts(contacts)
                setPagination(pag)
            })
            .catch(error => {
                console.log(error)
                setError(error)
            })
            .finally(() => {
                setLoading(false)
            })

    }, [boardId, pagination.currentPage, filters])

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
        clearFilter,
        error,
    }
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
    const [error, setError] = useState(null)

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
                setError(error)
            })
            .finally(() => setLoading(false))
    }, [])

    const search = (value) => {
        if (value && value.length > 0) {
            const filteredTags = tagsRes.current.filter(tag => tag.name.toLowerCase().includes(value.toLowerCase()))
            setTags(filteredTags)
        } else
            setTags(tagsRes.current)
    }

    return {
        items: tags,
        loading,
        search,
        error,
    }
}

export const useContact = (id) => {
    const [contact, setContact] = useState(null)
    const [loading, setLoading] = useState(true)
    const [refresh, setRefresh] = useState(false)
    const [error, setError] = useState(null)


    useEffect(() => {
        setLoading(true)

        getContact(id)
            .then(([contact]) => {
                //console.log('ApiHooks: getContact -----')
                //console.log(contact)
                setContact(contact)
            })
            .catch(error => {
                console.log(error)
                setError(error)
            })
            .finally(() => setLoading(false))
    }, [id, refresh])

    const refetch = () => {
        setRefresh(old => !old)
    }

    return {
        item: contact,
        loading,
        refetch,
        error,
    }
}

export const useContacts = (currentPage = 1, itemsPerPage = 50) => {
    const [contacts, setContacts] = useState(null)
    const [pagination, setPagination] = usePagination(currentPage, itemsPerPage)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

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
                setError(error)
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
        clearFilter,
        error,
    }
}

export const useContactsInfinite = () => {
    const [allContacts, setAllContacts] = useState([])
    const [loading, setLoading] = useState(true)

    const contacts = useContacts()

    useEffect(() => {
        if (!contacts.items)
            return

        setAllContacts(oldValue => oldValue.concat(contacts.items))
        setLoading(false)
    }, [contacts.items])

    const loadMore = () => {
        contacts.pagination.getPage(contacts.pagination.currentPage + 1)
    }

    const filter = (filters) => {
        setAllContacts([])
        contacts.filter(filters)
    }

    const clearFilter = () => {
        setAllContacts([])
        contacts.clearFilter()
    }

    return {
        items: allContacts,
        totalItems: contacts.pagination.totalItems,
        loading,
        loadingMore: contacts.loading,
        loadMore,
        filter,
        clearFilter,
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

export const useTeamMember = (id) => {
    const [teamMember, setTeamMember] = useState(null)
    const [loading, setLoading] = useState(true)
    const [refresh, setRefresh] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        setLoading(true)
        getTeamMember(id)
            .then(([member]) => {
                // console.log('ApiHooks: getTeamMember')
                // console.log(member)
                setTeamMember(member)
            })
            .catch(error => {
                console.log(error)
                setError(error)
            })
            .finally(() => setLoading(false))
    }, [refresh])

    const refetch = () => {
        setRefresh(old => !old)
    }

    return {
        item: teamMember,
        loading,
        refetch,
        error,
    }
}

export const useTeamMembers = () => {
    const [teamMembers, setTeamMembers] = useState([])
    const [loading, setLoading] = useState(true)
    const [refresh, setRefresh] = useState(false)
    const [error, setError] = useState(null)

    const apiResults = useRef(null)

    useEffect(() => {
        setLoading(true)

        getTeamMembers()
            .then(([members, pagination]) => {
                // console.log('ApiHooks: getTeamMembers')
                // console.log(members)
                //console.log(pagination)
                setTeamMembers(members)
                apiResults.current = members
            })
            .catch(error => {
                console.log(error)
                setError(error)
            })
            .finally(() => setLoading(false))
    }, [refresh])

    const refetch = () => {
        setRefresh(old => !old)
    }

    const search = (param) => {
        if (!teamMembers)
            return

        if (param && param.length > 0) {
            let filtered = teamMembers.filter(member => (`${member.first_name} ${member.last_name}`).includes(param))
            setTeamMembers(filtered)
        } else
            setTeamMembers(apiResults.current)

    }

    return {
        items: teamMembers,
        loading,
        search,
        refetch,
        error,
    }
}



export const useRanks = () => {
    const [ranks, setRanks] = useState([])
    const [loading, setLoading] = useState(true)
    const [refresh, setRefresh] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        setLoading(true)

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
            }).finally(() => setLoading(false))
    }, [refresh])

    const refetch = () => {
        setRefresh(old => !old)
    }

    return {
        items: ranks,
        loading,
        refetch,
        error,
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
    const [contacts, setContacts] = useState(null)

    useEffect(() => {
        getTeamContacts()
            .then(([contacts]) => {
                //console.log('ApiHooks: getContacts -----')
                setContacts(contacts)
                //console.log(Contacts)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    return contacts
}

export const useBoards = () => {
    const [boards, setBoards] = useState(null)
    const [loading, setLoading] = useState(true)
    const [refresh, setRefresh] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        setLoading(true)

        getBoards()
            .then(([boards]) => {
                //console.log('ApiHooks: getRanks -----')
                //console.log(ranks)
                setBoards(boards)
            })
            .catch(error => {
                console.log(error)
                setError(error)
            })
            .finally(() => setLoading(false))

    }, [refresh])

    const filter = (filters) => {

    }

    const clearFilter = () => {

    }

    const refreshData = () => {
        setRefresh(old => !old)
    }

    return {
        items: boards,
        loading,
        filter,
        clearFilter,
        refreshData,
        error,
    }
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
export const useStatus2 = () => {
    const [status, setStatus] = useState([])
    const [loading, setLoading] = useState(true)
    const [refresh, setRefresh] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        setLoading(true)

        getAllStatus2()
            .then(([status2]) => {
                //console.log('ApiHooks: getstatus2 -----')
                //console.log(status2)
                setStatus(status2)
            })
            .catch(error => {
                console.log(error)
                setError(error)
            })
            .finally(() => setLoading(false))
    }, [refresh])

    const refreshData = () => {
        setRefresh(old => !old)
    }

    return {
        items: status,
        loading,
        refreshData,
        error
    }
}

// TODO:
export const useGradYears = () => {
    const [GradYears, setGradYears] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        setLoading(true)
        getGradYears()
            .then(([GradYears]) => {
                //console.log('ApiHooks: getGradYears -----')
                //console.log(GradYears)

                setGradYears(GradYears)
            })
            .catch(error => {
                console.log(error)
                setError(error)
            }).finally(() => setLoading(false))
    }, [])

    return {
        items: GradYears,
        loading,
        error,
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
    const [Positions, setPositions] = useState([])
    const [loading, setLoading] = useState(true)
    const [refresh, setRefresh] = useState(false)
    const [error, setError] = useState(null)

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
                setError(error)
            }).finally(() => setLoading(false))
    }, [refresh])

    const refetch = () => {
        setRefresh(old => !old)
    }

    return {
        items: Positions,
        loading,
        refetch,
        error,
    }
}

export const useStatuses = () => {
    const [statuses, setStatuses] = useState([])
    const [loading, setLoading] = useState(true)
    const [refresh, setRefresh] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        setLoading(true)
        getStatuses()
            .then(([statuses]) => {
                //console.log('ApiHooks: getPositions -----')
                //console.log(statuses)
                setStatuses(statuses)
            })
            .catch(error => {
                console.log(error)
                setError(error)
            }).finally(() => setLoading(false))
    }, [refresh])

    const refetch = () => {
        setRefresh(old => !old)
    }

    return {
        items: statuses,
        loading,
        refetch,
        error,
    }
}

export const useSnippets = () => {
    const [snippets, setSnippets] = useState([])
    const [loading, setLoading] = useState(true)
    const [refresh, setRefresh] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        setLoading(true)
        getSnippets()
            .then(([snippets]) => {
                //console.log('ApiHooks: getRanks -----')
                setSnippets(snippets)
            })
            .catch(error => {
                console.log(error)
                setError(error)
            }).finally(() => setLoading(false))
    }, [refresh])

    const refetch = () => {
        setRefresh(old => !old)
    }

    return {
        items: snippets,
        loading,
        refetch,
        error,
    }
}

export const usePlaceholder = (id) => {
    const [placeholder, setPlaceholder] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

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
                setError(error)
            })
            .finally(() => setLoading(false))
    }, [id])

    return {
        item: placeholder,
        loading,
        error,
    }
}

export const usePlaceholderMedia = (id, currentPage, itemsPerPage) => {
    // getPlaceholderMedia
    const [loading, setLoading] = useState(true)
    const [media, setMedia] = useState(null)
    const [pagination, setPagination] = usePagination(currentPage, itemsPerPage)
    const [error, setError] = useState(null)

    useEffect(() => {
        setLoading(true)

        getPlaceholderMedia(id, pagination.currentPage, pagination.itemsPerPage)
            .then(([media, pagination]) => {
                //console.log('ApiHooks: get placeholders')
                //console.log(placeholders)
                // console.log(pagination)
                setMedia(media)
                setPagination(pagination)
            })
            .catch(error => {
                console.log(error)
                setError(error)
            })
            .finally(() => setLoading(false))
    }, [id, pagination.currentPage])

    return {
        items: media,
        pagination,//: {...pagination, getPage: paginationUtils.getPage },
        loading,
        error,
    }
}

export const usePlaceholders = (currentPage, itemsPerPage) => {
    const [loading, setLoading] = useState(true)
    const [placeholders, setPlaceholders] = useState(null)
    const [pagination, setPagination] = usePagination(currentPage, itemsPerPage)
    const [error, setError] = useState(null)

    // TODO: testing filter
    const [filters, setFilters] = useState(null)

    useEffect(() => {
        setLoading(true)

        getPlaceholders(pagination.currentPage, pagination.itemsPerPage, filters)
            .then(([placeholders, pagination]) => {
                //console.log('ApiHooks: get placeholders')
                //console.log(placeholders)
                // console.log(pagination)
                setPlaceholders(placeholders)
                setPagination(pagination)
            })
            .catch(error => {
                console.log(error)
                setError(error)
            })
            .finally(() => setLoading(false))
    }, [pagination.currentPage, filters])

    const filter = (filters) => {
        pagination.getPage(1)
        setFilters(filters)
    }

    const clearFilter = () => {
        setFilters(null)
    }

    return {
        items: placeholders,
        pagination,//: {...pagination, getPage: paginationUtils.getPage },
        loading,
        filter,
        clearFilter,
        error,
    }
}

export const useMedia = (id) => {
    const [media, setMedia] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        setLoading(true)

        getMedia(id)
            .then(([media, pagination]) => {
                console.log('API media')
                console.log(media)
                setMedia(media)
            })
            .catch(error => {
                console.log(error)
                setError(error)
            })
            .finally(() => setLoading(false))
    }, [id])

    return {
        item: media,
        loading,
        error,
    }
}

export const useMedias = (currentPage, itemsPerPage, initialFilters) => {
    const [loading, setLoading] = useState(true)
    const [media, setMedia] = useState(null)
    const [pagination, setPagination] = usePagination(currentPage, itemsPerPage)
    const [error, setError] = useState(null)
    const cancelToken = useRef(axios.CancelToken.source())

    // console.log(initialFilters)
    // TODO: testing filter
    const [filters, setFilters] = useState(initialFilters || null)
    // console.log(filters)

    useEffect(() => {
        if (initialFilters && !isEqual(filters, initialFilters))
            setFilters(initialFilters)
    }, [initialFilters])

    useEffect(() => {
        // console.log('getting media')
        setLoading(true)

        cancelToken.current = axios.CancelToken.source()

        const get = objectNotNull(filters) ? filterMedias : getMedias

        get(pagination.currentPage, pagination.itemsPerPage, { ...filters, cancelToken: cancelToken.current.token })
            .then(([media, pagination]) => {
                console.log('ApiHooks: getContact -----')
                // console.log(pagination)
                console.log(media)
                setMedia(media)
                setPagination(pagination)
            })
            .catch(error => {
                console.log(error)
                setError(error)
            })
            .finally(() => setLoading(false))

        return () => cancelToken.current.cancel("useEffect cleanup")

    }, [pagination.currentPage, filters])

    const filter = (filters) => {
        pagination.getPage(1)
        setFilters(filters)
    }

    const clearFilter = () => {
        setFilters(null)
    }

    return {
        items: media,
        pagination,//: {...pagination, getPage: paginationUtils.getPage },
        loading,
        filter,
        clearFilter,
        error,
    }
}


// getMessage

export const useMessage = (id, refresh) => {
    const [message, setMessage] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
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
                setError(error)
            })
            .finally(() => setLoading(false))

    }, [id, refresh])

    return {
        item: message,
        loading,
        error
    }
}

export const useMessageRecipients = (id, refresh, currentPage, itemsPerPage) => {
    const [loading, setLoading] = useState(true)
    const [recipients, setRecipients] = useState(null)
    const [pagination, setPagination] = usePagination(currentPage, itemsPerPage)
    const [error, setError] = useState(null)

    useEffect(() => {
        setLoading(true)

        getMessageRecipients(id, pagination.currentPage, pagination.itemsPerPage)
            .then(([recipients, pagination]) => {
                setRecipients(recipients)
                setPagination(pagination)
            })
            .catch(error => {
                console.log(error)
                setError(error)
            })
            .finally(() => setLoading(false))
    }, [id, refresh, pagination.currentPage])

    return {
        items: recipients,
        pagination,
        loading,
        error
    }
}

// getMessages

export const useMessages = (currentPage, itemsPerPage, initialFilters) => {
    const [loading, setLoading] = useState(true)
    const [messages, setMessages] = useState([])
    const [pagination, setPagination] = usePagination(currentPage, itemsPerPage)
    const [error, setError] = useState(null)
    const cancelToken = useRef(axios.CancelToken.source())

    const [filters, setFilters] = useState(initialFilters || null)

    useEffect(() => {
        setLoading(true)
        cancelToken.current = axios.CancelToken.source()

        getMessages(pagination.currentPage, pagination.itemsPerPage, { ...filters, cancelToken: cancelToken.current.token })
            .then(([messages, pagination]) => {
                //console.log('ApiHooks: getContact -----')
                // console.log(pagination)
                setMessages(messages)
                setPagination(pagination)
            })
            .catch(error => {
                if (!axios.isCancel(error))
                    setError(error)
            })
            .finally(() => setLoading(false))

        return () => cancelToken.current.cancel("useEffect cleanup")

    }, [pagination.currentPage, filters])

    const filter = (filters) => {
        pagination.getPage(1)
        setFilters(filters)
    }

    const clearFilter = () => {
        setFilters(null)
    }

    return {
        items: messages,
        pagination,//: {...pagination, getPage: paginationUtils.getPage },
        loading,
        error,
        filter,
        clearFilter
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
    const [coachesTypes, setCoachesTypes] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

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
                setError(error)
            })
            .finally(() => setLoading(false))

    }, [])

    return {
        items: coachesTypes,
        loading,
        error
    }
}


export const usePeopleTypes = () => {
    const [peopleTypes, setPeopleTypes] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)


    useEffect(() => {
        setLoading(true)

        getPeopleTypes()
            .then(([PeopleTypes]) => {
                //console.log(PeopleTypes)
                setPeopleTypes(PeopleTypes)
            })
            .catch(error => {
                console.log(error)
                setError(error)
            })
            .finally(() => setLoading(false))

    }, [])

    return {
        items: peopleTypes,
        loading,
        error
    }
}
export const useMediaTypes = () => {
    const [mediaTypes, setMediaTypes] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        setLoading(true)

        getMediaTypes()
            .then(([mediaTypes]) => {

                setMediaTypes(mediaTypes.map(item => ({
                    ...item,
                    id: item.key,
                    name: item.type,
                })))
            })
            .catch(error => {
                console.log(error)
                setError(error)
            })
            .finally(() => setLoading(false))

    }, [])

    return {
        items: mediaTypes,
        loading,
        error
    }
}

export const useTaskQueue = (date) => {
    const [taskQueue, setTaskQueue] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        setLoading(true)

        getTasksQueue(date)
            .then(([taks]) => {
                setTaskQueue(taks)
            })
            .catch(error => {
                setError(error)
            })
            .finally(() => setLoading(false))
    }, [date])

    return {
        items: taskQueue,
        loading,
        error
    }
}
export const useStats = (startDate, endDate) => {
    const [stats, setStats] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        setLoading(true)

        getStats(startDate, endDate)
            .then(([stats]) => {
                setStats(stats?.table)
            })
            .catch(error => {
                setError(error)
            })
            .finally(() => setLoading(false))
    }, [startDate, endDate])

    return {
        items: stats,
        loading,
        error
    }
}

const getStoredColumns = (id) => JSON.parse(localStorage.getItem(id + '-table-columns'))

const getColumns = (control) => ({
    profileImg: control?.profileImg || true,
    fullname: control?.fullname || true,
    firstName: control?.firstName || false,
    lastName: control?.lastName || false,
    nickName: control?.nickName || false,
    twitterName: control?.twitterName || false,
    phone: control?.phone || false,
    state: control?.state || false,
    school: control?.school || false,
    gradYear: control?.gradYear || false,
    position: control?.position || false,
    areaCoach: control?.areaCoach || false,
    positionCoach: control?.positionCoach || false,
    recruitingCoach: control?.recruitingCoach || false,
    status: control?.status || false,
    status2: control?.status2 || false,
    tags: control?.tags || false,
    rank: control?.rank || false,
    // lastMessaged: false,
    // mostActiveTime: false,
    // dateAdded: false,
    timeZone: control?.timeZone || false,
    birthday: control?.birthday || false,
})

export const useContactTableColumns = (control, id) => {
    const storedColumns = useMemo(() => getStoredColumns(id), [id])

    const [columns, setColumns] = useState(storedColumns ?
        storedColumns : getColumns(control))

    useEffect(() => {
        if (!objectNotNull(control))
            return

        if (!storedColumns)
            setColumns(getColumns(control))
    }, [control])

    const onChange = (newValue) => {
        console.log(newValue)
        localStorage.setItem(id + '-table-columns', JSON.stringify(newValue))
        setColumns(newValue)
    }

    // console.log('state', columns)

    return {
        items: columns,
        onChange
    }
}


// TODO:

///////////////////////*********************/////////////////
//                          Contact Page 
///////////////////////*********************/////////////////
export const useMyContacts = (page) => {

    const [contacts, setContacts] = useState(null)
    const [error, setError] = useState(null)

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
                setError(error)
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