import React from 'react'
import { Button, IconButton } from '@mui/material';
import { actionType, PanelDropdown, panelDropdownOptionsType } from './PanelDropdown';

type iconType = {
    type: 'icon',
    icon: React.ReactElement,
    onClick: () => void,
    variant?: never,
    style?: never,
    options?: never,
}
type dropdownType = {
    type?: 'dropdown',
    onClick?: never,
    variant?: "text" | "outlined" | "contained";
    style?: React.CSSProperties;
    options?: panelDropdownOptionsType[]
}
type buttonType = {
    onClick: () => void
    type?: 'button',
    variant?: "text" | "outlined" | "contained",
    style?: never,
    options?: never,
}

export type ActionsProps = {
    name: string;
    disabled?: boolean,
    icon?: React.ReactElement,
    color?: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning",
} & (iconType | dropdownType | buttonType)

export const Actions: React.FC<ActionsProps> = (props) => {
    console.log(props)
    if (props.type === 'icon')
        return (
            <IconButton
                color={props.color}
                disabled={props.disabled}
                onClick={props.onClick}
            >
                {props.icon && <props.icon />}
            </IconButton>
        )
    else if (props.type === 'dropdown')
        return (
            <PanelDropdown
                action={{
                    name: props.name,
                    disabled: props.disabled,
                    icon: props.icon,
                    options: props.options,
                    style: props.style,
                    variant: props.variant
                }}
            />
        )
    else
        return (
            <Button
                variant={props.variant}
                endIcon={props.icon && <props.icon />}
                onClick={props.onClick}
                disabled={props.disabled}
                color={props.color}
            >
                {props.name}
            </Button>
        )
}
