import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, IconButton, Stack } from '@mui/material';
import { BiChat } from "react-icons/bi";

import { AuthContext } from 'Context/Auth/AuthProvider'
import Logo from 'images/logoRight.png'
import DefaultTeamLogo from "images/stacked-favicon.png"
import { TopBarWrapper } from './TopBar.styled';

interface TopBarProps {
    actionTitle?: string,
    onActionClick?: () => void
}

export const TopBar: React.FC<TopBarProps> = (props) => {
    const { user } = useContext(AuthContext)
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
                <Button
                    className='Button'
                    variant='contained'
                    onClick={props.onActionClick}
                    disableElevation
                >
                    {props.actionTitle}
                </Button>
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
                <img className='Logo' src={Logo} />
            </Stack>
        </TopBarWrapper>
    )
}