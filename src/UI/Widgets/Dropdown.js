import './Dropdown.css'
import { useState } from 'react'
import { MenuItem, MenuList, Paper } from '@mui/material'

const Dropdown = (props) => {
    const [displayContent, setDisplayContent] = useState(false)

    const onMouseLeave = (e) => {
        setDisplayContent(false)
    }

    const onHeaderClick = (e) => {
        if (!props.disabled)
            setDisplayContent(!displayContent)
        // console.log('display content')
    }

    const onHeaderBlur = (e) => {
        if (props.dismissOnClick)
            setTimeout(() => setDisplayContent(false), props.dismissDelay || 200)
        // console.log('drop on blur')
    }

    let className = 'DropDown-Content'

    if (displayContent && !props.disabled)
        className += ' Visible'
    else if (props.disabled)
        className = 'DropDown-Content-Disabled'

    return (
        <div className='DropDown' onMouseLeave={onMouseLeave} style={props.style}>
            <div tabIndex={0}
                className='DropDown-Header'
                onClick={onHeaderClick}
                onBlur={onHeaderBlur}>
                <props.header />
            </div>
            <Paper className={className} style={props.contentStyle}>
                <props.content />
            </Paper>
        </div>
    )
}

Dropdown.List = (props) => {
    return (
        <MenuList
            style={props.style}
            sx={{ p: 0 }}
        >
            {props.children}
        </MenuList>
    )
}

Dropdown.Item = (props) => (
    <MenuItem
        style={props.style}
        disabled={props.disabled}
        onClick={props.onClick}
        sx={{
            justifyContent: 'flex-end',
            padding: '8 10',
        }}
    >
        {props.name}
    </MenuItem>
)

// Dropdown.Content = (props) => {
//     return (
//         <div className='DropDown-Content'>
//             {props.children}
//         </div>
//     )
// }

export default Dropdown

