import axios from "axios";
import moment from "moment";

import curlirize from 'axios-curlirize';
// curlirize(axios);

//const URL = "https://prod.recruitsuite.co/api/";
const URL = "https://api.recruitsuite.co/api/";

const GET = (data) => {
    return axios({
        method: "get",
        url: URL + "users",
        headers: {
            Accept: "application/json; version=1",
            "Content-Type": "application/json",
            Authorization:
                "RecruitSuiteAuthKey key=7b64dc29-ee30-4bb4-90b4-af2e877b6452",
            Cookie:
                "ahoy_visitor=9ed0658b-aeb7-4590-b919-6b9e2ac080fe; ahoy_visit=be028ec4-d074-4dde-8218-f166f678ee87; _memcache-recruitsuite_session=d8ee35c9e0cd796c691901ada77a8bf6",
        },
        data: data,
    });
}

export const registerUser = (email, password) => {
    var data = JSON.stringify({
        user: {
            email: email,
            password: password,
            password_confirmation: password,
            name: email.substring(0, 4),
            phone: "",
        },
    });

    return GET(data)

    // return axios({
    //     method: "post",
    //     url: URL + "users",
    //     headers: {
    //         Accept: "application/json; version=1",
    //         "Content-Type": "application/json",
    //         Authorization:
    //             "RecruitSuiteAuthKey key=7b64dc29-ee30-4bb4-90b4-af2e877b6452",
    //         Cookie:
    //             "ahoy_visitor=9ed0658b-aeb7-4590-b919-6b9e2ac080fe; ahoy_visit=be028ec4-d074-4dde-8218-f166f678ee87; _memcache-recruitsuite_session=d8ee35c9e0cd796c691901ada77a8bf6",
    //     },
    //     data: data,
    // });
};

export const loginUser = (email, password) => {
    var data = JSON.stringify({
        email: email,
        password: password,
    });

    return axios({
        method: "post",
        url: URL + "login",
        headers: {
            Accept: "application/json; version=1",
            "Content-Type": "application/json",
            Authorization:
                "RecruitSuiteAuthKey key=7b64dc29-ee30-4bb4-90b4-af2e877b6452",
            Cookie:
                "ahoy_visitor=9ed0658b-aeb7-4590-b919-6b9e2ac080fe; ahoy_visit=be028ec4-d074-4dde-8218-f166f678ee87; _memcache-recruitsuite_session=d8ee35c9e0cd796c691901ada77a8bf6",
        },
        data: data,
    });
};

export const createContacts = (body) => {
    // var data = JSON.stringify(body);

    return axios({
        method: "post",
        url: URL + "contacts",
        headers: {
            Authorization:
                "RecruitSuiteAuthKey key=7b64dc29-ee30-4bb4-90b4-af2e877b6452",
            Accept: "application/json; version=1",
            "X-Auth-Token": JSON.parse(localStorage.getItem("user")).token,

            Cookie:
                "ahoy_visitor=9ed0658b-aeb7-4590-b919-6b9e2ac080fe; ahoy_visit=be028ec4-d074-4dde-8218-f166f678ee87; _memcache-recruitsuite_session=d8ee35c9e0cd796c691901ada77a8bf6",
        },
        data: body,
    });
};

export const filterContacts = (body) => {
    // var data = JSON.stringify(body);

    return axios({
        method: "post",
        url: URL + "contacts/filter",
        headers: {
            Authorization:
                "RecruitSuiteAuthKey key=7b64dc29-ee30-4bb4-90b4-af2e877b6452",
            Accept: "application/json; version=1",
            "X-Auth-Token": JSON.parse(localStorage.getItem("user")).token,

            Cookie:
                "ahoy_visitor=9ed0658b-aeb7-4590-b919-6b9e2ac080fe; ahoy_visit=be028ec4-d074-4dde-8218-f166f678ee87; _memcache-recruitsuite_session=d8ee35c9e0cd796c691901ada77a8bf6",
        },
        data: body,
    });
};

export const getUserAccountInformation = () => {
    console.log(JSON.parse(localStorage.getItem("user")));

    return axios({
        method: "get",
        url: URL + "login",
        headers: {
            Authorization:
                "RecruitSuiteAuthKey key=7b64dc29-ee30-4bb4-90b4-af2e877b6452",
            Accept: "application/json; version=1",
            "X-Auth-Token":
                "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyMjc2fQ.y4IqaYFOmbhXxC2RL4rvqVVY3ePvmlcpUA2tzRXkatI",
            Cookie:
                "ahoy_visitor=9ed0658b-aeb7-4590-b919-6b9e2ac080fe; ahoy_visit=be028ec4-d074-4dde-8218-f166f678ee87; _memcache-recruitsuite_session=d8ee35c9e0cd796c691901ada77a8bf6",
        },
    });
};

export const getTaskQueue = () => {
    console.log(JSON.parse(localStorage.getItem("user")).token);

    return axios({
        method: "get",
        url: URL + "login",
        headers: {
            Authorization:
                "RecruitSuiteAuthKey key=7b64dc29-ee30-4bb4-90b4-af2e877b6452",
            Accept: "application/json; version=1",
            "X-Auth-Token": JSON.parse(localStorage.getItem("user")).token,
            Cookie:
                "ahoy_visitor=9ed0658b-aeb7-4590-b919-6b9e2ac080fe; ahoy_visit=be028ec4-d074-4dde-8218-f166f678ee87; _memcache-recruitsuite_session=d8ee35c9e0cd796c691901ada77a8bf6",
        },
    });
};
export const getPlatform = () => {
    console.log(JSON.parse(localStorage.getItem("user")).token);

    return axios({
        method: "get",
        url: URL + "team/platforms",
        headers: {
            Authorization:
                "RecruitSuiteAuthKey key=7b64dc29-ee30-4bb4-90b4-af2e877b6452",
            Accept: "application/json; version=1",
            "X-Auth-Token": JSON.parse(localStorage.getItem("user")).token,
            Cookie:
                "ahoy_visitor=9ed0658b-aeb7-4590-b919-6b9e2ac080fe; ahoy_visit=be028ec4-d074-4dde-8218-f166f678ee87; _memcache-recruitsuite_session=d8ee35c9e0cd796c691901ada77a8bf6",
        },
    });
};
export const getTaskQueueForDay = (date) => {
    var endpoint = "";
    // console.log("This is date", date === null);
    if (date === null) {
        endpoint = "task_queues";
    } else {
        endpoint = `task_queues?date=${date}`;
    }
    return axios({
        method: "get",
        url: URL + endpoint,
        headers: {
            Accept: "application/json; version=1",
            "Content-Type": "application/json",
            Authorization:
                "RecruitSuiteAuthKey key=7b64dc29-ee30-4bb4-90b4-af2e877b6452",
            "X-Auth-Token": JSON.parse(localStorage.getItem("user")).token,
            Cookie:
                "ahoy_visitor=9ed0658b-aeb7-4590-b919-6b9e2ac080fe; ahoy_visit=be028ec4-d074-4dde-8218-f166f678ee87; _memcache-recruitsuite_session=d8ee35c9e0cd796c691901ada77a8bf6",
        },
    });
};

export const getMonthlyStats = () => {
    var start = new moment().startOf("month").format("YYYY-MM-DD");
    var end = new moment().endOf("month").format("YYYY-MM-DD");
    // console.log("This is start", start);
    // console.log("This is end", end);
    // console.log("This is ", URL + `stats?start_date=${start}&end_date=${end}`);
    return axios({
        method: "get",
        url: URL + `stats?start_date=${start}&end_date=${end}`,
        headers: {
            Accept: "application/json; version=1",
            "Content-Type": "application/json",
            Authorization:
                "RecruitSuiteAuthKey key=7b64dc29-ee30-4bb4-90b4-af2e877b6452",
            "X-Auth-Token": JSON.parse(localStorage.getItem("user")).token,
            Cookie:
                "ahoy_visitor=9ed0658b-aeb7-4590-b919-6b9e2ac080fe; ahoy_visit=be028ec4-d074-4dde-8218-f166f678ee87; _memcache-recruitsuite_session=d8ee35c9e0cd796c691901ada77a8bf6",
        },
    });
};

export const getThisQuarterStats = () => {
    var start = new moment().startOf("quarter").format("YYYY-MM-DD");
    var end = new moment().endOf("quarter").format("YYYY-MM-DD");
    // console.log("This is start", start);
    // console.log("This is end", end);
    // console.log("This is ", URL + `stats?start_date=${start}&end_date=${end}`);
    return axios({
        method: "get",
        url: URL + `stats?start_date=${start}&end_date=${end}`,
        headers: {
            Accept: "application/json; version=1",
            "Content-Type": "application/json",
            Authorization:
                "RecruitSuiteAuthKey key=7b64dc29-ee30-4bb4-90b4-af2e877b6452",
            "X-Auth-Token": JSON.parse(localStorage.getItem("user")).token,
            Cookie:
                "ahoy_visitor=9ed0658b-aeb7-4590-b919-6b9e2ac080fe; ahoy_visit=be028ec4-d074-4dde-8218-f166f678ee87; _memcache-recruitsuite_session=d8ee35c9e0cd796c691901ada77a8bf6",
        },
    });
};

export const getLastQuarterStats = () => {
    var quarterAdjustment = (moment().month() % 3) + 1;
    var lastQuarterEndDate = moment()
        .subtract({ months: quarterAdjustment })
        .endOf("month");
    var lastQuarterStartDate = lastQuarterEndDate
        .clone()
        .subtract({ months: 3 })
        .startOf("month");

    var start = lastQuarterEndDate
        .clone()
        .subtract({ months: 3 })
        .startOf("month")
        .format("YYYY-MM-DD");
    var end = moment()
        .subtract({ months: quarterAdjustment })
        .endOf("month")
        .format("YYYY-MM-DD");
    // console.log("This is start", start);
    // console.log("This is end", end);
    // console.log("This is ", URL + `stats?start_date=${start}&end_date=${end}`);
    return axios({
        method: "get",
        url: URL + `stats?start_date=${start}&end_date=${end}`,
        headers: {
            Accept: "application/json; version=1",
            "Content-Type": "application/json",
            Authorization:
                "RecruitSuiteAuthKey key=7b64dc29-ee30-4bb4-90b4-af2e877b6452",
            "X-Auth-Token": JSON.parse(localStorage.getItem("user")).token,
            Cookie:
                "ahoy_visitor=9ed0658b-aeb7-4590-b919-6b9e2ac080fe; ahoy_visit=be028ec4-d074-4dde-8218-f166f678ee87; _memcache-recruitsuite_session=d8ee35c9e0cd796c691901ada77a8bf6",
        },
    });
};

export const getThisYearStats = () => {
    var start = new moment().startOf("year").format("YYYY-MM-DD");
    var end = new moment().endOf("year").format("YYYY-MM-DD");
    // console.log("This is start", start);
    // console.log("This is end", end);
    // console.log("This is ", URL + `stats?start_date=${start}&end_date=${end}`);
    return axios({
        method: "get",
        url: URL + `stats?start_date=${start}&end_date=${end}`,
        headers: {
            Accept: "application/json; version=1",
            "Content-Type": "application/json",
            Authorization:
                "RecruitSuiteAuthKey key=7b64dc29-ee30-4bb4-90b4-af2e877b6452",
            "X-Auth-Token": JSON.parse(localStorage.getItem("user")).token,
            Cookie:
                "ahoy_visitor=9ed0658b-aeb7-4590-b919-6b9e2ac080fe; ahoy_visit=be028ec4-d074-4dde-8218-f166f678ee87; _memcache-recruitsuite_session=d8ee35c9e0cd796c691901ada77a8bf6",
        },
    });
};

export const getLastYearStats = () => {
    var start = new moment()
        .startOf("year")
        .clone()
        .subtract({ years: 1 })
        .startOf("year")
        .format("YYYY-MM-DD");
    var end = new moment()
        .endOf("year")
        .clone()
        .subtract({ years: 1 })
        .endOf("year")
        .format("YYYY-MM-DD");
    console.log("This is start", start);
    console.log("This is end", end);
    console.log("This is ", URL + `stats?start_date=${start}&end_date=${end}`);
    return axios({
        method: "get",
        url: URL + `stats?start_date=${start}&end_date=${end}`,
        headers: {
            Accept: "application/json; version=1",
            "Content-Type": "application/json",
            Authorization:
                "RecruitSuiteAuthKey key=7b64dc29-ee30-4bb4-90b4-af2e877b6452",
            "X-Auth-Token": JSON.parse(localStorage.getItem("user")).token,
            Cookie:
                "ahoy_visitor=9ed0658b-aeb7-4590-b919-6b9e2ac080fe; ahoy_visit=be028ec4-d074-4dde-8218-f166f678ee87; _memcache-recruitsuite_session=d8ee35c9e0cd796c691901ada77a8bf6",
        },
    });
};

export const getLastMonthStats = () => {
    var start = new moment()
        .startOf("month")
        .clone()
        .subtract({ months: 1 })
        .startOf("month")
        .format("YYYY-MM-DD");
    var end = new moment()
        .endOf("month")
        .clone()
        .subtract({ months: 1 })
        .endOf("month")
        .format("YYYY-MM-DD");
    // console.log("This is start of last month", start);
    // console.log("This is end of last month", end);
    // console.log(
    //   "This is  url",
    //   URL + `stats?start_date=${start}&end_date=${end}`
    // );
    return axios({
        method: "get",
        url: URL + `stats?start_date=${start}&end_date=${end}`,
        headers: {
            Accept: "application/json; version=1",
            "Content-Type": "application/json",
            Authorization:
                "RecruitSuiteAuthKey key=7b64dc29-ee30-4bb4-90b4-af2e877b6452",
            "X-Auth-Token": JSON.parse(localStorage.getItem("user")).token,
            Cookie:
                "ahoy_visitor=9ed0658b-aeb7-4590-b919-6b9e2ac080fe; ahoy_visit=be028ec4-d074-4dde-8218-f166f678ee87; _memcache-recruitsuite_session=d8ee35c9e0cd796c691901ada77a8bf6",
        },
    });
};

export const getLast30Stats = () => {
    var start = new moment().clone().subtract({ days: 30 }).format("YYYY-MM-DD");
    var end = new moment().format("YYYY-MM-DD");
    // console.log("This is start", start);
    // console.log("This is end", end);
    // console.log("This is ", URL + `stats?start_date=${start}&end_date=${end}`);
    return axios({
        method: "get",
        url: URL + `stats?start_date=${start}&end_date=${end}`,
        headers: {
            Accept: "application/json; version=1",
            "Content-Type": "application/json",
            Authorization:
                "RecruitSuiteAuthKey key=7b64dc29-ee30-4bb4-90b4-af2e877b6452",
            "X-Auth-Token": JSON.parse(localStorage.getItem("user")).token,
            Cookie:
                "ahoy_visitor=9ed0658b-aeb7-4590-b919-6b9e2ac080fe; ahoy_visit=be028ec4-d074-4dde-8218-f166f678ee87; _memcache-recruitsuite_session=d8ee35c9e0cd796c691901ada77a8bf6",
        },
    });
};

//*************************************************/

const getHeaders = () => {
    let headers = new Headers();
    headers.append("Accept", "application/json; version=1");
    headers.append("X-Auth-Token", JSON.parse(localStorage.getItem("user")).token);
    headers.append("Authorization", "RecruitSuiteAuthKey key=7b64dc29-ee30-4bb4-90b4-af2e877b6452")

    return headers
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
    return new Promise((resolve, reject) => {
        let headers = getHeaders()

        let formdata = new FormData();
        formdata.append("media[tag]", tag);

        let requestOptions = {
            method: 'POST',
            headers: headers,
            body: formdata,
            redirect: 'follow'
        };

        fetch(URL + "media/" + mediaId + "/add_tag", requestOptions)
            //.then(response => response.json())
            .then(result => resolve(result))
            .catch(error => reject(error));
    })
}

export const getAllContacts2 = (page) => {
    // try to search for Aaron Becker
    // Andy Rondeau
    // @a_savaiinaea
    // a_savaiinaea
    // +1 (555) 666-7777
    return new Promise((resolve, reject) => {
        axios({
            method: "get",
            url:
                URL + `contacts?page=1&per_page=50&sort_column=first_name`,
            headers: {
                Accept: "application/json; version=1",
                "Content-Type": "application/json",
                Authorization:
                    "RecruitSuiteAuthKey key=7b64dc29-ee30-4bb4-90b4-af2e877b6452",
                "X-Auth-Token": JSON.parse(localStorage.getItem("user")).token,
                Cookie:
                    "ahoy_visitor=9ed0658b-aeb7-4590-b919-6b9e2ac080fe; ahoy_visit=be028ec4-d074-4dde-8218-f166f678ee87; _memcache-recruitsuite_session=d8ee35c9e0cd796c691901ada77a8bf6",
            },
        }).then(
            (res) => {
                console.log(res)
                resolve(res)
            },
            (error) => {
                reject(error)
            }
        )
    })

};

export const addTag = () => {
    // return axios({
    //     method: "post",
    //     url: URL + "users",
    //     headers: {
    //         Accept: "application/json; version=1",
    //         "Content-Type": "application/json",
    //         Authorization:
    //             "RecruitSuiteAuthKey key=7b64dc29-ee30-4bb4-90b4-af2e877b6452",
    //         Cookie:
    //             "ahoy_visitor=9ed0658b-aeb7-4590-b919-6b9e2ac080fe; ahoy_visit=be028ec4-d074-4dde-8218-f166f678ee87; _memcache-recruitsuite_session=d8ee35c9e0cd796c691901ada77a8bf6",
    //     },
    //     data: data,
    // });
    return new Promise((resolve, reject) => {
        let data = {
            name: "Test Tag"
        }

        axios({
            method: "post",
            url:
                URL + "tags/add_tag",
            headers: {
                Accept: "application/json; version=1",
                "Content-Type": "application/json",
                Authorization:
                    "RecruitSuiteAuthKey key=7b64dc29-ee30-4bb4-90b4-af2e877b6452",
                "X-Auth-Token": JSON.parse(localStorage.getItem("user")).token,
                Cookie:
                    "ahoy_visitor=9ed0658b-aeb7-4590-b919-6b9e2ac080fe; ahoy_visit=be028ec4-d074-4dde-8218-f166f678ee87; _memcache-recruitsuite_session=d8ee35c9e0cd796c691901ada77a8bf6",
            },
            data
        }).then(
            (res) => {
                console.log(res)
                resolve(res)
            },
            (error) => {
                reject(error)
            }
        )
    })
}

//*************************************************/

const AXIOS = (method, url, body) => {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify(body);

        console.log(data)

        axios({
            method: method,
            url: URL + url,
            headers: {
                Accept: "application/json; version=1",
                "Content-Type": "application/json",
                Authorization: "RecruitSuiteAuthKey key=7b64dc29-ee30-4bb4-90b4-af2e877b6452",
                "X-Auth-Token": JSON.parse(localStorage.getItem("user")).token,
                // Cookie:
                //     "_memcache-recruitsuite_session=d8ee35c9e0cd796c691901ada77a8bf6",
            },
            data
        })
            .then(res => {
                console.log(res)

                if (res.statusText === "OK") {
                    resolve(res.data)
                } else {
                    reject(res)
                }
            })
            .catch(error => {
                console.log(error)
                // console.log(error.errors)
                reject(error)
            })
    })
}

export const getContact = (id) => {
    return AXIOS('get', `contacts/${id}`)
}

export const updateContact = (id, update) => {
    const body = { contact: update }
    console.log(body)
    return AXIOS('put', `contacts/${id}`, body)
}

export const getRanksNew = () => {
    return AXIOS('get', `team/ranks`)
};

export const getAssociatedContactByFileName = (fileName) => {
    return new Promise((resolve, reject) => {
        const nameParts = fileName.split(".")

        getSearchedContacts(nameParts[0])
            .then((res) => {
                if (res.statusText === "OK") {
                    if (res.data.length == 1)
                        resolve(res.data[0])
                    else if (res.data.length > 1) {
                        let filteredData = []
                        reject("found multiple contacts")

                        res.data.forEach(contact => {
                            if (contact.first_name + " " + contact.last_name === nameParts[0])
                                filteredData.push(contact)
                        })

                        if (filteredData.length == 1)
                            resolve(filteredData[0])
                        else
                            reject("found multiple contacts")
                    } else
                        reject("could not find contacts")
                }
            }).catch((error) => {
                reject(error)
            })
    })
}

export const getAllContacts = (page) => {
    var page = page || 1;
    var pageCount = page || 1;
    console.log("THis is page count", pageCount, "this is page", page);
    var perPage = 50;
    console.log("This is perpage", perPage);
    return axios({
        method: "get",
        url:
            URL + `contacts?page=${page}&per_page=${perPage}&sort_column=first_name`,
        headers: {
            Accept: "application/json; version=1",
            "Content-Type": "application/json",
            Authorization:
                "RecruitSuiteAuthKey key=7b64dc29-ee30-4bb4-90b4-af2e877b6452",
            "X-Auth-Token": JSON.parse(localStorage.getItem("user")).token,
            Cookie:
                "ahoy_visitor=9ed0658b-aeb7-4590-b919-6b9e2ac080fe; ahoy_visit=be028ec4-d074-4dde-8218-f166f678ee87; _memcache-recruitsuite_session=d8ee35c9e0cd796c691901ada77a8bf6",
        },
    });
};


export const getSearchedContacts = (search) => { // search=tagsclients
    return axios({
        method: "get",
        url:
            URL + `contacts?search=${search}&sort_column=first_name`,
        headers: {
            Accept: "application/json; version=1",
            "Content-Type": "application/json",
            Authorization:
                "RecruitSuiteAuthKey key=7b64dc29-ee30-4bb4-90b4-af2e877b6452",
            "X-Auth-Token": JSON.parse(localStorage.getItem("user")).token,
            Cookie:
                "ahoy_visitor=9ed0658b-aeb7-4590-b919-6b9e2ac080fe; ahoy_visit=be028ec4-d074-4dde-8218-f166f678ee87; _memcache-recruitsuite_session=d8ee35c9e0cd796c691901ada77a8bf6",
        },
    });
};
export const getAllContactsWithSearch = (page) => {
    // console.log("This is start", start);
    // console.log("This is end", end);
    // console.log("This is ", URL + `stats?start_date=${start}&end_date=${end}`);

    return axios({
        method: "get",
        url:
            URL + `contacts?&sort_column=first_name`,
        headers: {
            Accept: "application/json; version=1",
            "Content-Type": "application/json",
            Authorization:
                "RecruitSuiteAuthKey key=7b64dc29-ee30-4bb4-90b4-af2e877b6452",
            "X-Auth-Token": JSON.parse(localStorage.getItem("user")).token,
            Cookie:
                "ahoy_visitor=9ed0658b-aeb7-4590-b919-6b9e2ac080fe; ahoy_visit=be028ec4-d074-4dde-8218-f166f678ee87; _memcache-recruitsuite_session=d8ee35c9e0cd796c691901ada77a8bf6",
        },
    });
};

export const getTeamContacts = () => {
    return axios({
        method: "get",
        url: URL + `team/members?only_active=true`,
        headers: {
            Accept: "application/json; version=1",
            "Content-Type": "application/json",
            Authorization:
                "RecruitSuiteAuthKey key=7b64dc29-ee30-4bb4-90b4-af2e877b6452",
            "X-Auth-Token": JSON.parse(localStorage.getItem("user")).token,
            Cookie:
                "ahoy_visitor=9ed0658b-aeb7-4590-b919-6b9e2ac080fe; ahoy_visit=be028ec4-d074-4dde-8218-f166f678ee87; _memcache-recruitsuite_session=d8ee35c9e0cd796c691901ada77a8bf6",
        },
    });
};

export const getSnippets = () => {
    return axios({
        method: "get",
        url: URL + `team/snippets`,
        headers: {
            Accept: "application/json; version=1",
            "Content-Type": "application/json",
            Authorization:
                "RecruitSuiteAuthKey key=7b64dc29-ee30-4bb4-90b4-af2e877b6452",
            "X-Auth-Token": JSON.parse(localStorage.getItem("user")).token,
            Cookie:
                "ahoy_visitor=9ed0658b-aeb7-4590-b919-6b9e2ac080fe; ahoy_visit=be028ec4-d074-4dde-8218-f166f678ee87; _memcache-recruitsuite_session=d8ee35c9e0cd796c691901ada77a8bf6",
        },
    });
};


export const getAllColumns = () => {
    return axios({
        method: "get",
        url: URL + `team/available_columns`,
        headers: {
            Accept: "application/json; version=1",
            "Content-Type": "application/json",
            Authorization:
                "RecruitSuiteAuthKey key=7b64dc29-ee30-4bb4-90b4-af2e877b6452",
            "X-Auth-Token": JSON.parse(localStorage.getItem("user")).token,
            Cookie:
                "ahoy_visitor=9ed0658b-aeb7-4590-b919-6b9e2ac080fe; ahoy_visit=be028ec4-d074-4dde-8218-f166f678ee87; _memcache-recruitsuite_session=d8ee35c9e0cd796c691901ada77a8bf6",
        },
    });
};
// https://api.recruitsuite.co/api/tags/with_contacts
export const getTagsWithContacts = () => {
    return axios({
        method: "get",
        url: URL + `tags/with_contacts`,
        headers: {
            Accept: "application/json; version=1",
            "Content-Type": "application/json",
            Authorization:
                "RecruitSuiteAuthKey key=7b64dc29-ee30-4bb4-90b4-af2e877b6452",
            "X-Auth-Token": JSON.parse(localStorage.getItem("user")).token,
            Cookie:
                "ahoy_visitor=9ed0658b-aeb7-4590-b919-6b9e2ac080fe; ahoy_visit=be028ec4-d074-4dde-8218-f166f678ee87; _memcache-recruitsuite_session=d8ee35c9e0cd796c691901ada77a8bf6",
        },
    });
};
export const getTagsWithMessages = () => {
    return axios({
        method: "get",
        url: URL + `tags/with_messages`,
        headers: {
            Accept: "application/json; version=1",
            "Content-Type": "application/json",
            Authorization:
                "RecruitSuiteAuthKey key=7b64dc29-ee30-4bb4-90b4-af2e877b6452",
            "X-Auth-Token": JSON.parse(localStorage.getItem("user")).token,
            Cookie:
                "ahoy_visitor=9ed0658b-aeb7-4590-b919-6b9e2ac080fe; ahoy_visit=be028ec4-d074-4dde-8218-f166f678ee87; _memcache-recruitsuite_session=d8ee35c9e0cd796c691901ada77a8bf6",
        },
    });
};



export const getTags = () => {
    return axios({
        method: "get",
        url: URL + `tags`,
        headers: {
            Accept: "application/json; version=1",
            "Content-Type": "application/json",
            Authorization:
                "RecruitSuiteAuthKey key=7b64dc29-ee30-4bb4-90b4-af2e877b6452",
            "X-Auth-Token": JSON.parse(localStorage.getItem("user")).token,
            Cookie:
                "ahoy_visitor=9ed0658b-aeb7-4590-b919-6b9e2ac080fe; ahoy_visit=be028ec4-d074-4dde-8218-f166f678ee87; _memcache-recruitsuite_session=d8ee35c9e0cd796c691901ada77a8bf6",
        },
    });
};

export const getRanks = () => {
    return axios({
        method: "get",
        url: URL + `team/ranks`,
        headers: {
            Accept: "application/json; version=1",
            "Content-Type": "application/json",
            Authorization:
                "RecruitSuiteAuthKey key=7b64dc29-ee30-4bb4-90b4-af2e877b6452",
            "X-Auth-Token": JSON.parse(localStorage.getItem("user")).token,
            Cookie:
                "ahoy_visitor=9ed0658b-aeb7-4590-b919-6b9e2ac080fe; ahoy_visit=be028ec4-d074-4dde-8218-f166f678ee87; _memcache-recruitsuite_session=d8ee35c9e0cd796c691901ada77a8bf6",
        },
    });
};

export const getGradeYears = () => {
    return axios({
        method: "get",
        url: URL + `team/grad_years`,
        headers: {
            Accept: "application/json; version=1",
            "Content-Type": "application/json",
            Authorization:
                "RecruitSuiteAuthKey key=7b64dc29-ee30-4bb4-90b4-af2e877b6452",
            "X-Auth-Token": JSON.parse(localStorage.getItem("user")).token,
            Cookie:
                "ahoy_visitor=9ed0658b-aeb7-4590-b919-6b9e2ac080fe; ahoy_visit=be028ec4-d074-4dde-8218-f166f678ee87; _memcache-recruitsuite_session=d8ee35c9e0cd796c691901ada77a8bf6",
        },
    });
};

export const getStatuses = () => {
    return axios({
        method: "get",
        url: URL + `team/statuses`,
        headers: {
            Accept: "application/json; version=1",
            "Content-Type": "application/json",
            Authorization:
                "RecruitSuiteAuthKey key=7b64dc29-ee30-4bb4-90b4-af2e877b6452",
            "X-Auth-Token": JSON.parse(localStorage.getItem("user")).token,
            Cookie:
                "ahoy_visitor=9ed0658b-aeb7-4590-b919-6b9e2ac080fe; ahoy_visit=be028ec4-d074-4dde-8218-f166f678ee87; _memcache-recruitsuite_session=d8ee35c9e0cd796c691901ada77a8bf6",
        },
    });
};

export const getPositions = () => {
    return axios({
        method: "get",
        url: URL + `team/positions`,
        headers: {
            Accept: "application/json; version=1",
            "Content-Type": "application/json",
            Authorization:
                "RecruitSuiteAuthKey key=7b64dc29-ee30-4bb4-90b4-af2e877b6452",
            "X-Auth-Token": JSON.parse(localStorage.getItem("user")).token,
            Cookie:
                "ahoy_visitor=9ed0658b-aeb7-4590-b919-6b9e2ac080fe; ahoy_visit=be028ec4-d074-4dde-8218-f166f678ee87; _memcache-recruitsuite_session=d8ee35c9e0cd796c691901ada77a8bf6",
        },
    });
};
export const createBoardFilter = (body) => {
    // const data = JSON.stringify(body);
    console.log(body, 'tags body indide api helper file', body)
    return axios({
        method: "post",
        url: URL + `/filters`,
        data: body,
        headers: {
            Accept: "application/json; version=1",
            "Content-Type": "application/json",
            Authorization:
                "RecruitSuiteAuthKey key=7b64dc29-ee30-4bb4-90b4-af2e877b6452",
            "X-Auth-Token": JSON.parse(localStorage.getItem("user")).token,
            Cookie:
                "ahoy_visitor=9ed0658b-aeb7-4590-b919-6b9e2ac080fe; ahoy_visit=be028ec4-d074-4dde-8218-f166f678ee87; _memcache-recruitsuite_session=d8ee35c9e0cd796c691901ada77a8bf6",
        },

    });
};
export const addTagstoContacts = (contactid, body) => {
    // const data = JSON.stringify(body);
    console.log(body, 'tags body indide api helper file', body)
    return axios({
        method: "post",
        url: URL + `contacts/${contactid}/add_tags`,
        data: body,
        headers: {
            Accept: "application/json; version=1",
            "Content-Type": "application/json",
            Authorization:
                "RecruitSuiteAuthKey key=7b64dc29-ee30-4bb4-90b4-af2e877b6452",
            "X-Auth-Token": JSON.parse(localStorage.getItem("user")).token,
            Cookie:
                "ahoy_visitor=9ed0658b-aeb7-4590-b919-6b9e2ac080fe; ahoy_visit=be028ec4-d074-4dde-8218-f166f678ee87; _memcache-recruitsuite_session=d8ee35c9e0cd796c691901ada77a8bf6",
        },

    });
};
export const removeTagsFromContacts = (contactid, body) => {
    // const data = JSON.stringify(body);
    console.log(body, 'tags body indide api helper file', body)
    return axios({
        method: "delete",
        url: URL + `contacts/${contactid}/remove_tags`,
        data: body,
        headers: {
            Accept: "application/json; version=1",
            "Content-Type": "application/json",
            Authorization:
                "RecruitSuiteAuthKey key=7b64dc29-ee30-4bb4-90b4-af2e877b6452",
            "X-Auth-Token": JSON.parse(localStorage.getItem("user")).token,
            Cookie:
                "ahoy_visitor=9ed0658b-aeb7-4590-b919-6b9e2ac080fe; ahoy_visit=be028ec4-d074-4dde-8218-f166f678ee87; _memcache-recruitsuite_session=d8ee35c9e0cd796c691901ada77a8bf6",
        },

    });
};

// /contacts/:id/remove_tags
export const getBoardFilters = () => {
    return axios({
        method: "get",
        url: URL + `filters`,
        headers: {
            Accept: "application/json; version=1",
            "Content-Type": "application/json",
            Authorization:
                "RecruitSuiteAuthKey key=7b64dc29-ee30-4bb4-90b4-af2e877b6452",
            "X-Auth-Token": JSON.parse(localStorage.getItem("user")).token,
            Cookie:
                "ahoy_visitor=9ed0658b-aeb7-4590-b919-6b9e2ac080fe; ahoy_visit=be028ec4-d074-4dde-8218-f166f678ee87; _memcache-recruitsuite_session=d8ee35c9e0cd796c691901ada77a8bf6",
        },
    });
};

export const getBoardFiltersById = (id) => {
    return axios({
        method: "get",
        url: URL + `filters/${id}`,
        headers: {
            Accept: "application/json; version=1",
            "Content-Type": "application/json",
            Authorization:
                "RecruitSuiteAuthKey key=7b64dc29-ee30-4bb4-90b4-af2e877b6452",
            "X-Auth-Token": JSON.parse(localStorage.getItem("user")).token,
            Cookie:
                "ahoy_visitor=9ed0658b-aeb7-4590-b919-6b9e2ac080fe; ahoy_visit=be028ec4-d074-4dde-8218-f166f678ee87; _memcache-recruitsuite_session=d8ee35c9e0cd796c691901ada77a8bf6",
        },
    });
};
export const archiveContactEnd = (id) => {
    return axios({
        method: "delete",
        url: URL + `contacts/${id}`,
        headers: {
            Accept: "application/json; version=1",
            "Content-Type": "application/json",
            Authorization:
                "RecruitSuiteAuthKey key=7b64dc29-ee30-4bb4-90b4-af2e877b6452",
            "X-Auth-Token": JSON.parse(localStorage.getItem("user")).token,
            Cookie:
                "ahoy_visitor=9ed0658b-aeb7-4590-b919-6b9e2ac080fe; ahoy_visit=be028ec4-d074-4dde-8218-f166f678ee87; _memcache-recruitsuite_session=d8ee35c9e0cd796c691901ada77a8bf6",
        },
    });
};


export const getMedia = () => {
    return axios({
        method: "get",
        url: URL + `media?per_page=25&page=1`,
        headers: {
            Accept: "application/json; version=1",
            "Content-Type": "application/json",
            Authorization:
                "RecruitSuiteAuthKey key=7b64dc29-ee30-4bb4-90b4-af2e877b6452",
            "X-Auth-Token": JSON.parse(localStorage.getItem("user")).token,
            Cookie:
                "ahoy_visitor=9ed0658b-aeb7-4590-b919-6b9e2ac080fe; ahoy_visit=be028ec4-d074-4dde-8218-f166f678ee87; _memcache-recruitsuite_session=d8ee35c9e0cd796c691901ada77a8bf6",
        },
    });
};

// should be getPlaceholders?
export const getPlaceholder = () => {
    return axios({
        method: "get",
        url: URL + `media/placeholders`,
        headers: {
            Accept: "application/json; version=1",
            "Content-Type": "application/json",
            Authorization:
                "RecruitSuiteAuthKey key=7b64dc29-ee30-4bb4-90b4-af2e877b6452",
            "X-Auth-Token": JSON.parse(localStorage.getItem("user")).token,
            Cookie:
                "ahoy_visitor=9ed0658b-aeb7-4590-b919-6b9e2ac080fe; ahoy_visit=be028ec4-d074-4dde-8218-f166f678ee87; _memcache-recruitsuite_session=d8ee35c9e0cd796c691901ada77a8bf6",
        },
    });
};

export const getMediaTag = () => {
    console.log('token = ', JSON.parse(localStorage.getItem("user")).token)
    return axios({
        method: "get",
        url: URL + `tags/with_media`,
        headers: {
            Accept: "application/json; version=1",
            "Content-Type": "application/json",
            Authorization: "RecruitSuiteAuthKey key=7b64dc29-ee30-4bb4-90b4-af2e877b6452",
            "X-Auth-Token": JSON.parse(localStorage.getItem("user")).token,
        },
    });
};

export const getMediaUsers = () => {
    return axios({
        method: "get",
        url:
            URL + `team/members?only_active=true&has_twitter=true&has_rs_text=true`,
        headers: {
            Accept: "application/json; version=1",
            "Content-Type": "application/json",
            Authorization:
                "RecruitSuiteAuthKey key=7b64dc29-ee30-4bb4-90b4-af2e877b6452",
            "X-Auth-Token": JSON.parse(localStorage.getItem("user")).token,
            Cookie:
                "ahoy_visitor=9ed0658b-aeb7-4590-b919-6b9e2ac080fe; ahoy_visit=be028ec4-d074-4dde-8218-f166f678ee87; _memcache-recruitsuite_session=d8ee35c9e0cd796c691901ada77a8bf6",
        },
    });
};

export const updateMedia = (body) => {

    const data = JSON.stringify(body);
    console.log("mediaURL", URL + `media/${body.id}`)
    return axios({
        method: "put",
        url: URL + `media/${body.id}`,

        headers: {
            Accept: "application/json; version=1",
            "Content-Type": "application/json",
            Authorization:
                "RecruitSuiteAuthKey key=7b64dc29-ee30-4bb4-90b4-af2e877b6452",
            "X-Auth-Token": JSON.parse(localStorage.getItem("user")).token,
            Cookie:
                "ahoy_visitor=9ed0658b-aeb7-4590-b919-6b9e2ac080fe; ahoy_visit=be028ec4-d074-4dde-8218-f166f678ee87; _memcache-recruitsuite_session=d8ee35c9e0cd796c691901ada77a8bf6",
        },
        data: data,
    });
};
//Create message API
export const createMessage = (body) => {

    const data = JSON.stringify(body);

    return axios({
        method: "post",
        url: URL + "messages",
        headers: {
            Accept: "application/json; version=1",
            "Content-Type": "application/json",
            Authorization:
                "RecruitSuiteAuthKey key=7b64dc29-ee30-4bb4-90b4-af2e877b6452",
            "X-Auth-Token": JSON.parse(localStorage.getItem("user")).token,
            Cookie:
                "ahoy_visitor=9ed0658b-aeb7-4590-b919-6b9e2ac080fe; ahoy_visit=be028ec4-d074-4dde-8218-f166f678ee87; _memcache-recruitsuite_session=d8ee35c9e0cd796c691901ada77a8bf6",
        },
        data: data,
    });
};

export const getContactMessages = (contactId) => {
    return axios({
        method: "get",
        url: URL + `messages?=false`,
        headers: {
            Accept: "application/json; version=1",
            "Content-Type": "application/json",
            Authorization:
                "RecruitSuiteAuthKey key=7b64dc29-ee30-4bb4-90b4-af2e877b6452",
            "X-Auth-Token": "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwiZW1haWwiOiJqb2huLmhlbmRlcnNvbkBzdGFja2Vkc3BvcnRzLmNvbSIsImV4cCI6MTY0MDAxMTUwN30.vokiYw0OZMPWeSiRAOGDaDwZ8PWDL057YJn7AFS1RT0",
            Cookie:
                "ahoy_visitor=9ed0658b-aeb7-4590-b919-6b9e2ac080fe; ahoy_visit=be0280ec4-d74-4dde-8218-f166f678ee87; _memcache-recruitsuite_session=d8ee35c9e0cd796c691901ada77a8bf6",
        },
    });
};

export const getMessages = () => {

    return axios({

        method: "get",
        url: URL + `messages?include_all=true`,
        headers: {
            Accept: "application/json; version=1",
            "Content-Type": "application/json",
            Authorization:
                "RecruitSuiteAuthKey key=7b64dc29-ee30-4bb4-90b4-af2e877b6452",
            "X-Auth-Token": JSON.parse(localStorage.getItem("user")).token,
            Cookie:
                "ahoy_visitor=9ed0658b-aeb7-4590-b919-6b9e2ac080fe; ahoy_visit=be0280ec4-d74-4dde-8218-f166f678ee87; _memcache-recruitsuite_session=d8ee35c9e0cd796c691901ada77a8bf6",
        },
    });
};

export const getMostRecentSendTimes = () => {
    return axios({
        method: "get",
        url: URL + `messages/most_recent_send_times?timezone=US/Central`,
        headers: {
            Accept: "application/json; version=1",
            "Content-Type": "application/json",
            Authorization:
                "RecruitSuiteAuthKey key=7b64dc29-ee30-4bb4-90b4-af2e877b6452",
            "X-Auth-Token": JSON.parse(localStorage.getItem("user")).token,
            Cookie:
                "ahoy_visitor=9ed0658b-aeb7-4590-b919-6b9e2ac080fe; ahoy_visit=be028ec4-d074-4dde-8218-f166f678ee87; _memcache-recruitsuite_session=d8ee35c9e0cd796c691901ada77a8bf6",
        },
    });
};

export const getMessageInbox = () => {
    return axios({
        method: "get",
        url: URL + `messages/inbox`,
        headers: {
            Accept: "application/json; version=1",
            "Content-Type": "application/json",
            Authorization:
                "RecruitSuiteAuthKey key=7b64dc29-ee30-4bb4-90b4-af2e877b6452",
            "X-Auth-Token": JSON.parse(localStorage.getItem("user")).token,
            Cookie:
                "ahoy_visitor=9ed0658b-aeb7-4590-b919-6b9e2ac080fe; ahoy_visit=be028ec4-d074-4dde-8218-f166f678ee87; _memcache-recruitsuite_session=d8ee35c9e0cd796c691901ada77a8bf6",
        },
    });
};

export const getMessage = (id) => {
    return axios({
        method: "get",
        url: URL + `messages/${id}?only_sendable=true`,
        headers: {
            Accept: "application/json; version=1",
            "Content-Type": "application/json",
            Authorization:
                "RecruitSuiteAuthKey key=7b64dc29-ee30-4bb4-90b4-af2e877b6452",
            "X-Auth-Token": JSON.parse(localStorage.getItem("user")).token
        },
    });
};


export const getPlaceholderById = (placeholderId) => {
    return axios({
        method: "get",
        url: URL + `media/placeholder/` + placeholderId,
        headers: {
            Accept: "application/json; version=1",
            "Content-Type": "application/json",
            Authorization:
                "RecruitSuiteAuthKey key=7b64dc29-ee30-4bb4-90b4-af2e877b6452",
            "X-Auth-Token": JSON.parse(localStorage.getItem("user")).token,
        },
    });
}

export const postTag = (body) => {

    const data = JSON.stringify(body);

    console.log("URL", URL + `media/${body.id}`)
    return axios({
        method: "post",
        url: URL + "media/" + body.id + "/add_tags",
        headers: {
            Accept: "application/json; version=1",
            "Content-Type": "application/json",
            Authorization:
                "RecruitSuiteAuthKey key=7b64dc29-ee30-4bb4-90b4-af2e877b6452",
            "X-Auth-Token": JSON.parse(localStorage.getItem("user")).token,
        },
        data: data,
    });
};