import React from 'react';
import { useMemo } from 'react'

import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import ClearIcon from '@mui/icons-material/Clear';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Tooltip, Box, IconButton, SxProps, Theme } from '@mui/material';

import PanelFilters from 'UI/Widgets/PanelFilters';
import { PanelWrapper } from './Panel.styled';
import { Actions, ActionsProps } from './Actions';

interface PanelProps {
    title?: string,
    menuOpen?: boolean,
    showBackBoardToContacts?: boolean,
    menuDisabled?: boolean,
    hideHeader?: boolean,
    panelRef?: React.Ref<unknown>,
    sx?: SxProps<Theme>,
    children?: React.ReactNode,
    onBackClick?: () => void,
    onMenuIconClick?: () => void,
    onBackBoardToContacts?: () => void,
    actions?: ActionsProps[],
    propsPanelFilters?: any
}


export const Panel: React.FC<PanelProps> = (props) => {

    const Icon = props.menuOpen ? MenuOpenIcon : MenuIcon

    const showBackBtn = useMemo(() => props.onBackClick ? true : false, [props.onBackClick])
    const showMenuBtn = useMemo(() => !props.menuDisabled, [props.menuDisabled])

    return (
        <PanelWrapper
            className={props.hideHeader ? 'PainelBlank' : undefined}
            ref={props.panelRef}
            sx={{
                ...props.sx
            }}
        >
            {!props.hideHeader &&
                <Box
                    sx={{
                        borderBottom: 1,
                        borderColor: 'divider',
                        marginBottom: 10,
                        paddingInline: '30px',
                        position: 'sticky',
                        top: 0,
                        backgroundColor: 'background.paper',
                        zIndex: 1000,
                        mb: 0.5
                    }}
                >
                    <div className='Header'>
                        {showBackBtn &&
                            <IconButton size='small' className='IconBack' onClick={props.onBackClick}>
                                <ArrowBackIosNewIcon />
                            </IconButton>
                        }
                        {showMenuBtn &&
                            <IconButton
                                className='Icon'
                                size='small'
                                onClick={props.onMenuIconClick}
                            >
                                <Icon />
                            </IconButton>
                        }
                        <h2 className='Title'>{props.title}</h2>
                        {props.showBackBoardToContacts &&
                            <Tooltip title="Back to contacts" placement='right'>
                                <ClearIcon
                                    onClick={props.onBackBoardToContacts}
                                    style={{ color: "red", cursor: "pointer", fontSize: 27, marginLeft: 8 }}
                                />
                            </Tooltip>
                        }

                        <div className="JustifyRight">
                            {props.actions && props.actions.map((action, index) => <Actions key={index} {...action} />)}
                        </div>
                    </div>
                    <PanelFilters {...props.propsPanelFilters} />
                </Box>
            }
            <Box className='Content'>
                {props.children}
            </Box>
        </PanelWrapper>
    )
}