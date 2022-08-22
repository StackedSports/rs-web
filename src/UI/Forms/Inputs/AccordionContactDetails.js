import { useState, useContext } from 'react'

import {
    makeStyles,
    Grid,
} from "@material-ui/core";
import {Button as MuiButton } from '@mui/material';

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Accordion, AccordionContext, Card } from "react-bootstrap";

const useStyles = makeStyles((theme) => ({
    icons: {
        color: "#d8d8d8",
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        margin: 0,
        color: "gray",
        marginLeft: 5,
        fontWeight: 500,
        width: "100%",
        fontSize: 14,
    },
    input: {
        border: "none",
        borderBottom: "1px solid #d8d8d8",
        height: 40,
        marginLeft: 5,
        fontSize: 18,
        width: "95%",
        "&:active": {
            border: "none",
        },
        "&:focus": {
            border: "none",
            outlineColor: "#ddd",
            outlineWidth: 0.5
        },
    },
    accordionP: {
        color: "black",
        margin: 0,
        fontWeight: 600,
        fontSize: 16,
        flex: 1,
        textTransform: "uppercase",
        [theme.breakpoints.up("xl")]: {
            fontSize: 18,
        },
    },
    accordionGray: {
        color: "gray",
        marginLeft: 16,
        fontWeight: 500,
        fontSize: 14,
    },
    accordionGridHeight: {
        height: 36,
    },
}));

function AccordionContactDetails(props) {
    const classes = useStyles()

    const [collapsed, setCollapsed] = useState(false)
    const [shouldSave, setShouldSave] = useState(false)


    const onClick = (e) => {
        console.log('clickedy click')
        setCollapsed(!collapsed)
    }

    const onChange = (e) => {
        if(!shouldSave) setShouldSave(true)

        props.onChange(e)
    }

    const onSave = (e) => {
        e.stopPropagation()
        props.onSave()
    }

    const arrowUp = 'rotate(-90deg)'
    const arrowDown = 'rotate(90deg)'

    const arrowTransform = collapsed ? arrowUp : arrowDown

    return (
        <Card style={{ marginLeft: 0, marginRight: 0, paddingLeft: 0, paddingRight: 0}}>
            <Accordion.Toggle as={Card.Header} style={{ marginLeft: 0, marginRight: 0}} eventKey={props.eventKey}>
                <Grid
                    container
                    direction="row"
                    alignItems="center"
                    className={classes.accordionGridHeight}
                    onClick={onClick}
                >
                    <p className={classes.accordionP}>
                        {props.label + " "}
                        <span className={classes.accordionGray}>
                            {/* 3/6 complete */}
                        </span>
                    </p>
                    {shouldSave && 
                        <MuiButton
                        onClick={onSave}
                            style={{
                            // fontWeight: "bold",
                            }}
                            disableElevation
                            variant="contained"
                            // border
                            background={"#3871da"}
                        >
                            Save
                        </MuiButton>
                    }
                    <ArrowForwardIosIcon
                      style={{ fontSize: 15, marginLeft: 20, transform: arrowTransform, transition: '200ms all' }}
                    ></ArrowForwardIosIcon>
                </Grid>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={props.eventKey}>
                <Card.Body style={{height: props.height}}>
                    {props.items && props.items.map(item => {
                        return (
                            <div key={item.name} className={classes.inputContainer}>
                                <label
                                className={classes.label}
                                for={item.name}
                                >
                                    {item.label}
                                </label>
                                <input
                                className={classes.input}
                                name={item.name}
                                value={item.value}
                                onChange={onChange}
                                />
                            </div>
                        )
                    })}
                    {props.children}
                </Card.Body>
            </Accordion.Collapse>
        </Card>
    )
}

const labelStyle = {
    margin: 0,
    color: "gray",
    marginLeft: 5,
    fontWeight: 500,
    width: "100%",
    fontSize: 14,
}

AccordionContactDetails.Label = (props) => <p style={labelStyle}>{props.label}</p>

export default AccordionContactDetails

