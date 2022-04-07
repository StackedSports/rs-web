import { useState } from 'react'

import { Grid } from "@material-ui/core"
import PhotoIcon from '@mui/icons-material/Photo'
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary'

import { usePlaceholder } from 'Api/Hooks'

const Placeholder = (props) => {
    const placeholder = usePlaceholder(props.placeholder.id)

    console.log(placeholder)

    return (
        <div>

        </div>
    )
}

const Image = (props) => {


    return (
        <img
          style={{
              objectFit: 'contain',
              width: 250,
              height: 250
          }}
          src={props.media.urls.original}
        />
    )
}

const MediaPreview = ({type, containerStyle, ...props}) => {
    // console.log(props.media)

    const isMedia = type === 'media'

    return (
        <Grid 
          container 
          direction="column"
          style={{ ...styles.container, ...containerStyle }}
        >
            <Grid style={styles.mediaContainer}>
                {isMedia ? (
                    <Image media={props.media}/>
                ) : (
                    <Placeholder placeholder={props.media}/>
                )}
            </Grid>
            <Grid style={{ padding: 10 }}>
                <Grid container direction="row">
                    {isMedia ? (
                        <PhotoIcon style={styles.icon}/>
                    ) : (
                        <PhotoLibraryIcon style={styles.icon}/>
                    )}
                    <span style={styles.mediaName}>{props.media?.name}</span>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default MediaPreview

const styles = {
    container: {
        border: '1px solid #efefef',
        borderRadius: 4,
        width: 250,
    },
    mediaContainer: {
        width: 250,
        height: 250,
        backgroundColor: '#efefef'
    },
    icon: {
        color: '#555',
        marginRight: 10
    },
    mediaName: {
        fontWeight: 'bold'
    }

}