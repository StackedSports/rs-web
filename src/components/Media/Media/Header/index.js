import {Grid} from "@mui/material";
import {Dropdown} from "react-bootstrap";
import React from "react";


const MainHeader = (props)=>{



    return(
        <Grid direction="row" container style={{marginTop:20}}>
            <Grid md={6}>
                <p>{props.title}</p>
            </Grid>
            <Grid md={6} direction="row" justify="flex-end">
                <div style={{textAlign: "end"}}>
                    <Dropdown>
                        <Dropdown.Toggle
                            as={props.CustomToggle}
                            id="dropdown-custom-components"
                        >
                            {props.dropdown_item_title}
                        </Dropdown.Toggle>

                        <Dropdown.Menu
                            // as={CustomMenu}
                        >
                            <Dropdown.Item eventKey="1">{props.dropdown_item_title}</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </Grid>
        </Grid>
    )
}

export default MainHeader;