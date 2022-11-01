import React from 'react'
import { Link as RouterLink } from 'react-router-dom';
import { Button, IconButton, SvgIconTypeMap } from '@mui/material';
import { PanelDropdown, panelDropdownOptionsType } from './PanelDropdown';
import { OverridableComponent } from '@mui/material/OverridableComponent';

type iconType = {
    type: 'icon',
    icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
        muiName: string;
    },
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
    onClick: () => void,
    type?: 'button',
    variant?: "text" | "outlined" | "contained",
    style?: never,
    options?: never,
}
type linkType = {
    type?: 'link',
    to: string,
    onClick?: never,
    variant?: "text" | "outlined" | "contained",
    style?: never,
    options?: never,
}

export type ActionsProps = {
    name: string;
    disabled?: boolean,
    icon?: React.ReactElement,
    color?: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning",
} & (iconType | dropdownType | buttonType | linkType)

export const Actions: React.FC<ActionsProps> = (props) => {
    if (props.type === 'icon')
        return (
            <IconButton
                color={props.color}
                disabled={props.disabled}
                onClick={props.onClick}
            >

                {<props.icon />}
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
    else if (props.type === 'link')
        return (
            <Button
                component={RouterLink}
                to={props.to}
                variant={props.variant}
                // @ts-ignore: dont know how to fix this error
                endIcon={props.icon && <props.icon />}
                disabled={props.disabled}
            >
                {props.name}
            </Button>
        )
    else
        return (
            <Button
                variant={props.variant}
                // @ts-ignore: dont know how to fix this error
                endIcon={props.icon && <props.icon />}
                onClick={props.onClick}
                disabled={props.disabled}
                color={props.color}
            >
                {props.name}
            </Button>
        )
}
