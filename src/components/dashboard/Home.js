import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Chart from "./chart";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
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
import Barchart from "./barChart";
import FilterModal from "./filterModal";
import moment from "moment";

import { getTaskQueueForDay, getMonthlyStats } from "../../ApiHelper";

const currencies = [
  {
    value: "USD",
    label: "$",
  },
  {
    value: "EUR",
    label: "This Month",
  },
  {
    value: "BTC",
    label: "฿",
  },
  {
    value: "JPY",
    label: "¥",
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
  const [currency, setCurrency] = useState("EUR");
  const [selectedDateQueue, setSelectedDateQueue] = useState(null);
  const [filterOpen, setFilterOpen] = useState(false);
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
        console.log(res);
        if (res.statusText === "OK") {
          console.log("This is the task queue by date", res.data);
          setSelectedDateQueue(res.data);
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
      console.log("This is user", JSON.parse(localStorage.getItem("user")));
      getTaskQueueByDate(null);
      myMonthlyStats();
    } else {
      window.location.href = "/";
    }
  }, []);
  return (
    <DashboardContainer>
      <FilterModal filterOpen={filterOpen} setFilterOpen={setFilterOpen} />
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
            <Grid container spacing={3} style={{ margin: 0, padding: 0 }}>
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
                    <TextField
                      type="date"
                      onChange={(e) => {
                        // setQueueDate(e.target.value);
                        getTaskQueueByDate(e.target.value);
                      }}
                      // value={queueDate}
                      InputProps={{ disableUnderline: true }}
                      fullWidth={true}
                      style={{ zIndex: 0 }}
                    />
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
            <Table selectedDateQueue={selectedDateQueue} />
            <TableFooter>
              <TableFooterText>View More (10)</TableFooterText>
            </TableFooter>
          </TableSection>

          <ChartSection>
            <Grid container spacing={2} style={{ margin: 0, padding: 0 }}>
              <Grid item xs={12} lg={6}>
                <ChartDiv>
                  <ChartTop>
                    <MM>
                      <MMH>Monthly Messages</MMH>
                      <MonthField>
                        <TextField
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
                      </MonthField>
                    </MM>
                    <Count>
                      {monthlyStats ? monthlyStats.total_messages : 0}
                    </Count>
                  </ChartTop>
                  <ChartDivS>
                    <Chart monthlyStats={monthlyStats} />
                  </ChartDivS>

                  <ChartFooter>
                    <ChartFooterButton>
                      <FiberManualRecordIcon
                        style={{
                          width: "12px",
                          height: "12px",
                          color: "#c0504e",
                        }}
                      />
                      <ChartFooterContent>Personal Texts</ChartFooterContent>
                    </ChartFooterButton>
                    <ChartFooterButton2>
                      <FiberManualRecordIcon
                        style={{
                          width: "12px",
                          height: "12px",
                          color: "#8BB14C",
                        }}
                      />
                      <ChartFooterContent>Total DM's</ChartFooterContent>
                    </ChartFooterButton2>
                    <ChartFooterButton3>
                      <FiberManualRecordIcon
                        style={{
                          width: "12px",
                          height: "12px",
                          color: "#4f81bc",
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
                        <TextField
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
                      </MonthField>
                    </MM>
                    <Count>
                      {monthlyStats ? monthlyStats.total_messages : 0}
                    </Count>
                  </ChartTop>
                  <div>
                    <Barchart monthlyStats={monthlyStats} />
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
