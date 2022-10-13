import './SideFilter.css'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import { ISideFilter } from 'Interfaces'


import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Button, Collapse, ListItemButton, Stack } from '@mui/material';
import { SideFilterWrapper } from './SideFilters.styled';

function Category(props) {
    // TODO: change to expanded
    const [collapsed, setCollapsed] = useState(true)

    const onHeaderClick = () => {
        setCollapsed((prev) => !prev)
    }

    const onItemClick = (e, item, index) => {
        props.onItemClick(item, index)
    }

    let iconClass = 'Icon'
    let contentClass = 'Category-Content'

    if (collapsed) {
        iconClass += ' collapsed'
        contentClass += ' collapsed'
    }

    if (!props.items) {
        return (
            <div className='Category-Header'>
                <NavLink className='Category-Header link' to={props?.path || ''}>
                    <ArrowForwardIosIcon className='IconNormal' />
                    <h3 className='Title'>{props.title}</h3>
                </NavLink>
            </div>
        )
    }

    return (
        <Stack>
            <Button
                className='Category-Header'
                variant='text'
                color='neutral'
                onClick={onHeaderClick}
                startIcon={<KeyboardArrowRightIcon className={iconClass} />}
            >
                {props.title}
            </Button>
            <Collapse in={collapsed} className={contentClass}>
                {props.button && (
                    <ListItemButton
                        color='neutral'
                        className="link"
                        onClick={(e) => props.button.onClick(e)}
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
                            <p key={item.id}
                                style={item.isSelected ? { color: '#222', fontWeight: 'bold' } : undefined}
                                onClick={(e) => onItemClick(e, item, index)}
                            >
                                {item.name}
                            </p>
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
                    <Category key={category.id}
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