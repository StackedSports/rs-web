import { useState, useMemo, useEffect, useRef, useCallback } from "react";
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
    ListItemIcon,
    Checkbox,
} from "@mui/material";
import { Search, KeyboardArrowDown } from "@mui/icons-material";
import RenderIf from "../RenderIf";

export const Dropdown = ({
    type,
    icon,
    label,
    options,
    loading,
    showSearchInput,
    onSearch,
    onClick,
    getOptionLabel,
    getOptionValue,
    keepOpen,
    selectionModel,
    checkboxSelection,
    ...restOfProps
}) => {
    const buttonRef = useRef(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [checkedItemsId, setCheckedItemsId] = useState([]);
    const debouncedSearch = useMemo(() => debounce(onSearch, 400), [onSearch]);
    const [filteredOptions, setFilteredOptions] = useState();

    useEffect(() => {
        if (onSearch)
            debouncedSearch(searchText)
        else if (showSearchInput) {
            if (!searchText)
                setFilteredOptions(null)
            setFilteredOptions(options.filter(option => {
                console.log(getOptionLabel)
                return true
            }));
        }
    }, [searchText])


    useEffect(() => {
        if (selectionModel && selectionModel.length > 0)
            setCheckedItemsId(selectionModel.map(item => item.id))
        else
            setCheckedItemsId([])
    }, [selectionModel?.length])

    useEffect(() => {
        console.log(checkedItemsId)
    }, [checkedItemsId])

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
    const activeOptions = useMemo(() => filteredOptions ?? options, [filteredOptions, options])

    const handleClickOption = (option) => {

        /*         if (!selectionModel)
                    setCheckedItemsId(prev => {
                        if (prev.some(item => item === option.id))
                            return prev.filter(item => item !== option.id)
                        else
                            return [...prev, option.id]
                    }); */

        onClick(option);
        if (!keepOpen)
            handleClose();
    }

    const open = Boolean(anchorEl);

    const isChecked = (option) => {

        if (getOptionValue) {
            return checkedItemsId.indexOf(getOptionValue(option)) > - 1;
        } else if ('id' in option) {
            return checkedItemsId.indexOf(option.id) > - 1;
        } else {
            return checkedItemsId.indexOf(option) > - 1;
        }
    }

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
                disablePortal
            >
                <Paper
                    elevation={3}
                    sx={{
                        minWidth: buttonRef.current?.offsetWidth || 'fit-content',
                        maxWidth: '350px',
                        maxHeight: '250px',
                        overflowY: 'auto',
                        '& .MuiMenuItem-root': {
                            maxWidth: '350px',
                            px: 1,
                        }
                    }}
                >
                    <ClickAwayListener onClickAway={() => handleClose()}>
                        <MenuList
                            autoFocusItem={open}
                            onKeyDown={handleListKeyDown}
                        >
                            <RenderIf condition={(onSearch && onSearch instanceof Function) || showSearchInput}>
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
                                Array.isArray(activeOptions) ? activeOptions?.map((option, i) => (
                                    <MenuItem
                                        key={option.id || i}
                                        onClick={() => handleClickOption(option)}
                                    >
                                        <RenderIf condition={checkboxSelection}>
                                            <ListItemIcon>
                                                <Checkbox checked={isChecked(option)} />
                                            </ListItemIcon>
                                        </RenderIf>
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