
import { Stack, Grid, Typography, Box, CircularProgress } from '@mui/material'
import { useMemo, useCallback } from 'react'
import MediaPreview from 'UI/Widgets/Media/MediaPreview'


export default function MediaGrid(props) {

    // check if media is selected based on props.selectionModel ids
    /*     const isSelect = useCallback((id) => {
            if (props.selectionModel)
                return props.selectionModel.includes(id)
            else if (props.selectedControl)
                return props.selectedControl[id]?.selected
            else
                return false
        }, [props.selectionModel, props.selectedControl]) */

    return (
        <Grid container spacing={2} mt={.5}>
            {props.items && props.items.map((item, index) => {
                const checked = useMemo(() => {
                    if (props.selectionModel)
                        return props.selectionModel.includes(item.id)
                    else if (props.selectedControl)
                        return props.selectedControl[item.id]?.selected
                    else
                        return false
                }, [props.selectionModel, props.selectedControl])

                return (
                    <Grid key={(item.hashid || item.id) + (item.name || item.file_name)}
                        item
                        xs={props.xs || 12}
                        sm={props.sm || 6}
                        md={props.md || 4}
                        lg={props.lg || 3}
                        xl={props.xl || 2}>
                        <MediaPreview
                            type={props.type}
                            item={item}
                            linkTo={props.linkTo && `${props.linkTo}/${item.id}`}
                            selected={checked}
                            onSelectedChange={(selected) => props.onSelectedChange(selected, index, item)}
                            onSendClick={props.onSendClick && (() => props.onSendClick(item))}
                        />
                    </Grid>
                )
            })}
        </Grid>
    )
}