import './LoadingOverlay.css'

import CircularProgress from '@mui/material/CircularProgress';

const LoadingOverlay = (props) => (
    <div className="LoadingContainer">
        <CircularProgress/>
    </div>
)

export default LoadingOverlay