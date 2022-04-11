import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import favicon from 'images/stacked-favicon.png'
import Typography from '@mui/material/Typography'

const Input = styled('input')({
    display: 'none',
});

const BoxFaviconOrganization = (props) => {

    const onUploadPicture = (e) => {
        console.log("onUploadPicture")
    }

    const onRemovePicture = (e) => {
        console.log("onRemovePicture")
    }

    return (
        <Stack flex={1} direction="column"
            style={{
                height: "40%",
                borderRadius: "7px",
                justifyContent: "flex-start",
                border: "#dadada  1px solid",
            }
            }>
            <Stack flex={3} direction="row" justifyContent="flex-start" alignItems="flex-start" spacing={1} padding="20px">
                <Stack flex={1} direction="column" justifyContent="flex-start" alignItems="center" spacing={1}>
                    <Typography variant="h6" component="p">Org Favicon Logo</Typography>
                </Stack>
                <Stack flex={1} direction="column" justifyContent="flex-start" alignItems="center" spacing={1}>
                    <Avatar sx={{ width: "96px", height: "96px", border: "#7F7F7F  1px solid", padding: "15px", }} alt="org favicon" src={favicon} />
                </Stack>
            </Stack>

            <Stack flex={1} direction="row" justifyContent="space-evenly" alignItems="center" style={{ borderTop: "#dadada 1px solid", }}>
                <label htmlFor="contained-button-file">
                    <Input accept="image/*" id="contained-button-file" multiple type="file" />
                    <Button style={{ fontSize: "12px" }} component="span" onClick={onUploadPicture}>
                        UPLOAD PICTURE
                    </Button>
                </label>

                <label>
                    <Button style={{ fontSize: "12px" }} component="span" onClick={onRemovePicture} disabled={props.image == null}>
                        REMOVE PICTURE
                    </Button>
                </label>
            </Stack>
        </Stack >
    )
}

export default BoxFaviconOrganization