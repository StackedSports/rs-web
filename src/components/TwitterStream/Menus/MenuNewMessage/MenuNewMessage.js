import * as React from 'react';
import Box from "@mui/material/Box/Box";
import List from "@mui/material/List/List";
import Accordion from "@mui/material/Accordion/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary/AccordionSummary";
import Typography from "@mui/material/Typography/Typography";
import AccordionDetails from "@mui/material/AccordionDetails/AccordionDetails";
import Divider from "@mui/material/Divider/Divider";
import Grid from "@mui/material/Grid/Grid";



import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function MenuNewMessage(){
    return(
        <Box sx={{bgcolor: '#edeef2', width: 200, height: '100vh'}}>
            <p style={{color: 'black', fontSize: '17px', fontWeight: 'bold', textAlign: 'center', marginTop:'7px'}}>
                New Message</p>
            <nav aria-label="main mailbox folders">
                <List style={{border: 'none'}}>
                    <Accordion elevation={0} style={{
                        background: 'transparent',
                        border: '0px',
                        borderRadius: '0px',
                        margin: 0
                    }}>
                        <AccordionSummary
                            style={{background: 'transparent', border: '0px', borderRadius: '0px'}}
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel1a-content"
                        >
                            <Typography style={{fontWeight: 'bold', fontSize: '15px'}}>Drafts</Typography>
                        </AccordionSummary>
                        <AccordionDetails style={{
                            background: 'transparent',
                            border: '0px',
                            borderRadius: '0px',
                            marginLeft: 10
                        }}>
                            <Typography style={{fontSize: '12px', color: '#8b8b8d'}}>Ben Grave</Typography>

                        </AccordionDetails>
                    </Accordion>

                    <Accordion elevation={0} style={{
                        background: 'transparent',
                        border: '0px',
                        borderRadius: '0px',
                        margin: 0
                    }}>
                        <AccordionSummary
                            style={{background: 'transparent', border: '0px', borderRadius: '0px'}}
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel1a-content"
                        >
                            <Typography style={{fontWeight: 'bold', fontSize: '15px'}}>My Streams</Typography>
                        </AccordionSummary>
                        <AccordionDetails style={{
                            background: 'transparent',
                            border: '0px',
                            borderRadius: '0px',
                            marginLeft: 10
                        }}>
                            <Typography style={{fontSize: '12px', color: '#8b8b8d'}}>
                                Tickets Needed
                                <br/><br/>Seats,Tickets,Private Box
                                <br/><br/>Commits Mentioned
                                <br/><br/>Offers Mentioned
                            </Typography>

                        </AccordionDetails>
                    </Accordion>
                    <Accordion elevation={0} style={{
                        background: 'transparent',
                        border: '0px',
                        borderRadius: '0px',
                        margin: 0
                    }}>
                        <AccordionSummary
                            style={{background: 'transparent', border: '0px', borderRadius: '0px'}}
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel1a-content"
                        >
                            <Typography style={{fontWeight: 'bold', fontSize: '15px'}}>Team Streams</Typography>
                        </AccordionSummary>
                        <AccordionDetails style={{
                            background: 'transparent',
                            border: '0px',
                            borderRadius: '0px',
                            marginLeft: 10
                        }}>
                            <Typography style={{fontSize: '12px', color: '#8b8b8d'}}>
                                Seats,Tickets,Private Box
                                <br/><br/>
                                Tweeted our media
                            </Typography>

                        </AccordionDetails>
                    </Accordion>

                </List>
            </nav>

            <Divider/>
        </Box>
    )
}