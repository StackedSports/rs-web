import './SideFilter.css'

import { useState } from 'react'

import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

function Category(props) {
    const [collapsed, setCollapsed] = useState(props.collapsed)

    const onHeaderClick = (e) => {
        setCollapsed(!collapsed)
    }

    const onItemClick = (e, item, index) => {
        props.onItemClick(item, index)
    }

    let iconClass = 'Icon'
    let contentClass = 'Category-Content'

    if(collapsed) {
        iconClass += ' collapsed'
        contentClass += ' collapsed'
    }

    return (
        <div className='Category'>
            <div className='Category-Header' onClick={onHeaderClick}>
                <h3 className='Title'>{props.title}</h3>
                <ArrowForwardIosIcon className={iconClass}/>
            </div>
            <div className={contentClass}>
                {props.items.map((item, index) => {
                    return (
                        <p 
                          key={item.id}
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
    if(!props.visible)
        return <></>

    return (
        <div className='SideFilter'>
            {/* <h2 className='Title'>{props.title}</h2> */}
            {props.filters && props.filters.map((category, index) => {
                return (
                    <Category key={category.id}
                      title={category.name}
                      items={category.items}
                      onItemClick={(item, itemIndex) => props.onFilterSelected(item, itemIndex, index)}
                    />
                )
            })}
        </div>
    )
}