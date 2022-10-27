import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import { ISideFilter, ISideFilterButton, ISideFilterItem } from 'Interfaces'


import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Button, Collapse, ListItemButton, Stack } from '@mui/material';
import { SideFilterWrapper } from './SideFilters.styled';

type CategoryHeaderLink = {
    items?: never,
    path?: string | { pathname: string, search: string },
    button?: never,
}

type CategoryList = {
    items?: ISideFilterItem[],
    path?: never,
    button?: ISideFilterButton,
}

type CategoryProps = {
    title: string,
    onItemClick: (item: ISideFilter, index: number) => void,
} & (CategoryHeaderLink | CategoryList)

const Category: React.FC<CategoryProps> = (props) => {
    // TODO: change to expanded
    const [collapsed, setCollapsed] = useState(true)

    const onHeaderClick = () => {
        setCollapsed((prev) => !prev)
    }

    const onItemClick = (item: ISideFilter, index: number) => {
        props.onItemClick(item, index)
    }

    const isLinkActive = (location: string, path: string | { pathname: string, search: string }): boolean => {
        if (typeof path === 'string' || path instanceof String) {
            return location === path
        } else {
            return location === `${path.pathname}?${path.search}`
        }
    }

    if (!props.items) {
        return (
            <Button
                className='Category-Header'
                component={NavLink}
                to={props?.path || ''}
                color='neutral'
                startIcon={<KeyboardArrowRightIcon />}
            >
                {props.title}
            </Button>
        )
    }

    return (
        <Stack>
            <Button
                className='Category-Header'
                variant='text'
                color='neutral'
                size='small'
                onClick={onHeaderClick}
                startIcon={<KeyboardArrowRightIcon className={`Icon ${collapsed ? 'collapsed' : ''}`} />}
            >
                {props.title}
            </Button>
            <Collapse in={collapsed}>
                {props.button && (
                    <ListItemButton
                        color='neutral'
                        className="link"
                        dense
                        onClick={(e) => props.button?.onClick(e)}
                    >
                        {props.button.label}
                    </ListItemButton>
                )}
                {props.items.map((item, index) => {
                    if (item.path)
                        return (
                            <ListItemButton
                                component={NavLink}
                                exact
                                isActive={(_, { pathname, search }) => isLinkActive(`${pathname}${search}`, item.path)}
                                key={item.id}
                                className="link"
                                activeClassName="Mui-selected"
                                to={item.path}
                                dense
                            >
                                {item.name}
                            </ListItemButton>
                        )
                    else
                        return (
                            <ListItemButton
                                key={item.id}
                                selected={item.isSelected}
                                onClick={() => onItemClick(item, index)}
                                dense
                            >
                                {item.name}
                            </ListItemButton>
                        )
                })}

            </Collapse>
        </Stack>
    )
}

type SideFilterProps = {
    visible: boolean,
    title: string,
    filters: ISideFilter[],
    collapsed: boolean,
    onFilterSelected?: (item: ISideFilter, itemIndex: number, index: number) => void;
}

export const SideFilter: React.FC<SideFilterProps> = (props) => {
    if (!props.visible)
        return <></>

    return (
        <SideFilterWrapper >
            {props.filters && props.filters.map((category, index) => {
                return (
                    <Category
                        key={category.id}
                        title={category.name}
                        items={category.items}
                        button={category.button}
                        onItemClick={(item, itemIndex) => props.onFilterSelected && props.onFilterSelected(item, itemIndex, index)}
                        path={category.path}
                    />
                )
            })}
        </SideFilterWrapper>
    )
}

export default SideFilter