import * as React from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import IconButton from "@mui/material/IconButton/IconButton";
import SettingMenu from './SettingMenu';
import { Box } from '@mui/system';
export default function MessageSetting(props) {
    const [tags, setTags] = React.useState(false);
    const handleTags=(tags)=>{
        setTags(tags)
      }

    return (
        <div style={{position:'relative'}}>
        <IconButton
            size="medium"
            aria-label="show more"
            aria-haspopup="true"
            color="inherit"
        >
            <MoreHorizIcon sx={{fontSize: 20}} style={{
                fill: 'black',
                padding: 0,
                margin: 0
            }}
            onClick={(e) => {
                    setTags(true)

                   }} 

                 
            
            />

       
        </IconButton>
        <Box style={{position:'absolute',zIndex:"100%",top:0,right:-25}} >
        { tags &&   <SettingMenu tagMenu={props.tagMenu} tags={handleTags} message={props.message} />}
                                      </Box>
            
              </div>

    )
}