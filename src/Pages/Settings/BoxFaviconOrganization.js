import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'

import Button from 'UI/Widgets/Buttons/Button'

const Input = styled('input')({
    display: 'none',
});

const BoxFaviconOrganization = (props) => {

    const onUploadPicture = (e) => {

    }

    const onRemovePicture = (e) => {

    }

    return (
        <Box sx={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            justifyContent: "flex-start",
            height: "45%",
        }}>
            <Stack flex={1} direction="row" justifyContent="flex-start" alignItems="flex-start" spacing={1}>
                <Stack flex={1} direction="column" justifyContent="flex-start" alignItems="center" spacing={1}>
                    Org Name???
                </Stack>
                <Stack flex={1} direction="column" justifyContent="flex-start" alignItems="center" spacing={1}>
                    <img src="" alt="favicon org" />
                </Stack>
            </Stack>

            <Stack flex={1} direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
                <Stack flex={1} direction="row" justifyContent="center" alignItems="center" spacing={1}>
                    <label htmlFor="contained-button-file">
                        <Input accept="image/*" id="contained-button-file" multiple type="file" />
                        <Button
                            name="UPLOAD PICTURE"
                            component="span"
                            variant="text"
                            onClick={onUploadPicture}
                        />
                    </label>
                </Stack>

                <Stack flex={1} direction="row" justifyContent="center" alignItems="center" spacing={1}>
                    <Button
                        name="REMOVE PICTURE"
                        variant="text"
                        size="small"
                        onClick={onRemovePicture}
                    // disabled={props.image === null}
                    />
                </Stack>
            </Stack>
        </Box>
    )
}

export default BoxFaviconOrganization