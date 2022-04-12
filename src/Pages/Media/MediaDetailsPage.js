import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { AutoFixHigh, LocalOfferOutlined, CheckBoxOutlineBlank, CheckBox, Clear } from "@mui/icons-material"
import { Grid, Stack, Box, Typography, Paper, styled, TextField, Autocomplete, Checkbox, Chip, debounce } from "@mui/material"

import MainLayout from 'UI/Layouts/MainLayout'
import MediaPreview from 'UI/Widgets/Media/MediaPreview'

import { useMedia, useContacts, useTags, usePlaceholders, useTeamMembers } from "Api/Hooks"

export const MediaDetailsPage = () => {
    const { id } = useParams()

    const tags = useTags()
    const { item: media, loading } = useMedia(id)

    const [itemTags, setItemTags] = useState([])
    const [itemOwner, setItemOwner] = useState([])
    const [itemPlaceholder, setItemPlaceholder] = useState([])
    const [itemContact, setItemContact] = useState([])

    const contacts = useContacts()
    const { items: teamMenbers, loading: teamMembersLoading } = useTeamMembers()
    const { items: placeholders, loading: placeholdersLoading } = usePlaceholders()

    useEffect(() => {
        if (media) {
            setItemTags(media.tags)
            setItemOwner(oldOwner => [...oldOwner, media.owner])
        }
    }, [media])

    const mainActions = [
        {
            name: 'Action',
            icon: AutoFixHigh,
            variant: 'outlined',
        },
        {
            name: 'Tag',
            icon: LocalOfferOutlined,
            variant: 'outlined',
        },
    ]

    const handleChangeTags = (tag) => {
        if (tag) {
            setItemTags(oldTags => {
                const newTags = [...oldTags]
                if (!newTags.includes(tag)) {
                    newTags.push(tag)
                }
                return newTags
            })
        }
    }

    const handleChangeOwner = (contact) => {
        if (contact) {
            setItemOwner(contact.slice(-1))
        }
    }

    const handleChangePlaceholder = (placeholder) => {
        if (placeholder) {
            setItemPlaceholder(placeholder.slice(-1))
        }
    }

    const handleContactInputSearch = debounce((value) => {
        if (value) {
            contacts.filter({
                search: value,
            })
        } else {
            contacts.clearFilter()
        }
    }, 500)

    const handleChangeContact = (contact) => {
        if (contact) {
            setItemContact(contact.slice(-1))
        }
    }

    const handleSaveChanges = () => {
        //TODO
    }


    return (
        <MainLayout
            title="Media Details"
            actions={mainActions}
            loading={loading}

        >

            <Grid container mt={3}>
                <GridItemLeft item xs={8} xl={9} >

                    <Stack direction='row' flexWrap='wrap' gap={2}>

                        <MediaPreview
                            media={media}
                            loading={loading}
                            type='media'
                        />

                        <Box
                            flex='1 1 auto'
                            sx={{
                                color: 'text.secondary',
                            }}
                        >
                            <Typography variant='subtitle1' fontWeight='bold' textTransform='capitalize' color='text.primary' >
                                {media?.name || media?.file_name}
                            </Typography>
                            <Typography variant="body1">
                                File Type :
                                <Typography component="span" fontWeight='bold' >
                                    {' ' + media?.file_type}
                                </Typography>
                            </Typography>
                            <Typography variant="body1">
                                Uploaded on :
                                <Typography component="span" fontWeight='bold' >
                                    {' ' + media?.updated_at}
                                </Typography>
                            </Typography>
                            <Typography variant="body1">
                                Uploaded by :
                                <Typography component="span" fontWeight='bold' >
                                    {' ' + media?.owner?.first_name + ' ' + media?.owner?.last_name}
                                </Typography>
                            </Typography>
                            <Typography variant="body1">
                                File Size:
                                <Typography component="span" fontWeight='bold' >
                                    {' ' + (media?.size / 1000).toFixed(0) + ' kb'}
                                </Typography>
                            </Typography>
                            <Stack direction='row' gap={2} alignItems='center'>
                                <Typography variant="body1">
                                    Tags :
                                </Typography>
                                {media?.tags.map((tag) => (
                                    <TagsInfo key={tag.id}>
                                        {tag.name}
                                    </TagsInfo>
                                ))}
                            </Stack>
                        </Box>
                    </Stack>

                    <Typography
                        variant='subtitle1'
                        fontWeight='bold'
                        textTransform='capitalize'
                        color='text.primary'

                    >
                        Owner
                    </Typography>
                    {/* team mebers substituir */}
                    <Autocomplete
                        multiple
                        selectOnFocus
                        clearOnBlur
                        value={itemOwner}
                        options={teamMenbers || []}
                        loading={teamMembersLoading}
                        getOptionLabel={(option) => option?.first_name + ' ' + option?.last_name}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        onChange={(event, newValue) => {
                            handleChangeOwner(newValue)
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="outlined"
                                label="+ Add Owner"
                            />
                        )}
                        renderTags={(tagValue, getTagProps) => {
                            return tagValue.map((option, index) => (
                                <CustomChip
                                    variant='outlined'
                                    {...getTagProps({ index })}
                                    label={option?.first_name + ' ' + option?.last_name}
                                    deleteIcon={<Clear />}
                                />
                            ));
                        }}
                    />

                    <Typography
                        variant='subtitle1'
                        fontWeight='bold'
                        textTransform='capitalize'
                        color='text.primary'
                    >
                        Tags
                    </Typography>
                    <Autocomplete
                        multiple
                        openOnFocus
                        selectOnFocus
                        clearOnBlur
                        options={tags || []}
                        disableCloseOnSelect
                        getOptionLabel={(option) => option?.name}
                        onChange={(event, newValue) => {
                            handleChangeTags(newValue)
                        }}
                        renderOption={(props, option, { selected }) => (
                            <li {...props}>
                                <Checkbox
                                    icon={<CheckBoxOutlineBlank fontSize="small" />}
                                    checkedIcon={<CheckBox fontSize="small" />}
                                    style={{ marginRight: 8 }}
                                    checked={selected}
                                />
                                {option.name}
                            </li>
                        )}
                        renderInput={(params) => (
                            <TextField {...params} label="+ Add tag" fullWidth />
                        )}
                        renderTags={(tagValue, getTagProps) => {
                            return tagValue.map((option, index) => (
                                <CustomChip
                                    variant='outlined'
                                    {...getTagProps({ index })}
                                    label={option.name}
                                    deleteIcon={<Clear />}
                                />
                            ));
                        }}
                    />

                    <Stack direction='row' alignItems='center' flexWrap='wrap' gap={1} >

                        <Box sx={{ flex: '1 1 auto', }} >

                            <Typography
                                variant='subtitle1'
                                fontWeight='bold'
                                textTransform='capitalize'
                                color='text.primary'
                                mb={2}
                            >
                                Association to Placeholder
                            </Typography>
                            <Autocomplete
                                options={placeholders || []}
                                loading={placeholdersLoading}
                                multiple
                                selectOnFocus
                                clearOnBlur
                                getOptionLabel={(option) => option?.name}
                                value={itemPlaceholder}
                                onChange={(event, newValue) => {
                                    handleChangePlaceholder(newValue)
                                }}
                                renderInput={(params) => (
                                    <TextField {...params} label="Placeholder" fullWidth />
                                )}
                                renderTags={(tagValue, getTagProps) => {
                                    return tagValue.map((option, index) => (
                                        <CustomChip
                                            variant='outlined'
                                            {...getTagProps({ index })}
                                            label={option?.name}
                                            deleteIcon={<Clear />}
                                        />
                                    ));
                                }}
                            />
                        </Box>

                        <Box sx={{ flex: '1 1 auto', }} >

                            <Typography
                                variant='subtitle1'
                                fontWeight='bold'
                                textTransform='capitalize'
                                color='text.primary'
                                mb={2}

                            >
                                Association to Contact
                            </Typography>
                            <Autocomplete
                                multiple
                                options={contacts.items || []}
                                selectOnFocus
                                clearOnBlur
                                value={itemContact}
                                loading={contacts.loading}
                                getOptionLabel={(option) => option?.first_name + ' ' + option?.last_name}
                                onChange={(event, newValue) => {
                                    handleChangeContact(newValue)
                                }}
                                onInputChange={(event, newInputValue) => {
                                    handleContactInputSearch(newInputValue)
                                }}
                                renderInput={(params) => (
                                    <TextField {...params} label="Contact" fullWidth />
                                )}
                                renderTags={(tagValue, getTagProps) => {
                                    return tagValue.map((option, index) => (
                                        <CustomChip
                                            variant='outlined'
                                            {...getTagProps({ index })}
                                            label={option?.first_name + ' ' + option?.last_name}
                                            deleteIcon={<Clear />}
                                        />
                                    ));
                                }}
                            />
                        </Box>
                    </Stack>

                </GridItemLeft>

                <GridItemRight item xs={4} xl={3} >
                    <MediaStatsColumn>
                        <Typography variant='subtitle1' fontWeight='bold'>
                            Media Status
                        </Typography>
                        <Stack>
                            <Typography variant='subtitle2' fontWeight='bold' color='text.secondary' gutterBottom >
                                Media Sent in:
                            </Typography>
                            <Typography variant='subtitle1' fontWeight='bold'>
                                {
                                    media?.activity && Object.values(media.activity).reduce((acc, item) => acc + item, 0)
                                } Messages
                            </Typography>
                        </Stack>
                        <Stack>
                            <Typography variant='subtitle2' fontWeight='bold' color='text.secondary' gutterBottom >
                                Media Published in:
                            </Typography>
                            <Typography variant='subtitle1' fontWeight='bold'>
                                {media?.activity?.tweets} Tweets
                            </Typography>
                        </Stack>

                        <Stack>
                            <Typography variant='subtitle2' fontWeight='bold' color='text.secondary' gutterBottom >
                                Messaging Stats:
                            </Typography>

                            <Stack justifyContent='center' alignItems='center'>
                                <Typography variant='subtitle1' fontWeight='bold'>
                                    -
                                </Typography>
                                <Typography variant='caption'>
                                    Response Rate (0/0)
                                </Typography>
                            </Stack>

                            <Stack justifyContent='center' alignItems='center'>
                                <Typography variant='subtitle1' fontWeight='bold'>
                                    -
                                </Typography>
                                <Typography variant='caption'>
                                    Opt-out Rate (0/0)
                                </Typography>
                            </Stack>
                        </Stack>

                        <Stack>
                            <Typography variant='subtitle2' fontWeight='bold' color='text.secondary' gutterBottom >
                                Post Stats:
                            </Typography>

                            <Stack justifyContent='center' alignItems='center'>
                                <Typography variant='subtitle1' fontWeight='bold'>
                                    -
                                </Typography>
                                <Typography variant='caption'>
                                    Contact Engagement
                                </Typography>
                            </Stack>

                            <Stack justifyContent='center' alignItems='center'>
                                <Typography variant='subtitle1' fontWeight='bold'>
                                    -
                                </Typography>
                                <Typography variant='caption'>
                                    Favourites from Contacts
                                </Typography>
                            </Stack>

                            <Stack justifyContent='center' alignItems='center'>
                                <Typography variant='subtitle1' fontWeight='bold'>
                                    -
                                </Typography>
                                <Typography variant='caption'>
                                    Retweets front Contacts
                                </Typography>
                            </Stack>
                        </Stack>

                    </MediaStatsColumn>
                </GridItemRight>
            </Grid>
        </MainLayout>
    )
}

const MediaStatsColumn = styled(Stack)({
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',

    ' > *': {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        border: '1px solid #efefef',
    }
});

const GridItemRight = styled(Grid)(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
}));

const GridItemLeft = styled(Grid)(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(3),
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
}));

const TagsInfo = styled('span')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(1),
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: theme.shape.borderRadius,
    marginRight: theme.spacing(1),
    width: 'fit-content',
}));

const CustomChip = styled(Chip)(({ theme }) => ({
    border: "1px solid #d8d8d8",
    height: 50,
    width: "max-content",
    fontWeight: 600,
    borderRadius: 4,
    paddingLeft: 16,
    paddingRight: 16,
    margin: 8,

    '.MuiChip-deleteIcon': {
        color: theme.palette.error.main,

        '&:hover': {
            color: theme.palette.error.dark,
            borderRadius: '50%',
        }
    }
}));


export default MediaDetailsPage
