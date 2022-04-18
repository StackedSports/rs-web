import { useState, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import { AccountBox, Tune } from '@material-ui/icons';
import SendIcon from '@mui/icons-material/Send';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';

import MainLayout, { useMainLayoutAlert } from 'UI/Layouts/MainLayout';
import ContactsTable from 'UI/Tables/Contacts/ContactsTable';
import CreateBoardDialog from 'UI/Widgets/Dialogs/CreateBoardDialog';

import Button, { IconButton } from 'UI/Widgets/Buttons/Button';
import SelectTagDialog from 'UI/Widgets/Tags/SelectTagDialog';
import { PanelDropdown } from 'UI/Layouts/Panel';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import {
    // useContacts,
    useStatuses,
    useRanks,
    useGradeYears,
    useBoards,
    useTags,
    usePositions,
    useTeamMembers,
    // useUser,
} from 'Api/Hooks'

import {
    // addTagsToContacts,
    // deleteTagToContact,
} from 'Api/Endpoints'

import { contactsRoutes, messageRoutes } from 'Routes/Routes'

import { timeZones, states } from 'utils/Data'

export default function ContactsProfilePage(props) {
    const { id } = useParams();
    const [redirect, setRedirect] = useState('')

    const alert = useMainLayoutAlert()

    const [openCreateBoardDialog, setOpenCreateBoardDialog] = useState(false)
    const [openSelectTagDialog, setOpenSelectTagDialog] = useState(false)
    const [selectedContacts, setSelectedContacts] = useState([])
    const [showPanelFilters, setShowPanelFilters] = useState(false)
    const [selectedFilters, setSelectedFilters] = useState({})
    const [loading, setLoading] = useState(false)
    const [privateBoards, setPrivateBoards] = useState([])
    const [teamBoards, setTeamBoards] = useState([])


    // handle filters options
    const status = useStatuses()
    const ranks = useRanks()
    const gradeYears = useGradeYears()
    const tags = useTags()
    const positions = usePositions()
    const teamMembers = useTeamMembers()
    const boards = useBoards()

    useEffect(() => {
        if (!id)
            return

        console.log(id)
    }, [id])


    const teamMembersItems = teamMembers.items?.map(item => ({ id: item.id, name: `${item.first_name} ${item.last_name}` })) || []

    // const mainActions = [
    //     {
    //         name: 'Save as Board',
    //         icon: AccountBox,
    //         onClick: () => setOpenCreateBoardDialog(true),
    //         variant: 'outlined',
    //         disabled: Object.keys(selectedFilters).length === 0,
    //     },
    //     {
    //         name: 'Filter',
    //         icon: Tune,
    //         onClick: () => setShowPanelFilters(oldShowFilter => !oldShowFilter),
    //         variant: 'contained',
    //     }
    // ]

    // console.log(Object.keys(selectedFilters).length === 0)


    const onTopActionClick = (e) => {
        console.log('top action click')
    }

    let filters = [
        { // Category
            id: '0',
            name: 'General',
            items: [
                // { id: '0', name: 'New (Last 30 days)' },
            ]
        },
        { // Category
            id: '1',
            name: 'Details',
            items: []
        },
        { // Category
            id: '2',
            name: 'Coaches',
            items: []
        },
        { // Category
            id: '3',
            name: 'Positions',
            items: []
        },
        { // Category
            id: '4',
            name: 'Family & Relationships',
            items: []
        },
        { // Category
            id: '5',
            name: 'Opponents',
            items: []
        },
        { // Category
            id: '6',
            name: 'External Profiles',
            items: []
        },
        { // Category
            id: '7',
            name: 'Tags',
            items: []
        },
        { // Category
            id: '8',
            name: 'Actions',
            items: []
        },
    ]

    return (
        <MainLayout
            // title='Contacts'
            topActionName='+ New Contact'
            onTopActionClick={onTopActionClick}
            filters={filters}
            // alert={alert}
            // actions={mainActions}
            // onFilterSelected={onFilterSelected}
            loading={loading}
            redirect={redirect}
        >
            <Stack flex={1} direction="row" justifyContent="center" alignItems="start" spacing={0}>
                <Stack flex={2} direction="column" justifyContent="flex-start" alignItems="center" spacing={1}>
                    second
                </Stack>
                <Stack flex={1} direction="column" justifyContent="flex-start" alignItems="center" spacing={1}>
                    third
                </Stack>
            </Stack>
        </MainLayout>
    )
}