import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import moment from "moment";
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
];

export default function AcccessibleTable(props) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <div style={{ maxHeight: 190, overflow: "scroll", minWidth: 630 }}>
        <Table
          stickyHeader
          className={classes.table}
          aria-label="caption table"
        >
          <TableHead
            style={{
              borderStyle: "solid",
              borderWidth: "1px",
              borderColor: "#d8d8d8",
              background: "#F5F6F9",
            }}
          >
            <TableRow>
              <TableCell
                style={{ color: "#222222", fontWeight: 600, fontSize: 14 }}
              >
                Send Time
              </TableCell>
              <TableCell
                align="left"
                style={{ color: "#222222", fontWeight: 600, fontSize: 14 }}
              >
                Sender
              </TableCell>
              <TableCell
                align="left"
                style={{ color: "#222222", fontWeight: 600, fontSize: 14 }}
              >
                Recipients
              </TableCell>
              <TableCell
                align="left"
                style={{ color: "#222222", fontWeight: 600, fontSize: 14 }}
              >
                Type
              </TableCell>
              <TableCell
                align="left"
                style={{ color: "#222222", fontWeight: 600, fontSize: 14 }}
              >
                Send Time
              </TableCell>
              <TableCell
                align="left"
                style={{ color: "#222222", fontWeight: 600, fontSize: 14 }}
              >
                Status
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {props.selectedDateQueue &&
              props.selectedDateQueue.map((item) => {
                return (
                  <TableRow>
                    <TableCell
                      component="th"
                      scope="row"
                      style={{
                        color: "#A4A4A4",
                        fontWeight: 600,
                        fontSize: 13,
                      }}
                    >
                      {moment(item.send_at).format("h:mm:ss a")}
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{
                        color: "#A4A4A4",
                        fontWeight: 600,
                        fontSize: 13,
                      }}
                    >
                      {item.sender
                        ? item.sender.first_name + " " + item.sender.last_name
                        : item.queued_by}
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{
                        color: "#A4A4A4",
                        fontWeight: 600,
                        fontSize: 13,
                      }}
                    >
                      Individuals ({item.recipients && item.recipients.count})
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{
                        color: "#A4A4A4",
                        fontWeight: 600,
                        fontSize: 13,
                      }}
                    >
                      {item.item_type}
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{
                        color: "#A4A4A4",
                        fontWeight: 600,
                        fontSize: 13,
                      }}
                    >
                      {moment(item.next_send_at).format("h:mm:ss a")}
                    </TableCell>
                    <TableCell align="left">
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        {item.status != "In Progress" && (
                          <CheckCircleIcon
                            fontSize="inherit"
                            style={{ color: "#006644" }}
                          />
                        )}

                        <p
                          style={{
                            color: "#A4A4A4",
                            margin: 0,
                            padding: 0,
                            fontWeight: 600,
                            fontSize: 13,
                          }}
                        >
                          {item.status}
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            {/*         
          <TableRow>
            <TableCell
              component='th'
              scope='row'
              style={{ color: "#222222", fontWeight: 600, fontSize: 13 }}>
              11:30am
            </TableCell>
            <TableCell
              align='left'
              style={{ color: "#222222", fontWeight: 600, fontSize: 13 }}>
              Coach Marks
            </TableCell>
            <TableCell
              align='left'
              style={{ color: "#3871DA", fontWeight: 600, fontSize: 13 }}>
              Miami Board{" "}
              <span style={{ color: "#222222", fontWeight: 600, fontSize: 13 }}>
                (184)
              </span>
            </TableCell>
            <TableCell
              align='left'
              style={{ color: "#222222", fontWeight: 600, fontSize: 13 }}>
              DM's
            </TableCell>
            <TableCell
              align='left'
              style={{ color: "#222222", fontWeight: 600, fontSize: 13 }}>
              11:32am
            </TableCell>
            <TableCell align='left'>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}>
                <CheckCircleIcon
                  fontSize='inherit'
                  style={{ color: "transparent" }}
                />
                <p
                  style={{
                    color: "#222222",
                    margin: 0,
                    padding: 0,
                    fontWeight: 600,
                    fontSize: 13,
                  }}>
                  In Progress
                </p>
              </div>
            </TableCell>
          </TableRow>
        */}
          </TableBody>
        </Table>{" "}
      </div>
    </TableContainer>
  );
}
