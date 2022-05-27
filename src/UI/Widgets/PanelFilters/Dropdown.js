import { useState, useMemo, useEffect, useRef, useLayoutEffect } from "react";
import {
    Box,
    MenuList,
    MenuItem,
    ListSubheader,
    TextField,
    InputAdornment,
    Button,
    Paper,
    Popper,
    ClickAwayListener,
    debounce,
} from "@mui/material";
import { Search, KeyboardArrowDown } from "@mui/icons-material";
import RenderIf from "../RenderIf";



export const Dropdown = ({ label, options, loading, onSearch, onClick, getOptionLabel, keepOpen }) => {
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
        console.log("option clicked", option)
        onClick(option);
        if (!keepOpen)
            handleClose();
    }

    const open = Boolean(anchorEl);

    return (
        <Box>
            <Button variant='outlined' endIcon={<KeyboardArrowDown />} onClick={handleToggle} ref={buttonRef}>
                {label}
            </Button>
            <Popper
              open={open}
              anchorEl={anchorEl}
              placement="bottom-start"
              sx={{ zIndex: 5 }}
            >
                <Paper
                  elevation={3}
                  sx={{
                      minWidth: buttonWidth,
                      maxHeight: '250px',
                      overflowY: 'auto'
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
                            <RenderIf condition={!loading && (!options || options.length == 0)}>
                                <MenuItem disabled>
                                    No results found
                                </MenuItem>
                            </RenderIf>
                            {options.map((option, i) => (
                                <MenuItem key={option.id || i} onClick={() => handleClickOption(option)} >
                                    {getOptionLabel(option)}
                                </MenuItem>
                            ))}
                        </MenuList>
                    </ClickAwayListener>
                </Paper>
            </Popper>
        </Box>
    );
}