import React, { useState  } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useStyles } from '../../../MessageCreate';
import { Grid } from "@material-ui/core";
function MyStreams() {

    const classes = useStyles();
    const [showBoardFilters, setshowBoardFilters] = useState(true);
    return (
        <Grid direction='column'>
          
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
        </Grid>
    )
}

export default MyStreams
