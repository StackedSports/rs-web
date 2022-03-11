export default function MediaInputTitle(props) {

    //let el = props.type ? props.type : p

    return (
        <p
          style={{
            color: "#b5bccd",
            fontSize: 17,
            fontWeight: 500,
            marginTop: 16,
            ...props.style
          }}
        >
            {props.title}
        </p>
    )
}