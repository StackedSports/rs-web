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

  const onMediaClick = (url) => {
    setCarouselIndex(props.media.indexOf(url))
  }

  return (
    <Stack
      flex={1}
      spacing={1}
      // alignItems="center"
      sx={{ width: "100%" }}
      justifyContent="start"
    >
      <Stack sx={{ width: "100%" }} direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
        <Typography align='left' variant='subtitle1' component="p">
          {props.title}
        </Typography>
        <Button
          variant="text"
          onClick={onViewMore}
          endIcon={<ArrowForwardIosIcon sx={{ cursor: "pointer" }} />}
        >
          {props.media?.length}
        </Button>
      </Stack>

      <ImageList sx={{ width: "100%" }} cols={2} rowHeight={120} >
        {props.media?.filter((url, index) => index < 2 && url).map(url => (
          <ImageListItem
            key={url}
            onClick={() => onMediaClick(url)}
            style={{ margin: 15, cursor: "pointer", }}
          >
            <img
              loading="lazy"
              alt="media"
              style={{ borderRadius: 5 }}
              src={`${url}?w=164&h=164&fit=crop&auto=format`}
              srcSet={`${url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            />
          </ImageListItem>
        ))
        }
      </ImageList>
      <MediaCarousel
        index={carouselIndex}
        items={props.media}
        onClose={() => setCarouselIndex(null)}
      />
    </Stack>
  )
}

export default ContactMediaPreview;