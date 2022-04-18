import { useEffect, useState, useMemo } from "react"
import { useParams } from "react-router-dom"
import { AutoFixHigh, LocalOfferOutlined, CheckBoxOutlineBlank, CheckBox, Clear } from "@mui/icons-material"
import { Grid, Stack, Box, Typography, styled, TextField, Autocomplete, Checkbox, Chip, debounce } from "@mui/material"
import lodash from "lodash"

import MainLayout, { useMainLayoutAlert } from 'UI/Layouts/MainLayout'
import MediaPreview from 'UI/Widgets/Media/MediaPreview'
import DetailsPreview from "UI/DataDisplay/DetailsPreview"
import SelectTagDialog from 'UI/Widgets/Tags/SelectTagDialog'

import { useMedia, useContacts, useTags, usePlaceholders, useTeamMembers } from "Api/Hooks"
import { mediaRoutes } from "Routes/Routes"
import { archiveMedia, deleteMedia, updateMedia, addTagsToMedia, deleteTagsFromMedia } from "Api/Endpoints"
import { formatDate, getFullName } from "utils/Parser"

export const MediaDetailsPage = () => {
    const { id } = useParams()

    const alert = useMainLayoutAlert()
    const tags = useTags()
    const contacts = useContacts()
    const teamMembers = useTeamMembers()
    // TODO filter placeholders on autocomplete
    const placeholders = usePlaceholders()

    const { item: media, loading } = useMedia(id)

    const [redirect, setRedirect] = useState('')
    const [itemTags, setItemTags] = useState([])
    const [itemOwner, setItemOwner] = useState([])
    const [itemPlaceholder, setItemPlaceholder] = useState([])
    const [itemContact, setItemContact] = useState([])
    const [openSelectTagDialog, setOpenSelectTagDialog] = useState(false)


    useEffect(() => {
        if (media) {
            setItemTags(media.tags)
            setItemOwner([media.owner])
        }
    }, [media])

    const onArchiveAction = () => {
        archiveMedia(media.id).then(() => {
            alert.setSuccess("Media archived")
        }).catch(err => {
            alert.setWarning(err.message)
        })
    }

    const onSendInMessageAction = () => {
        console.log("send in message")
    }

    const onDeleteAction = () => {
        deleteMedia(media.id).then(() => {
            alert.setSuccess("Media archived")
            setRedirect(mediaRoutes.media)
        }).catch(err => {
            alert.setWarning(err.message)
        })
    }

    const mainActions = [
        {
            name: 'Action',
            icon: AutoFixHigh,
            variant: 'outlined',
            type: 'dropdown',
            options: [
                { name: 'Archive', onClick: onArchiveAction },
                { name: 'Send in Message', onClick: onSendInMessageAction },
                { name: 'Delete', onClick: onDeleteAction },
            ]
        },
        {
            name: 'Tag',
            icon: LocalOfferOutlined,
            variant: 'outlined',
            onClick: () => setOpenSelectTagDialog(true),
        },
    ]

    const handleChangeTags = (newTags) => {
        const differenceTags = lodash.differenceBy(newTags, itemTags, 'id')
        const differenceTagsIds = differenceTags.map(tag => tag.id)

        if (newTags.length > itemTags.length) {
            console.log("tag adicionada", differenceTags)

            addTagsToMedia(differenceTagsIds, media.id).then(() => {
                setItemTags(newTags)
                alert.setSuccess("Tag " + differenceTags[0].name + " added")
            }).catch(err => {
                alert.setWarning(err.message)
            })
        } else {
            console.log("tag removida", differenceTags)
            deleteTagsFromMedia(differenceTagsIds, media.id).then(() => {
                setItemTags(newTags)
                alert.setSuccess("Tag " + differenceTags[0].name + " removed")
            }).catch(err => {
                alert.setWarning(err.message)
            })
        }
    }

    const handleTagsDialogConfirm = (selectedTagsIds) => {
        console.log(selectedTagsIds)
    }

    const handleChangeOwner = (owner) => {
        if (owner && owner.length > 0) {
            const newOwner = owner[0]
            updateMedia(media.id, { owner: newOwner }).then(() => {
                setItemOwner([newOwner])
                alert.setSuccess("Media owner updated")
            }
            ).catch(err => {
                alert.setWarning(err.message)
            })
        }
    }

    const handleChangePlaceholder = (placeholder) => {
        if (placeholder && placeholder.length > 0) {
            const newPlaceholder = placeholder[0]
            updateMedia(media.id, { media_placeholder_id: newPlaceholder.id }).then(() => {
                setItemPlaceholder([newPlaceholder])
                alert.setSuccess("Media placeholder updated")
            }
            ).catch(err => {
                alert.setWarning(err.message)
            })
        }else{
            // TODO REMOVER PLACEHOLDER
        }
    }

    //TODO handle Placeholder inputSearch

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
        if (contact && contact.length > 0) {
            const newContact = contact[0]
            updateMedia(media.id, { team_contact_id: newContact.id }).then(() => {
                setItemContact([newContact])
                alert.setSuccess("Media contact updated")
            }
            ).catch(err => {
                alert.setWarning(err.message)
            })
        }else{
            // TODO REMOVER CONTATO
        }
    }

    const handleSaveChanges = () => {
        //TODO
    }

    const onMediaSelectedChange = (checked) => {
        setMediaSelected(checked)
    }

    const messagesCountLabel = useMemo(() => {
        if (!media)
            return '--'

        return `${Object.values(media.activity).reduce((acc, item) => acc + item, 0)} Messages`
    }, [media])

    const fileSizeFormatted = useMemo(() => {
        if (!media)
            return '--'

        return `${(media.size / 1000).toFixed(2)} kb`
    }, [media])

    return (
        <MainLayout
            title="Media Details"
            actions={mainActions}
            loading={loading}
            alert={alert}
            redirect={redirect}
        >

            <Grid container mt={3}>
                <GridItemLeft item xs={8} xl={9} >

                    <Stack direction='row' flexWrap='wrap' gap={2}>

                        <MediaPreview
                            item={media}
                            loading={loading}
                            type='media'
                        />

                        <Box flex='1 1 auto' >
                            <Typography variant='subtitle1' sx={{ wordBreak: 'break-word' }} >
                                {media?.name || media?.file_name}
                            </Typography>

                            <DetailsPreview label="File Type:" value={media?.file_type} />
                            <DetailsPreview label="Uploaded on :" value={formatDate(media?.created_at)} />
                            <DetailsPreview label="Uploaded by :" value={getFullName(media?.owner)} />
                            <DetailsPreview label="File Size:" value={fileSizeFormatted} />

                            <Stack direction='row' gap={2} alignItems='center'>
                                <Typography variant="info">
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

                    <Typography variant='subtitle1' >
                        Owner
                    </Typography>
                    <Autocomplete
                        multiple
                        selectOnFocus
                        clearOnBlur
                        value={itemOwner}
                        options={teamMembers.items || []}
                        loading={teamMembers.loading}
                        getOptionLabel={(option) => getFullName(option)}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        onChange={(event, newValue) => {
                            handleChangeOwner(newValue)
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="outlined"
                                label="+ Add Owner"
                                placeholder="Search for owner"
                            />
                        )}
                        renderTags={(tagValue, getTagProps) => {
                            return tagValue.map((option, index) => (
                                <CustomChip
                                    variant='outlined'
                                    {...getTagProps({ index })}
                                    label={getFullName(option)}
                                    deleteIcon={<Clear />}
                                />
                            ));
                        }}
                    />

                    <Typography variant='subtitle1' >
                        Tags
                    </Typography>
                    <Autocomplete
                        multiple
                        openOnFocus
                        selectOnFocus
                        clearOnBlur
                        value={itemTags}
                        options={tags || []}
                        disableCloseOnSelect
                        isOptionEqualToValue={(option, value) => option?.id === value?.id}
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
                                    label={option?.name}
                                    deleteIcon={<Clear />}
                                />
                            ));
                        }}
                    />

                    <Stack direction='row' alignItems='center' flexWrap='wrap' gap={1} >

                        <Box sx={{ flex: '1 1 auto', }} >

                            <Typography variant='subtitle1' mb={2}  >
                                Association to Placeholder
                            </Typography>
                            <Autocomplete
                                options={placeholders.items || []}
                                loading={placeholders.loading}
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

                            <Typography variant='subtitle1' mb={2} >
                                Association to Contact
                            </Typography>
                            <Autocomplete
                                multiple
                                options={contacts.items || []}
                                selectOnFocus
                                clearOnBlur
                                value={itemContact}
                                loading={contacts.loading}
                                getOptionLabel={(option) => getFullName(option)}
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
                                            label={getFullName(option)}
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
                        <Typography variant='subtitle1'>
                            Media Status
                        </Typography>
                        <DetailsPreview
                            direction="column"
                            label="Sent in:"
                            value={messagesCountLabel}
                        />
                        <DetailsPreview
                            direction="column"
                            label="Media Published in:"
                            value={`${media?.activity?.tweets} Tweets`}
                        />
                        <Stack>
                            <Typography variant='subtitle2' gutterBottom >
                                Messaging Stats:
                            </Typography>

                            <Stack justifyContent='center' alignItems='center'>
                                <Typography variant='subtitle1'>
                                    -
                                </Typography>
                                <Typography variant='caption'>
                                    Response Rate (0/0)
                                </Typography>
                            </Stack>

                            <Stack justifyContent='center' alignItems='center'>
                                <Typography variant='subtitle1'>
                                    -
                                </Typography>
                                <Typography variant='caption'>
                                    Opt-out Rate (0/0)
                                </Typography>
                            </Stack>
                        </Stack>

                        <Stack>
                            <Typography variant="info" gutterBottom >
                                Post Stats:
                            </Typography>

                            <Stack justifyContent='center' alignItems='center'>
                                <Typography variant='subtitle1'>
                                    -
                                </Typography>
                                <Typography variant='caption'>
                                    Contact Engagement
                                </Typography>
                            </Stack>

                            <Stack justifyContent='center' alignItems='center'>
                                <Typography variant='subtitle1'>
                                    -
                                </Typography>
                                <Typography variant='caption'>
                                    Favorites from Contacts
                                </Typography>
                            </Stack>

                            <Stack justifyContent='center' alignItems='center'>
                                <Typography variant='subtitle1'>
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
            <SelectTagDialog
                open={openSelectTagDialog}
                onClose={() => setOpenSelectTagDialog(false)}
                onConfirm={handleTagsDialogConfirm}
            />
        </MainLayout>
    )
}

const MediaStatsColumn = styled(Stack)(({ theme }) => ({
    width: '100%',
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
    },

    '.MuiTypography-subtitle1 , .MuiTypography-subtitle2': {
        fontWeight: 'bold',
        textTransform: 'capitalize',
    },

    '.MuiTypography-subtitle2': {
        color: theme.palette.text.secondary,
    },
}));

const GridItemRight = styled(Grid)(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    borderLeft: 0,
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

    '.MuiTypography-subtitle1': {
        fontWeight: 'bold',
        textTransform: 'capitalize',
    },

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
