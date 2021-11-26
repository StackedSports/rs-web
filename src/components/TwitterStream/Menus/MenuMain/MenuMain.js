import * as React from 'react';


import List from "@mui/material/List/List";
import ListItem from "@mui/material/ListItem/ListItem";
import ListItemButton from "@mui/material/ListItemButton/ListItemButton";
import Divider from "@mui/material/Divider/Divider";
import Box from "@mui/material/Box/Box";



import ListItemIcon from "@mui/material/ListItemIcon/ListItemIcon";
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import AddCommentIcon from '@mui/icons-material/AddComment';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import TwitterIcon from '@mui/icons-material/Twitter';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import SettingsIcon from '@mui/icons-material/Settings';


export default function MainMenu(){

    return(
        <Box sx={{bgcolor: 'background.paper', width: 100, height: '100vh'}}>
            <nav aria-label="main mailbox folders">
                <List>
                    <ListItem>
                        <ListItemButton>
                            <ListItemIcon>
                                <HomeIcon sx={{fontSize: 35, marginTop: 5}} style={{fill: '#000'}}/>
                            </ListItemIcon>
                        </ListItemButton>
                    </ListItem>

                    <ListItem>
                        <ListItemButton>
                            <ListItemIcon>
                                <PersonIcon sx={{fontSize: 35, marginTop: 5}} style={{fill: '#000'}}/>
                            </ListItemIcon>
                        </ListItemButton>
                    </ListItem>

                    <ListItem>
                        <ListItemButton>
                            <ListItemIcon>
                                <AddCommentIcon sx={{fontSize: 35, marginTop: 5}} style={{fill: '#000'}}/>
                            </ListItemIcon>
                        </ListItemButton>
                    </ListItem>

                    <ListItem>
                        <ListItemButton>
                            <ListItemIcon>
                                <InsertPhotoIcon sx={{fontSize: 35, marginTop: 5}} style={{fill: '#000'}}/>
                            </ListItemIcon>
                        </ListItemButton>
                    </ListItem>

                    <ListItem>
                        <ListItemButton>
                            <ListItemIcon>
                                <TwitterIcon sx={{fontSize: 35, marginTop: 5}} style={{fill: '#000'}}/>
                            </ListItemIcon>
                        </ListItemButton>
                    </ListItem>


                    <ListItem>
                        <ListItemButton>
                            <ListItemIcon>
                                <SignalCellularAltIcon sx={{fontSize: 35, marginTop: 5}} style={{fill: '#000'}}/>
                            </ListItemIcon>
                        </ListItemButton>
                    </ListItem>


                    <ListItem>
                        <ListItemButton>
                            <ListItemIcon>
                                <SettingsIcon sx={{fontSize: 35, marginTop: 5}} style={{fill: '#000'}}/>
                            </ListItemIcon>
                        </ListItemButton>
                    </ListItem>
                </List>
            </nav>

            <Divider/>
        </Box>
    );
}