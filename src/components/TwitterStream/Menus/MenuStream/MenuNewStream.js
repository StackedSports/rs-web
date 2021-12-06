import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import Box from "@mui/material/Box/Box";
import Button from "@mui/material/Button/Button";
function MenuNewStream() {

    
    return (
        <Box style={{ marginTop: '10px', padding: 20}}   >
            <Button
                    style={{
                        borderRadius: 5,
                        marginLeft:'20px',
                        fontSize: '13px',
                        fontWeight: 'bold',
                        color: 'black',
                        background: 'white',
                    }}
                    size='large'
                    variant="outlined"
                    endIcon={<AddIcon sx={{fontSize: 25}} style={{fill: 'black'}}/>}>
                    New</Button>
                  
                    
       </Box>

    )
}

export default MenuNewStream
