import { useState, useEffect } from 'react';
import { Avatar, Box, Checkbox, ListItem, Typography } from '@mui/material';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { RenderMediaType } from '../Media/RenderMediaType';
import { getFileType } from 'utils/Helper';

export const TextMessage = (props) => {

    return (
        <ListItem
            sx={{
                paddingBlock: 1,
                paddingInlineStart: 2,
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
            <Box
                sx={{
                    margin: props.owner ? "0 0 0 30px" : "0 30px 0 0",
                    padding: '10px',
                    color: "common.black", // props.owner ? "common.white" : "common.black",
                    backgroundColor: props.owner ? "#e8f0ff" : "common.white",
                    borderRadius: props.owner ? "10px 10px 0 10px" : "10px 10px 10px 0",
                    userSelect: 'text',
                    boxShadow: '0 0 2px rgba(0, 0, 0, 0.3)',
                }}
            >
                {props.message.media && (
                    <Box sx={{ maxWidth: '420px', '> *': { borderRadius: '5px' } }}>
                        <RenderMediaType url={props.message.media?.urls?.original} type={getFileType(props.message?.media)} />
                    </Box>
                )}
                <Typography
                  sx={{
                    wordWrap: 'break-word',
                    overflowWrap: 'break-word',
                    display: 'inline-block',
                    maxWidth: '300px'
                  }}
                >
                    {props.message.text}
                </Typography>
            </Box>

            <Avatar sx={{
                margin: props.owner ? '0 0 0 10px' : '0 10px 0 0',
                width: "26px",
                height: "26px",
                alignSelf: 'flex-end',
                order: props.owner ? 0 : -1,
            }}
                aria-label="avatar"
                src={props.owner ? props.owmnerAvatar : props.contactAvatar}
            />
        </ListItem>
    )
}