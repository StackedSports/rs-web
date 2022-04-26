import { Stack, Typography } from "@mui/material";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

import UserSettingsPage from "./UserSettingsPage";
import { Divider } from "@material-ui/core";

const UserAccountCard = (props) => {

  const onLinkAccount = (id) => {
    console.log("onLinkAccount: " + id)
  }
  const onUnlinkAccount = (id) => {
    console.log("onUnlinkAccount: " + id)
  }
  const onUsePhoto = (id) => {
    console.log("onUsePhoto: " + id)
  }

  return (
    <Box sx={{
      width: "400px",
      height: "250px",
      display: 'grid',
      gridColumnGap: 10,
      gridTemplateRows: "2fr .1fr .9fr",
      gridTemplateColumns: "2fr 1fr",
      border: "#ccc 1px solid",
      borderRadius: "7px",
      alignItems: "center",
      opacity: props.disabled ? .7 : 1,
    }}>
      <Stack
        ml="20px"
        height="100%"
        alignItems="strat"
        justifyContent="space-around"
      >
        <Typography component="p" variant="h5" textAlign="start">
          {props.title}
        </Typography>
        <Button
          variant="contained"
          disabled={props.disabled}
          onClick={e => onLinkAccount(props.id)}
          style={{ display: 'flex', justifyContent: 'space-evenly', width: "90%" }}
        >
          {<props.icon />}
          {props.account || props.buttonText}
        </Button>
      </Stack >

      <img
        style={{ width: "140px", height: "140px", borderRadius: "7px", margin: "20px 20px 0" }}
        src={props.image}
        alt={`${props.title} profile image`}
      />

      <Divider style={{ marginTop: "25px", gridColumn: "1/3" }} />

      <Button
        variant="text"
        disabled={props.disabled}
        onClick={e => onUnlinkAccount(props.id)}
      >
        UNLINK
      </Button>
      <Button
        variant="text"
        disabled={props.disabled}
        onClick={e => onUsePhoto(props.id)}
        sx={{ color: "#525253" }}
      >
        USE THIS PHOTO
      </Button>
    </Box >
  )
}

const UserSettingsAccountPage = (props) => {


  return (
    <UserSettingsPage
      title='Account'
    >
      <Stack
        width="100%"
        direction="row"
        justifyContent="start"
        alignItems="end"
        spacing={2}
      >
        <Typography variant="h5" component="p">
          Communication Channels
        </Typography>
        <Typography
          component="span"
          variant="subtitle2"
          sx={{ color: '#ccc', fontWeight: 500 }}
        >
          Your profile information can be edited below
        </Typography>
      </Stack>
      <div style={{ marginTop: "40px" }} />

      <Stack flex={1} direction="row" justifyContent="start" alignItems="start" spacing={3}>

        {/* ACCOUNT CARDS */}
        <Stack justifyContent="start" alignItems="start" spacing={2}>
          <UserAccountCard
            id="twitter"
            account="@JohnSmith21"
            title="Twitter Account"
            buttonText="LINK TWITTER"
            image="https://images.unsplash.com/photo-1520188740392-665a13f453fc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGxpbmV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
            icon={TwitterIcon}
          />

          <UserAccountCard
            disabled
            id="instagram"
            title="Instagram Account"
            buttonText="LINK IG"
            image="https://images.unsplash.com/photo-1520188740392-665a13f453fc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGxpbmV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
            icon={InstagramIcon}
          />
        </Stack>

        {/* SMS/MMS CARD */}
        <Box sx={{
          width: "400px",
          height: "250px",
          display: 'grid',
          gridTemplateRows: "2fr .1fr .9fr",
          border: "#ccc 1px solid",
          borderRadius: "7px",
          alignItems: "center",
        }}>
          <Stack spacing={1} p="20px 20px 0 20px">
            <Typography variant="h5" >
              SMS/MMS
            </Typography>
            <Typography
              sx={{
                color: '#ccc', fontWeight: 500
              }}>
              Your profile information can be edited below
            </Typography>
            <Typography variant="h5">
              1 (615) 999.6350
            </Typography>
            <Typography
              sx={{ color: '#ccc', fontWeight: 500 }}
            >
              To associate a different number to your account contact your account rep.
            </Typography>
          </Stack>

          <Divider style={{ marginTop: "7px", gridColumn: "1/2" }} />

          <Button
            variant="text"
            disabled
            style={{ justifySelf: "end", paddingRight: "20px" }}
          // onClick={}
          >
            UNLINK
          </Button>
        </Box>
      </Stack>
    </UserSettingsPage >
  )
}

export default UserSettingsAccountPage;