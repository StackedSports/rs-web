import { useMemo, useState } from 'react';
import { Typography, Stack, CircularProgress } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Button from '@mui/material/Button';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useBottomScrollListener } from 'Hooks/useBottomScrollListener';

import MediaCarousel from 'UI/Widgets/Media/MediaCarousel';
import RenderIf from '../RenderIf';

const ContactMediaPreview = (props) => {

  const scrolRef = props.onScrollEnd ? useBottomScrollListener(props.onScrollEnd, 400, true) : null;
  const [carouselIndex, setCarouselIndex] = useState(null);

  const onViewMore = () => {
    props.onViewMore(props.id)
  }

  const onMediaClick = (media) => {
    setCarouselIndex(props.media.indexOf(media))
  }

  const thumbs = useMemo(() => props.limit ? props.media.slice(0, props.limit) : props.media, [props.media, props.limit])

  return (
    <Stack
      flex={1}
      gap={1}
      // alignItems="center"
      sx={{ width: "100%", borderTop: "#efefef  1px solid", minHeight: 0 }}
      pt={1}
      justifyContent="start"
    >
      <RenderIf condition={!props.hideHeader}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" gap={1}>
          <Typography align='left' variant='subtitle1' component="p">
            {props.title}
          </Typography>
          <Button
            variant="text"
            onClick={onViewMore}
            disabled={props.total < 1}
            endIcon={<ArrowForwardIosIcon sx={{ cursor: "pointer" }} />}
          >
            {props?.total || 0}
          </Button>
        </Stack>
      </RenderIf>

      {thumbs?.length > 0 ? (
        <>
          <ImageList cols={2} rowHeight={100} ref={scrolRef} >
            {thumbs?.
              map((media, index) => (
                <ImageListItem
                  key={props.id + media?.thumb}
                  onClick={() => onMediaClick(media)}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    loading="lazy"
                    alt={`${props.title} ${index}`}
                    style={{ borderRadius: 5, height: '100%' }}
                    src={media?.thumb}
                  />
                </ImageListItem>
              ))
            }
          </ImageList>
          <RenderIf condition={props.loading}>
            <CircularProgress size={20} sx={{ marginX: 'auto' }} />
          </RenderIf>
        </>
      )
        : (
          props.loading ? (
            <CircularProgress size={20} sx={{ marginX: 'auto' }} />
          ) : (
            <Typography style={{ flex: 1, alignSelf: "center" }} variant="body2">
              No media to show
            </Typography>

          )
        )}

      <MediaCarousel
        index={carouselIndex}
        items={props.media.map(urls => urls.original)}
        onClose={() => setCarouselIndex(null)}
      />
    </Stack>
  )
}

export default ContactMediaPreview;