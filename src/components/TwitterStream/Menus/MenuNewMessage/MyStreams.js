import React, { useState  } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useStyles } from '../../../MessageCreate';
import { Grid } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
function MyStreams(props) {

    const classes = useStyles();
    const [showBoardFilters, setshowBoardFilters] = useState(true);
    return (
        <Grid direction='column' >
          {props.myMedia === true ? (
            
            <div >
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
           
         
          <p
            className={classes.sideTwitterFilter}
            onClick={() => {
              // setshowBoardFilters(!showBoardFilters);
          
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
