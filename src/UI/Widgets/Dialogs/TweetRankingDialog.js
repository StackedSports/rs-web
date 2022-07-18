import { useState, useMemo, useContext } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab"
import { Typography } from "@mui/material";
import Tab from '@mui/material/Tab';
import BaseDialog from "./BaseDialog"
import ContactsTableServerMode from 'UI/Tables/Contacts/ContactsTableServerMode';
import { AppContext } from 'Context/AppProvider'
import { useContact } from "Api/ReactQuery";

import lodsh from 'lodash';

export const TweetRankingDialog = ({ contactsLikes, contactsRetweets, open, onClose }) => {
  const app = useContext(AppContext)
  const [tab, setTab] = useState('likes');
  const [selectedLikesContactsIds, setSelectedLikesContactsIds] = useState([]);
  const [selectedRetweetsContactsIds, setSelectedRetweetsContactsIds] = useState([]);

  const handleTabChange = (event, tabValue) => {
    setTab(tabValue);
  }

  const collumnsVisible = {
    profileImg: false,
    phone: false,
  }

  const selectedContactsIds = useMemo(() => {
    return lodsh.uniq([...selectedLikesContactsIds, ...selectedRetweetsContactsIds]);
  }, [selectedLikesContactsIds, selectedRetweetsContactsIds]);

  const onSendInMessage = () => {
   // app.sendMessageToContacts()
   // TODO GET CONTACTS
   console.log('send in message')
  }


  return (
    <BaseDialog
      open={open}
      onClose={onClose}
      cancelLabel="Close"
      confirmLabel="Send in Message"
    >
      <TabContext value={tab}>
        <TabList onChange={handleTabChange} aria-label="basic tabs example">
          <Tab label="Likes" value="likes" />
          <Tab label="Retweets" value="retweets" />
        </TabList>
        <TabPanel value="likes">
          <ContactsTableServerMode
            mini
            hideFooter
            redirectToDetails
            disableColumnMenu
            disableColumnFilter
            disableColumnSelector
            sortingMode='client'
            columnVisibilityModel={collumnsVisible}
            contacts={contactsLikes}
            selectionModel={selectedLikesContactsIds}
            onSelectionModelChange={(ids) => setSelectedLikesContactsIds(ids)}
          />
        </TabPanel>
        <TabPanel value="retweets">
          <ContactsTableServerMode
            mini
            hideFooter
            redirectToDetails
            disableColumnMenu
            disableColumnFilter
            disableColumnSelector
            sortingMode='client'
            columnVisibilityModel={collumnsVisible}
            contacts={contactsRetweets}
            selectionModel={selectedRetweetsContactsIds}
            onSelectionModelChange={(ids) => setSelectedRetweetsContactsIds(ids)}
          />
        </TabPanel>
      </TabContext>
      <Typography>
        {selectedContactsIds.length} contacts selected
      </Typography>
    </BaseDialog>
  )
}
