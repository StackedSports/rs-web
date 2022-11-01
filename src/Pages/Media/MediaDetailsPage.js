import { useEffect, useState, useMemo, useContext } from "react"
import { useParams, useHistory } from "react-router-dom"
import { AutoFixHigh, CheckBoxOutlineBlank, CheckBox } from "@mui/icons-material"
import { Grid, Stack, Box, Typography, styled, Checkbox, Chip, debounce, Divider } from "@mui/material"
import lodash from "lodash"

import MainLayout, { useMainLayoutAlert } from 'UI/Layouts/MainLayout'
import MediaPreview from 'UI/Widgets/Media/MediaPreview'
import DetailsPreview from "UI/DataDisplay/DetailsPreview"
import SearchableSelector from 'UI/Forms/Inputs/SearchableSelector'
import EditableLabel from 'UI/Forms/Inputs/EditableLabel'
import RenderIf from "UI/Widgets/RenderIf"
import MediaCarousel from 'UI/Widgets/Media/MediaCarousel'
import ErrorPanel from 'UI/Layouts/ErrorPanel'

import { AppContext } from 'Context/AppProvider'

import { useTags, useMedia, useMediaMutation, usePlaceholders, useContacts, useTeamMembers } from "Api/ReactQuery"
import { getPlaceholder } from "Api/Endpoints"
import { mediaRoutes } from "Routes/Routes"
import { addTagsToMedia, deleteTagsFromMedia } from "Api/Endpoints"
import { formatDate, getFullName } from "utils/Parser"
import { useQueryClient } from "react-query"

export const MediaDetailsPage = () => {
    const queryClient = useQueryClient();
    const app = useContext(AppContext)
    const { id } = useParams()
    const history = useHistory()
    const { update, remove } = useMediaMutation()

    const alert = useMainLayoutAlert()
    const tags = useTags()
    const contacts = useContacts()
    const teamMembers = useTeamMembers()
    const placeholders = usePlaceholders()
    const { item: media, loading, isError, error } = useMedia(id)

    const [redirect, setRedirect] = useState('')
    const [itemTags, setItemTags] = useState([])
    const [itemOwner, setItemOwner] = useState([])
    const [itemPlaceholder, setItemPlaceholder] = useState([])
    const [itemContact, setItemContact] = useState([])
    const [itemName, setItemName] = useState('')
    const [openImageModal, setOpenImageModal] = useState(false)

    useEffect(() => {
        let mounted = true
        if (media && mounted) {
            setItemTags(media.tags)
            setItemOwner(media.owner ? [media.owner] : [])
            setItemName(media.name)
            setItemContact(media.contact ? [media.contact] : [])

            if (media.media_placeholder_id)
                getPlaceholder(media.media_placeholder_id).then(placeholder => {
                    if (mounted)
                        setItemPlaceholder([placeholder[0]])
                })
        }
        return () => {
            mounted = false
        }
    }, [media])

    const invalidateMediasCache = () => {
        queryClient.invalidateQueries(['media'], { active: true })
        queryClient.invalidateQueries(['medias'])
    }

    const onArchiveAction = () => {
        update({ id: media.id, data: { archive: true } }, {
            onSuccess: () => {
                alert.setSuccess("Media archived")
            },
            onError: (e) => {
                alert.setWarning(`Error archiving media: ${e.message}`)
            }
        })
    }

    const onSendInMessageAction = () => {
        if (!media)
            return

        app.sendMediaInMessage(media, 'media')
    }

    const onDeleteAction = () => {
        remove(media.id, {
            onSuccess: () => {
                alert.setSuccess("Media deleted")
                setRedirect(mediaRoutes.media)
            },
            onError: err => {
                console.table(err)
                if (err.response.status === 422)
                    alert.setWarning('Unable to delete media that has been previously used in a message. Please contact support to get media deleted')
                else
                    alert.setWarning(err.message)
            }
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
    ]

    const onEditName = (newName) => {
        update({ id: media.id, data: { name: newName } }, {
            onSuccess: () => {
                setItemName(newName)
                alert.setSuccess("Media name updated")
            },
            onError: err => {
                setItemName(media.name)
                alert.setWarning(err.message)
            }
        })
    }

    const handleChangeTags = (newTags) => {
        //console.log("newTags", newTags)
        //console.log(itemTags)
        const sameItems = lodash.intersectionBy(itemTags, newTags, 'id')

        if (newTags.length > itemTags.length) {
            const differenceTags = lodash.differenceBy(newTags, sameItems, 'id')
            const differenceTagsIds = differenceTags.map(tag => tag.id)
            console.log("tag adicionada", differenceTags)

            addTagsToMedia(differenceTagsIds, media.id).then(() => {
                setItemTags(newTags)
                alert.setSuccess("Tag " + differenceTags[0].name + " added")
            }).catch(err => {
                alert.setWarning(err.message)
            })
        } else {
            const differenceTags = lodash.differenceBy(itemTags, sameItems, 'id')
            const differenceTagsIds = differenceTags.map(tag => tag.id)
            console.log("tag removida", differenceTags)
            deleteTagsFromMedia(differenceTagsIds, media.id).then(() => {
                setItemTags(newTags)
                alert.setSuccess("Tag " + differenceTags[0].name + " removed")
            }).catch(err => {
                alert.setWarning(err.message)
            })
        }
        invalidateMediasCache()
    }

    const handleChangeOwner = (owner) => {
        const newOwner = owner.pop()
        update({ id: media.id, data: { owner: newOwner ? newOwner.id : null } }, {
            onSuccess: () => {
                setItemOwner(newOwner ? [newOwner] : [])
                if (newOwner)
                    alert.setSuccess("Media owner updated to: " + getFullName(newOwner))
                else
                    alert.setSuccess("Media owner removed")
            },
            onError: err => {
                alert.setWarning(err.message)
            },
        })
    }

    const handleChangePlaceholder = (placeholder) => {
        const newPlaceholder = placeholder.pop()
        update({ id: media.id, data: { media_placeholder_id: newPlaceholder ? newPlaceholder.id : null } }, {
            onSuccess: () => {
                setItemPlaceholder(newPlaceholder ? [newPlaceholder] : [])
                if (newPlaceholder)
                    alert.setSuccess("Media placeholder updated")
                else
                    alert.setSuccess("Media placeholder removed")
            },
            onError: err => {
                alert.setWarning(err.message)
            },
        })
    }

    const handlePlaceholderInputSearch = debounce((value) => {
        if (value) {
            placeholders.filter({
                name: value,
            })
        } else {
            placeholders.clearFilter()
        }
    }, 500)

    const handleContactInputSearch = debounce((value) => {
        if (value) {
            contacts.filter({
                search: value,
            })
        } else {
            console.log("clear")
            contacts.clearFilter()
        }
    }, 500)

    const handleChangeContact = (contact) => {
        const newContact = contact.pop()

        // Associate media to contact
        update({ id: media.id, data: { team_contact_id: newContact ? newContact.id : null } }, {
            onSuccess: () => {
                setItemContact(newContact ? [newContact] : [])
                if (newContact)
                    alert.setSuccess("Media contact updated to: " + getFullName(newContact))
                else
                    alert.setSuccess("Media contact removed")
            },
            onError: err => {
                alert.setWarning(err.message)
            },
        })
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
            actions={!isError ? mainActions : null}
            loading={loading}
            alert={alert}
            redirect={redirect}
            onBackClick={() => history.length > 1 ? history.goBack() : setRedirect(mediaRoutes.media)}
            filtersDisabled
        >
            {isError &&
                <ErrorPanel
                    title={`${error.response.status} ${error.response.statusText}`}
                    body={error.response.data?.errors[0]?.message}
                />
            }
            <RenderIf condition={!isError}>
                <Grid container mt={3}>
                    <GridItemLeft item xs={8} xl={9} >

                        {/* <Stack direction='row' flexWrap='wrap' gap={2}> */}
                        <Stack direction='row' flexWrap='nowrap' gap={2}>

                            <MediaPreview
                                miniImage
                                item={media}
                                loading={loading}
                                type='media'
                                onClick={() => setOpenImageModal(true)}
                                cardStyle={{ width: "300px" }}
                            />

                            <Box flex='1 1 auto' >

                                <EditableLabel
                                    placeholder='Media Name'
                                    value={itemName}
                                    onEdit={onEditName}
                                />

                                <DetailsPreview label="File Name:" value={media?.file_name} />
                                <DetailsPreview label="File Type:" value={media?.file_type} />
                                <DetailsPreview label="Uploaded on :" value={formatDate(media?.created_at, 'medium', 'short')} />
                                <DetailsPreview label="Uploaded by :" value={getFullName(media?.owner)} />
                                <DetailsPreview label="File Size:" value={fileSizeFormatted} />
                                <RenderIf condition={media?.discarded_at}>
                                    <DetailsPreview label="Archived on :" value={formatDate(media?.discarded_at)} />
                                </RenderIf>

                                <Stack direction='row' gap={2} mt={.5} alignItems='center'>
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
                        <SearchableSelector
                            multiple
                            options={teamMembers.items}
                            loading={teamMembers.loading}
                            value={itemOwner}
                            onChange={handleChangeOwner}
                            label="+ Add Owner"
                            placeholder="Search for owner"
                            getOptionLabel={(option) => getFullName(option)}
                            getChipLabel={(option) => getFullName(option)}
                        />

                        <Typography variant='subtitle1' >
                            Tags
                        </Typography>
                        <SearchableSelector
                            multiple
                            options={tags.items}
                            value={itemTags}
                            onChange={handleChangeTags}
                            label="+ Add tag"
                            placeholder="Search for tags"
                            getOptionLabel={(option) => option?.name}
                            getChipLabel={(option) => option?.name}
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
                        />

                        <Stack direction='row' alignItems='center' flexWrap='wrap' gap={1} >

                            <Box sx={{ flex: '1 1 auto', }} >

                                <Typography variant='subtitle1' mb={2}  >
                                    Association to Placeholder
                                </Typography>
                                <SearchableSelector
                                    multiple
                                    options={placeholders.items}
                                    loading={placeholders.loading}
                                    value={itemPlaceholder}
                                    onChange={handleChangePlaceholder}
                                    label="Placeholder"
                                    placeholder="Search for placeholder"
                                    getOptionLabel={(option) => option?.name}
                                    onInputChange={(event, newInputValue) => { handlePlaceholderInputSearch(newInputValue) }}
                                    getChipLabel={(option) => option?.name}
                                />

                            </Box>

                            <Box sx={{ flex: '1 1 auto', }} >

                                <Typography variant='subtitle1' mb={2} >
                                    Association to Contact
                                </Typography>

                                <SearchableSelector
                                    multiple
                                    options={contacts.items}
                                    loading={contacts.loading}
                                    value={itemContact}
                                    label="Contact"
                                    placeholder="Search for contact"
                                    clearOnBlur
                                    onChange={handleChangeContact}
                                    getOptionLabel={(option) => getFullName(option)}
                                    onInputChange={(event, newInputValue) => handleContactInputSearch(newInputValue)}
                                    getChipLabel={(option) => getFullName(option)}
                                />
                            </Box>
                        </Stack>
                    </GridItemLeft>

                    <GridItemRight item xs={4} xl={3} >
                        <MediaStatsColumn divider={<Divider />}>
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
            </RenderIf>
            <MediaCarousel
                items={[media]}
                index={openImageModal ? 0 : null}
                onClose={() => setOpenImageModal(false)}
            />
        </MainLayout>
    )
}

const MediaStatsColumn = styled(Stack)(({ theme }) => ({
    width: '100%',

    ' > *:not(.MuiDivider-root)': {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },

    '&> .MuiDivider-root': {
        padding: 0,
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
    padding: theme.spacing(.7),
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
