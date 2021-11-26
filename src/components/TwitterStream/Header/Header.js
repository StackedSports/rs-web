import * as React from 'react';
import AppBar from "@mui/material/AppBar/AppBar";
import Toolbar from "@mui/material/Toolbar/Toolbar";
import Divider from "@mui/material/Divider/Divider";
import Button from "@mui/material/Button/Button";
import Typography from "@mui/material/Typography/Typography";
import Box from "@mui/material/Box/Box";
import Badge from "@mui/material/Badge/Badge";
import InputBase from "@mui/material/InputBase/InputBase";


import {styled} from "@mui/material";


import Menu from "@mui/material/Menu/Menu";
import MenuItem from "@mui/material/MenuItem/MenuItem";


import IconButton from "@mui/material/IconButton/IconButton";
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';
import StarBorderPurple500Icon from '@mui/icons-material/StarBorderPurple500';


const Search = styled('div')(({theme}) => ({
    position: 'relative',

    display: 'flex',

    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#f3f4f7',
    '&:hover': {
        backgroundColor: '#f3f4f7',
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: '200px',
        height: '50px'
    },
    [theme.breakpoints.up('md')]: {
        marginLeft: theme.spacing(3),
        width: '400px',
        height: '60px'
    }, [theme.breakpoints.up('lg')]: {
        marginLeft: theme.spacing(3),
        width: '600px',
        height: '60px'

    }
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 1),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));


const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: 'black',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '100px',
        },
        [theme.breakpoints.up('md')]: {
            width: '300px',
        }, [theme.breakpoints.up('lg')]: {
            width: '500px',
        },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#c3c7c5s',
        fontSize: '22px'
    },
}));

export default function Header() {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="error">
                        <MailIcon/>
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={17} color="error">
                        <NotificationsIcon/>
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle/>
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );


    return (
        <AppBar position="static" style={{backgroundColor: 'white', padding: '0px'}}>
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    sx={{mr: 2}}
                >
                    <StarBorderPurple500Icon sx={{fontSize: 50}} style={{fill: '#c3c7c5'}}/>
                </IconButton>
                <Divider orientation="vertical" flexItem/>
                <Button
                    style={{
                        marginLeft: 20,
                        borderRadius: 5,
                        padding: 10,
                        color: 'white',
                        background: '#3871da',
                        width: 200,
                        height: 60
                    }}
                    variant="outlined"
                    startIcon={<AddIcon/>}>
                    New Message</Button>


                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{display: {xs: 'none', sm: 'block'}}}
                >
                    MUI
                </Typography>
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon fontSize="large" style={{fill: '#c3c7c5'}}/>
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search…"
                        inputProps={{'aria-label': 'search'}}
                    />
                </Search>
                <Box sx={{flexGrow: 2}}></Box>
                <Divider orientation="vertical" flexItem/>
                <Box sx={{display: {xs: 'none', md: 'flex'}}}>
                    <IconButton size="large"
                                color="inherit"
                                style={{justifyContent: 'center', paddingLeft: 50, paddingRight: 50}}>
                        <Badge badgeContent={1} color="error">
                            <MailIcon sx={{fontSize: 40}} style={{fill: '#c3c7c5'}}/>
                        </Badge>
                    </IconButton>
                </Box>
                <Divider orientation="vertical" flexItem/>
                <Box sx={{display: {xs: 'none', md: 'flex'}}}>
                    <IconButton
                        size="large"
                        style={{justifyContent: 'center', paddingLeft: 50, paddingRight: 50}}
                        color="inherit">
                        <Badge badgeContent={1} color="error">
                            <NotificationsIcon sx={{fontSize: 40}} style={{fill: '#c3c7c5'}}/>
                        </Badge>
                    </IconButton>
                </Box>
                <Divider orientation="vertical" flexItem/>
                <Box sx={{display: {xs: 'flex', md: 'none'}}}>
                    <IconButton
                        size="large"
                        aria-label="show more"
                        aria-controls={mobileMenuId}
                        aria-haspopup="true"
                        onClick={handleMobileMenuOpen}
                        color="inherit"
                    >
                        <MoreIcon/>
                    </IconButton>
                </Box>
                <Box sx={{flexGrow: 1}}></Box>

            </Toolbar>
            <Divider/>
        </AppBar>
    );
}