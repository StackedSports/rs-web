import React, { useState  } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useStyles } from '../../../MessageCreate';
import { Grid } from "@material-ui/core";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
function MyStreams(props) {

    const classes = useStyles();
    const [showBoardFilters, setshowBoardFilters] = useState(true);
    return (
        <Grid direction='column'>
          {props.myMedia === true ? (
            
            <div>
            <p className={classes.sideMediaFilter}>
            My Media
            <KeyboardArrowDownIcon
              style={{ fontSize: 25 , marginLeft:'20px'}}
            ></KeyboardArrowDownIcon>
             </p>
            <div>
              {["John Handerson"].map((item) => {
                return (
                  <p
                    className={classes.sideSubFilter}
                    onClick={() => {
                      addDataToFilter(item, "Board");
                    }}
                  >
                    {item}
                  </p>
                );
              })}
            </div>
            <div>
              {["Ben Graves"].map((item) => {
                return (
                  <p
                    className={classes.sideSubFilter}
                    onClick={() => {
                      addDataToFilter(item, "Board");
                    }}
                  >
                    {item}
                  </p>
                );
              })}
            </div>
            <div>
            {["Chris Highland"].map((item) => {
                return (
                  <p
                    className={classes.sideSubFilter}
                    onClick={() => {
                      addDataToFilter(item, "Board");
                    }}
                  >
                    {item}
                  </p>
                );
              })}
            </div>
            <div>
            {["Coach Smith"].map((item) => {
                return (
                  <p
                    className={classes.sideSubFilter}
                    onClick={() => {
                      addDataToFilter(item, "Board");
                    }}
                  >
                    {item}
                  </p>
                );
              })}
            </div>
            <div>
            {["Mark Jones"].map((item) => {
                return (
                  <p
                    className={classes.sideSubFilter}
                    onClick={() => {
                      addDataToFilter(item, "Board");
                    }}
                  >
                    {item}
                  </p>
                );
              })}
            </div>
            <p
            className={classes.sideMediaFilter}
            onClick={() => {
              // setshowBoardFilters(!showBoardFilters);
              setMessageDetails(!messageDetails);
            }}
          >
            Recent
            <ArrowForwardIosIcon
              style={{ fontSize: 15 , marginLeft:'10px'}}
            ></ArrowForwardIosIcon>
          </p>
         
            <p  
               className={classes.sideMediaFilter}
            onClick={() => {
              // setshowBoardFilters(!showBoardFilters);
              setMessageDetails(!messageDetails);
            }}
          >
            Images
            <ArrowForwardIosIcon
              style={{ fontSize: 15, marginLeft:'10px'}}
            ></ArrowForwardIosIcon>
          </p>
          <p  
               className={classes.sideMediaFilter}
            onClick={() => {
              // setshowBoardFilters(!showBoardFilters);
              setMessageDetails(!messageDetails);
            }}
          >
            Videos
            <ArrowForwardIosIcon
              style={{ fontSize: 15, marginLeft:'10px'}}
            ></ArrowForwardIosIcon>
          </p>
          <p  
               className={classes.sideMediaFilter}
            onClick={() => {
              // setshowBoardFilters(!showBoardFilters);
              setMessageDetails(!messageDetails);
            }}
          >
            Personalized Media
            <ArrowForwardIosIcon
              style={{ fontSize: 15, marginLeft:'10px'}}
            ></ArrowForwardIosIcon>
          </p>
          <p  
               className={classes.sideMediaFilter}
            onClick={() => {
              // setshowBoardFilters(!showBoardFilters);
              setMessageDetails(!messageDetails);
            }}
          >
            PlaceHolder
            <ArrowForwardIosIcon
              style={{ fontSize: 15, marginLeft:'10px'}}
            ></ArrowForwardIosIcon>
          </p>
         
      </div>
          ) : (
            <div>
            <p className={classes.sideTwitterFilter}>
            Drafts
            <KeyboardArrowDownIcon
              style={{ fontSize: 25 , marginLeft:'20px'}}
            ></KeyboardArrowDownIcon>
             </p>
            <div>
              {["Ben Graves"].map((item) => {
                return (
                  <p
                    className={classes.sideSubFilter}
                    onClick={() => {
                      addDataToFilter(item, "Board");
                    }}
                  >
                    {item}
                  </p>
                );
              })}
            </div>
         
          <p
            className={classes.sideTwitterFilter}
            onClick={() => {
              // setshowBoardFilters(!showBoardFilters);
              setMessageDetails(!messageDetails);
            }}
          >
            My Streams
            <KeyboardArrowDownIcon
              style={{ fontSize: 25 , marginLeft:'20px'}}
            ></KeyboardArrowDownIcon>
          </p>
          {showBoardFilters === true && (
            <div>
              {["Tickets Needed", "Seats,Tickets,Private box", "Commits Mentioned", "Offers Mentioned"].map(
                (item) => {
                  return (
                    <p
                      className={classes.sideSubFilter}
                      onClick={() => {
                        setMessageDetails(!messageDetails);
                        setMessageStatus("Drafts");
                        setIsMesasgeStatusClick(false);
                        setMessagePreview(null);
                        setMessageSelected([]);

                        addDataToFilter(item, "Board");
                      }}
                    >
                      {item}
                    </p>
                  );
                }
              )}
            </div>
          )}
            <p  
               className={classes.sideTwitterFilter}
            onClick={() => {
              // setshowBoardFilters(!showBoardFilters);
              setMessageDetails(!messageDetails);
            }}
          >
            Team Streams
            <KeyboardArrowDownIcon
              style={{ fontSize: 25, marginLeft:'20px'}}
            ></KeyboardArrowDownIcon>
          </p>
          {showBoardFilters === true && (
            <div>
              {[ "Seats,Tickets,Private box", "Tweeted our media"].map(
                (item) => {
                  return (
                    <p
                      className={classes.sideSubFilter}
                      onClick={() => {
                        setMessageDetails(!messageDetails);
                        setMessageStatus("Drafts");
                        setIsMesasgeStatusClick(false);
                        setMessagePreview(null);
                        setMessageSelected([]);

                        addDataToFilter(item, "Board");
                      }}
                    >
                      {item}
                    </p>
                  );
                }
              )}
            </div>
          )}
      </div>
          )}
            </Grid>
    )
}

export default MyStreams
