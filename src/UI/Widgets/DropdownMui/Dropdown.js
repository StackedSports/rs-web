import { useState, useMemo, useEffect, useRef, useLayoutEffect } from "react";
import lodash from "lodash";
import {
    Box,
    MenuList,
    MenuItem,
    ListSubheader,
    TextField,
    InputAdornment,
    IconButton,
    Button,
    Paper,
    Popper,
    ClickAwayListener,
    debounce,
    ListItemText,
} from "@mui/material";
import { Search, KeyboardArrowDown } from "@mui/icons-material";
import RenderIf from "../RenderIf";



export const Dropdown = ({ type, icon, label, options, loading, onSearch, onClick, getOptionLabel, keepOpen,...restOfProps }) => {
    const buttonRef = useRef(null);
    const [buttonWidth, setButtonWidth] = useState(0);
    const [anchorEl, setAnchorEl] = useState(null);
    const [searchText, setSearchText] = useState('');
    const debouncedSearch = useMemo(() => debounce(onSearch, 400), [onSearch]);

    useEffect(() => {
        if (onSearch)
            debouncedSearch(searchText)
    }, [searchText])

    useLayoutEffect(() => {
        if (buttonRef.current)
            setButtonWidth(buttonRef.current.offsetWidth);
    }, [])

    const handleToggle = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setSearchText('');
    };

    const handleListKeyDown = (event) => {
        if (event.key === 'Tab') {
            event.preventDefault();
            handleClose();
        } else if (event.key === 'Escape') {
            handleClose();
        }
    }

    const handleClickOption = (option) => {
        // console.log("option clicked", option)
        onClick(option);
        if (!keepOpen)
            handleClose();
    }

    const open = Boolean(anchorEl);

    return (
        <Box {...restOfProps}>
            <RenderIf condition={type === 'icon'}>
                <IconButton ref={buttonRef} onClick={handleToggle}>
                    {icon}
                </IconButton>
            </RenderIf>
            <RenderIf condition={type !== 'icon'}>
                <Button variant='outlined' endIcon={<KeyboardArrowDown />} onClick={handleToggle} ref={buttonRef}>
                    {label}
                </Button>
            </RenderIf>
            <Popper
                open={open}
                anchorEl={anchorEl}
                placement="bottom-start"
                sx={{ zIndex: 'fab' }}
            >
                <Paper
                    elevation={3}
                    sx={{
                        minWidth: buttonWidth,
                        maxWidth: '350px',
                        maxHeight: '250px',
                        overflowY: 'auto',
                        '& .MuiMenuItem-root': {
                            maxWidth: '350px',
                        }
                    }}
                >
                    <ClickAwayListener onClickAway={() => handleClose()}>
                        <MenuList
                            autoFocusItem={open}
                            onKeyDown={handleListKeyDown}
                        >
                            <RenderIf condition={onSearch && onSearch instanceof Function}>
                                <ListSubheader sx={{ pt: 1 }}>
                                    <TextField
                                        size="small"
                                        // Autofocus on textfield
                                        autoFocus
                                        placeholder="Type to search..."
                                        fullWidth
                                        value={searchText}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Search />
                                                </InputAdornment>
                                            )
                                        }}
                                        onChange={(e) => setSearchText(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key !== "Escape") {
                                                // Prevents autoselecting item while typing (default Select behaviour)
                                                e.stopPropagation();
                                            }
                                        }}
                                    />
                                </ListSubheader>
                            </RenderIf>
                            <RenderIf condition={loading}>
                                <ListSubheader>Loading...</ListSubheader>
                            </RenderIf>
                            <RenderIf condition={!loading && (!options || options?.length == 0)}>
                                <MenuItem disabled>
                                    No results found
                                </MenuItem>
                            </RenderIf>


                            {// if options is array of objects
                                Array.isArray(options) ? options?.map((option, i) => (
                                    <MenuItem key={option.id || i} onClick={() => handleClickOption(option)} >
                                        <ListItemText
                                            primary={getOptionLabel ? getOptionLabel(option) : option}
                                            primaryTypographyProps={{ noWrap: true }}
                                        />
                                    </MenuItem>
                                ))
                                    :
                                    // if options is an object with array will creat subheader to each key
                                    Object.keys(options).map((key, index) => (
                                        [
                                            <ListSubheader sx={{ fontWeight: 'bold', textTransform: 'capitalize' }} >{key.replace('_', ' ')}</ListSubheader>,
                                            Array.isArray(options[key]) && options[key]?.map((option, i) => (
                                                <MenuItem key={option.id || i} onClick={() => handleClickOption(option)}>
                                                    <ListItemText
                                                        primary={getOptionLabel ? getOptionLabel(option) : option}
                                                        primaryTypographyProps={{ noWrap: true }}
                                                    />
                                                </MenuItem>
                                            ))
                                        ]
                                    ))
                            }

                        </MenuList>
                    </ClickAwayListener>
                </Paper>
            </Popper>
        </Box>
    );
}

export default Dropdown;