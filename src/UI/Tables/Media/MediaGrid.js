
import { Grid } from '@mui/material'
import MediaPreview from 'UI/Widgets/Media/MediaPreview'

export default function MediaGrid(props) {
    const skeletonSize = props.skeletonSize || 10

    return (
        <Grid container spacing={2}>
            {
                props.isLoading ? (
                    Array.from(new Array(skeletonSize)).map((_, index) =>
                        <Grid key={index}
                            item
                            xs={props.xs || 12}
                            sm={props.sm || 6}
                            md={props.md || 4}
                            lg={props.lg || 3}
                            xl={props.xl || 2}>
                            <MediaPreview
                                isLoading={props.isLoading}
                                type={props.type}
                                item={{}}
                            />
                        </Grid>
                    )
                ) : (
                    props.items && props.items.map((item, index) =>
                        <Grid key={(item.hashid || item.id) + (item.name || item.file_name)}
                            item
                            xs={props.xs || 12}
                            sm={props.sm || 6}
                            md={props.md || 4}
                            lg={props.lg || 3}
                            xl={props.xl || 2}>
                            <MediaPreview
                                isLoading={props.isLoading}
                                type={props.type}
                                item={item}
                                linkTo={props.linkTo && `${props.linkTo}/${item.id}`}
                                selected={props.selectionModel?.includes(item.id) || false}
                                onSelectedChange={(selected) => props.onSelectedChange(selected, index, item)}
                                onSendClick={props.onSendClick && (() => props.onSendClick(item))}
                                onPreviewClick={props.onPreviewClick && ((item) => props.onPreviewClick(item))}
                            />
                        </Grid>

                    )
                )
            }
        </Grid>
    )
}