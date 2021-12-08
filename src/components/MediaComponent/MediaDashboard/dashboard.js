import React from 'react'
import MenuStream from '../../TwitterStream/Menus/MenuStream/MenuStream'
function dashboard() {
    return (
        <div>
            <MenuStream mediaDashboard={true}/>
        </div>
    )
}

export default dashboard
