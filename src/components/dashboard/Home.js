import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Chart from "./chart";
import Chart2 from "./chart2";
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
  const [currency, setCurrency] = React.useState("EUR");

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };
  return (
    <DashboardContainer>
      <Grid container style={{ margin: 0, padding: 0 }}>
        <Grid item xs={12} lg={8}>
          <Title>
            <Titleheading>Welcome back Coach Smith!</Titleheading>
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
                  You have <span style={{ color: "#3871DA" }}>13 items</span> in
                  your queue
                </TableHeaderCol2P>
              </Grid>
              <Grid item xs={12} lg={6}>
                <TableHeaderRight>
                  <DateField>
                    <TextField
                      type='date'
                      InputProps={{ disableUnderline: true }}
                      fullWidth={true}
                      style={{ zIndex: 0 }}
                    />
                  </DateField>
                  <FilterField>
                    <FilterText>Filter</FilterText>
                    <FilterIcon />
                  </FilterField>
                </TableHeaderRight>
              </Grid>
            </Grid>
            <Table />
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
                          }}>
                          {currencies.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
                      </MonthField>
                    </MM>
                    <Count>375</Count>
                  </ChartTop>
                  <ChartDivS>
                    <Chart />
                  </ChartDivS>

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
                          }}>
                          {currencies.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
                      </MonthField>
                    </MM>
                    <Count>375</Count>
                  </ChartTop>
                  <div>
                    <Chart />
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
          <HomeRight />
        </Grid>
      </Grid>
    </DashboardContainer>
  );
}

export default Home;
