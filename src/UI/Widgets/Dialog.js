import './Dialog.css'

export default function Dialog(props) {

    const onBackdropClick = (e) => {

    }

    const onDialogClick = (e) => {

    }
    
    return (
        <div className='DialogBackdrop' onClick={onBackdropClick}>
            <div className='DialogContent' onClick={onDialogClick}>
                {props.children}
            </div>
        </div>
    )
}