import { useState } from 'react';
import Stack from '@mui/material/Stack';
import { Typography } from '@material-ui/core';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Button from '@mui/material/Button';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import MediaCarousel from 'UI/Widgets/Media/MediaCarousel';

const ContactMediaPreview = (props) => {

  const [carouselIndex, setCarouselIndex] = useState(null);

  const onViewMore = () => {
    props.onViewMore(props.id, "containerMedia")
  }

  const onMediaClick = (media) => {
    setCarouselIndex(props.media.indexOf(media))
  }

  return (
    <Stack
      flex={1}
      spacing={1}
      // alignItems="center"
      sx={{ width: "100%", borderTop: "#efefef  1px solid" }}
      pt={1}
      justifyContent="start"
    >
      <Stack sx={{ width: "100%" }} direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
        <Typography align='left' variant='subtitle1' component="p">
          {props.title}
        </Typography>
        <Button
          variant="text"
          onClick={onViewMore}
          disabled={!props.media?.length >= 1}
          endIcon={<ArrowForwardIosIcon sx={{ cursor: "pointer" }} />}
        >
          {props.media?.length || 0}
        </Button>
      </Stack>
      {props.media?.length > 0 ? (
        <ImageList sx={{ width: "100%" }} cols={2} rowHeight={120} >
          {props.media?.filter((media, index) => index < 2 && media)
            .map((media, index) => (
              <ImageListItem
                key={media}
                onClick={() => onMediaClick(media)}
                style={{ margin: 15, cursor: "pointer", }}
              >
                <img
                  loading="lazy"
                  alt={`${props.title} ${index}`}
                  style={{ borderRadius: 5 }}
                  src={media}
                  srcSet={media}
                // src={`${media}?w=164&h=164&fit=crop&auto=format`}
                // srcSet={`${media}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                />
              </ImageListItem>
            ))
          }
        </ImageList>
      )
        :
        <Typography style={{ flex: 1, alignSelf: "center" }} variant="body2">
          No media to show
        </Typography>
      }
      < MediaCarousel
        index={carouselIndex}
        items={props.media}
        onClose={() => setCarouselIndex(null)}
      />
    </Stack>
  )
}

export default ContactMediaPreview;