import LinearProgress from '@mui/material/LinearProgress';


import {
    Grid,
    Dialog,
    Snackbar,
    makeStyles,
    withStyles,
    Slider,
    Backdrop,
} from "@material-ui/core";


import DeleteForeverIcon from "@material-ui/icons/DeleteForever"; // ----
import ClearIcon from "@material-ui/icons/Clear"; // ----

import {
    SearchableOptions,
    SearchableOptionDropdown,
    SearchableOptionListItem,

    constructProperty
  } from 'UI/Forms/Inputs/SearchableOptions'

const useStyles = makeStyles({
    tags: {
      border: "1px solid #d8d8d8",
      height: 50,
      width: "max-content",
      fontWeight: 600,
      borderRadius: 4,
      paddingLeft: 16,
      paddingRight: 16,
      margin: 8,
    },
    dropdownHidden: {
      display: "none",
      position: "absolute",
      backgroundColor: "white",
      minWidth: 230,
      boxShadow: "0px 8px 16px 0px rgba(0, 0, 0, 0.2)",
      border: "1px solid #d5d5d5",
      borderRadius: 4,
      // padding: 5,
      zIndex: 1,
      maxHeight: 200,
      overflowY: "scroll",
      overflowX: "hidden",
      zIndex: 200000000,
    },
    hoverGrid: {
      height: 50,
      marginLeft: 0,
      // marginTop: -12,
      cursor: "pointer",
      color: "#3871da",
      "&>p": {
        color: "black",
      },
      "&:hover": {
        background: "#3871da",
        color: "white",
        "&>p": {
          color: "white",
        },
      },
    },
    tableP: { margin: 0, marginLeft: 12, fontSize: 16, fontWeight: 600 },
    uploadCSVSpan: { color: "#989482", marginLeft: 8, marginRight: 16 },
    uploadCSVGrid: {
      height: 30,
      width: 30,
      borderRadius: 50,
      border: "1px solid #989482",
      color: "#989482",
    },
    CSVDetails: {
      color: "#62614e",
      width: "70%",
      textAlign: "justify",
      fontWeight: 600,
      fontSize: 13,
      marginTop: 10,
    },
    uploadCSVGridActive: {
      height: 30,
      width: 30,
      borderRadius: 50,
      border: "1px solid #3871da",
      background: "#3871da",
      color: "white",
    },
  
    uploadCSVGridDone: {
      height: 30,
      width: 30,
      borderRadius: 50,
      border: "1px solid #3871da",
      background: "#006644",
      color: "white",
    },
  
    deleteForverIcon: {
      "&:hover": {
        cursor: "pointer"
      },
    }
});

export const MediaTableItemLoading = (props) => {
    return (
        <Grid
          style={{
            height: 40,
            flex: "auto",
            border: "none",
            padding: 16,
            ...props.style
          }}
        >
            <LinearProgress
            style={{
                width: 240
            }}
            />
            {/* <p>Loading...</p> */}
        </Grid>
    )
}

export const MediaUploadStatus = (props) => {
    switch(props.status) {
        case "none": return <p style={{color: "#aaa", width: 240}}></p>
        case "ready": return <p style={{color: "#aaa", width: 240}}>Ready To Upload</p>
        case "failed": return <p style={{color: "red", width: 240}}>Failed To Upload</p>
        case "success": return <p style={{color: "green", width: 240}}>Upload Successfull!</p>
    
        case "uploading":
            return (
                <MediaTableItemLoading
                    style={{
                    paddingTop: 10,
                    paddingLeft: 0,
                    paddingRight: 0
                    }}
                />
            )
    }

    // {uploadStatus[index] === "none" && (
    //     <p style={{color: "#aaa", width: 240}}></p>
    //   )}
    //   {uploadStatus[index] === "ready" && (
    //     <p style={{color: "#aaa", width: 240}}>Ready To Upload</p>
    //   )}
    //   {uploadStatus[index] === "failed" && (
    //     <p style={{color: "red", width: 240}}>Failed To Upload</p>
    //   )}
    //   {uploadStatus[index] === "success" && (
    //     <p style={{color: "green", width: 240}}>Upload Successfull!</p>
    //   )}
    return (
        <div></div>
    )
}

export const MediaUploadHeader = (props) => {
    const classes = useStyles();

    return (
        <Grid
          container
          style={{
            background: "#f6f8fa",
            height: 50,
          }}
          alignItems="center"
        >
        <Grid item md={4}>
            <Grid container direction="row">
            <p className={classes.tableP}> File Name</p>
            </Grid>
        </Grid>
        <Grid item md={4}>
            <Grid container direction="row"></Grid>
            <p className={classes.tableP}>Associated</p>
        </Grid>
        <Grid item md={4}>
            <Grid container direction="row"></Grid>
            <p className={classes.tableP}>Upload Status</p>
        </Grid>
        </Grid>
    )
}

export const MediaUploadItem = (props) => {
    const classes = useStyles();

    return (
        <Grid container style={{ height: 60 }} alignItems="center">
        <Grid item md={4}>
            <p className={classes.tableP}> {props.item.name}</p>
        </Grid>
        <Grid item md={4}>
            {props.optionSelected === "loading" && 
                <MediaTableItemLoading/>
            }

            {props.optionSelected === null && !props.disableAssociateInput && (
                <SearchableOptionDropdown
                  id={props.id}
                  placeholder="+ Associate Contact"
                  options={props.searchOptions}
                  search={props.searchOptions}
                  imgDef={props.optionImgDef}
                  nameDef={props.optionNameDef}
                  showDropDown={props.showContactDropDown}
                  onOptionSelected={props.onOptionSelected}
                  onInputChange={props.onSearchTermChange}
                  onInputPressEnter={props.onSearchTermKeyPress}
                  onShowDropDown={props.onShowContactDropDown}
                />

                // <SearchableOptionDropdown
                //     placeholder='+ Associate Contact'
                //     options={teamContacts}
                //     imgDef={'twitter_profile.profile_image'}
                //     nameDef={['first_name', 'last_name']}
                //     onOptionSelected={(contact, index) => associateContactToMedia(contact, index)}
                // />
            
            //   <div class="dropdownMedia"
            //   onClick={(e) => e.stopPropagation()}
            // >
            //   <input
            //     type="text"
            //     style={{
            //       height: 40,
            //       flex: "auto",
            //       border: "none",
            //       padding: 16,
            //     }}
            //     id={"associate" + props.item.name}
            //     onClick={(e) => {
            //       e.preventDefault();
            //       e.stopPropagation();
            //       props.onShowContactDropDown(e.target.id);
            //       //displayAssociate = e.target.id;
            //       console.log("This is id down", e.target.id);
            //     }}
            //     placeholder="+ Associate Contact"
            //   ></input>
            //   <div
            //     className={classes.dropdownHidden}
            //     style={{
            //       display:
            //         props.showContactDropDown == ("associate" + props.item.name)
            //           ? "block"
            //           : "none",
            //       maxHeight: 240,
            //     }}
            //   >
            //     <input
            //       type="text"
            //       style={{
            //         width: "90%",
            //         border: "1px solid #ebebeb",
            //         borderRadius: 4,
            //         marginTop: 8,
            //         marginBottom: 4,
            //         marginLeft: 12,
            //         padding: 4
            //       }}
            //       id="searchTeamContact"
            //       placeholder="Search Contact"
            //       value={props.searchTerm}
            //       onChange={(e) => {
            //         props.onSearchTermChange(e.target.value);
            //         //setDisplayTeamContact(true);
            //       }}
            //       onKeyPress={props.onSearchTermKeyPress}
            //       onClick={(e) => {
            //         e.stopPropagation()
            //         //setDisplayPlaceholder(true);
            //       }}
            //     ></input>
            //     {props.searchOptions &&
            //       props.searchOptions.map((option, index) => {
            //         return (
            //           <SearchableOptionListItem
            //             item={option}
            //             imgDef={props.optionImgDef}
            //             nameDef={props.optionNameDef}
            //             onSelected={() => props.onOptionSelected(option, index)}
            //           />
            //         );
            //       })}
            //   </div>{" "}
            // </div>
            )}
            {props.optionSelected && props.optionSelected !== "loading" &&  
              (
                <div
                container
                direction="row"
                alignItems="center"
                justify="center"
                className={classes.tags}
                >
                <Grid
                    style={{ height: 50 }}
                    container
                    direction="row"
                    alignItems="center"
                >
                  {props.optionSelected.twitter_profile &&
                    <img
                      style={{
                      width: 30,
                      height: 30,
                      borderRadius: 20,
                      // marginLeft: 12,
                      marginRight: 12
                      }}
                      src={props.optionSelected.twitter_profile.profile_image}
                    />
                  }
                    {constructProperty(props.optionSelected, props.optionSelectedNameDef)}
                    {!props.disableAssociateInput &&
                      <ClearIcon
                        onClick={() => {
                          if(!props.disableAssociateInput) props.onRemoveOptionSelected()
                        }}
                        style={{
                          color: "red",
                          fontSize: 17,
                          cursor: "pointer",
                          marginLeft: 8,
                        }}
                      />
                    }
                    
                </Grid>
                </div>
              )
            }

            {props.disableAssociateInput && !props.optionSelected &&
              <p style={{color: "#aaa", width: 240, marginLeft: 16 }}>None</p>
            }
        </Grid>
        <Grid item md={4}>
            <Grid
            container
            direction="row"
            alignItems="center"
            style={{ height: 40 }}
            >
            <Grid
                style={{
                height: 40,
                //flex: "auto",
                border: "none",
                padding: 8,
                paddingLeft: 16,
                }}
                
                alignItems="center"
            >
                <MediaUploadStatus status={props.itemUploadStatus}/>
            </Grid>
            {!props.disableAssociateInput &&
              <DeleteForeverIcon
                  className={classes.deleteForverIcon}
                  style={{ color: "#444"}}
                  onClick={() => {
                      props.onDeleteMedia()
                  }}
              />
            }
            
            </Grid>
        </Grid>
        </Grid>
    )
}

