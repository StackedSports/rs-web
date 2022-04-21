import axios from "axios";

// import { useContext } from "react"
// import { AuthContext } from "Context/Auth/AuthProvider"

import {
    getFilterContactsCriteria,
    getFilterMessagesCriteria,
    getFilterMediasCriteria,
    getFilterPlaceholdersCriteria
} from './Parser'

import { objectNotNull } from 'utils/Validation'

import { getPagination } from './Pagination'

// initializing axios-curlirize with your axios instance
// curlirize(axios);    

//const URL = "https://prod.recruitsuite.co/api/";
const URL = "https://api.recruitsuite.co/api/";

const makeError = (code, message) => { code, message }

const AXIOS = (method, url, body) => {
    // const { user } = useContext(AuthContext)

    return new Promise((resolve, reject) => {
        const data = JSON.stringify(body);

        const HEADERS = {
            Accept: "application/json; version=1",
            "Content-Type": "application/json",
            Authorization: "RecruitSuiteAuthKey key=7b64dc29-ee30-4bb4-90b4-af2e877b6452",
            "X-Auth-Token": JSON.parse(localStorage.getItem("user")).token,
            // "X-Auth-Token": user.token
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

const DELETE = (url, body) => {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify(body)

        const HEADERS = {
            Accept: "application/json; version=1",
            "Content-Type": "application/json",
            Authorization: "RecruitSuiteAuthKey key=7b64dc29-ee30-4bb4-90b4-af2e877b6452",
            "X-Auth-Token": JSON.parse(localStorage.getItem("user")).token,
        }

        const config = {
            headers: HEADERS,
            data 
        }

        axios.delete(URL + url, config)
            .then(res => {
                if (res.status === 204 || res.status === 200 || res.status === 201 || res.status === 203)
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

        console.log(body)

        const HEADERS = {
            Accept: "application/json; version=1",
            "Content-Type": "application/json",
            Authorization: "RecruitSuiteAuthKey key=7b64dc29-ee30-4bb4-90b4-af2e877b6452",
            "X-Auth-Token": JSON.parse(localStorage.getItem("user")).token,
        }

        const config = {
            headers: HEADERS,
            // params: JSON.stringify(body)
            params: body
        }

        axios.get(URL + url, config)
            .then(res => {
                //console.log(res)
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
    return new Promise((resolve, reject) => {
        let data = JSON.stringify({ email, password })
        console.log("eu sou o login")

        const HEADERS = {
            Accept: "application/json; version=1",
            "Content-Type": "application/json",
            Authorization: "RecruitSuiteAuthKey key=7b64dc29-ee30-4bb4-90b4-af2e877b6452",
        }

        const config = {
            headers: HEADERS
        }

        axios.post(URL + 'login', data, config)
            .then(res => {
                console.log(res)
                if (res.status === 200 || res.status === 204 || res.status === 201)
                    resolve(res)
                else
                    reject(res)
            })
            .catch(error => {
                reject(error)
            })
    })
    //return POST('login', { email, password })
}

export const logout = () => {
    return POST('logout')
}

export const getPlatform = () => {
    return AXIOS('get', `team/settings/platforms`)
}

export const getContact = (id) => {
    return AXIOS('get', `contacts/${id}`)
}

export const updateContact = (id, data) => {
    const body = {
        contact: data
    }
    return AXIOS('put', `contacts/${id}`, body)
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

export const getBoardContacts = (id, page, perPage, filters) => {
    return AXIOS('get', `filters/${id}/contacts?page=${page}&per_page=${perPage}`)
}

export const getUser = () => {
    return AXIOS('get', 'me')
}

export const upadateSelectedColumns = (userId, body) => {
    return AXIOS('put', `users/${userId}/selected_columns`, body)
}

export const getMessages = (page = 1, perPage = 10, filters) => {
    let data = {
        criteria: {
            ...getFilterMessagesCriteria(filters),
            include_team: "true"
        }
    }

    if (!objectNotNull(data.criteria))
        delete data.criteria

    // not working: In Progress,

    // data = {
    //     criteria: {
    //         message_status: ['In Progress'],
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
    return AXIOS('get', `media/placeholders/${id}`)
}

export const getPlaceholders = (page, perPage, filters) => {
    let data = {
        criteria: { ...getFilterPlaceholdersCriteria(filters) }
    }

    if (!objectNotNull(data.criteria))
        delete data.criteria

    console.log(data)

    return GET(`media/placeholders?page=${page}&per_page=${perPage}`, data)
}

export const getMedia = (id) => {
    return AXIOS('get', `media/${id}`)
}

export const getMedias = (page, perPage) => {
    // console.log(`get media page ${page} items per page ${perPage}`)
    return AXIOS('get', `media?page=${page}&per_page=${perPage}`)
}

export const filterMedias = (page, perPage, filters) => {
    const data = {
        page: page,
        per_page: perPage,
        ...getFilterMediasCriteria(filters),
    }

    console.log(data)

    return AXIOS('post', 'media/search', data)
}

export const deleteMedia = (mediaId) => {
    return DELETE(`media/${mediaId}`)
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

export const removeRecipient = (messageId, recipientId) => {
    return DELETE(`messages/${messageId}/remove_recipient/${recipientId}`)
}

export const removeRecipients = (messageId, recipientsId) => {
    return new Promise((resolve, reject) => {
        if(!Array.isArray(recipientsId))
            reject(new TypeError('recipientsId must be an array of ids'))

        let count = recipientsId.length
        let error = 0
        let success = 0
        let removedRecipients = []
        let errors = []

        recipientsId.forEach(recipientId => {
            removeRecipient(messageId, recipientId)
                .then(res => {
                    console.log(res)
                    success++
                    removedRecipients.push(recipientId)
                })
                .catch(err => {
                    console.log(err)
                    error++
                    errors.push(err)
                })
                .finally(() => {
                    count--

                    if(count === 0) {
                        resolve({
                            errorCount: error,
                            successCount: success,
                            removedRecipients,
                            errors
                        })
                    }
                })
        })
    })
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

export const untagContact = (tagIds, contactsIds) => {
    let body = {
        contact: {
            tag_ids: tagIds
        }
    }

    return AXIOS("delete", `contacts/${contactId}/remove_tags`, body)
}

export const untagContacts = (tagIds, contactIds) => {
    return new Promise((resolve, reject) => {
        let total = contactIds.length
        let success = 0
        let error = 0

        let errors = []
        let successIds = []
        let errorIds = []

        let count = contactIds.length

        contactIds.forEach(contactId => {
            addTagsToContact(tagIds, contactId)
                .then(res => {
                    console.log(res)
                    success++
                    successIds.push(contactId)
                })
                .catch(err => {
                    console.log(err)
                    errors.push(err)
                    errorIds.push(contactId)
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
                            successIds,
                            errorIds
                        })
                })
        })
    })
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
                .catch(err => {
                    console.log(err)
                    errors.push(err)
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

export const addOpponent = (data, contactId) => {
    // data =   {
    //     "week": 1, 
    //     "name": "WHHS", 
    //     "win_loss": true, 
    //     "score": "21-15",
    //     "notes": ""
    // }

    let body = {
        opponents: data
    }

    return POST(`contacts/${contactId}/opponents`, body)
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

/**
 * 
 * @param {int} mediaId media id
 * @param {object} data should be an object with the following keys:
 * @param {string} data.name name of the media
 * @param {string} data.team_contact_id Id for contact to associate to media
 * @param {string} data.media_placeholder_id id for placeholder to associate to media
 * @param {string} data.owner Id for the user to set as the owner
 * @param {Boolean} data.archive Can pass true to archive media
 * @returns {Promise} promise
 */
export const updateMedia = (mediaId, data) => {
    let body = {
        media: { ...data }
    }

    console.log(body)
    
    return PUT(`media/${mediaId}`, body)
}

export const updateMediaForm = (mediaId, data) => {

    let bodyFormData = new FormData();
    if (data.name)
        bodyFormData.append('media[name]', data.name)
    if (data.team_contact_id)
        bodyFormData.append('media[team_contact_id]', data.team_contact_id)
    if (data.media_placeholder_id)
        bodyFormData.append('media[media_placeholder_id]', data.media_placeholder_id)
    if (data.owner)
        bodyFormData.append('media[owner]', data.owner)
    if (data.archive)
        bodyFormData.append('media[archive]', data.archive)

    return new Promise((resolve, reject) => {

        let myHeaders = new Headers();
        myHeaders.append("Accept", "application/json; version=1");
        myHeaders.append("X-Auth-Token", JSON.parse(localStorage.getItem("user")).token);
        myHeaders.append("Authorization", "RecruitSuiteAuthKey key=7b64dc29-ee30-4bb4-90b4-af2e877b6452")

        let requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: bodyFormData,
            redirect: 'follow'
        };

        fetch(URL + `media/${mediaId}`, requestOptions)
            .then(response => response.json())
            .then(result => resolve(result))
            .catch(error => reject(error))
    })
}

/**
 * 
 * @param {string} mediaId media id
 * @returns {Promise} promise
 */
export const archiveMedia = (mediaId) => {
    return updateMedia(mediaId, { archive: true })
}

/**
 * 
 * @param {string[]} mediasIds array of media ids to archive
 * @returns {Object} returns an object with the following keys: success.count, success.ids, error.count, error.ids
 */
export const archiveMedias = async(mediasIds) => {
    let response = {
        success: {
            count: 0,
            id: []
        },
        error: {
            count: 0,
            id: []
        }
    }
    if (mediasIds instanceof Array) {
        Promise.allSettled(mediasIds.map(mediaId => archiveMedia(mediaId))).
            then(results => {
                results.forEach(result => {
                    if (result.status === 'fulfilled') {
                        result.value.then(res => {
                            response.success.count++
                            //Todo add id to array
                        })
                    }
                    else {
                        response.error.count++
                        response.error.id.push(result.reason.config.url.slice(`${URL}/media/`.length))
                    }
                })
            }).finally(() => {
                return response
            })
    }
    return response
}

/**
 * Adds array of tags to a Media
 * @param {int[]} tagIds array of tag ids to archive
 * @param {int} mediaId  media id to associate tags to
 * @returns {promise} promise
 */
export const addTagsToMedia = (tagIds, mediaId) => {
    let body = {
        media: {
            tag_ids: tagIds
        }
    }

    return POST(`media/${mediaId}/add_tags`, body)
}

/**
 * Adds array of tags to an array of Medias
 * @param {*} tagsIds array of tag ids to archive 
 * @param {*} mediasId  array of media ids to associate tags to
 * @returns 
 */
export const addTagsToMedias = (tagIds, mediaIds) => {
    let response = {
        success: {
            count: 0,
            id: []
        },
        error: {
            count: 0,
            id: []
        }
    }
    if (mediaIds instanceof Array && tagIds instanceof Array) {
        Promise.allSettled(mediaIds.map(mediaId => addTagsToMedia(tagIds, mediaId))).
            then(results => {
                results.forEach(result => {
                    if (result.status === 'fulfilled') {
                        result.value.then(res => {
                            response.success.count++
                            //Todo find better way to add id to reponse
                        })
                    }
                    else {
                        response.error.count++
                        //Todo find better way to add id to reponse
                    }
                })
            })
    }
    return response
}

/**
 * Delete tags from a Media
 * @param {int[]} tagsId  array of tag ids to delete
 * @param {int} mediaId  media id to removes tags from
 * @returns 
 */
export const deleteTagsFromMedia = (tagsId, mediaId) => {
    let body = {
        media: {
            tag_ids: tagsId
        }
    }

    return DELETE(`media/${mediaId}/remove_tags`, body)
}

/**
 * updates placeholder name
 * @param {int} placeholderId placeholder id
 * @param {String} name new name 
 * @returns {Promise} promise
 */
export const updatePlaceholder = (placeholderId, name) => {
    let body = {
        media_placeholder: { 
            name: name
         }
    }

    return PUT(`media/placeholders/${placeholderId}`, body)
}

