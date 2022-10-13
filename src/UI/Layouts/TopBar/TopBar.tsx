import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, IconButton, Stack } from '@mui/material';
import { BiChat } from "react-icons/bi";

import { AuthContext } from 'Context/Auth/AuthProvider'
import LogoLight from 'assets/Stacked-Messenger-Logo-300x36.png'
import LogoDark from 'assets/Stacked-Messenger-Logo-dark-600x72.png'
import DefaultTeamLogo from "images/stacked-favicon.png"
import { TopBarWrapper } from './TopBar.styled';
import { useUserPreference } from 'Api/ReactQuery/UserPrefences';

interface TopBarProps {
    actionTitle?: string,
    onActionClick?: () => void,
    onActionLink?: string | { pathname: string, state?: unknown, search?: string };
}

export const TopBar: React.FC<TopBarProps> = (props) => {
    const { user } = useContext(AuthContext)
    const { preferences } = useUserPreference()
    const [teamLogo, setTeamLogo] = useState(DefaultTeamLogo)

    useEffect(() => {
        if (!user || !user?.team)
            return

        setTeamLogo(user.team.org.logo.original)
    }, [user])

    const onTeamLogoError = () => {
        setTeamLogo(DefaultTeamLogo)
    }

    return (
        <TopBarWrapper>
            <div className='TeamLogo'>
                <img src={teamLogo} onError={onTeamLogoError} />
            </div>
            {props.actionTitle && (
                props.onActionLink ? (
                    <Button
                        className='Button'
                        variant='contained'
                        component={Link}
                        to={props.onActionLink}
                    >
                        {props.actionTitle}
                    </Button>
                ) : (
                    <Button
                        className='Button'
                        variant='contained'
                        onClick={props.onActionClick}
                    >
                        {props.actionTitle}
                    </Button>
                )
            )}
            <Stack
                marginLeft='auto'
                direction='row'
                alignItems='center'
                gap={2}
            >
                <IconButton
                    component={Link}
                    to="/new-chat"
                    size='large'
                >
                    <BiChat className='IconBtn' />
                </IconButton>
                <img className='Logo' src={preferences.darkMode ? LogoLight : LogoDark} />
            </Stack>
        </TopBarWrapper>
    )
}