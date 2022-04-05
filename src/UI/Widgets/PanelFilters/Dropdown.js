import { useState } from 'react';
import { Menu, MenuItem, Button } from '@mui/material'
import { ExpandMore, ExpandLess } from '@material-ui/icons'

export const DropDown = ({ label, options, onOptionSelected }) => {

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClickItem = (item) => {
        onOptionSelected(item)
        handleClose()
    }

    return (
        <>
            <Button
                variant='outlined'
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                endIcon={open ? <ExpandLess /> : <ExpandMore />}
            >
                {label}
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: 48 * 5,
                        minWidth: '10ch',
                    },
                }}
            >
                {options.map(option => (
                    <MenuItem key={option.name} onClick={()=>handleClickItem(option)}>
                        {option.name}
                    </MenuItem>
                ))}
            </Menu>
        </>

    )
}
