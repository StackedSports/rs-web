import axios from "axios";
import moment from "moment";

const URL = "https://prod.recruitsuite.co/api/";

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

  return axios({
    method: "post",
    url: URL + "users",
    headers: {
      Accept: "application/json; version=1",
      "Content-Type": "application/json",
      Authorization:
        "StackedSportsAuthKey key=b41d1779-d6db-44be-97b4-ecf39e207364",
      Cookie:
        "ahoy_visitor=9ed0658b-aeb7-4590-b919-6b9e2ac080fe; ahoy_visit=be028ec4-d074-4dde-8218-f166f678ee87; _memcache-recruitsuite_session=d8ee35c9e0cd796c691901ada77a8bf6",
    },
    data: data,
  });
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
        "StackedSportsAuthKey key=b41d1779-d6db-44be-97b4-ecf39e207364",
      Cookie:
        "ahoy_visitor=9ed0658b-aeb7-4590-b919-6b9e2ac080fe; ahoy_visit=be028ec4-d074-4dde-8218-f166f678ee87; _memcache-recruitsuite_session=d8ee35c9e0cd796c691901ada77a8bf6",
    },
    data: data,
  });
};

export const getUserAccountInformation = () => {
  console.log(JSON.parse(localStorage.getItem("user")));

  return axios({
    method: "get",
    url: URL + "login",
    headers: {
      Authorization:
        "StackedSportsAuthKey key=b41d1779-d6db-44be-97b4-ecf39e207364",
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
        "StackedSportsAuthKey key=b41d1779-d6db-44be-97b4-ecf39e207364",
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
        "StackedSportsAuthKey key=b41d1779-d6db-44be-97b4-ecf39e207364",
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
        "StackedSportsAuthKey key=b41d1779-d6db-44be-97b4-ecf39e207364",
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
        "StackedSportsAuthKey key=b41d1779-d6db-44be-97b4-ecf39e207364",
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
        "StackedSportsAuthKey key=b41d1779-d6db-44be-97b4-ecf39e207364",
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
        "StackedSportsAuthKey key=b41d1779-d6db-44be-97b4-ecf39e207364",
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
        "StackedSportsAuthKey key=b41d1779-d6db-44be-97b4-ecf39e207364",
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
        "StackedSportsAuthKey key=b41d1779-d6db-44be-97b4-ecf39e207364",
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
        "StackedSportsAuthKey key=b41d1779-d6db-44be-97b4-ecf39e207364",
      "X-Auth-Token": JSON.parse(localStorage.getItem("user")).token,
      Cookie:
        "ahoy_visitor=9ed0658b-aeb7-4590-b919-6b9e2ac080fe; ahoy_visit=be028ec4-d074-4dde-8218-f166f678ee87; _memcache-recruitsuite_session=d8ee35c9e0cd796c691901ada77a8bf6",
    },
  });
};

export const getAllContacts = (page) => {
  // console.log("This is start", start);
  // console.log("This is end", end);
  // console.log("This is ", URL + `stats?start_date=${start}&end_date=${end}`);
  var page = page || 1;
  var perPage = 200;
  return axios({
    method: "get",
    url:
      URL + `contacts?page=${page}&per_page=${perPage}&sort_column=last_name`,
    headers: {
      Accept: "application/json; version=1",
      "Content-Type": "application/json",
      Authorization:
        "StackedSportsAuthKey key=b41d1779-d6db-44be-97b4-ecf39e207364",
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
        "StackedSportsAuthKey key=b41d1779-d6db-44be-97b4-ecf39e207364",
      "X-Auth-Token": JSON.parse(localStorage.getItem("user")).token,
      Cookie:
        "ahoy_visitor=9ed0658b-aeb7-4590-b919-6b9e2ac080fe; ahoy_visit=be028ec4-d074-4dde-8218-f166f678ee87; _memcache-recruitsuite_session=d8ee35c9e0cd796c691901ada77a8bf6",
    },
  });
};

export const getTags = () => {
  return axios({
    method: "get",
    url: URL + `tags?type=Medium`,
    headers: {
      Accept: "application/json; version=3",
      "Content-Type": "application/json",
      Authorization:
        "StackedSportsAuthKey key=b41d1779-d6db-44be-97b4-ecf39e207364",
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
        "StackedSportsAuthKey key=b41d1779-d6db-44be-97b4-ecf39e207364",
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
        "StackedSportsAuthKey key=b41d1779-d6db-44be-97b4-ecf39e207364",
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
        "StackedSportsAuthKey key=b41d1779-d6db-44be-97b4-ecf39e207364",
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
        "StackedSportsAuthKey key=b41d1779-d6db-44be-97b4-ecf39e207364",
      "X-Auth-Token": JSON.parse(localStorage.getItem("user")).token,
      Cookie:
        "ahoy_visitor=9ed0658b-aeb7-4590-b919-6b9e2ac080fe; ahoy_visit=be028ec4-d074-4dde-8218-f166f678ee87; _memcache-recruitsuite_session=d8ee35c9e0cd796c691901ada77a8bf6",
    },
  });
};

export const getBoardFilters = () => {
  return axios({
    method: "get",
    url: URL + `filters`,
    headers: {
      Accept: "application/json; version=1",
      "Content-Type": "application/json",
      Authorization:
        "StackedSportsAuthKey key=b41d1779-d6db-44be-97b4-ecf39e207364",
      "X-Auth-Token": JSON.parse(localStorage.getItem("user")).token,
      Cookie:
        "ahoy_visitor=9ed0658b-aeb7-4590-b919-6b9e2ac080fe; ahoy_visit=be028ec4-d074-4dde-8218-f166f678ee87; _memcache-recruitsuite_session=d8ee35c9e0cd796c691901ada77a8bf6",
    },
  });
};
