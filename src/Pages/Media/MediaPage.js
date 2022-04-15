import { useState, useEffect, useMemo } from 'react'
import { GridView, FormatListBulleted, AutoFixHigh, Tune, LocalOfferOutlined } from '@mui/icons-material'



import MainLayout from 'UI/Layouts/MainLayout'
import SelectTagDialog from 'UI/Widgets/Tags/SelectTagDialog'
import { Divider } from 'UI'

import { useTags, useTeamMembers } from 'Api/Hooks'
import { getMediaTypes } from 'Api/Endpoints'
import { getFullName } from 'utils/Parser'

export const MediaPage = (props) => {

    const tags = useTags()
    const teamMembers = useTeamMembers()

    const [mediaTypes, setMediaTypes] = useState([])
    const [owners, setOwners] = useState([])

    const [openSelectTagDialog, setOpenSelectTagDialog] = useState(false)
    const [showPanelFilters, setShowPanelFilters] = useState(false)
    const [selectedFilters, setSelectedFilters] = useState({})
    const [loading, setLoading] = useState(false)
    

    useEffect(() => {
        getMediaTypes().then(res => {
            setMediaTypes(res[0].map(item => ({
                id: item.key,
                name: item.type
            })))
        })
    }, [])

    useEffect(() => {
        if (teamMembers.items?.length > 0)
            setOwners(teamMembers.items.map(item => ({
                id: item.id,
                name: getFullName(item)
            })))
    }, [teamMembers.items])

    const filters = [
        { // Category
            id: '0',
            name: 'My Media',
            items: [
                // Filters
            ]
        },
    ]

    const mainActions = [
        {
            name: 'Change view',
            type: 'icon',
            icon: props.viewGrid ? GridView : FormatListBulleted,
            onClick: props.onSwitchView
        },
        {
            name: 'Action',
            icon: AutoFixHigh,
            variant: 'outlined',
            type: 'dropdown',
            options: [
                { name: 'Send in Message', onClick: () => { console.log("clicked") } },
                { name: 'Download', onClick: () => { console.log("clicked") } },
                { name: 'Archive Media', onClick: () => { console.log("clicked") } },
                { name: 'Untag', onClick: () => { console.log("clicked") } },
            ]
        },
        {
            name: 'Tag',
            icon: LocalOfferOutlined,
            variant: 'outlined',
            onClick: () => setOpenSelectTagDialog(true),
        },
        {
            name: 'Filters',
            icon: Tune,
            variant: 'outlined',
            onClick: () => setShowPanelFilters(oldShowFilter => !oldShowFilter),
        },
    ]

    const panelFiltersData = useMemo(() =>
    ({
        "fileType": {
            label: 'File Type',
            options: mediaTypes,
            isUnique: true,
        },
        "distributed": {
            label: 'Distributed',
            options: [],
        },
        "owner": {
            label: 'Owner',
            options: owners,
        },
        "associatedTo": {
            label: 'Associated To',
            options: [],
        },
        "dateUploaded": {
            label: 'Date Uploaded',
            options: [],
        },
        "tag": {
            label: 'Tag',
            options: tags || [],
        },
    }), [tags, mediaTypes])

    const onTopActionClick = (e) => {
        console.log('top action click')
    }

    const onPanelFilterChange = (filter) => {
        setSelectedFilters(filter)
        props.filter(filter)
    }

    const onTagsSelected = (selectedTagsIds) => {
        //setLoading(true)
       console.log(selectedTagsIds)
    }


    return (
        <MainLayout
            title={props.title || 'Media'}
            topActionName={props.topActionName || '+ Add Media'}
            onTopActionClick={onTopActionClick}
            filters={filters}
            actions={mainActions}
            loading={loading}
            propsPanelFilters={{
                open: showPanelFilters,
                filters: panelFiltersData,
                onFilterChange: onPanelFilterChange
            }}
        >
            <Divider />

            {/* {() => cloneElement(props.children, { viewGrid })} */}
            {props.children}

            <SelectTagDialog
                open={openSelectTagDialog}
                onClose={() => setOpenSelectTagDialog(false)}
                onConfirm={onTagsSelected}
            />

        </MainLayout>
    )
}

export default MediaPage