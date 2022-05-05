import './Dropdown.css'
import { useState } from 'react'

const Dropdown = (props) => {
    const [displayContent, setDisplayContent] = useState(false)

    const onMouseLeave = (e) => {
        setDisplayContent(false)
    }

    const onHeaderClick = (e) => {
        setDisplayContent(!displayContent)
        // console.log('display content')
    }

    const onHeaderBlur = (e) => {
        if(props.dismissOnClick)
            setTimeout(() => setDisplayContent(false), props.dismissDelay || 200)
        // console.log('drop on blur')
    }

    let className = 'DropDown-Content'

    if(displayContent && !props.disabled)
        className += ' Visible'
    else if(props.disabled)
        className = 'DropDown-Content-Disabled'

    // console.log('dropdown' + className)


    return (
        <div className='DropDown' onMouseLeave={onMouseLeave} style={props.style}>
            <div tabIndex={0}
              className='DropDown-Header'
              onClick={onHeaderClick}
              onBlur={onHeaderBlur}>
                <props.header/>
            </div>
            <div className={className} style={props.contentStyle}>
                <props.content/>
            </div>
        </div>
    )
}

Dropdown.List = (props) => {
    return (
        <div className='DropDown-List' style={props.style}>
            {props.children}
        </div>
    )
}

Dropdown.Item = (props) => (
    <span style={props.style}
      className={`${props.disabled ? "DropDown-Item-disabled" : "DropDown-Item"}`}
      onClick={props.onClick}
    >
        {props.name}
    </span>
)

// Dropdown.Content = (props) => {
//     return (
//         <div className='DropDown-Content'>
//             {props.children}
//         </div>
//     )
// }

export default Dropdown

