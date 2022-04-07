import './Panel.css'

import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

// import Button from '@mui/material/Button';
import Button, { IconButton } from 'UI/Widgets/Buttons/Button'
import Dropdown from 'UI/Widgets/Dropdown'
import PanelFilters from 'UI/Widgets/PanelFilters';

import BackIcon from "images/back.png";
import DrawerIcon from "images/drawer_contact.png";

const PanelDropdown = ({ action }) => {

    const header = () => (
        <Button 
            style={{ marginLeft: 0 }}
            name={action.name}
            variant={action.variant} 
            endIcon={<action.icon/>}
        />
    )

    const content = () => (
        <Dropdown.List style={{ alignItems: 'flex-end' }}>
            {action.options && action.options.map(option => (
                <Dropdown.Item
                  key={option.name}
                  style={{ justifyContent: 'flex-end', color: option.color ? option.color : 'inherit' }}
                  name={option.name}
                  onClick={option.onClick}
                />
            ))}
        </Dropdown.List>
    )

    return (
        <Dropdown
          header={header}
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
    if(!actions)
        return <></>
    
    return (
        actions.map(action => {
            if(action.type === 'icon')
                return (
                    <IconButton
                      style={{ marginLeft: 20, marginRight: 10 }}
                      key={action.name}
                      name={action.name}
                      Icon={action.icon}
                      onClick={action.onClick}
                    />
                )
            else if(action.type === 'dropdown')
                return (
                    <PanelDropdown action={action}/>
                )
            else
                return (
                    <Button 
                      style={{ marginLeft: 10 }}
                      key={action.name}
                      name={action.name}
                      variant={action.variant} 
                      endIcon={<action.icon/>}
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

    return (
        <div className='Panel'>
            <div style={{ marginBottom: 20 }}>
                <div className='Header'>
                    {/* <img className='Icon' src={Icon} onClick={props.onMenuIconClick}/> */}
                    <Icon className='Icon' onClick={props.onMenuIconClick}/>
                    <h2 className='Title'>{props.title}</h2>
                    <div className="JustifyRight">
                        {renderActions(props.actions)}
                    </div>
                </div>
                <PanelFilters
                    {...props.propsPanelFilters}
                />
            </div>
            {props.children}  
        </div>
    )
}