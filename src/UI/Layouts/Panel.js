import './Panel.css'
import { useMemo } from 'react'

import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { default as ArrowBack } from '@mui/icons-material/ArrowBackIos';

// import Button from '@mui/material/Button';
import Button, { IconButton } from 'UI/Widgets/Buttons/Button'
import Dropdown from 'UI/Widgets/Dropdown'
import PanelFilters from 'UI/Widgets/PanelFilters';
import ClearIcon from '@mui/icons-material/Clear';

import BackIcon from "images/back.png";
import DrawerIcon from "images/drawer_contact.png";
import { Tooltip, Box, Divider } from '@mui/material';

export const PanelDropdown = ({ action, header }) => {

    if (!header) {
        //console.log('ok')
        header = () => (
            <Button
                style={{ marginLeft: 0, ...action.style }}
                key={action.name}
                name={action.name}
                variant={action.variant}
                endIcon={action.icon && <action.icon />}
                textColor={action.textColor}
                disabled={action.disabled}
            />
        )
    }

    const content = () => (
        <Dropdown.List style={{ alignItems: 'flex-end' }}>
            {action.options && action.options.map(option => (
                <Dropdown.Item
                    key={option.name}
                    style={{ justifyContent: 'flex-end', color: option.color ? option.color : 'inherit' }}
                    name={option.name}
                    onClick={option.onClick}
                    disabled={option.disabled}
                />
            ))}
        </Dropdown.List>
    )

    return (
        <Dropdown
            header={header}
            disabled={action.disabled}
            content={content}
            style={{
                marginLeft: 10
            }}
            contentStyle={{
                minHeight: 0,
                right: 0,
                overflowY: 'hidden',
                minWidth: 170,
            }}
        />
    )
}


const renderActions = (actions) => {
    if (!actions)
        return <></>

    // console.log(actions)

    return (
        actions.map(action => {
            if (action.type === 'icon')
                return (
                    <IconButton
                        style={{ marginLeft: 20, marginRight: 10 }}
                        key={action.name}
                        name={action.name}
                        Icon={action.icon}
                        onClick={action.onClick}
                    />
                )
            else if (action.type === 'dropdown')
                return (
                    <PanelDropdown key={action.name} action={action} />
                )
            else
                return (
                    <Button
                        style={{ marginLeft: 10 }}
                        key={action.name}
                        name={action.name}
                        variant={action.variant}
                        endIcon={action.icon && <action.icon />}
                        onClick={action.onClick}
                        disabled={action.disabled}
                        color={action.color}
                    />
                )
        })
    )
}


export default function Panel(props) {

    const Icon = props.menuOpen ? MenuOpenIcon : MenuIcon

    const showBackBtn = useMemo(() => props.onBackClick ? true : false, [props.onBackClick])
    const showMenuBtn = useMemo(() => !props.menuDisabled, [props.menuDisabled])

    return (
        <Box
            className={`${props.hideHeader ? 'PainelBlank' : 'Panel'}`}
            ref={props.panelRef}
            sx={props.sx}
        >
            {!props.hideHeader &&
                <Box
                    sx={{
                        borderBottom: 1,
                        borderColor: 'divider',
                        marginBottom: 10,
                        position: 'sticky',
                        top: 0,
                        backgroundColor: 'background.paper',
                        zIndex: 1000,
                        mb:0.5
                    }}
                >
                    <div className='Header'>
                        {showBackBtn && <ArrowBack className='IconBack' onClick={props.onBackClick} />}
                        {showMenuBtn && <Icon className='Icon' onClick={props.onMenuIconClick} />}
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
                            {renderActions(props.actions)}
                        </div>
                    </div>
                    <PanelFilters {...props.propsPanelFilters} />
                </Box>
            }
            {props.children}
        </Box>
    )
}