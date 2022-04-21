import Stack from '@mui/material/Stack';
import { Typography } from '@material-ui/core';
import CachedIcon from '@mui/icons-material/Cached';

const AssociatedMedia = (prosp) => {
  return (
    <Stack sx={{ width: "100%" }} spacing={1} direction="row" alignItems="center" justifyContent="center">
      <Stack sx={{ width: "100%" }} flex={1} direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
        <Typography align='left' variant='subtitle1' component="p">
          Associated Media
        </Typography>
        <CachedIcon />
      </Stack>


    </Stack>
  )
}

export default AssociatedMedia;