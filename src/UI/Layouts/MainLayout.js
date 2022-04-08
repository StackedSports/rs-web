import { useState } from 'react'

import { Redirect } from 'react-router-dom'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'

import Page, { Content } from './Page'
import TopBar from './TopBar'
import SideBar from './SideBar'
import Panel from './Panel'

import SideFilter from '../Widgets/SideFilter'
import LoadingOverlay from '../Widgets/LoadingOverlay'

export { default as useMainLayoutAlert } from './Hooks/MainLayoutAlertHook'

export default function MainLayout(props) {
    const [displayFilters, setDisplayFilters] = useState(true)

    return (
        <Page>
            <TopBar
                actionTitle={props.topActionName}
                onActionClick={props.onTopActionClick}
            />
            <SideBar />
            <Content>
                <SideFilter
                    visible={displayFilters}
                    title={props.title}
                    filters={props.filters}
                    collapsed={true}
                    onFilterSelected={props.onFilterSelected}
                />
                <Panel
                    title={props.title}
                    actions={props.actions}
                    menuOpen={displayFilters}
                    onMenuIconClick={(e) => setDisplayFilters(!displayFilters)}
                    propsPanelFilters={props.propsPanelFilters}
                >
                    {props.alert && (
                        <Snackbar
                            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                            open={props.alert.visible}
                            autoHideDuration={6000}
                            onClose={props.alert.dismiss}>
                            <MuiAlert
                                variant="filled"
                                onClose={props.alert.dismiss}
                                severity={props.alert.severity}
                                sx={{ width: '100%' }}
                            >
                                {props.alert.message}
                            </MuiAlert>
                        </Snackbar>
                    )}

                    {props.redirect && props.redirect !== '' && <Redirect push to={props.redirect} />}

                    {props.loading && <LoadingOverlay />}

                    {props.children}
                </Panel>
            </Content>
        </Page>
    )
}