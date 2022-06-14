
import { Box } from "@mui/material";

import LoadingOverlay from "./LoadingOverlay";

const LoadingPanel = (props) => (
    <Box sx={{ height: props.height || 300, position: 'relative' }}>
        <LoadingOverlay/>
    </Box>
)

export default LoadingPanel