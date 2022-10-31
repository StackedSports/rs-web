import './LoadingOverlay.css'

import CircularProgress from '@mui/material/CircularProgress';
import { alpha, Paper } from '@mui/material';

const LoadingOverlay = (props) => (
    <Paper elevation={0} sx={{ backgroundColor: (theme) => alpha(theme.palette.background.paper, .6) }} className="LoadingContainer">
        <CircularProgress />
    </Paper>
)

export default LoadingOverlay