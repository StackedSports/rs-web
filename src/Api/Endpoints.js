import axios from "axios";
import moment from "moment";

import curlirize from 'axios-curlirize';


import {
    getFilterContactsCriteria,
    getFilterMessagesCriteria
} from './Parser'

import { objectNotNull } from 'utils/Validation'

import { getPagination } from './Pagination'

// initializing axios-curlirize with your axios instance
// curlirize(axios);    

//const URL = "https://prod.recruitsuite.co/api/";
const URL = "https://api.recruitsuite.co/api/";

const makeError = (code, message) => { code, message }

const AXIOS = (method, url, body) => {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify(body);

        const HEADERS = {
            Accept: "application/json; version=1",
            "Content-Type": "application/json",
            Authorization: "RecruitSuiteAuthKey key=7b64dc29-ee30-4bb4-90b4-af2e877b6452",
            "X-Auth-Token": JSON.parse(localStorage.getItem("user")).token,
        }

        axios({
            method: method,
            url: URL + url,
            headers: {
                Accept: "application/json; version=1",
                "Content-Type": "application/json",
                Authorization: "RecruitSuiteAuthKey key=7b64dc29-ee30-4bb4-90b4-af2e877b6452",
                "X-Auth-Token": JSON.parse(localStorage.getItem("user")).token,
                // Cookie:
                //     "ahoy_visit=be028ec4-d074-4dde-8218-f166f678ee87; _memcache-recruitsuite_session=d8ee35c9e0cd796c691901ada77a8bf6",
            },
            data
        })
            .then(res => {
                // console.log(res)
                if (res.status === 200 || res.status === 204 || res.status === 201) {

                    let pagination = getPagination(res)

                    resolve([res.data, pagination])
                } else {
                    reject(res)
                }
            })
            .catch(error => {
                reject(error)
            })
    })
}

const DELETE = (url) => {
    return new Promise((resolve, reject) => {

        const HEADERS = {
            Accept: "application/json; version=1",
            "Content-Type": "application/json",
            Authorization: "RecruitSuiteAuthKey key=7b64dc29-ee30-4bb4-90b4-af2e877b6452",
            "X-Auth-Token": JSON.parse(localStorage.getItem("user")).token,
        }

        const config = {
            headers: HEADERS
        }

        axios.delete(URL + url, config)
            .then(res => {
                if (res.status === 204)
                    resolve(res)
                else
                    reject(res)
            })
            .catch(error => {
                reject(error)
            })
    })
}

const GET = (url, body) => {
    return new Promise((resolve, reject) => {
        //const data = JSON.stringify(body);

        const HEADERS = {
            Accept: "application/json; version=1",
            "Content-Type": "application/json",
            Authorization: "RecruitSuiteAuthKey key=7b64dc29-ee30-4bb4-90b4-af2e877b6452",
            "X-Auth-Token": JSON.parse(localStorage.getItem("user")).token,
        }

        const config = {
            headers: HEADERS,
            params: body
        }

        axios.get(URL + url, config)
            .then(res => {
                console.log(res)
                if (res.status === 200 || res.status === 204 || res.status === 201) {
                    let pagination = getPagination(res)
                    resolve([res.data, pagination])
                } else
                    reject(res)
            })
            .catch(error => {
                reject(error)
            })
    })
}

const POST = (url, body) => {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify(body);

        const HEADERS = {
            Accept: "application/json; version=1",
            "Content-Type": "application/json",
            Authorization: "RecruitSuiteAuthKey key=7b64dc29-ee30-4bb4-90b4-af2e877b6452",
            "X-Auth-Token": JSON.parse(localStorage.getItem("user")).token,
        }

        const config = {
            headers: HEADERS
        }

        axios.post(URL + url, data, config)
            .then(res => {
                if (res.status === 200 || res.status === 204 || res.status === 201)
                    resolve(res)
                else
                    reject(res)
            })
            .catch(error => {
                reject(error)
            })
    })
}

const PUT = (url, body) => {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify(body);

        const HEADERS = {
            Accept: "application/json; version=1",
            "Content-Type": "application/json",
            Authorization: "RecruitSuiteAuthKey key=7b64dc29-ee30-4bb4-90b4-af2e877b6452",
            "X-Auth-Token": JSON.parse(localStorage.getItem("user")).token,
        }

        const config = {
            headers: HEADERS
        }

        axios.put(URL + url, data, config)
            .then(res => {
                console.log(res)
                if (res.status === 204 || res.status === 201)
                    resolve(res)
                else
                    reject(res)
            })
            .catch(error => {
                reject(error)
            })
    })
}

export const login = (email, password) => {
    return POST('login', { email, password })
}

export const getPlatform = () => {
    return AXIOS('get', `team/settings/platforms`)
}

export const getContact = (id) => {
    return AXIOS('get', `contacts/${id}`)
}

export const archiveContact = (id) => {
    return DELETE(`contacts/${id}`)
}

/**
 * Iterates over an array of contact ids and archives
 * each contact
 * @param {array} ids array of contact ids to archive
 */
export const archiveContacts = (ids) => {
    return new Promise((resolve, reject) => {
        if (!Array.isArray(ids))
            reject(makeError('C-422', 'ids must be an array'))

        let count = ids.length

        let successCount = 0
        let failedCount = 0

        ids.forEach(id => {
            archiveContact(id)
                .then(res => {
                    successCount++
                })
                .catch(error => {
                    failedCount++
                })
                .finally(() => {
                    count--

                    if (count <= 0) {
                        resolve({ successCount, failedCount })
                    }
                })
        })
    })
}

export const getAllStatus = () => {
    return AXIOS('get', `team/settings/statuses`)
}

export const getContacts = (page, perPage) => {
    return AXIOS('get', `contacts?page=${page}&per_page=${perPage}`)
}

export const filterContacts = (page, perPage, filters) => {
    const data = {
        page: page,
        per_page: perPage,
        criteria: { ...getFilterContactsCriteria(filters) }
    }

    // data = {
    //     filter: {
    //         name: 'Name',
    //         is_shared: true,
    //         criteria: { ...getFilterContactsCriteria(filters) }
    //     }
    // }

    console.log(data)

    return AXIOS('post', 'contacts/filter', data)
}

export const getTeamMembers = () => {
    return AXIOS('get', `team/members?per_page=100&only_active=true`)
}

export const getTags = () => {
    return AXIOS('get', `tags`)
}

export const getTagsWithContacts = () => {
    return AXIOS('get', `tags/with_contacts`)
}

export const getTagsWithMedia = () => {
    return AXIOS('get', `tags/with_media`)
}

export const getTagsWithMessages = () => {
    return AXIOS('get', `tags/with_messages`)
}
export const getRanks = () => {
    return AXIOS('get', `team/settings/ranks`)
}
export const getGradeYears = () => {
    return AXIOS('get', `team/settings/grad_years`)
}


export const getBoards = () => {
    return AXIOS('get', `filters`)
}
export const getPositions = () => {
    return AXIOS('get', `team/settings/positions`)
}
export const getStatuses = () => {
    return AXIOS('get', `team/settings/statuses`)
}
export const getAllColumns = () => {
    return AXIOS('get', `team/settings/available_columns`)
}
export const getBoardFiltersById = (id) => {
    return AXIOS('get', `filters/${id}`)
}
export const getTeamContacts = () => {
    return AXIOS('get', `team/members?only_active=true`)
}


export const getBoard = (id) => {
    return AXIOS('get', `filters/${id}`)
}
export const getUser = () => {
    return AXIOS('get', 'me')
}

export const getMessages = (page = 1, perPage = 10, filters) => {
    let data = {
        criteria: { ...getFilterMessagesCriteria(filters) }
    }

    if (!objectNotNull(data.criteria))
        delete data.criteria



    // data = {
    //     criteria: {
    //         message_status: ['Sent'],
    //         include_team: true
    //     }
    // }

    // console.log(data.criteria.message_status)

    return GET(`messages?page=${page}&per_page=${perPage}`, data)
    // return AXIOS('get', `messages?page=${page}&per_page=${perPage}`, criteria)
}

export const getMessage = (id) => {
    return AXIOS('get', `messages/${id}`)
}

export const getMessageRecipients = (id, page = 1, perPage = 50) => {
    return AXIOS('get', `messages/${id}/recipients?page=${page}&per_page=${perPage}`)
}

export const getFilters = () => {
    return AXIOS('get', 'filters?is_shared=false')
}

export const getPlaceholder = (id) => {
    return AXIOS('get', `media/placeholder/${id}`)
}

export const getPlaceholders = (page, perPage) => {
    return AXIOS('get', `media/placeholders?page=${page}&per_page=${perPage}`)
}

export const getMedia = (id) => {
    return AXIOS('get', `media/${id}`)
}

export const getMedias = (page, perPage) => {
    // console.log(`get media page ${page} items per page ${perPage}`)
    return AXIOS('get', `media?page=${page}&per_page=${perPage}`)
}

export const getMediaTypes = () => {
    return AXIOS('get', 'media/types')
}

export const getTextPlaceholders = () => {
    return AXIOS('get', `team/settings/placeholders`)
}

export const getSnippets = () => {
    return AXIOS('get', `team/settings/snippets`)
}

export const getCoachTypes = () => {
    return AXIOS('get', `team/settings/send_as_coaches`)
}
export const getPeopleTypes = () => {
    return AXIOS('get', `team/settings/people_types`)
}

export const createMessage = (data) => {
    let body = {
        message: { ...data }
    }

    // if(user_id)
    //     body['user_id'] = user_id

    // {"errors":[{"code":"active_record/invalid_foreign_key","message":"PG::ForeignKeyViolation: ERROR:  insert or update on table \"messages\" violates foreign key constraint \"messages_user_id_fkey\"\nDETAIL:  Key (user_id)=(0) is not present in table \"users\".\n"}]}

    return POST('messages', body)
}

export const updateMessage = (messageId, data) => {
    let body = {
        message: { ...data }
    }

    return PUT(`messages/${messageId}`, body)
}

export const sendMessage = (messageId) => {
    return updateMessage(messageId, { status: 'Pending' })
}

export const deleteMessage = (messageId) => {
    return DELETE(`messages/${messageId}`)
}

export const archiveMessage = (messageId) => {
    return DELETE(`messages/${messageId}?message[status]=archived`)

    //return DELETE(`messages/${messageId}`, { message: { status: 'archived'} })
}

export const addTagsToMessage = (tagIds, messageId) => {
    let body = {
        message: {
            tag_ids: tagIds
        }
    }

    return POST(`messages/${messageId}/add_tags`, body)
}

export const addTagsToContact = (tagIds, contactId) => {
    let body = {
        contact: {
            tag_ids: tagIds
        }
    }

    return POST(`contacts/${contactId}/add_tags`, body)
}

export const addTagsToContacts = (tagIds, contactIds) => {
    return new Promise((resolve, reject) => {
        let total = contactIds.length
        let success = 0
        let error = 0

        let errors = []
        let failedIds = []

        let count = contactIds.length

        contactIds.forEach(contactId => {
            addTagsToContact(tagIds, contactId)
                .then(res => {
                    console.log(res)
                    success++
                })
                .catch(error => {
                    console.log(error)
                    errors.push(error)
                    failedIds.push(contactId)
                    error++
                })
                .finally(() => {
                    count--

                    if (count === 0)
                        resolve({
                            total,
                            success,
                            error,
                            errors,
                            failedIds
                        })
                })
        })
    })
}

export const deleteTagToContact = (tagId) => {
    return DELETE(`contacts/${tagId}/remove_tag`)
}

// TODO: what is this function?
export const CreateUser = (body) => {
    //const data = JSON.stringify(body);
    return AXIOS('post', `messages`, body)
}

export const createNewBoard = (data, selectedFilters) => {

    const body = {
        filter: {
            ...data,
            criteria: { ...getFilterContactsCriteria(selectedFilters) }
        }
    }

    return POST(`filters`, body)
}

export const getAllContactsEnd = (page) => {
    var page = page || 1;
    var pageCount = page || 1;
    // console.log("THis is page count", pageCount, "this is page", page);
    var perPage = 50;
    // console.log("This is perpage", perPage);
    return AXIOS('get', `contacts?page=${page}&per_page=${perPage}&sort_column=first_name`)
    // contacts?page=${page}&per_page=${perPage}&sort_column=first_name
}



