import './SideFilter.css'
import { useState } from 'react'
import { NavLink } from 'react-router-dom';

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function Category(props) {
    // TODO: change to expanded
    const [collapsed, setCollapsed] = useState(true)//)

    const onHeaderClick = (e) => {
        setCollapsed(!collapsed)
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
            <div className='Category'>
                <div className='Category-Header'>
                    <NavLink exact={false} className='Category-Header link' to={props?.path || ''}>
                        <h3 className='Title'>{props.title}</h3>
                        <ArrowForwardIosIcon className='IconNormal' />
                    </NavLink>
                </div>
            </div>
        )
    }

    return (
        <div className='Category'>
            <div className='Category-Header' onClick={onHeaderClick}>
                <h3 className='Title'>{props.title}</h3>
                <ArrowForwardIosIcon className={iconClass} />
            </div>
            <div className={contentClass}>
                {props.button && (
                    <p onClick={(e) => props.button.onClick(e)}>
                        {props.button.label}
                    </p>
                )}
                {props.items.map((item, index) => {
                    if (item.path)
                        return (
                            <NavLink key={item.id} exact className="link" activeClassName="linkActive" to={item.path}>
                                <p>{item.name}</p>
                            </NavLink>
                        )
                    else
                        return (
                            <p key={item.id}
                                onClick={(e) => onItemClick(e, item, index)}
                            >
                                {item.name}
                            </p>
                        )
                })}

            </div>
        </div>
    )
}

export default function SideFilter(props) {
    if (!props.visible)
        return <></>

    // console.log(props.filters)

    return (
        <div className='SideFilter'>
            {/* <h2 className='Title'>{props.title}</h2> */}
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
        </div>
    )
}