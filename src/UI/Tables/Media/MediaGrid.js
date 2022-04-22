
import { Stack, Grid, Typography, Box, CircularProgress } from '@mui/material'

import MediaPreview from 'UI/Widgets/Media/MediaPreview'


export default function MediaGrid(props) {
    return (
        <Grid container spacing={2}>
            {props.items && props.items.map((item, index) => (
                <Grid
                  item 
                  xs={props.xs || 12} 
                  sm={props.sm || 6} 
                  md={props.md || 4} 
                  lg={props.lg || 3} 
                  xl={props.xl || 2}>
                    <MediaPreview
                      key={item.hashid || item.id}
                      type={props.type}
                      item={item}
                      linkTo={props.linkTo && `${props.linkTo}/${item.id}`}
                      selected={props.selectedControl[item.id] ? props.selectedControl[item.id].selected : false}
                      onSelectedChange={(selected) => props.onSelectedChange(selected, index, item)}
                      onSendClick={props.onSendClick && (() => props.onSendClick(item))}
                    />
                </Grid>
            ))}
        </Grid>
    )
}