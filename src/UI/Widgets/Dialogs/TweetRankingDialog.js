import { useState, useMemo, useContext } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Typography } from "@mui/material";
import Tab from '@mui/material/Tab';
import BaseDialog from "./BaseDialog";
import ContactsTableServerMode from 'UI/Tables/Contacts/ContactsTableServerMode';
import { AppContext } from 'Context/AppProvider';

import lodsh from 'lodash';

export const TweetRankingDialog = ({ contactsLikes, contactsRetweets, loading, open, onClose }) => {
  const app = useContext(AppContext)
  const [tab, setTab] = useState('likes');
  const [selectedLikesContactsIds, setSelectedLikesContactsIds] = useState([]);
  const [selectedRetweetsContactsIds, setSelectedRetweetsContactsIds] = useState([]);

  const handleTabChange = (event, tabValue) => {
    setTab(tabValue);
  }

  const columnsHidden = {
    profileImg: false,
    phone: false,
  }

  const getAllContacts = () => {
    return [...contactsLikes, ...contactsRetweets]
  }

  const parseContact = (contact) => {
    return {
      id: contact.id,
      first_name: contact.fullName.split(' ')[0],
      last_name: contact.fullName.split(' ')[1],
      twitter_profile: {
        profile_image: contact.profileImg,
      }
    }
  }

  const selectedContacts = useMemo(() => {
    const selectedContactsIds = lodsh.uniq([...selectedLikesContactsIds, ...selectedRetweetsContactsIds]);

    return selectedContactsIds.map(contactId => {
      const contact = getAllContacts().find(contact => contact.id === contactId)
      if (contact) {
        return parseContact(contact)
      }
    })
  }, [selectedLikesContactsIds, selectedRetweetsContactsIds]);

  const onSendInMessage = () => {
    app.sendMessageToContacts(selectedContacts)
  }

  return (
    <BaseDialog
      open={open}
      onClose={onClose}
      cancelLabel="Close"
      confirmLabel="Send Message"
      onConfirm={selectedContacts.length > 0 ? onSendInMessage : null}
      sx={{
        '.MuiTabPanel-root':{
          paddingInline:0,
        }
      }}
    >
      <TabContext value={tab}>
        <TabList onChange={handleTabChange} aria-label="tweets-details-contacts">
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
            loading={loading}
            columnVisibilityModel={columnsHidden}
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
            loading={loading}
            columnVisibilityModel={columnsHidden}
            contacts={contactsRetweets}
            selectionModel={selectedRetweetsContactsIds}
            onSelectionModelChange={(ids) => setSelectedRetweetsContactsIds(ids)}
          />
        </TabPanel>
      </TabContext>
      <Typography>
        {selectedContacts.length} contacts selected
      </Typography>
    </BaseDialog>
  )
}