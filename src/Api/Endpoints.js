import axios from "axios";
import moment from "moment";

import curlirize from 'axios-curlirize';
// initializing axios-curlirize with your axios instance
//curlirize(axios);

//const URL = "https://prod.recruitsuite.co/api/";
const URL = "https://api.recruitsuite.co/api/";

const AXIOS = (method, url, body) => {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify(body);

        axios({
                method: method,
                url: URL + url,
                headers: {
                    Accept: "application/json; version=1",
                    "Content-Type": "application/json",
                    Authorization:
                        "RecruitSuiteAuthKey key=7b64dc29-ee30-4bb4-90b4-af2e877b6452",
                    "X-Auth-Token": JSON.parse(localStorage.getItem("user")).token,
                    Cookie:
                        "ahoy_visit=be028ec4-d074-4dde-8218-f166f678ee87; _memcache-recruitsuite_session=d8ee35c9e0cd796c691901ada77a8bf6",
                },
                data
            })
            .then(res => {
                //console.log(res)
                if (res.statusText === "OK") {

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

export const getContact = (id) => {
    return AXIOS('get', `contacts/${id}`)
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


