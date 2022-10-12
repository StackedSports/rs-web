import { Button } from '@mui/material'
import React from 'react'
import Dropdown from 'UI/Widgets/Dropdown'

export type panelDropdownOptionsType = {
    name: string;
    onClick: () => void;
    disabled?: boolean;
    color?: string;
}

type actionType = {
    style?: React.CSSProperties;
    variant?: "text" | "outlined" | "contained";
    icon?: React.ReactNode;
    disabled?: boolean;
    name: string;
    options?: panelDropdownOptionsType[]
}

interface PanelDropdownProps {
    action: actionType,
    header?: () => JSX.Element
}

export const PanelDropdown: React.FC<PanelDropdownProps> = ({ action, header }) => {
    console.log(action)
    if (!header) {

        header = () => (
            <Button
                style={{ marginLeft: 0, ...action?.style }}
                variant={action.variant}
                endIcon={<action.icon />}
            >
                {action.name}
            </Button>
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
                    disabled={option?.disabled}
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
