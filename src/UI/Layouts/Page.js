import './Page.css'

export function Content(props) {
    return (
        <div className='Content'>
            {props.children}
        </div>
    )
}
export default function Page(props) {
    return (
        <div className='Page'>
            {props.children}
        </div>
    )
}