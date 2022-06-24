import { useState } from 'react';
import { Avatar, Checkbox, ListItem, Typography } from '@mui/material';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

export const TextMessage = (props) => {

    const [checked, setChecked] = useState(false);

    const handleChange = (event) => {
        setChecked(event.target.checked);
        props.onCheck(event.target.checked)
    };

    return (
        <ListItem
            sx={{
                paddingBlock: 1,
                paddingInlineStart: props.owner ? 2 : 2,
                paddingInlineEnd: props.owner ? 1 : 2,
            }}
        >
            {props.actionActive &&
                <Checkbox
                    checked={checked}
                    onChange={handleChange}
                    icon={<RadioButtonUncheckedIcon />}
                    checkedIcon={<CheckCircleIcon color='success' />}
                />
            }
            <Typography sx={{
                margin: props.owner ? "0 0 0 30px" : "0 30px 0 0",
                padding: '10px',
                color: props.owner ? "common.white" : "common.black",
                backgroundColor: props.owner ? "primary.main" : "grey.200",
                borderRadius: props.owner ? "20px 20px 0 20px" : "20px 20px 20px 0",
            }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
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