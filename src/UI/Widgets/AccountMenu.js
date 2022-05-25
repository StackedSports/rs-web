import * as React from 'react'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import PersonAdd from '@mui/icons-material/PersonAdd'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import Logout from '@mui/icons-material/Logout'

import { AuthContext } from 'Context/Auth/AuthProvider'

import { getFullName } from 'utils/Parser'
import { Link } from 'react-router-dom'
import { routes } from 'Routes'
import { userRoutes } from 'Routes/Routes'

export default function AccountMenu() {
    const auth = React.useContext(AuthContext)
    // console.log(auth.user)

    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const onLogout = () => {
        auth.logout()
    }

    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title="My Account">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar sx={{ width: 32, height: 32 }}
                            alt={getFullName(auth?.user)}
                            src={auth.user?.twitter_profile?.profile_image}
                        />
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                sx={{
                    '.MuiMenu-root': {
                        marginBotton: 16
                    }
                }}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        minWidth: 180,
                        // mb: 2,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1.5,
                        },
                        // '&:before': {
                        //     content: '""',
                        //     display: 'block',
                        //     position: 'absolute',
                        //     top: 0,
                        //     right: 14,
                        //     width: 10,
                        //     height: 10,
                        //     bgcolor: 'background.paper',
                        //     transform: 'translateY(-50%) rotate(45deg)',
                        //     zIndex: 0,
                        // },
                    },
                }}
                transformOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
            >
                <Link to={userRoutes.profile} style={{ color: "inherit" }}>
                    <MenuItem>
                        <Avatar
                            alt={getFullName(auth?.user)}
                            src={auth.user?.twitter_profile?.profile_image}
                        />
                        My Profile
                    </MenuItem>
                </Link>
                <Divider />
                {/* <MenuItem>
                    <ListItemIcon>
                        <PersonAdd fontSize="small" />
                    </ListItemIcon>
                    Add another account
                </MenuItem> */}
                <Link to={userRoutes.account} style={{ color: "inherit" }}>
                    <MenuItem>
                        <ListItemIcon>
                            <AccountCircleIcon fontSize="small" />
                        </ListItemIcon>
                        Account
                    </MenuItem>
                </Link>
                {/* <Link to={userRoutes.notifications} style={{ color: "inherit" }}>
                    <MenuItem>
                        <ListItemIcon>
                            <NotificationsNoneIcon fontSize="small" />
                        </ListItemIcon>
                        Notifications
                    </MenuItem>
                </Link> */}
                <MenuItem onClick={onLogout}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </React.Fragment>
    );
}