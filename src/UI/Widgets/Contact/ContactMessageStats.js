import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import CachedIcon from '@mui/icons-material/Cached';
import LaptopIcon from '@mui/icons-material/Laptop';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import CircularProgress from '@mui/material/CircularProgress';


const ContactMessageStats = (props) => {

  const onRefresh = () => {
    console.log("onRefresh")
  }

  return (
    <Stack sx={{ width: "100%" }} flex={1} justifyContent="flex-start" alignItems="center" spacing={2}>
      <Stack sx={{ width: "100%", maxHeight: 50 }}
        flex={1} 
        direction="row" 
        justifyContent="space-between" 
        alignItems="center" 
        spacing={1}
        mb={2}
      >
        <Typography align='left' variant='subtitle1' component="p">
          Message Stats
        </Typography>
        <CachedIcon sx={{ cursor: "pointer" }} /* onClick={onRefresh} */ />
      </Stack>

      {props.loading && <CircularProgress sx={{ width: 36, height: 36 }} />}

      <Stack sx={{ width: "100%" }} direction="row" flex={2} justifyContent="space-evenly" alignItems="center" spacing={1} mb={2}>
        <Stack justifyContent="space-between" alignItems="center" spacing={1}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <LaptopIcon />
            <span>DMS's</span>
          </div>
          <span style={{ color: "blue", fontSize: "25px", fontWeight: "700" }}>{props.countDm || 0}</span>
        </Stack>
        <Stack justifyContent="space-between" alignItems="center" spacing={1}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <SmartphoneIcon />
            <span>Personal Text</span>
          </div>
          <span style={{ color: "red", fontSize: "25px", fontWeight: "700" }}>{props.countPersonalText || 0}</span>
        </Stack>
        <Stack justifyContent="space-between" alignItems="center" spacing={1}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <SmartphoneIcon />
            <span>RS Text</span>
          </div>
          <span style={{ color: "yellow", fontSize: "25px", fontWeight: "700" }}>{props.countRsText || 0}</span>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default ContactMessageStats;