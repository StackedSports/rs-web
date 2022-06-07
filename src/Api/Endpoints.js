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
import { separeteNewTagsNameFromExistingTagsIds } from "utils/Helper";

// initializing axios-curlirize with your axios instance
// curlirize(axios);    

//const URL = "https://prod.recruitsuite.co/api/";
const URL = "https://api.recruitsuite.co/api/";

const makeError = (code, message) => { code, message }

const AXIOS = (method, url, body, cancelToken) => {
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
            cancelToken: cancelToken,
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

const GET = (url, body, cancelToken) => {
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
            params: body,
            cancelToken: cancelToken
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
                // console.log(res)
                if (res.status === 204 || res.status === 201 || res.status === 200)
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

    return PUT(`contacts/${id}`, body)
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
export const getAllStatus2 = () => {
    return AXIOS('get', `/team/settings/status_2`)
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

    if (filters?.sort_column)
        data.sort_column = filters.sort_column
    if (filters?.sort_dir)
        data.sort_dir = filters.sort_dir

    // data = {
    //     filter: {
    //         name: 'Name',
    //         is_shared: true,
    //         criteria: { ...getFilterContactsCriteria(filters) }
    //     }
    // }

    //console.log(data)

    return AXIOS('post', 'contacts/filter', data)
}

export const getTeamMember = (id) => {
    return AXIOS('get', `team/members/${id}`)
}

export const deleteTeamMember = (id) => {
    console.log("deleteTeamMember")
    return AXIOS('delete', `team/members/${id}`)
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

export const createRank = (data) => {
    let body = {
        rank: { ...data }
    }
    return POST('team/settings/ranks', body)
}

export const updateRank = (id, data) => {
    let body = {
        rank: { ...data }
    }

    return PUT(`team/settings/ranks/${id}`, body)
}

export const deleteRank = (id) => {
    return DELETE(`team/settings/ranks/${id}`)
}

export const getGradYears = () => {
    return AXIOS('get', `team/settings/grad_years`)
}

export const getBoards = () => {
    return AXIOS('get', `filters`)
}

export const getPositions = () => {
    return AXIOS('get', `team/settings/positions`)
}

export const createPosition = (data) => {
    let body = {
        position: { ...data }
    }
    return POST('team/settings/positions', body)
}

export const updatePosition = (id, data) => {
    let body = {
        position: { ...data }
    }

    return PUT(`team/settings/positions/${id}`, body)
}

export const deletePosition = (id) => {
    return DELETE(`team/settings/positions/${id}`)
}

export const getStatuses = () => {
    return AXIOS('get', `team/settings/statuses`)
}

export const createStatus = (data) => {
    let body = {
        status: { ...data }
    }
    return POST('team/settings/statuses', body)
}

export const updateStatus = (id, data) => {
    let body = {
        status: { ...data }
    }

    return PUT(`team/settings/statuses/${id}`, body)
}

export const deleteStatus = (id) => {
    return DELETE(`team/settings/statuses/${id}`)
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

export const updateBoard = (id, data) => {
    const body = {
        filter: {
            ...data,
            criteria: { ...getFilterContactsCriteria(data.criteria) }
        }
    }
    console.log(body)
    return AXIOS('put', `filters/${id}`, body)
}

export const deleteBoard = (id) => {
    console.log("delete board", id)
    return AXIOS('delete', `filters/${id}`)
}

export const getBoardContacts = (id, page, perPage) => {
    return AXIOS('get', `filters/${id}/contacts?page=${page}&per_page=${perPage}`)
}

export const getUser = () => {
    return AXIOS('get', 'me')
}

export const updateUser = (data, idUser) => {
    const body = {
        user: data
    }
    return PUT(`users/${idUser}`, body)
}

export const updateTeamMember = (data, id) => {
    const body = {
        user: data
    }
    return PUT(`team/members/${id}`, body)
}

export const upadateSelectedColumns = (userId, body) => {
    return AXIOS('put', `users/${userId}/selected_columns`, body)
}

export const getMessages = (page = 1, perPage = 10, filters) => {
    let data = {
        criteria: {
            ...getFilterMessagesCriteria(filters),
            include_team: filters?.includeTeam ? 'true' : 'false'
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

    console.log(data)

    return GET(`messages?page=${page}&per_page=${perPage}`, data, filters.cancelToken)
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

export const createPlaceholder = (name) => {
    const body = {
        media_placeholder: {
            name
        }
    }

    return POST('media/placeholders', body)
}

export const getPlaceholder = (id) => {
    return AXIOS('get', `media/placeholders/${id}`)
}

export const getPlaceholderMedia = (id, page, perPage) => {
    return AXIOS('get', `placeholders/${id}/media?page=${page}&per_page=${perPage}`)
}

export const getPlaceholders = (page, perPage, filters) => {
    let data = {
        criteria: { ...getFilterPlaceholdersCriteria(filters) }
    }

    if (!objectNotNull(data.criteria))
        delete data.criteria

    //console.log(data)

    return GET(`media/placeholders?page=${page}&per_page=${perPage}`, data)
}

export const uploadMedia = (media) => {
    return new Promise((resolve, reject) => {
        let myHeaders = new Headers();
        myHeaders.append("Accept", "application/json; version=1");
        myHeaders.append("X-Auth-Token", JSON.parse(localStorage.getItem("user")).token);
        myHeaders.append("Authorization", "RecruitSuiteAuthKey key=7b64dc29-ee30-4bb4-90b4-af2e877b6452")

        console.log("upload file name = " + media.file.name + "*")

        let formdata = new FormData();
        formdata.append("files[]", media.file, media.file.name);
        formdata.append("name", media.file.name);

        if (media.contact)
            formdata.append("team_contact_id", media.contact)
        if (media.placeholder)
            formdata.append("media_placeholder_id", media.placeholder);
        if (media.owner)
            formdata.append("owner", media.owner);

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch(URL + "media/upload", requestOptions)
            .then(response => response.json())
            .then(result => resolve(result))
            .catch(error => reject(error))
    })
}

export const addTagToMedia = (mediaId, tag) => {
    console.log(tag)
    const body = {
        media: { tag }
    }
    return POST(`media/${mediaId}/add_tag`, body)
}

export const getMedia = (id) => {
    return AXIOS('get', `media/${id}`)
}

export const getMedias = (page, perPage, filters) => {
    const { cancelToken} = filters || {}
    return AXIOS('get', `media?page=${page}&per_page=${perPage}`, {}, cancelToken)
}

export const filterMedias = (page, perPage, filters) => {
    console.log(filters)
    const data = {
        page: page,
        per_page: perPage,
        ...getFilterMediasCriteria(filters),
    }

    console.log(data)

    return AXIOS('post', 'media/search', data, filters?.cancelToken)
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

export const createSnippets = (data) => {
    let body = {
        snippet: { ...data }
    }
    return POST('team/settings/snippets', body)
}

export const updateSnippets = (id, data) => {
    let body = {
        snippet: { ...data }
    }

    return PUT(`team/settings/snippets/${id}`, body)
}

export const deleteSnippets = (id) => {
    return DELETE(`team/settings/snippets/${id}`)
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

export const cancelMessage = (messageId) => {

    return PUT(`messages/${messageId}/cancel`)

}

export const removeRecipient = (messageId, recipientId) => {
    return DELETE(`messages/${messageId}/remove_recipient/${recipientId}`)
}

export const removeRecipients = (messageId, recipientsId) => {
    return new Promise((resolve, reject) => {
        if (!Array.isArray(recipientsId))
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

                    if (count === 0) {
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

export const sendMessage = (message) => {
    let payload = {
        status: 'Pending',
        user_id: message.sender.id,
    }

    if (message.send_as_coach)
        payload['send_as_coach'] = message.send_as_coach

    // console.log(payload)

    return updateMessage(message.id, payload)
}

export const deleteMessage = (messageId) => {
    return DELETE(`messages/${messageId}`)
}

export const archiveMessage = (messageId) => {
    return DELETE(`messages/${messageId}?message[status]=archived`)

    //return DELETE(`messages/${messageId}`, { message: { status: 'archived'} })
}

export const addTagMessage = (tagName, messageId) => {
    let body = {
        message: {
            tag: tagName
        }
    }
    return POST(`messages/${messageId}/add_tag`, body)
}

export const addTagsToMessage = (tagIds, messageId) => {
    let body = {
        message: {
            tag_ids: tagIds
        }
    }

    return POST(`messages/${messageId}/add_tags`, body)
}

export const addTagsToMessagesWithNewTags = (tagIds, messageId) => {
    const [newTags, existingTagIds] = separeteNewTagsNameFromExistingTagsIds(tagIds)
    let promises = []

    if (newTags.length > 0) {
        newTags.forEach(tagName => {
            promises.push(addTagMessage(tagName, messageId))
        })
    }
    if (existingTagIds.length > 0) {
        promises.push(addTagsToMessage(existingTagIds, messageId))
    }
    return Promise.all(promises)
}

export const addTagsToContact = (tagIds, contactId) => {
    let body = {
        contact: {
            tag_ids: tagIds
        }
    }

    return POST(`contacts/${contactId}/add_tags`, body)
}

export const untagContact = (tagIds, contactId) => {
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
            untagContact(tagIds, contactId)
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

export const addTagToContact = (tagName, contactId) => {
    let body = {
        contact: {
            tag: tagName
        }
    }
    return POST(`contacts/${contactId}/add_tag`, body)
}

export const addTagsToContactsWithNewTags = async (tags, contactIds) => {
    return new Promise((resolve, reject) => {
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

        let promises = []
        const [newTags, existingTags] = separeteNewTagsNameFromExistingTagsIds(tags)

        if (newTags.length > 0) {
            //add every new tag to every contact
            const contactsTags = contactIds.reduce((acc, contactId) => {
                acc[contactId] = newTags
                return acc
            }, {})
            const newTagsPromises = Object.keys(contactsTags).map(contactId => contactsTags[contactId].map(tagName =>
                [contactId, addTagToContact(tagName, contactId)])).flat()
            promises = [...promises, ...newTagsPromises]
        }


        if (existingTags.length > 0) {
            const existingPromises = contactIds.map(contactId => [contactId, addTagsToContact(existingTags, contactId)])
            promises = [...promises, ...existingPromises]
        }

        Promise.allSettled(promises.map(([contactId, promise]) => promise)).then(results => {
            const resultStatus = results.reduce((acc, result, index) => {
                const contactId = promises[index][0]
                acc[contactId] = acc[contactId] || []
                acc[contactId].push(result)
                return acc
            }, {})

            Object.keys(resultStatus).forEach(contactId => {
                if (resultStatus[contactId].some(result => result.status === 'rejected')) {
                    response.error.count++
                    response.error.id.push(contactId)
                } else {
                    response.success.count++
                    response.success.id.push(contactId)
                }
            })
            resolve(response)
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
export const archiveMedias = async (mediasIds) => {
    let response = {
        success: {
            count: 0,
            id: []
        },
        error: {
            count: 0,
            id: [],
            status: [],
        }
    }
    return new Promise((resolve, reject) => {
        if (!mediasIds instanceof Array)
            return reject(new Error("mediaIds must be an array"))
        Promise.allSettled(mediasIds.map(mediaId => archiveMedia(mediaId))).
            then(results => {
                results.forEach((result, index) => {
                    if (result.status === 'fulfilled') {
                        response.success.count++
                        response.success.id.push(mediasIds[index])
                    }
                    else {
                        response.error.count++
                        response.error.id.push(mediasIds[index])
                        response.error.status.push(result.reason.response.status)
                    }
                })
            }).finally(() => {
                resolve(response)
            })
    })
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
 * @returns {promise} promise with an object with the following keys: success.count, success.ids, error.count, error.ids.
 * erros and succes are count by medias, not by the tags. if all tags were added to a media then success.count++
 */
export const addTagsToMedias = async (tags, mediasIds) => {
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
    const [newTags, existingTags] = separeteNewTagsNameFromExistingTagsIds(tags)
    let promises = []

    return new Promise((resolve, reject) => {
        if (!mediasIds instanceof Array && !tags instanceof Array)
            return reject(new Error("Both mediaIds and Tags must be an array"))

        if (newTags.length > 0) {
            //add every new tag to every contact
            const mediasTags = mediasIds.reduce((acc, mediaId) => {
                acc[mediaId] = newTags
                return acc
            }, {})
            const newTagsPromises = Object.keys(mediasTags).map(mediaId => mediasTags[mediaId].map(tagName =>
                [mediaId, addTagToMedia(mediaId, tagName)])).flat()
            promises = [...promises, ...newTagsPromises]
        }

        if (existingTags.length > 0) {
            const existingPromises = mediasIds.map(mediaId => [mediaId, addTagsToMedia(existingTags, mediaId)])
            promises = [...promises, ...existingPromises]
        }

        Promise.allSettled(promises.map(([, promise]) => promise)).then(results => {
            const resultStatus = results.reduce((acc, result, index) => {
                const mediaId = promises[index][0]
                acc[mediaId] = acc[mediaId] || []
                acc[mediaId].push(result)
                return acc
            }, {})

            Object.keys(resultStatus).forEach(mediaId => {
                if (resultStatus[mediaId].some(result => result.status === 'rejected')) {
                    response.error.count++
                    response.error.id.push(mediaId)
                } else {
                    response.success.count++
                    response.success.id.push(mediaId)
                }
            })
            resolve(response)
        })
    })
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

export const deleteTagsFromMedias = (tagsId, mediasIds) => {
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
    return new Promise((resolve, reject) => {
        if (!mediasIds instanceof Array && !tagsId instanceof Array)
            return reject(new Error("Both mediasIds and tagsId must be an array"))

        Promise.allSettled(mediasIds.map(mediaId => deleteTagsFromMedia(tagsId, mediaId))).
            then(results => {
                results.forEach((result, index) => {
                    if (result.status === 'fulfilled') {
                        response.success.count++
                        response.success.id.push(mediasIds[index])
                    }
                    else {
                        response.error.count++
                        response.error.id.push(mediasIds[index])
                    }
                })
            }).finally(() => {
                resolve(response)
            })
    })
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

export const deletePlaceholder = (placeholderId) => {
    return DELETE(`media/placeholders/${placeholderId}`)
}

export const createContact = (data) => {
    const body = {
        contact: { ...data }
    }
    return POST(`contacts`, body)
}

export const createPerson = (contactId, data) => {
    const body = {
        person: { ...data }
    }
    return POST(`contacts/${contactId}/people`, body)
}

export const updatePerson = (contactId, personId, data) => {
    const body = {
        person: { ...data }
    }
    return PUT(`contacts/${contactId}/people/${personId}`, body)
}

export const createOpponent = (contactId, data) => {
    const body = {
        opponents: { ...data }
    }
    return POST(`contacts/${contactId}/opponents`, body)
}

export const loginWithTwitter = ({ token, secret, email, handle, id }) => {
    const body = {
        "oauth": {
            "provider": "twitter",
            "id": id,
            "handle": handle,
            "email": email,
            "token": token,
            "secret": secret,
        }
    }
    return new Promise((resolve, reject) => {


        const HEADERS = {
            Accept: "application/json; version=1",
            "Content-Type": "application/json",
            Authorization: "RecruitSuiteAuthKey key=7b64dc29-ee30-4bb4-90b4-af2e877b6452",
        }

        const config = {
            headers: HEADERS
        }

        axios.post(URL + 'oauth/login', body, config)
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
}

export const linkWithTwitter = ({ token, secret, email, handle, id }) => {
    const body = {
        "oauth": {
            "provider": "twitter",
            "id": id,
            "handle": handle,
            "email": email,
            "token": token,
            "secret": secret,
            "primary": true // Can pass true to set/update the primary social account 
        }
    }

    return POST('oauth/link', body)
}

export const unLinkTwitter = (userId) => {
    return DELETE(`users/${userId}/unlink_twitter`)
}

export const followOnTwitter = (data) => {
    const body = {
        twitter_follow: data
    }

    return new Promise((resolve, reject) => {
        AXIOS("post", "twitter_follow", body)
            .then(([res, pagination]) => {
                resolve(res)
            })
            .catch(err => reject(err))
    })
}

export const getStats = (startDate, endDate) => {
    if (startDate && endDate)
        return GET(`stats?start_date=${startDate}&end_date=${endDate}`)
    else
        return GET(`stats`)
}

export const getTasksQueue = (date) => {
    return GET(`task_queues${date ? `?date=${date}` : ''}`)
}
