import './SideBar.css'

import { NavLink } from 'react-router-dom';

import { routes } from 'Routes/Routes'

const items = [
    routes.dashboard,
    routes.contacts,
    routes.messages,
    routes.media,
    routes.twitterPosts,
    routes.twitterStream,
    routes.settings
]

export default function SideBar(props) {
    return (
        <div className='SideBar'>
            {items.map(item => (
                <NavLink key={item.path} className='navLink' activeClassName='selected' to={item.path}>
                    <item.icon className='icon'/>
                    {/* <p className='label'>Dashboard</p> */}
                </NavLink>
            ))}
        </div>
    )
}