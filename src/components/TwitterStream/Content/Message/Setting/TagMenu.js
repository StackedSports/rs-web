import React, { useState, useEffect } from "react"
import DialogBox from '../../../../common/Dialogs'
import { Grid } from '@mui/material';
import { Checkbox } from '@mui/material';
import HollowWhiteButton from '../../../../common/Buttons/HollowWhiteButton'
import IconTextField from "../../../../common/Fields/IconTextField";
import LocalOfferOutlinedIcon from "@material-ui/icons/LocalOfferOutlined";
import { getTags } from "../../../../../ApiHelper";
function TagMenu(props) {
    const [showTagsDialog, setShowTagsDialog] = useState(false);
    const [openSnakBar, setOpenSnackBar] = React.useState(false);
 
    const [allTags, setAllTags] = useState(null);
    const [tagSearch, setTagSearch] = useState("");


    useEffect(() => {
        if (localStorage.getItem("user")) {
        
          getAllTags();
          
          // setupPage();
        } else {
          window.location.href = "/";
        }
      }, []);

    const getAllTags = () => {
        getTags().then(
          (res) => {
            // console.log("THis is all tags", res);
            var TAGS = [];
            if (res.statusText === "OK") {
              console.log("These are all tags", res.data);
              res.data.map((item) => {
                TAGS.push({
                  value: item.name,
                  label: item.name,
                });
              });
              setAllTags(TAGS);
            }
          },
          (error) => {
            console.log("this is error all tags", error);
          }
        );
      };


    return (
        <DialogBox
        // title={"POST"}
        maxWidth="sm"
        open={open}
        message={
          <div>
            <p
              style={{
                fontSize: 22,
                color: "black",
                marginTop: 0,
                marginBottom: 0,
                fontWeight: "bold",
                textAlign: "center",
                marginTop: -25,
              }}
            >
              Tags
            </p>
            <Grid container direction="row" justify="center">
              <input
                type="text"
                style={{
                  width: "100%",
                  border: "1px solid #ebebeb",
                  borderRadius: 4,
                  height: 40,
                }}
                placeholder="Search Tag Name"
                value={tagSearch}
                onChange={(e) => {
                  setTagSearch(e.target.value);
                }}
              ></input>
            </Grid>
            <div style={{ maxHeight: 400, minHeight: 400, overflow: "scroll" }}>
              {allTags &&
                allTags.map((tags) => {
                  if (tags.label.indexOf(tagSearch) > -1) {
                    return (
                      <Grid
                        container
                        direction="row"
                        alignItems="center"
                        style={{
                          borderBottom: "1px solid #d8d8d8",
                          paddingTop: 4,
                          paddingBottom: 4,
                        }}
                      >
                        <Grid item md={3} sm={3}>
                          <Checkbox
                            color="primary"
                            onChange={() => {
                              // makeCheckBoxSelected(item.id);
                            }}
                            style={{ marginTop: 1, marginBottom: 1 }}
                          ></Checkbox>
                        </Grid>
                        <Grid item md={9} sm={9}>
                          {tags.label}
                        </Grid>
                      </Grid>
                    );
                  }
                })}
            </div>
            <Grid
              container
              direction="row"
              justify="flex-end"
              style={{ marginTop: 20, marginBottom: 5 }}
            >
              <HollowWhiteButton
                width={100}
                onClick={() => {
                 props.tagMenu(false)
                }}
                text="Cancel"
                textColor="#3871DA"
                background="white"
              ></HollowWhiteButton>
              <IconTextField
                width={100}
                onClick={() => {
                    props.tagMenu(false)
                  setOpenSnackBar(true);
                }}
                text="Tag"
                textColor="white"
                background="#3871DA"
                icon={
                  <LocalOfferOutlinedIcon
                    style={{ color: "white" }}
                  ></LocalOfferOutlinedIcon>
                }
              ></IconTextField>
            </Grid>
          </div>
        }
        // applyForm={() => dispatch(hidePost())}
        cancelForm={() => {
            props.tagMenu(false)
        }}
        hideActions={true}
      />
    )
}

export default TagMenu
