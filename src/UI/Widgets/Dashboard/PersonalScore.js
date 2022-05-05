import { useEffect, useState } from 'react'
import { Stack, Avatar, Button, Divider, Grid } from '@mui/material'

import { BaseSection } from './Components/BaseSection'
import * as Styled from './Components/Styles/StyledComponents'
import { getFullName } from 'utils/Parser'

/**
 * 
 * @param {Object} stats - stats from useStats 
 * @param {Object} user - user from useContext 
 * @returns 
 */
export const PersonalScore = (props) => {
    const [stats, setStats] = useState({});

    useEffect(() => {
        if (!props.loading && props.stats) {
            const userStats = props.stats.users.find(user => user.table.name === getFullName(props.user))
            setStats({ ...userStats.table });
        }
    }, [props.loading, props.stats]);

    return (
        <Stack gap={3}>
            <BaseSection title={stats.rank ? `${stats.rank}.` : '.'}>
                <Avatar
                    alt={props.user ? getFullName(props.user) : ''}
                    src={props.user ? props.user.twitter_profile.profile_image : ''}
                    sx={{ width: 90, height: 90, marginInline: 'auto', mb: 1 }}
                />
                <Styled.Title textAlign='center' color='text.secondary'>
                    {props.user ? getFullName(props.user) : ''}
                </Styled.Title>
                <Button sx={{ mt: 2, width: '100%', maxWidth: '250px', alignSelf: 'center' }} variant="contained" color="primary">
                    Score Details
                </Button>
            </BaseSection>

            <BaseSection>
                <Grid container textAlign='center' >
                    <Grid item xs={4} position='relative'>
                        <Styled.Title color='text.secondary' gutterBottom>
                            DM’s
                        </Styled.Title>
                        <Styled.SectionTitle>
                            {stats.dms}
                        </Styled.SectionTitle>
                        <Divider orientation='vertical' absolute />
                    </Grid>
                    <Grid item xs={4} position='relative'>
                        <Styled.Title color='text.secondary' gutterBottom>
                            Personal Text
                        </Styled.Title>
                        <Styled.SectionTitle>
                            {stats.pts}
                        </Styled.SectionTitle>
                        <Divider orientation='vertical' absolute />
                    </Grid>
                    <Grid item xs={4}>
                        <Styled.Title color='text.secondary' gutterBottom>
                            RS Text
                        </Styled.Title>
                        <Styled.SectionTitle>
                            {stats.rst}
                        </Styled.SectionTitle>
                    </Grid>
                </Grid>
            </BaseSection>
        </Stack>
    )
}

export default PersonalScore