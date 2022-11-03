import { useState } from 'react'

import { Dialog, Stack, Box, Button, DialogTitle, Typography, DialogContent, DialogActions } from '@mui/material'

import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import Tab from '@mui/material/Tab';

import SearchBar from 'UI/Widgets/SearchBar'
import RenderIf from '../RenderIf';

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const getSelectionLabel = (privateCount, teamCount, contactCount) => {
  if (privateCount == 0 && teamCount == 0 && contactCount == 0)
    return ''

  let selectionLabel = privateCount > 0 ? `${privateCount} Private Boards` : ''

  if (teamCount > 0) {
    let prefix = selectionLabel == '' ? '' : ', '
    selectionLabel += prefix + `${teamCount} Team Boards`
  }

  if (contactCount > 0) {
    let prefix = selectionLabel == '' ? '' : ', '
    selectionLabel += prefix + `${contactCount} Contacts`
  }

  return 'Selected: ' + selectionLabel
}

export default function SelectDialogTab(props) {
  const [tabIndex, setTabIndex] = useState(props.currentTab || '0')

  const handleChange = (e, index) => {
    setTabIndex(index)
    props.onTabChange && props.onTabChange(index)
  }

  const marginLeft = props.tabsMarginLeft | 10

  return (
    <Dialog
      maxWidth={props.maxWidth || 'md'}
      fullWidth
      open={props.open}
      onClose={props.onClose}
    >
      <TabContext value={tabIndex}>
        <DialogTitle component={Stack}
          direction='row'
          justify='flex-start'
          alignItems='center'
          flex={1}
        >
          <TabList onChange={handleChange}>
            {props.tabs.map(tab => (
              <Tab
                key={tab.id}
                label={tab.label}
                value={tab.id}
                sx={{ fontWeight: 600, letterSpacing: '1px' }}
                {...a11yProps(tab.id)}
              />
            ))}
          </TabList>

          <Stack flex={1}
            direction='row'
            justifyContent='flex-end'
            alignItems='center'
          >
            <RenderIf condition={!props.tabs[tabIndex]?.hideSearch}>
              <SearchBar
                placeholder={`Search ${props.tabs[tabIndex].label}`}
                onSearch={(search) => props.onSearch(search, tabIndex)}
                onClear={() => props.onClearSearch(tabIndex)}
              />
            </RenderIf>
          </Stack>
        </DialogTitle>

        <DialogContent dividers sx={{ overflowY: 'auto', ' .MuiTabPanel-root': { p: 0, overflowY: 'auto' } }}>
          {props.children}
        </DialogContent>

      </TabContext>
      <DialogActions>
        <Stack flex={1}
          direction='row'
          alignItems='center'
          justifyContent='flex-start'
        >
          <Typography sx={{ marginLeft: '28px' }} variant='body1'>
            {props.selectionLabel}
          </Typography>
        </Stack>

        <Stack flex={1}
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
              fontWeight: "bold",
              textTransform: "capitalize",
              padding: '8px 16px',
              marginRight: 20
            }}
            onClick={props.onConfirmSelection}
            color='primary'
            disableElevation
            variant="contained"
            disabled={props.disableOnConfirmSelection}
          >
            Add Selection
          </Button>

        </Stack>

      </DialogActions>
    </Dialog>
  )
}