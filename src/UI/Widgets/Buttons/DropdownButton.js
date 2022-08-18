import { useState } from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

export default function DropdownButton(props) {
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    
    const onClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const onClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            {/* <Button
                id={props.id}
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={onClick}
            >
                {props.label}
            </Button> */}
            <IconButton
              size='small' 
              sx={{ color: 'text.secondary' }}
              id={props.id}
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={onClick}
            >
                <MoreHorizIcon fontSize="inherit" />
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={onClose}
                MenuListProps={{
                'aria-labelledby': 'basic-button',
                }}
            >
                {props.actions && props.actions.map(action => (
                    <MenuItem key={action.label} onClick={action.onClick}>{action.label}</MenuItem>
                ))}
            </Menu>
        </div>
    );
}