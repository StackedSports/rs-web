import { useState, useEffect } from 'react';
import { Avatar, Checkbox, ListItem, Typography } from '@mui/material';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

export const TextMessage = (props) => {

    return (
        <ListItem
            sx={{
                paddingBlock: 1,
                paddingInlineStart: props.owner ? 2 : 2,
                paddingInlineEnd: props.owner ? 1 : 2,
                justifyContent: props.owner ? 'flex-end' : 'flex-start',
            }}
        >
            {props.actionActive &&
                <Checkbox
                    checked={props.checked}
                    onChange={(e) => props.onCheck(props.message)}
                    icon={<RadioButtonUncheckedIcon />}
                    checkedIcon={<CheckCircleIcon color='success' />}
                    sx={{ mr: props.owner ? 'auto' : 0 }}
                />
            }
            <Typography sx={{
                margin: props.owner ? "0 0 0 30px" : "0 30px 0 0",
                padding: '10px',
                color: props.owner ? "common.white" : "common.black",
                backgroundColor: props.owner ? "primary.main" : "grey.200",
                borderRadius: props.owner ? "20px 20px 0 20px" : "20px 20px 20px 0",
            }}>
                {props.message.message}
            </Typography>
            {props.owner &&
                <Avatar sx={{
                    margin: '5px 0 5px 10px',
                    width: "26px",
                    height: "26px",
                    alignSelf: "flex-end",
                }}
                    aria-label="avatar"
                    src='https://stakdsocial.s3.us-east-2.amazonaws.com/media/general/contact-missing-image.png'
                />}
        </ListItem>
    )
}