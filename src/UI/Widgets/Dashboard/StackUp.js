import { useEffect, useState } from 'react'
import { Stack, Avatar, Button, Divider, CircularProgress, Box, TextField, MenuItem } from '@mui/material'

import BaseDialog from 'UI/Widgets/Dialogs/BaseDialog'
import StackUpTable from './Components/StackUpTable'
import { BaseSection } from './Components/BaseSection'
import * as Styled from './Components/Styles/StyledComponents'

// Renders a personal score row
const Row = ({ user }) => {
    return (
        <Stack direction='row' gap={1} alignItems='center'>
            <Styled.Title paddingX={2}>
                {user.rank ? `${user.rank}.` : ''}
            </Styled.Title>

            <Avatar
                alt={user.name}
                src={user.image}
                sx={{ width: 30, height: 30, justifySelf: 'center' }}
            />

            <Styled.Title flex={1} paddingX={.5}>
                {user.name}
            </Styled.Title>

            <Styled.Title paddingX={2}>
                {user.total}
            </Styled.Title>
        </Stack>
    )
}

/**
 * Renders all the personal scores
 * @param {Object[]} props.stats - array with all time ranges stats [{id, label,data,loading}] 
 * @returns 
 */
export const StackUp = (props) => {
    const [usersStats, setUsersStats] = useState([]);
    const [timeRangeIndex, setTimeRangeIndex] = useState(0);
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        if (props.stats[timeRangeIndex]?.data && !props.stats[timeRangeIndex].loading)
            setUsersStats(props.stats[timeRangeIndex].data.users.map(user => user.table));
    }, [props.stats, timeRangeIndex]);

    return (
        <BaseSection
            title='The StackUp'
            actions={
                <TextField
                    id="select-time-range"
                    inputProps={{ fontWeight: 'bold' }}
                    label={null}
                    size='small'
                    select
                    value={timeRangeIndex}
                    onChange={(e) => setTimeRangeIndex(e.target.value)}
                >
                    {
                        props.stats.map(stat =>
                            <MenuItem
                                key={stat.id}
                                value={stat.id}
                            >
                                {stat.label}
                            </MenuItem>
                        )
                    }
                </TextField>
            }
        >
            {props.stats[timeRangeIndex].loading ?
                <Box sx={{ display: 'grid', placeItems: 'center', height: '250px' }} >
                    <CircularProgress />
                </Box>
                : (
                    <>
                        <Stack gap={1} divider={<Divider />}>
                            {usersStats.slice(0, 4).map((user, index) => (
                                <Row key={index} user={user} />
                            ))}
                        </Stack>
                        <Button
                            sx={{ mt: 2, width: '100%', maxWidth: '250px', alignSelf: 'center' }}
                            onClick={() => setOpenDialog(true)}
                        >
                            View Details
                        </Button>
                    </>
                )
            }

            <BaseDialog
                title={(
                    <Stack direction='row' alignItems='center' justifyContent='space-between'>
                        <Styled.SectionTitle>The StackUp</Styled.SectionTitle>
                        <TextField
                            id="select-time-range-dialog"
                            inputProps={{ fontWeight: 'bold' }}
                            label={null}
                            size='small'
                            select
                            value={timeRangeIndex}
                            onChange={(e) => setTimeRangeIndex(e.target.value)}
                        >
                            {
                                props.stats.map(stat =>
                                    <MenuItem key={stat.id} value={stat.id} >
                                        {stat.label}
                                    </MenuItem>
                                )
                            }
                        </TextField>
                    </Stack>
                )}
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                maxWidth='lg'
                cancelLabel='Close'
                hideActions
            >
            <Box height='70vh'>
                <StackUpTable
                    rows={usersStats}
                    height='100%'
                    getRowId={(row) => row.rank}
                />
            </Box>
            </BaseDialog>

        </BaseSection>
    )
}

export default StackUp