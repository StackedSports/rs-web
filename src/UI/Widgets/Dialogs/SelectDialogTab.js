import { useState } from 'react'

import {
    Grid,
    Dialog,
} from "@material-ui/core"

import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import Tab from '@mui/material/Tab';
import { Button } from '@mui/material';

import SearchBar from 'UI/Widgets/SearchBar'



const a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}

const getSelectionLabel = (privateCount, teamCount, contactCount) => {
    if(privateCount == 0 && teamCount == 0 && contactCount == 0)
        return ''

    let selectionLabel = privateCount > 0 ? `${privateCount} Private Boards` : ''

    if(teamCount > 0) {
        let prefix = selectionLabel == '' ? '' : ', '
        selectionLabel += prefix + `${teamCount} Team Boards`
    }

    if(contactCount > 0) {
        let prefix = selectionLabel == '' ? '' : ', '
        selectionLabel += prefix + `${contactCount} Contacts`
    }

    return 'Selected: ' + selectionLabel
}

export default function SelectDialogTab(props) {
    const [tabIndex, setTabIndex] = useState(props.currentTab ? props.currentTab : 0)

    const handleChange = (e, newValue) => {
        setTabIndex(newValue)
    }

    const marginLeft = props.tabsMarginLeft | 10

    return (
        <Dialog
          maxWidth='md'
          fullWidth
          open={props.open}
          onClose={props.onClose}
        >
            <Grid container style={{ padding: 16 }} direction='column'>
                <TabContext value={tabIndex}>
                    <Grid container direction='row'>
                        <Grid item xs={6}
                            container
                            direction='row'
                            justify='flex-start'
                            alignItems='center'
                            // style={{marginLeft: 10}}
                        >
                            <span style={{marginLeft: marginLeft }}></span>

                            <TabList  onChange={handleChange} aria-label="basic tabs example">
                                {props.tabs.map(tab => (
                                    <Tab
                                      key={tab.id}
                                      label={tab.label}
                                      value={tab.id}
                                      {...a11yProps(tab.id)}
                                    />
                                ))}
                            </TabList>
                        </Grid>
                        <Grid  item xs={6}
                            container
                            direction='row'
                            justify='flex-end'
                            alignItems='center'
                        >
                            <SearchBar style={{ marginLeft: 20 }}
                              placeholder={`Search ${props.tabs[tabIndex].label}`}
                            />
                        </Grid>
                    </Grid>

                    {props.children}

                </TabContext>
                <Grid container direction='row'>
                    <Grid
                      xs={6}
                      container
                      direction='row'
                      alignItems='center'
                      justifyContent='flex-start'
                    >
                        <p style={{ color: '#3871DA', marginLeft: 28, marginBottom: 0 }}>
                            {props.selectionLabel}
                        </p>
                    </Grid>

                    <Grid
                      xs={6}
                      container
                      direction='row'
                      alignItems='center'
                      justifyContent='flex-end'
                    //   style={{margin: '0 16px'}}
                    >
                        <Button
                          onClick={props.onClose}
                          style={{
                            minWidth: 120,
                            fontWeight: "bold",
                            textTransform: "capitalize",
                            marginRight: 10,
                            padding: '8px 16px'
                            }}
                          disableElevation
                          variant="outlined"
                        >
                            Cancel
                        </Button>

                        <Button
                          style={{
                            minWidth: 120,
                            backgroundColor: "#3871da",
                            fontWeight: "bold",
                            textTransform: "capitalize",
                            padding: '8px 16px',
                            marginRight: 20
                          }}
                          onClick={props.onConfirmSelection}
                        //loading={uploadingMedia}
                        //endIcon={uploadingMedia || uploadFinished ? <span></span> : <CloudUploadIcon style={{ color: "white" }}/> }
                          disableElevation
                            // color="#3871da"
                          variant="contained"
                        >
                            Add Selection
                        </Button>

                    </Grid>

                </Grid>
            </Grid>
        </Dialog>
    )    
}