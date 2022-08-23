import axios from "axios";

const USERNAME = "RecruitSuiteAPI"
const PASSWORD = "YodaUsesRecruitSuiteToo!"

interface IfilterParameters {
    access_token: string,
    _startRow?: string,
    _endRow?: string,
    _sortBy?: string,
    high_school_ID?: string,
    name?: string,
    address?: string,
    country?: string,
    city?: string,
    state?: string,
    postal_code?: string,
    ets_code?: string,
}

const CollegeWarroomApi = axios.create({
    baseURL: 'https://secure.collegewarroom.com/API/JSON/'
})

export const LoginCollegeWarroomApi = async () => {
    const response = await CollegeWarroomApi.post(`LOGIN?username=${USERNAME}&password=${PASSWORD}`)
    const { data } = response
    console.log(data) // save access_token to use in other requests
}

export const SearchCollegeWarroomApi = async (filterParameters: IfilterParameters) => {
    const response = await CollegeWarroomApi.get("High_School/Search", {
        data: filterParameters,
    })
    const { data } = response
    console.log(data)
}

export const ScheduleCollegeWarroomApi = async (filterParameters: IfilterParameters) => {
    const response = await CollegeWarroomApi.get("High_School_Event/Search ", {
        data: filterParameters, // 
    })
    const { data } = response
    console.log(data)
}