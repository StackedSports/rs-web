

const getStyle = (props) => ({
    padding: props.padding || 0,
    margin: props.margin || 0,
    fontSize: props.size || 14,
    color: props.color || 'inherit',
    fontWeight: props.weight || 'normal'
})

const Typography = ({ variant, text = '', ...props}) => {
    let el = <span/>

    switch(variant) {
        case 'h1': el = <h1/>; break;
        case 'h2': el = <h2/>; break;
        case 'h3': el = <h3/>; break;
        case 'info': el = <span/>; break
    }

    return (
        <el style={getStyle(props)}>{text}</el>
    )
}

export default Typography