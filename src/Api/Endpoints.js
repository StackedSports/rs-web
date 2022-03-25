import axios from "axios";
import moment from "moment";

import curlirize from 'axios-curlirize';
// initializing axios-curlirize with your axios instance
//curlirize(axios);

//const URL = "https://prod.recruitsuite.co/api/";
const URL = "https://api.recruitsuite.co/api/";

const HEADERS = {
    Accept: "application/json; version=1",
    "Content-Type": "application/json",
    Authorization: "RecruitSuiteAuthKey key=7b64dc29-ee30-4bb4-90b4-af2e877b6452",
    "X-Auth-Token": JSON.parse(localStorage.getItem("user")).token,
}

const makeError = (code, message) => { code, message }

const AXIOS = (method, url, body) => {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify(body);

        axios({
            method: method,
            url: URL + url,
            headers: {
                Accept: "application/json; version=1",
                "Content-Type": "application/json",
                Authorization: "RecruitSuiteAuthKey key=7b64dc29-ee30-4bb4-90b4-af2e877b6452",
                "X-Auth-Token": JSON.parse(localStorage.getItem("user")).token,
                Cookie:
                    "ahoy_visit=be028ec4-d074-4dde-8218-f166f678ee87; _memcache-recruitsuite_session=d8ee35c9e0cd796c691901ada77a8bf6",
            },
            data
        })
            .then(res => {
                console.log(res)
                if (res.status === 200) {

                    let pagination = {
                        currentPage: res.headers['current-page'],
                        totalPages: res.headers['total-pages'],
                        itemsPerPage: res.headers['page-items'],
                        totalItems: res.headers['total-count']
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
export const getContact = (id) => {
    return AXIOS('get', `contacts/${id}`)
}

export const getAllStatus = () => {
    return AXIOS('get', `team/statuses`)
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
export const getGradeYears = () => {
    return AXIOS('get', `team/grad_years`)
}


export const getBoards = () => {
    return AXIOS('get', `filters`)
}
export const getPositions = () => {
    return AXIOS('get', `team/positions`)
}
export const getAllColumns = () => {
    return AXIOS('get', `team/available_columns`)
}
export const getBoardFiltersById = (id) => {
    return AXIOS('get', `filters/${id}`)
}
export const getTeamContacts = () => {
    return AXIOS('get', `team/members?only_active=true`)
}
export const getTagsWithContacts = () => {
    return AXIOS('get', `tags/with_contacts`)
}


export const getBoard = (id) => {
    return AXIOS('get', `filters/${id}`)
}

export const getUser = () => {
    return AXIOS('get', 'me')
}

export const filterContacts = () => {
    // let data = filter
    let data = {
        search: 'henderson'
        // search: {
        //     tags: ['clients']
        // }
    }

    return AXIOS('get', `contacts?search=status+%5B"Sponsors%2FPartners"%5D`)
}


export const getAllContactsEnd = (page) => {
    var page = page || 1;
    var pageCount = page || 1;
    console.log("THis is page count", pageCount, "this is page", page);
    var perPage = 50;
    console.log("This is perpage", perPage);
    return AXIOS('get', `contacts?page=${page}&per_page=${perPage}&sort_column=first_name`)
    // contacts?page=${page}&per_page=${perPage}&sort_column=first_name
}



