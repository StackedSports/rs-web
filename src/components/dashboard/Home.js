import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Chart from "./chart";
import styled from "styled-components";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { Link } from "react-router-dom";
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

import { getTaskQueueForDay, getMonthlyStats } from "../../ApiHelper";

const Button = styled.button`
  border-radius: 5px;
  background: #1da1f2;
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
function Home() {
  const classes = useStyles();
  // console.log("This is logged in user", localStorage.getItem("user"));
  const [currency, setCurrency] = useState("This Month");
  const [selectedDateQueue, setSelectedDateQueue] = useState(null);
  const [selectedDateQueueCopy, setSelectedDateQueueCopy] = useState(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [messageType, setMessageType] = useState("All types");
  const [messageSender, setMessageSender] = useState("All Team Members");
  const [messageStatus, setMessageStatus] = useState(
    "All status (Excluding Draft)"
  );
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
    // console.log("THis is message type", senderName);
    setMessageSender(senderName);
    var filteredQueue = [];
    if (selectedDateQueue != null) {
      selectedDateQueueCopy.map((queue) => {
        console.log("this is queue", queue);
        if (queue.queued_by == senderName) {
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

  const [monthlyStats, setMontlyStats] = useState(null);
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
        }
      },
      (error) => {
        console.log("this is error in the stats", error);
      }
    );
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")));
      // console.log("This is user", JSON.parse(localStorage.getItem("user")));
      getTaskQueueByDate(null);
      myMonthlyStats();
    } else {
      window.location.href = "/";
    }
  }, []);
  return (
    <DashboardContainer>
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
                    <DatePicker
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
            <TableFooter>
              <TableFooterText>
                View More{" "}
                {selectedDateQueue && selectedDateQueue.length != 0
                  ? `(${selectedDateQueue.length})`
                  : ""}
              </TableFooterText>
            </TableFooter>
          </TableSection>

          <ChartSection>
            <Grid container style={{ margin: 0, padding: 0 }}>
              <Grid item xs={12} lg={6}>
                <ChartDiv>
                  <ChartTop>
                    <MM>
                      <MMH>Monthly Messages</MMH>
                      <MonthField>
                        <DropdownButton
                          id="dropdown-basic-button"
                          title={currency}
                          drop={"right"}
                        >
                          {currencies.map((option) => (
                            <Dropdown.Item
                              style={{
                                background:
                                  currency === option.label
                                    ? "#348ef7"
                                    : "white",
                                color:
                                  currency === option.label ? "white" : "black",
                              }}
                              onClick={(e) => {
                                setCurrency(option.label);
                              }}
                            >
                              {option.label}
                            </Dropdown.Item>
                          ))}
                        </DropdownButton>
                        {/* <TextField
                          select
                          value={currency}
                          style={{
                            background: "transparent",
                          }}
                          SelectProps={{
                            classes: { icon: classes.icon },
                            IconComponent: () => (
                              <KeyboardArrowDownIcon
                                style={{ margin: 0, padding: 0 }}
                              />
                            ),
                          }}
                          onChange={handleChange}
                          fullWidth={true}
                          InputProps={{
                            disableUnderline: true,
                            className: classes.input,
                          }}
                        >
                          {currencies.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
                       */}
                      </MonthField>
                    </MM>
                    <Count>
                      {monthlyStats ? monthlyStats.total_messages : 0}
                    </Count>
                  </ChartTop>
                  <ChartDivS>
                    {/* <Chart monthlyStats={monthlyStats} /> */}
                    {monthlyStats != null && (
                      <DoughnutChart
                        monthlyStats={monthlyStats}
                        // className="chart"
                        // data={[1, 2, 3, 4, 5, 6, 7]}
                        // labels={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
                      />
                    )}
                  </ChartDivS>

                  <ChartFooter>
                    <ChartFooterButton>
                      <FiberManualRecordIcon
                        style={{
                          width: "12px",
                          height: "12px",
                          color: "#8BB14C",
                        }}
                      />
                      <ChartFooterContent>Personal Texts</ChartFooterContent>
                    </ChartFooterButton>
                    <ChartFooterButton2>
                      <FiberManualRecordIcon
                        style={{
                          width: "12px",
                          color: "#4f81bc",
                          height: "12px",
                        }}
                      />
                      <ChartFooterContent>Total DM's</ChartFooterContent>
                    </ChartFooterButton2>
                    <ChartFooterButton3>
                      <FiberManualRecordIcon
                        style={{
                          width: "12px",
                          height: "12px",
                          color: "#c0504e",

                          marginLeft: "3px",
                        }}
                      />
                      <ChartFooterContent>By Recruites</ChartFooterContent>
                    </ChartFooterButton3>
                  </ChartFooter>
                </ChartDiv>
              </Grid>
              <Grid item xs={12} lg={6}>
                <ChartDiv2>
                  <ChartTop>
                    <MM>
                      <MMH>Monthly Messages</MMH>
                      <MonthField>
                        <DropdownButton
                          id="dropdown-basic-button"
                          title={currency}
                          drop={"right"}
                        >
                          {currencies.map((option) => (
                            <Dropdown.Item
                              style={{
                                background:
                                  currency === option.label
                                    ? "#348ef7"
                                    : "white",
                                color:
                                  currency === option.label ? "white" : "black",
                              }}
                              onClick={(e) => {
                                setCurrency(option.label);
                              }}
                            >
                              {" "}
                              {option.label}
                            </Dropdown.Item>
                          ))}
                        </DropdownButton>
                        {/* <TextField
                          select
                          value={currency}
                          style={{
                            background: "transparent",
                          }}
                          SelectProps={{
                            classes: { icon: classes.icon },
                            IconComponent: () => (
                              <KeyboardArrowDownIcon
                                style={{ margin: 0, padding: 0 }}
                              />
                            ),
                          }}
                          onChange={handleChange}
                          fullWidth={true}
                          InputProps={{
                            disableUnderline: true,
                            className: classes.input,
                          }}
                        >
                          {currencies.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
                       */}
                      </MonthField>
                    </MM>
                    <Count>
                      {monthlyStats ? monthlyStats.total_messages : 0}
                    </Count>
                  </ChartTop>
                  <div>
                    {monthlyStats && <Barchart monthlyStats={monthlyStats} />}
                  </div>

                  <ChartFooter>
                    <ChartFooterButton>
                      <FiberManualRecordIcon
                        style={{
                          width: "12px",
                          height: "12px",
                          color: "#0091FF",
                        }}
                      />
                      <ChartFooterContent>Twitter DM’s</ChartFooterContent>
                    </ChartFooterButton>
                    <ChartFooterButton2>
                      <FiberManualRecordIcon
                        style={{
                          width: "12px",
                          height: "12px",
                          color: "#8BB14C",
                        }}
                      />
                      <ChartFooterContent>Personal Text</ChartFooterContent>
                    </ChartFooterButton2>
                    <ChartFooterButton3>
                      <FiberManualRecordIcon
                        style={{
                          width: "12px",
                          height: "12px",
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
            monthlyStats={monthlyStats && monthlyStats}
          />
        </Grid>
      </Grid>
    </DashboardContainer>
  );
}

export default Home;
