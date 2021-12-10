import {Grid} from "@material-ui/core";
import DrawerAnimation from "../../../images/drawer_animation.gif";
import DrawerIcon from "../../../images/drawer_contact.png";
import BackAnimation from "../../../images/back_animation.gif";
import BackIcon from "../../../images/back.png";
import FormatAlignLeftOutlinedIcon from '@mui/icons-material/FormatAlignLeftOutlined';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import {FaMagic, FaFilePdf, FaVideo, FaImage} from "react-icons/fa";

import DropDownButton from "../DropDownButton";
import {Link} from "react-router-dom";
import LocalOfferOutlinedIcon from "@material-ui/icons/LocalOfferOutlined";
import React from "react";


const Header=(props)=>{
    return(
        <Grid container direction="row">
            <Grid item md={6} sm={6}>

                {
                    !props.showMediaStats ? (props.showDrawer ?
                            <img src={props.showAnimation ? DrawerAnimation : DrawerIcon} onClick={(e) => {
                                props.setshowSideFilters(!props.showSideFilters);
                                props.setShowDrawer(false);
                                props.setShowAnimation(true);
                                props.handleMediaDrawer(true);
                                props.handleAnimation();
                            }}
                                 style={{cursor: "pointer", width: 40}}></img>
                            :
                            <img src={props.showAnimation ? BackAnimation : BackIcon} onClick={(e) => {
                                props.setshowSideFilters(!props.showSideFilters);
                                props.setShowDrawer(true);
                                props.setShowAnimation(true);
                                props.handleAnimation();
                                props.handleMediaDrawer(false);

                            }}
                                 style={{cursor: "pointer", width: 40}}></img>
                    ) : <FormatAlignLeftOutlinedIcon/>

                }

                {props.showMediaStats ? <span>
  <ArrowBackIosNewOutlinedIcon style={{fontSize: '15px', fill: '#595959', marginLeft: '20px', cursor: 'pointer'}}
                               onClick={
                                   (e) => {

                                       props.setShowMediaStats(false);
                                       props.setSelectedPlaceHolder(null);

                                   }}

  />
              </span> : null}


                {props.showMediaStats ? <span
                    style={{
                        fontWeight: "bold",
                        // marginLeft: 20,
                        fontSize: 18,
                        padding: '5px',
                        marginTop: '3px'
                    }}
                > Back</span> : <span
                    style={{
                        fontWeight: "bold",
                        // marginLeft: 20,
                        fontSize: 20,
                        padding: '16px'
                    }}
                > Media</span>}
            </Grid>
            <Grid item md={6} sm={6}>
                <Grid container direction="row" justify="flex-end">

                    {props.message ? (
                        <div></div>
                    ) : (
                        <DropDownButton
                            haveLink={true}
                            Link={<Link id={"toMessage"} to="/message-create"></Link>}
                            textColorSelected={"#3871DA"}
                            textColor={"white"}
                            backgroundColorSelected={"transparent"}
                            backgroundColor={"#3871DA"}
                            iconSelectedColor={"white"}
                            iconColor={"#3871DA"}
                            text={"Action"}
                            Icon={
                                <FaMagic></FaMagic>
                            }
                            list={props.dropDownButtonItemsList}
                        />


                    )}

                    {props.message ? (
                        <div></div>
                    ) : (
                        <DropDownButton
                            haveLink={true}
                            Link={<Link id={"toTag"} to="/message-create"></Link>}
                            textColorSelected={"grey"}
                            textColor={"gray"}
                            backgroundColorSelected={"transparent"}
                            backgroundColor={"transparent"}
                            iconSelectedColor={"gray"}
                            iconColor={"gray"}
                            text={"Tag"}
                            Icon={
                                <LocalOfferOutlinedIcon></LocalOfferOutlinedIcon>
                            }
                            list={null}
                        />

                    )}
                    {props.message && (
                        <DropDownButton
                            haveLink={true}
                            Link={<Link id={"toTag"} to="/message-create"></Link>}
                            textColorSelected={"grey"}
                            textColor={"gray"}
                            backgroundColorSelected={"transparent"}
                            backgroundColor={"transparent"}
                            iconSelectedColor={"gray"}
                            iconColor={"gray"}
                            text={"Tag"}
                            Icon={
                                <LocalOfferOutlinedIcon></LocalOfferOutlinedIcon>
                            }
                            list={null}
                        />
                    )}


                </Grid>
            </Grid>
        </Grid>
    )

}


export default Header;
