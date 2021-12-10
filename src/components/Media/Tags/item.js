import LocalOfferOutlinedIcon from "@material-ui/icons/LocalOfferOutlined";
import React from "react";
import ItemContainer from './item-container';



const Item=(props)=>{
    return(
        <ItemContainer
            width={200}
            onClick={() => {
                props.setShowTagsDialog(false);
                props.setOpenSnackBar(true);
            }}
            text={props.tag.name}
            textColor="black"
            background="white"
            marginBottom={15}
            icon={
                <LocalOfferOutlinedIcon
                    style={{color: "#3871DA"}}
                ></LocalOfferOutlinedIcon>
            }
        />
    )
}


export default Item;