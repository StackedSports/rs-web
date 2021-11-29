import React, { useState  } from "react";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { useStyles } from '../../../MessageCreate';
function MyStreams() {
    const classes = useStyles();
    const [showBoardFilters, setshowBoardFilters] = useState(true);
    return (
        <div>
             <p className={classes.sideFilter}>
              Drafts{" "}
              <ArrowForwardIosIcon
                style={{ fontSize: 12 }}
              ></ArrowForwardIosIcon>
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
            </p>
            <p
              className={classes.sideFilter}
              onClick={() => {
                // setshowBoardFilters(!showBoardFilters);
                setMessageDetails(!messageDetails);
              }}
            >
              My Streams
              <ArrowForwardIosIcon
                style={{ fontSize: 12 }}
              ></ArrowForwardIosIcon>
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
                 className={classes.sideFilter}
              onClick={() => {
                // setshowBoardFilters(!showBoardFilters);
                setMessageDetails(!messageDetails);
              }}
            >
              Team Streams
              <ArrowForwardIosIcon
                style={{ fontSize: 12 }}
              ></ArrowForwardIosIcon>
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
    )
}

export default MyStreams
