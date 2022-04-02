import { useState } from 'react'

import { Redirect } from 'react-router-dom'

import Page, { Content } from './Page'
import TopBar from './TopBar'
import SideBar from './SideBar'
import Panel from './Panel'

import SideFilter from '../Widgets/SideFilter'
import LoadingOverlay from '../Widgets/LoadingOverlay'

export default function MainLayout(props) {
    const [displayFilters, setDisplayFilters] = useState(true)

    return (
        <Page>
            <TopBar actionTitle={props.topActionName} onActionClick={props.onTopActionClick}/>
            <SideBar/>
            <Content>
                <SideFilter
                  visible={displayFilters}
                  title={props.title}
                  filters={props.filters}
                  onFilterSelected={props.onFilterSelected}
                />
                <Panel
                  title={props.title}
                  actions={props.actions}
                  menuOpen={displayFilters}
                  onMenuIconClick={(e) => setDisplayFilters(!displayFilters)}
                >
                    {props.redirect && props.redirect !== '' && <Redirect push to={props.redirect}/>}
                    {props.loading && <LoadingOverlay/>}
                    {props.children}
                </Panel>
            </Content>
        </Page>
    )
}