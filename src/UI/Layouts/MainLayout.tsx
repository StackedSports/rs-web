import React, { useState } from 'react'

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

import { ISideFilter } from 'Interfaces'
import { IPanelFilterProps } from 'UI/Widgets/PanelFilters/PanelFilters'

export interface IMainLayoutProps {
    topActionName?: string;
    onTopActionClick?: () => void;
    onTopActionTo?: string | { pathname: string, state?: unknown, search?: string };
    filtersDisabled?: boolean;
    title?: string;
    filters?: ISideFilter[];
    onFilterSelected?: (item: any, itemIndex: number, index: number) => void;
    actions?: Record<string, unknown>[];
    onBackClick?: () => void;
    propsPanelFilters?: IPanelFilterProps;
    panelRef?: React.Ref<unknown> | undefined;
    showBackBoardToContacts?: boolean;
    onBackBoardToContacts?: () => void;
    redirect?: string;
    loading?: boolean;
    children?: React.ReactNode;
    alert?: any;
    hideHeader?: boolean
}

export default function MainLayout(props: IMainLayoutProps) {
    const [displayFilters, setDisplayFilters] = useState(true)

    return (
        <Page>
            <TopBar
                actionTitle={props.topActionName}
                onActionClick={props.onTopActionClick}
                onActionLink={props.onTopActionTo}
            />
            <SideBar />
            <Content>
                <SideFilter
                    visible={displayFilters && !props.filtersDisabled}
                    title={props.title}
                    filters={props.filters}
                    collapsed={true}
                    onFilterSelected={props.onFilterSelected}
                />
                <Panel
                    title={props.title}
                    actions={props.actions}
                    menuOpen={displayFilters}
                    menuDisabled={props.filtersDisabled}
                    onMenuIconClick={() => setDisplayFilters(!displayFilters)}
                    onBackClick={props.onBackClick}
                    propsPanelFilters={props.propsPanelFilters}
                    showBackBoardToContacts={props.showBackBoardToContacts}
                    onBackBoardToContacts={props.onBackBoardToContacts}
                    panelRef={props.panelRef}
                    hideHeader={props.hideHeader}
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