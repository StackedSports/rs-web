import Stack from '@mui/material/Stack';
import { IconButton, Typography } from '@mui/material';
import CachedIcon from '@mui/icons-material/Cached';
import LaptopIcon from '@mui/icons-material/Laptop';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import CircularProgress from '@mui/material/CircularProgress';
import { useQueryClient } from 'react-query';


const ContactMessageStats = (props) => {
  const queryClient = useQueryClient();
  const { stats } = props;

  const onRefresh = () => {
    queryClient.refetchQueries(['contact'], { active: true });
  }

  return (
    <Stack sx={{ width: "100%" }} flex={1} justifyContent="flex-start" alignItems="center" spacing={2}>
      <Stack sx={{ width: "100%", maxHeight: 50 }}
        flex={1}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={1}
      >
        <Typography align='left' variant='subtitle1' component="p">
          Message Stats
        </Typography>
        <IconButton onClick={onRefresh}>
          <CachedIcon />
        </IconButton>
      </Stack>

      {props.loading ?
        <Stack sx={{ width: "100%" }} direction="row" flex={2} justifyContent="space-evenly" alignItems="center" spacing={1}>
          <CircularProgress sx={{ width: 37, height: 37 }} />
        </Stack> :
        (
          <Stack sx={{ width: "100%" }} direction="row" flex={2} justifyContent="space-evenly" alignItems="center" spacing={1}>
            <Stack justifyContent="space-between" alignItems="center" spacing={1}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <LaptopIcon />
                <span>DMS's</span>
              </div>
              <span style={{ color: "blue", fontSize: "25px", fontWeight: "700" }}>{stats?.dms || 0}</span>
            </Stack>
            <Stack justifyContent="space-between" alignItems="center" spacing={1}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <SmartphoneIcon />
                <span>Personal Text</span>
              </div>
              <span style={{ color: "red", fontSize: "25px", fontWeight: "700" }}>{stats?.pts || 0}</span>
            </Stack>
            <Stack justifyContent="space-between" alignItems="center" spacing={1}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <SmartphoneIcon />
                <span>RS Text</span>
              </div>
              <span style={{ color: "yellow", fontSize: "25px", fontWeight: "700" }}>{stats?.sms || 0}</span>
            </Stack>
          </Stack>
        )
      }
    </Stack>
  )
}

export default ContactMessageStats;