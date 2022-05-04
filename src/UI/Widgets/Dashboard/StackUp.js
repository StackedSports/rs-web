import { useEffect, useState } from 'react'
import { Stack, Avatar, Button, Divider, Grid } from '@mui/material'
import { KeyboardArrowDown } from '@mui/icons-material';

import { BaseSection } from './Components/BaseSection'
import * as Styled from './Components/Styles/StyledComponents'


const Row = ({ user }) => {
    return (
        <Grid container item columnSpacing={1} alignItems='center' >
            <Grid item xs={1}>
                <Styled.Title>
                    {user.rank ? `${user.rank}.` : ''}
                </Styled.Title>
            </Grid>
            <Grid item xs={1}>
                <Avatar
                    alt={user.name}
                    src={user.image}
                    sx={{ width: 45, height: 45, justifySelf: 'center' }}
                />
            </Grid>
            <Grid item xs>
                <Styled.Title sx={{ marginInlineStart: 1 }}>
                    {user.name}
                </Styled.Title>
            </Grid>
            <Grid item xs={2}>
                <Styled.Title>
                    {user.total}
                </Styled.Title>
            </Grid>
        </Grid>
    )
}

export const StackUp = (props) => {
    const [stats, setStats] = useState([]);

    useEffect(() => {
        if (!props.stats.loading && !props.stats.error) {
            const allStats = props.stats.items.users.map(user => user.table)
            setStats(allStats);
        }
    }, [props.stats?.items, props.stats?.loading]);

    console.log("all stats", stats);
    return (
        <BaseSection
            title='Stack Up'
            actions={<Button variant='outlined' endIcon={<KeyboardArrowDown />} > This Moth</Button>}
        >
            <Stack gap={1} divider={<Divider />}>
                {stats.slice(0, 4).map((user, index) => (
                    <Stack key={index} direction='row' gap={1} alignItems='center'>
                        <Styled.Title paddingX={2}>
                            {user.rank ? `${user.rank}.` : ''}
                        </Styled.Title>

                        <Avatar
                            alt={user.name}
                            src={user.image}
                            sx={{ width: 45, height: 45, justifySelf: 'center' }}
                        />

                        <Styled.Title flex={1}>
                            {user.name}
                        </Styled.Title>

                        <Styled.Title paddingX={2}>
                            {user.total}
                        </Styled.Title>
                    </Stack>
                ))}
            </Stack>
            <Button variant='text' sx={{ mt: 2, width: '100%', maxWidth: '250px', alignSelf: 'center' }} >
                View Details
            </Button>
        </BaseSection>
    )
}

export default StackUp