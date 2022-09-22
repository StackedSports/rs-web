import React from 'react';
import Linkify from 'react-linkify';
import { Avatar, Box, Checkbox, ListItem, styled, Typography } from '@mui/material';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { RenderMediaType } from '../Media/RenderMediaType';
import { getFileType } from 'utils/Helper';
import { formatDate } from 'utils/Parser';
import { IConversatition } from 'Interfaces';
interface TextMessageProps {
    actionActive?: boolean;
    checked?: boolean;
    message: IConversatition;
    owmnerAvatar: string;
    contactAvatar: string;
    owner: boolean;
    onCheck: (message: IConversatition) => void
}

export const TextMessage: React.FC<TextMessageProps> = (props) => {

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
                    onChange={() => props.onCheck(props.message)}
                    icon={<RadioButtonUncheckedIcon />}
                    checkedIcon={<CheckCircleIcon color='success' />}
                    sx={{ mr: props.owner ? 'auto' : 0 }}
                />
            }
            <Box >
                <Box
                    sx={{
                        padding: '10px 15px',
                        color: "common.black", // props.owner ? "common.white" : "common.black",
                        backgroundColor: props.owner ? "#e8f0ff" : "common.white",
                        borderRadius: props.owner ? "10px 10px 0 10px" : "10px 10px 10px 0",
                        userSelect: 'text',
                        boxShadow: 2
                    }}
                >
                    {props.message.media && !Array.isArray(props.message.media) && (
                        <Box sx={{ maxWidth: '300px', '> *': { borderRadius: '5px' } }}>
                            <RenderMediaType
                                url={props.message.media?.urls?.original}
                                type={getFileType(props.message?.media)}
                            />
                        </Box>
                    )}
                    {props.message.media && Array.isArray(props.message.media) && (
                        <Box sx={{ maxWidth: '300px', '> *': { borderRadius: '5px' } }}>
                            {props.message.media?.map((media, index) =>
                                <RenderMediaType
                                    key={index}
                                    url={media?.urls?.original}
                                    type={getFileType(media.file_type)}
                                />
                            )}
                        </Box>
                    )}

                    <Typography
                        sx={{
                            maxWidth: '300px',
                            wordWrap: 'break-word',
                            overflowWrap: 'break-word',
                            '>a': { textDecoration: 'underline', color: 'primary.main' }
                        }}
                    >
                        <Linkify
                            componentDecorator={(decoratedHref, decoratedText, key) => (
                                <a target="blank" href={decoratedHref} key={key}>
                                    {decoratedText}
                                </a>
                            )}
                        >
                            {props.message.text}
                        </Linkify>
                    </Typography>
                </Box>
                <Time fontSize={9.5} color='text.secondary' textAlign={props.owner ? 'right' : 'left'}>
                    {formatDate(props.message.created_at, 'short', 'short')}
                </Time>
            </Box>

            <Avatar sx={{
                margin: props.owner ? '0 0 30px 10px' : '0 10px 30px 0',
                width: "26px",
                height: "26px",
                alignSelf: 'end',
                order: props.owner ? 0 : -1,
            }}
                aria-label="avatar"
                src={props.owner ? props.owmnerAvatar : props.contactAvatar}
            />
        </ListItem >
    )
}

const Time = styled(Typography)`
  margin-top: 6px;
  margin-inline: 4px;
`