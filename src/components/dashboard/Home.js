import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Chart from "./chart";
import styled from "styled-components";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import UserAccountSettings from "../UserAccountSettings/UserAccountSettings";
import { Link } from "react-router-dom";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DateRangeIcon from "@material-ui/icons/DateRange";
import {
  DashboardContainer,
  Title,
  Titleheading,
  Titleparagrapg,
  TableSection,
  TableHeaderCol1Heading,
  TableHeaderCol2P,
  TableHeaderRight,
  DateField,
  FilterField,
  FilterIcon,
  FilterText,
  TableFooter,
  TableFooterText,
  ChartSection,
  ChartDiv,
  ChartDiv2,
  ChartTop,
  MM,
  MMH,
  MonthField,
  Count,
  ChartFooter,
  ChartFooterButton,
  ChartFooterContent,
  ChartFooterButton2,
  ChartFooterButton3,
  ChartDivS,
  ChartTop2,
} from "./homeElements";
import Table from "./table";
import MenuItem from "@material-ui/core/MenuItem";
import HomeRight from "./homeRight";
// import Barchart from "./barChart";
import FilterModal from "./filterModal";
import { Dropdown, DropdownButton } from "react-bootstrap";
import Barchart from "../charts/BarChart";
import DoughnutChart from "../charts/Doughnut";
import DatePicker from "react-date-picker";
import moment from "moment";

import {
  getTaskQueueForDay,
  getMonthlyStats,
  getThisQuarterStats,
  getThisYearStats,
  getLastQuarterStats,
  getLastYearStats,
  getLastMonthStats,
  getLast30Stats,
} from "../../ApiHelper";

const Button = styled.button`
  border-radius: 5px;
  background: #3871da;
  white-space: nowrap;
  padding: 0.5rem;
  width: 150px;
  margin: 20px;
  margin-bottom: 10px;
  box-sizing: border-box;
  font-weight: bold;
  color: white;
  font-size: 14px;
  outtion: all 0.2s ease-in-out;
  @medialine: none;
  border: none;
  height: 40px;
  cursor: pointer;
  display: flex;
  text-decoration: none;
  justify-content: center;
  align-items: center;
  transi screen and (max-width: 1000px) {
    width: 180px;
  }
`;

const currencies = [
  {
    value: "1",
    label: "Last 30 Days",
  },
  {
    value: "2",
    label: "This Month",
  },
  {
    value: "3",
    label: "This Quarter",
  },
  {
    value: "4",
    label: "This Year",
  },
  {
    value: "5",
    label: "Last Month",
  },
  {
    value: "6",
    label: "Last Quarter",
  },
  {
    value: "7",
    label: "Last Year",
  },
];
const useStyles = makeStyles({
  underline: {
    "&&&:before": {
      borderBottom: "none",
    },
    "&&:after": {
      borderBottom: "none",
    },
  },
  icon: {
    color: "red",
    margin: 0,
    padding: 0,
  },
  input: {
    color: "#222222",
    fontSize: 12,
    background: "transparent",
    fontFamily: "ProximaNovaSemibold",
  },
});
function Home(props) {
  const classes = useStyles();
  // console.log("This is logged in user", localStorage.getItem("user"));
  const [currency, setCurrency] = useState("This Month");
  const [filterBar, setFilterBar] = useState("This Month");
  const [selectedDateQueue, setSelectedDateQueue] = useState(null);
  const [selectedDateQueueCopy, setSelectedDateQueueCopy] = useState(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [messageType, setMessageType] = useState("All types");
  const [messageSender, setMessageSender] = useState("All Team Members");
  const [messageStatus, setMessageStatus] = useState(
    "All status (Excluding Draft)"
  );

  const [barChartData, setBarchartData] = useState(null);
  const [doughnutChartData, setDoughnutChatData] = useState(null);
  const [monthlyStats, setMontlyStats] = useState(null);
  const [quarterlyStats, setQuarterlyStats] = useState(null);
  const [yearlyStats, setYearlyStats] = useState(null);
  const [lastMonthStats, setLastMonthStates] = useState(null);
  const [last30Stats, setLast30Stats] = useState(null);
  const [homeRightStats, setHomeRightStats] = useState(null);
  const [lastQuarterStats, setLastQuarterStates] = useState(null);
  const [lastYearStats, setLastYearStates] = useState(null);
  const [loggedInUserStats, setLoggedInUserStats] = useState(null);
  const [showSetting, setShowSetting] = useState(false);
  const [value, onChange] = useState(new Date());

  const onMessageTypeChange = (type) => {
    console.log("THis is message type etc", type);
    if (type === "Tweets") {
      type = "Twitter";
    }
    setMessageType(type);
    var filteredQueue = [];
    if (selectedDateQueue != null) {
      selectedDateQueueCopy.map((queue) => {
        console.log("this is queue", queue);
        if (queue.platform && queue.platform.name == type) {
          filteredQueue.push(queue);
        }
      });
    }
    if (type === "All types") {
      console.log("IT is coming herer", selectedDateQueueCopy);
      setSelectedDateQueue(selectedDateQueueCopy);
    } else {
      setSelectedDateQueue(filteredQueue);
    }
  };

  const onMessageSenderChange = (senderName) => {
    console.log("THis is sender name", senderName);
    setMessageSender(senderName);
    var filteredQueue = [];
    if (selectedDateQueue != null) {
      selectedDateQueueCopy.map((queue) => {
        console.log("this is queue sender name", queue);
        if (
          queue.queued_by.first_name + " " + queue.queued_by.last_name ===
          senderName
        ) {
          filteredQueue.push(queue);
        }
      });
    }
    if (senderName === "All Team Members") {
      console.log("IT is coming herer", selectedDateQueueCopy);
      setSelectedDateQueue(selectedDateQueueCopy);
    } else {
      setSelectedDateQueue(filteredQueue);
    }
  };

  const onMessageStatusChange = (status) => {
    console.log("THis is message type", status);
    setMessageStatus(status);
    var filteredQueue = [];
    if (selectedDateQueue != null) {
      selectedDateQueueCopy.map((queue) => {
        console.log("this is queue", queue);
        if (queue.status.toLowerCase() == status.toLowerCase()) {
          filteredQueue.push(queue);
        }
      });
    }
    if (status === "All status (Excluding Draft)") {
      console.log("IT is coming herer", selectedDateQueueCopy);
      setSelectedDateQueue(selectedDateQueueCopy);
    } else {
      setSelectedDateQueue(filteredQueue);
    }
  };

  const [user, setUser] = useState(false);
  const [queueDate, setQueueDate] = useState(new Date());
  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

  const getTaskQueueByDate = (date) => {
    // setLoading(true);
    console.log("This is the date", date);
    // || "2020-12-13"
    getTaskQueueForDay(date).then(
      (res) => {
        // console.log("THis is takee queue res", res);
        if (res.statusText === "OK") {
          console.log("This is the task queue by date", res.data);
          var fileredQueue = [];

          setSelectedDateQueue(res.data);
          setSelectedDateQueueCopy(res.data);
        }
      },
      (error) => {
        console.log("this is error taks queue by date", error);
      }
    );
  };

  const myMonthlyStats = () => {
    // || "2020-12-13"
    getMonthlyStats().then(
      (res) => {
        if (res.statusText === "OK") {
          console.log("This is the monthlly stats", res.data.table);
          setMontlyStats(res.data.table);
          setBarchartData(res.data.table);
          setDoughnutChatData(res.data.table);
          setHomeRightStats(res.data.table);
          res.data.table.users.map((user, index) => {
            var name =
              JSON.parse(localStorage.getItem("user")).first_name +
              " " +
              JSON.parse(localStorage.getItem("user")).last_name;
            if (name === user.table.name) {
              setLoggedInUserStats(user.table);
            }
          });
        }
      },
      (error) => {
        console.log("this is error in the stats", error);
      }
    );
  };
  const myQuarterlyStats = () => {
    // || "2020-12-13"
    getThisQuarterStats().then(
      (res) => {
        if (res.statusText === "OK") {
          console.log("This is the quarterly stats", res.data.table);
          setQuarterlyStats(res.data.table);
        }
      },
      (error) => {
        console.log("this is error in the stats", error);
      }
    );
  };
  const myYearlyStats = () => {
    // || "2020-12-13"
    getThisYearStats().then(
      (res) => {
        if (res.statusText === "OK") {
          console.log("This is the yearly stats", res.data.table);
          setYearlyStats(res.data.table);
        }
      },
      (error) => {
        console.log("this is error in the stats", error);
      }
    );
  };

  const myLastQuarterStats = () => {
    // || "2020-12-13"
    getLastQuarterStats().then(
      (res) => {
        if (res.statusText === "OK") {
          console.log("This is the last quarter stats", res.data.table);
          setLastQuarterStates(res.data.table);
        }
      },
      (error) => {
        console.log("this is error in the stats", error);
      }
    );
  };
  const myLastYearStats = () => {
    // || "2020-12-13"
    getLastYearStats().then(
      (res) => {
        if (res.statusText === "OK") {
          console.log("This is the last year stats", res.data.table);
          setLastYearStates(res.data.table);
        }
      },
      (error) => {
        console.log("this is error in the stats", error);
      }
    );
  };
  const myLastMonthStats = () => {
    // || "2020-12-13"
    getLastMonthStats().then(
      (res) => {
        if (res.statusText === "OK") {
          console.log("This is the last month stats", res.data.table);
          setLastMonthStates(res.data.table);
        }
      },
      (error) => {
        console.log("this is error in the stats", error);
      }
    );
  };

  const myLast30DaysStats = () => {
    // || "2020-12-13"
    getLast30Stats().then(
      (res) => {
        if (res.statusText === "OK") {
          console.log("This is the last 30 days stats", res.data.table);
          setLast30Stats(res.data.table);
        }
      },
      (error) => {
        console.log("this is error in the stats", error);
      }
    );
  };

  console.log(
    "This is todays of Quarter",
    new moment().format("YYYY-MM-DD"),
    "This is 30 days back",
    new moment().clone().subtract({ days: 30 }).format("YYYY-MM-DD")
  );
  if (localStorage.getItem("user")) {
  } else {
    window.location.href = "/";
  }
  useEffect(() => {
    if (localStorage.getItem("user")) {
      console.log("There is a user");
      setUser(JSON.parse(localStorage.getItem("user")));
      // console.log("This is user", JSON.parse(localStorage.getItem("user")));
      getTaskQueueByDate(null);
      myMonthlyStats();
      myQuarterlyStats();
      myYearlyStats();
      myLastQuarterStats();
      myLastYearStats();
      myLastMonthStats();
      myLast30DaysStats();
    } else {
      window.location.href = "/";
    }
  }, []);

  console.log("This is filter bar", filterBar);
  return (
    <DashboardContainer style={{ maxWidth: "100vw" }}>
      <FilterModal
        messageType={messageType}
        setMessageType={onMessageTypeChange}
        messageSender={messageSender}
        setMessageSender={onMessageSenderChange}
        messageStatus={messageStatus}
        setMessageStatus={onMessageStatusChange}
        filterOpen={filterOpen}
        setFilterOpen={setFilterOpen}
        monthlyStats={monthlyStats}
      />
      {props.showSetting ? (
        <UserAccountSettings
          showSetting={props.showSetting}
          setShowSetting={props.setShowSetting}
        ></UserAccountSettings>
      ) : (
        <Grid container style={{ margin: 0, padding: 0 }}>
          <Grid item xs={12} lg={8}>
            <Title>
              <Titleheading>{`Welcome back ${
                user.first_name + " " + user.last_name
              }!`}</Titleheading>
              <Titleparagrapg>
                You have 15 unread messages in your RS Text Chat feed.{" "}
                <span style={{ color: "#3871DA" }}>
                  <u>View Now</u>
                </span>
              </Titleparagrapg>
            </Title>
            <TableSection>
              <Grid container style={{ margin: 0, padding: 0 }} direction>
                <Grid item xs={12} lg={6}>
                  <TableHeaderCol1Heading>Team Queue</TableHeaderCol1Heading>
                  <TableHeaderCol2P>
                    You have{" "}
                    <span style={{ color: "#3871DA" }}>
                      {selectedDateQueue ? selectedDateQueue.length : 0} items
                    </span>{" "}
                    in your queue
                  </TableHeaderCol2P>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <TableHeaderRight>
                    <DateField>
                      <DateRangeIcon
                        style={{
                          marginRight: 3,
                          fontSize: 18,
                          color: "rgb(74, 123, 224)",
                        }}
                      />
                      <DatePicker
                        clearIcon={null}
                        calendarIcon={
                          <ExpandMoreIcon
                            style={{
                              color: "black",
                              fontSize: 25,
                              fontWeight: "bold",
                            }}
                          ></ExpandMoreIcon>
                        }
                        onChange={(e) => {
                          var dt = new moment(e).format("YYYY-MM-DD");
                          console.log("This is it", dt);
                          getTaskQueueByDate(dt);
                          onChange(e);
                        }}
                        value={value}
                      />
                      {/* <input
                      type="date"
                      onChange={(e) => {
                        // setQueueDate(e.target.value);
                        getTaskQueueByDate(e.target.value);
                      }}
                      // value={queueDate}
                      InputProps={{ disableUnderline: true }}
                      fullWidth={true}
                      className="dateTextField"
                      // style={{ zIndex: 0, border: "none" }}
                    /> */}
                    </DateField>
                    <FilterField
                      onClick={() => setFilterOpen(true)}
                      filterOpen={filterOpen}
                    >
                      <FilterText filterOpen={filterOpen}>Filter</FilterText>
                      <FilterIcon filterOpen={filterOpen} />
                    </FilterField>
                  </TableHeaderRight>
                </Grid>
              </Grid>
              <Table
                messageType={messageType}
                messageStatus={messageStatus}
                messageSender={messageSender}
                selectedDateQueue={selectedDateQueue}
              />
              {selectedDateQueue == null || selectedDateQueue.length === 0 ? (
                <Grid
                  container
                  direction="row"
                  justify="center"
                  style={{ marginTop: -100 }}
                >
                  <p
                    style={{
                      width: "100%",
                      textAlign: "center",
                      color: "#74777c",
                      fontWeight: "bold",
                      margin: 0,
                      fontSize: 12,
                    }}
                  >
                    Your task queue is clear!
                  </p>
                  <p
                    style={{
                      width: "100%",
                      textAlign: "center",
                      color: "#74777c",
                      fontWeight: "bold",
                      margin: 0,
                      fontSize: 12,
                    }}
                  >
                    Consistent messaging is key
                  </p>
                  <p
                    style={{
                      width: "100%",
                      textAlign: "center",
                      color: "#74777c",
                      fontWeight: "bold",
                      margin: 0,
                      fontSize: 12,
                    }}
                  >
                    to building an engaging audience!
                  </p>

                  <Button>+ New</Button>
                </Grid>
              ) : (
                <div></div>
              )}
              {selectedDateQueue == null || selectedDateQueue.length === 0 ? (
                <div></div>
              ) : (
                <TableFooter style={{ borderTop: "1px solid #dadada" }}>
                  <TableFooterText style={{ marginTop: 12 }}>
                    View More{" "}
                    {selectedDateQueue && selectedDateQueue.length != 0
                      ? `(${selectedDateQueue.length})`
                      : ""}
                  </TableFooterText>
                </TableFooter>
              )}
            </TableSection>

            <ChartSection>
              <Grid container style={{ margin: 0, padding: 0 }}>
                <Grid item xs={12} lg={6}>
                  <ChartDiv>
                    <ChartTop>
                      <MM>
                        <MMH>{currency} Messages</MMH>
                        <MonthField>
                          <DropdownButton
                            id="dropdown-basic-button"
                            title={<b>{currency}</b>}
                            drop={"down"}
                          >
                            {currencies.map((option) => (
                              <Dropdown.Item
                                style={{
                                  background:
                                    currency === option.label
                                      ? "#348ef7"
                                      : "white",
                                  color:
                                    currency === option.label
                                      ? "white"
                                      : "black",
                                }}
                                onClick={(e) => {
                                  if (option.label === "This Quarter") {
                                    setDoughnutChatData(quarterlyStats);
                                  } else if (option.label === "This Year") {
                                    setDoughnutChatData(yearlyStats);
                                  } else if (option.label === "Last Quarter") {
                                    setDoughnutChatData(lastQuarterStats);
                                  } else if (option.label === "Last Year") {
                                    setDoughnutChatData(lastYearStats);
                                  } else if (option.label === "Last Month") {
                                    setDoughnutChatData(lastMonthStats);
                                  } else if (option.label === "Last 30 Days") {
                                    setDoughnutChatData(last30Stats);
                                  } else {
                                    setDoughnutChatData(monthlyStats);
                                  }
                                  setCurrency(option.label);
                                }}
                              >
                                {option.label}
                              </Dropdown.Item>
                            ))}
                          </DropdownButton>
                        </MonthField>
                      </MM>
                      <Count>
                        {doughnutChartData
                          ? doughnutChartData.total_messages
                          : 0}
                      </Count>
                    </ChartTop>
                    <ChartDivS>
                      {/* <Chart monthlyStats={monthlyStats} /> */}
                      {doughnutChartData != null ? (
                        <DoughnutChart
                          monthlyStats={doughnutChartData}
                          // className="chart"
                          // data={[1, 2, 3, 4, 5, 6, 7]}
                          // labels={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
                        />
                      ) : (
                        <Grid container direction="row" justify="center">
                          <div
                            class="spinner-border text-primary"
                            role="status"
                          >
                            <span class="sr-only">Loading...</span>
                          </div>
                        </Grid>
                      )}
                    </ChartDivS>

                    <ChartFooter>
                      <ChartFooterButton2>
                        <FiberManualRecordIcon
                          style={{
                            color: "#4f81bc",
                            width: "18px",
                            height: "18px",
                          }}
                        />
                        <ChartFooterContent>Twitter DM's</ChartFooterContent>
                      </ChartFooterButton2>

                      <ChartFooterButton>
                        <FiberManualRecordIcon
                          style={{
                            width: "18px",
                            height: "18px",
                            color: "#8BB14C",
                          }}
                        />
                        <ChartFooterContent>Personal Texts</ChartFooterContent>
                      </ChartFooterButton>

                      <ChartFooterButton3>
                        <FiberManualRecordIcon
                          style={{
                            width: "18px",
                            height: "18px",
                            color: "black",

                            marginLeft: "3px",
                          }}
                        />
                        <ChartFooterContent>RS Text</ChartFooterContent>
                      </ChartFooterButton3>
                    </ChartFooter>
                  </ChartDiv>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <ChartDiv2>
                    <ChartTop>
                      <MM>
                        <MMH>{filterBar} Messages</MMH>
                      </MM>
                      <Count>
                        {barChartData ? barChartData.total_messages : 0}
                      </Count>
                    </ChartTop>

                    <div style={{ float: "right", marginRight: 15 }}>
                      <MonthField>
                        <DropdownButton
                          id="dropdown-basic-button"
                          title={<b>{filterBar}</b>}
                          drop={"down"}
                          style={{ width: 222 }}
                        >
                          {currencies.map((option) => (
                            <Dropdown.Item
                              style={{
                                background:
                                  filterBar === option.label
                                    ? "#348ef7"
                                    : "white",
                                color:
                                  filterBar === option.label
                                    ? "white"
                                    : "black",
                              }}
                              onClick={(e) => {
                                if (option.label === "This Quarter") {
                                  setBarchartData(quarterlyStats);
                                } else if (option.label === "This Year") {
                                  setBarchartData(yearlyStats);
                                } else if (option.label === "Last Quarter") {
                                  setBarchartData(lastQuarterStats);
                                } else if (option.label === "Last Year") {
                                  setBarchartData(lastYearStats);
                                } else if (option.label === "Last Month") {
                                  setBarchartData(lastMonthStats);
                                } else if (option.label === "Last 30 Days") {
                                  setBarchartData(last30Stats);
                                } else {
                                  setBarchartData(monthlyStats);
                                }
                                setFilterBar(option.label);
                              }}
                            >
                              {" "}
                              {option.label}
                            </Dropdown.Item>
                          ))}
                        </DropdownButton>
                      </MonthField>
                    </div>
                    <div>
                      {barChartData != null ? (
                        <Barchart monthlyStats={barChartData} />
                      ) : (
                        <Grid container direction="row" justify="center">
                          <div
                            class="spinner-border text-primary"
                            role="status"
                          >
                            <span class="sr-only">Loading...</span>
                          </div>
                        </Grid>
                      )}
                    </div>

                    <ChartFooter>
                      <ChartFooterButton>
                        <FiberManualRecordIcon
                          style={{
                            width: "18px",
                            height: "18px",
                            color: "#0091FF",
                          }}
                        />
                        <ChartFooterContent>Twitter DM’s</ChartFooterContent>
                      </ChartFooterButton>
                      <ChartFooterButton2>
                        <FiberManualRecordIcon
                          style={{
                            width: "18px",
                            height: "18px",
                            color: "#8BB14C",
                          }}
                        />
                        <ChartFooterContent>Personal Text</ChartFooterContent>
                      </ChartFooterButton2>
                      <ChartFooterButton3>
                        <FiberManualRecordIcon
                          style={{
                            width: "18px",
                            height: "18px",
                            color: "#373D4A",
                            marginLeft: "3px",
                          }}
                        />
                        <ChartFooterContent>RS Text</ChartFooterContent>
                      </ChartFooterButton3>
                    </ChartFooter>
                  </ChartDiv2>
                </Grid>
              </Grid>
            </ChartSection>
          </Grid>
          <Grid item xs={12} lg={4}>
            <HomeRight
              user={user && user}
              showSetting={props.showSetting}
              setShowSetting={props.setShowSetting}
              loggedInUserStats={loggedInUserStats}
              monthlyStats={homeRightStats && homeRightStats}
              onFilterChange={(filter) => {
                if (filter === "This Quarter") {
                  quarterlyStats.users.map((user, index) => {
                    var name =
                      JSON.parse(localStorage.getItem("user")).first_name +
                      " " +
                      JSON.parse(localStorage.getItem("user")).last_name;
                    if (name === user.table.name) {
                      setLoggedInUserStats(user.table);
                    }
                  });

                  setHomeRightStats(quarterlyStats);
                } else if (filter === "This Year") {
                  yearlyStats.users.map((user, index) => {
                    var name =
                      JSON.parse(localStorage.getItem("user")).first_name +
                      " " +
                      JSON.parse(localStorage.getItem("user")).last_name;
                    if (name === user.table.name) {
                      setLoggedInUserStats(user.table);
                    }
                  });
                  setHomeRightStats(yearlyStats);
                } else if (filter === "Last Quarter") {
                  lastQuarterStats.users.map((user, index) => {
                    var name =
                      JSON.parse(localStorage.getItem("user")).first_name +
                      " " +
                      JSON.parse(localStorage.getItem("user")).last_name;
                    if (name === user.table.name) {
                      setLoggedInUserStats(user.table);
                    }
                  });
                  setHomeRightStats(lastQuarterStats);
                } else if (filter === "Last Year") {
                  lastYearStats.users.map((user, index) => {
                    var name =
                      JSON.parse(localStorage.getItem("user")).first_name +
                      " " +
                      JSON.parse(localStorage.getItem("user")).last_name;
                    if (name === user.table.name) {
                      setLoggedInUserStats(user.table);
                    }
                  });
                  setHomeRightStats(lastYearStats);
                } else if (filter === "Last Month") {
                  lastMonthStats.users.map((user, index) => {
                    var name =
                      JSON.parse(localStorage.getItem("user")).first_name +
                      " " +
                      JSON.parse(localStorage.getItem("user")).last_name;
                    if (name === user.table.name) {
                      setLoggedInUserStats(user.table);
                    }
                  });
                  setHomeRightStats(lastMonthStats);
                } else if (filter === "Last 30 Days") {
                  last30Stats.users.map((user, index) => {
                    var name =
                      JSON.parse(localStorage.getItem("user")).first_name +
                      " " +
                      JSON.parse(localStorage.getItem("user")).last_name;
                    if (name === user.table.name) {
                      setLoggedInUserStats(user.table);
                    }
                  });
                  setHomeRightStats(last30Stats);
                } else {
                  monthlyStats.users.map((user, index) => {
                    var name =
                      JSON.parse(localStorage.getItem("user")).first_name +
                      " " +
                      JSON.parse(localStorage.getItem("user")).last_name;
                    if (name === user.table.name) {
                      setLoggedInUserStats(user.table);
                    }
                  });
                  setHomeRightStats(monthlyStats);
                }
              }}
            />
          </Grid>
        </Grid>
      )}
    </DashboardContainer>
  );
}

export default Home;
