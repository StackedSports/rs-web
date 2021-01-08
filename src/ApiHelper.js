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
  console.log("This is date", date === null);
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
