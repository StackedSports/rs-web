import Page from './Page'
import TopBar from './TopBar'
import SideBar from './SideBar/SideBar'
import Panel from './Panel'
import Content from './Content'

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