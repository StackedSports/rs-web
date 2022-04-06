import './TopBar.css'

import { BiChat, BiBell } from "react-icons/bi";

import SearchBar from '../Widgets/SearchBar'

import Logo from 'images/logoRight.png'

export default function TopBar(props) {
    return (
        <div className='TopBar'>
            <div className='TeamLogo'>

            </div>
            {props.actionTitle && (
                <div className='Button' onClick={props.onActionClick}>
                    {props.actionTitle}
                </div>
            )}
            <div className='FlexRight'>
                <SearchBar placeholder='Power search'/>
                <BiBell className='IconBtn'/>
                <BiChat className='IconBtn'/>
                <img className='Logo' src={Logo}/>
            </div>
        </div>
    )
}