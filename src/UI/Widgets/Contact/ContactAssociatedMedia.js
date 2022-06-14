import { Typography,Stack } from '@mui/material';
import CachedIcon from '@mui/icons-material/Cached';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Button from '@mui/material/Button';


const ContactAssociatedMedia = (prosp) => {

  const onRefresh = () => {
    console.log("onRefresh")
  }

  const itemData = [
    {
      img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
      title: 'Basketball3',
    },
    {
      img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
      title: 'Basketball4',
    },
  ]

  return (
    <Stack sx={{ width: "100%" }} spacing={1} alignItems="center" justifyContent="center">
      <Stack sx={{ width: "100%" }} flex={1} direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
        <Typography align='left' variant='subtitle1' component="p">
          Associated Media
        </Typography>
        <CachedIcon sx={{ cursor: "pointer" }} /* onClick={onRefresh} */ />
      </Stack>

      <ImageList sx={{ width: "100%" }} cols={2} rowHeight={120}>
        {itemData.map((item) => (
          <ImageListItem key={item.img} style={{ margin: 15 }} >
            <img
              style={{ borderRadius: 5 }}
              src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
              srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
      <Button variant="outlined">View More</Button>
    </Stack>
  )
}

export default ContactAssociatedMedia;