import {GridView } from '@mui/icons-material'

import MainLayout from 'UI/Layouts/MainLayout'


const filters = [
    { // Category
        id: '0',
        name: 'My Media',
        items: [
            // Filters
        ]
    },
]

export const mediaPages = () => {

    const mainActions = [
        {
            name: '',
            icon: AccountBox,
            onClick: () => setOpenCreateBoardDialog(true),
            variant: 'outlined',
            disabled: Object.keys(selectedFilters).length === 0,
        },
        {
            name: 'Filter',
            icon: Tune,
            onClick: () => setShowPanelFilters(oldShowFilter => !oldShowFilter),
            variant: 'outlined',
        }
    ]

    const onTopActionClick = (e) => {
        console.log('top action click')
    }


    return (
        <MainLayout
            title='Media'
            topActionName='+ Add Media'
            onTopActionClick={onTopActionClick}
            filters={filters}
            onFilterSelected={onFilterSelected}
            actions={mainActions}
        >

        </MainLayout>
    )
}
