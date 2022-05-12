import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { default as ArrowBack } from '@mui/icons-material/ArrowBackIos';
import Button, { IconButton } from 'UI/Widgets/Buttons/Button';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import TuneIcon from '@mui/icons-material/Tune';

import Page, { Content } from 'UI/Layouts/Page';
import Panel from 'UI/Layouts/Panel';
import TopBar from 'UI/Layouts/TopBar';
import SideBar from 'UI/Layouts/SideBar';

import SideFilter from 'UI/Widgets/SideFilter';
import { ListItemButton, Stack } from "@mui/material";
import { Avatar, List, ListItem, Typography } from '@material-ui/core';
import SearchBar from 'UI/Widgets/SearchBar';
// import LoadingOverlay from 'UI/Widgets/LoadingOverlay'

export default function ChatPage(props) {

  const [displayFilters, setDisplayFilters] = useState(true)
  const [messageViewer, setMessageViewer] = useState([])

  const onTopActionClick = () => {
    console.log("onTopActionClick")
  }

  const onBackClick = () => {
    console.log("onBackClick")
    setDisplayFilters(!displayFilters)
  }

  const onViewMessage = (message, index) => {
    console.log("onMenuIconClick")
    if (!messageViewer.includes(message)) {
      console.log("messageViewer.includes(message)")
      messageViewer.unshift(message)
    } else {
      messageViewer.splice(0, 0, messageViewer.splice(index, 1)[0])//change position message
    }
  }
  console.log(messageViewer)

  const onChatSearch = (searchTerm) => {
    console.log("onChatSearch", searchTerm)
  }

  const onChatSearchClear = () => {
    console.log("onChatSearchClear")
  }

  const Icon = displayFilters ? MenuOpenIcon : MenuIcon

  const filters = [
    { // Category
      id: 'Ben Graves',
      name: 'Ben Graves',
      items: [
        // Filters
        // { id: '0', name: 'New (Last 30 days)' },
        { id: '0', name: '@BG615', /* path: contactsRoutes.all */ },
        { id: '1', name: '615.999.9999', /* path: contactsRoutes.all */ }
      ]
    },
  ]

  return (
    <Page>
      <TopBar
        actionTitle="+ New Message"
        onActionClick={onTopActionClick}
      />
      <SideBar />
      <Content>
        <SideFilter
          visible={displayFilters}
          filters={filters}
          collapsed={true}
          onFilterSelected={props.onFilterSelected}
        />
        <Panel
          hideHeader
        >
          <Stack flex={1} direction="row">

            <Stack sx={{
              width: "350px",
              borderRadius: "5px",
              border: "solid 1px #dadada",
            }} >
              <Stack
                p="20px 40px 20px 20px"
                direction="row"
                flexWrap="nowrap"
                alignItems="center"
                justifyContent="space-around"
                borderBottom="solid 1px #dadada"
              >
                <Icon sx={{ cursor: "pointer" }} onClick={onBackClick} />
                <Typography component="h2" variant="h6"><b>Ben Garves</b></Typography>
                <Typography style={{ color: "#dadada", fontSize: "12px", }} component="span" variant="subtitle1">@BD615</Typography>
              </Stack>

              <List style={{ padding: 0 }}>

                <ListItem style={{ padding: "30px", }} >
                  <SearchBar
                    style={{ margin: 0 }}
                    searchOnChange
                    icon={TuneIcon}
                    placeholder="Search"
                    onSearch={onChatSearch}
                    onClear={onChatSearchClear}
                  />
                </ListItem>

                {/* {messages.map((message, index) => {
                  return ( */}
                    <ListItemButton
                      sx={{
                        padding: "15px",
                        borderTop: "solid 1px #dadada",
                        borderBottom: "solid 1px #dadada",
                      }}
                      // key={message.id}
                      onClick={onViewMessage}
                    >
                      <Stack flex={1} direction="row" spacing={2} alignItems="center">
                        <Avatar style={{
                          width: "56px",
                          height: "56px",
                        }}
                          aria-label="recipe"
                          src='https://stakdsocial.s3.us-east-2.amazonaws.com/media/general/contact-missing-image.png'
                        />
                        <Stack flex={1} sx={{ position: "relative" }}>
                          <Typography style={{
                            position: "absolute",
                            right: 0,
                          }}
                            variant="body2"
                          >
                            <b>11:23 am</b>
                          </Typography>

                          <Typography variant="body1">
                            <b>Luke Burke</b>
                          </Typography>
                          <Typography variant="body2" color="#dadada">
                            @charles
                          </Typography>
                          <Typography variant="body2" color="#dadada">
                            There Ways To Get Travel Disco...
                          </Typography>
                        </Stack>
                      </Stack>
                    </ListItemButton>
                  {/* )
                })
                } */}
              </List>
            </Stack>

            <Stack flex={1}>


            </Stack>

            {/* {alert && (
            <Snackbar
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
              open={props.alert.visible}
              autoHideDuration={6000}
              onClose={props.alert.dismiss}>
              <MuiAlert
                variant="filled"
                onClose={props.alert.dismiss}
                severity={props.alert.severity}
                sx={{ width: '100%' }}
              >
                {props.alert.message}
              </MuiAlert>
            </Snackbar>
            )} */}

            {/* {props.redirect && props.redirect !== '' && <Redirect push to={props.redirect} />} */}

            {/* {loading && <LoadingOverlay />} */}

          </Stack>
        </Panel>
      </Content>
    </Page >
  )
}