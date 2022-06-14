import { useState } from 'react';
import { Typography, Stack } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import MediaCarousel from 'UI/Widgets/Media/MediaCarousel';


const ContactMediaDetails = (props) => {

  const [carouselIndex, setCarouselIndex] = useState(null);

  const setVisibleContainer = () => {
    props.setVisibleContainer("preview")
  }

  const onMediaClick = (media) => {
    setCarouselIndex(props.media.indexOf(media))
  }

  return (
    <Stack
      sx={{
        width: "100%",
        height: "100%",
        overflowY: "auto",
        maxHeight: props.height,
        // backgroundColor: '#efefef'
      }}
      spacing={1}
      justifyContent="start"
      alignItems="center"
    >
      <Stack sx={{ width: "100%" }} flex={1} direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
        <Button
          onClick={setVisibleContainer}
          endIcon={<ArrowBackIcon sx={{ cursor: "pointer" }} />}
        />
        <Typography align='left' variant='subtitle1' component="p">
          {props.title}
        </Typography>
      </Stack>

      <ImageList
        cols={2}
        sx={{
          width: "100%",
          // overflowY: 'auto',
          // height: 'auto',
        }}
        rowHeight={120}
      >
        {props.media?.map((media, index) => (
          <ImageListItem
            key={media}
            onClick={() => onMediaClick(media)}
            style={{ margin: 15, cursor: "pointer", }}
          >
            <img
              loading="lazy"
              alt={`${props.title}: media ${index}`}
              style={{ borderRadius: 5 }}
              src={media}
              srcSet={media}
            // src={`${media}?w=164&h=164&fit=crop&auto=format`}
            // srcSet={`${media}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            />
          </ImageListItem>
        ))}
      </ImageList>
      <MediaCarousel
        index={carouselIndex}
        items={props.media}
        onClose={() => setCarouselIndex(null)}
      />
    </Stack>
  )
}

export default ContactMediaDetails;