import axios from "axios";
import moment from "moment";

import curlirize from 'axios-curlirize';
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
                //console.log(res)
                if (res.status === 200) {

                    let pagination = {
                        currentPage: parseInt(res.headers['current-page']),
                        totalPages: parseInt(res.headers['total-pages']),
                        itemsPerPage: parseInt(res.headers['page-items']),
                        totalItems: parseInt(res.headers['total-count'])
                    }

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
                if(res.status === 204)
                    resolve(res)
                else
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
                if(res.status === 204 || res.status === 201)
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
                if(res.status === 204 || res.status === 201)
                    resolve(res)
                else
                    reject(res)
            })
            .catch(error => {
                reject(error)
            })
    })
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
        if(!Array.isArray(ids))
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

                    if(count <= 0) {
                        resolve({ successCount, failedCount })
                    }
                })
        })
    })
}

export const getContacts = (page, perPage) => {
    return AXIOS('get', `contacts?page=${page}&per_page=${perPage}`)
}

export const filterContacts = (data) => {
    return POST('contacts/filter', data)
}

export const getTeamMembers = () => {
    return AXIOS('get', `team/members?per_page=100&only_active=true`)
}

export const getTags = () => {
    return AXIOS('get', `tags`)
}

export const getRanks = () => {
    return AXIOS('get', `team/ranks`)
}

export const getBoards = () => {
    return AXIOS('get', `filters`)
}

export const getBoard = (id) => {
    return AXIOS('get', `filters/${id}`)
}

export const getUser = () => {
    return AXIOS('get', 'me')
}

export const getMessages = () => {
    return AXIOS('get', 'messages?include_all=true&sort_column=created_at&sort_dir=dsc')
}

export const getMessage = (id) => {
    return AXIOS('get', `messages/${id}`)
}

export const getFilters = () => {
    return AXIOS('get', 'filters?is_shared=false')
}

export const getPlaceholders = (page, perPage) => {
    return AXIOS('get', `media/placeholders?page=${page}&per_page=${perPage}`)
}

export const getMedia = (page, perPage) => {
    // console.log(`get media page ${page} items per page ${perPage}`)
    return AXIOS('get', `media?page=${page}&per_page=${perPage}`)
}

export const getTextPlaceholders = () => {
    return AXIOS('get', `team/placeholders`)
}

export const getSnippets = () => {
    return AXIOS('get', `team/snippets`)
}

export const createMessage = (data) => {
    let body = { 
        message: {...data}
    }

    return POST('messages', body)
}

export const updateMessage = (messageId, data) => {
    let body = {
        message: {...data}
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

