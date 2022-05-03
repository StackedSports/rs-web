import Page, { Content } from './Page'
import TopBar from './TopBar'
import SideBar from './SideBar'
import Panel from './Panel'

export const SecondaryLayout = (props) => {
    return (
        <Page>
            <TopBar
                actionTitle={props.topActionName}
                onActionClick={props.onTopActionClick}
            />
            <SideBar />
            <Content>
                {props.children}
            </Content>
        </Page>
    )
}

export default SecondaryLayout