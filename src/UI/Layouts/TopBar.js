import { useContext, useState, useEffect } from 'react'

import './TopBar.css'

import { BiChat, BiBell } from "react-icons/bi";

import { AuthContext } from 'Context/Auth/AuthProvider'

import SearchBar from '../Widgets/SearchBar'

import Logo from 'images/logoRight.png'
import DefaultTeamLogo from "images/stacked-favicon.png"

export default function TopBar(props) {
    const { user } = useContext(AuthContext)
    const [teamLogo, setTeamLogo] = useState(DefaultTeamLogo)

    useEffect(() => {
        if(!user || !user?.team)
            return

        setTeamLogo(user.team.org.logo.original)
    }, [user])

    const onTeamLogoError = () => {
        setTeamLogo(DefaultTeamLogo)
    }

    return (
        <div className='TopBar'>
            <div className='TeamLogo'>
                <img src={teamLogo} onError={onTeamLogoError}/>
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