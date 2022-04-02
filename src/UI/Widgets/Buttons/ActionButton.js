import './ActionButton'

const classes = {
    default: 'ActionButton',

}

const ActionButton = ({ variant = 'default', name, onClick }) => {
    
    return (
        <button className={classes[variant]} onClick={onClick}>
            {name}
        </button>
    )
}